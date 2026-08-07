'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { GameState, DecisionOption, StatKey, PlayerStats, MapCoordinates } from '@/types/game';
import { GAME_EVENTS } from '@/data/events';
import { GAME_ENDINGS } from '@/data/endings';

import { loadGameState, saveGameState, clearGameState } from '@/utils/storage';

import { HeaderStatsBar } from '@/components/HeaderStatsBar';
import { LeafletMapClient } from '@/components/LeafletMapClient';
import { EventCard } from '@/components/EventCard';
import { TransitionScreen } from '@/components/TransitionScreen';
import { EndingScreen } from '@/components/EndingScreen';
import { MainMenu } from '@/components/MainMenu';
import { EncyclopediaModal } from '@/components/EncyclopediaModal';
import { AchievementsModal } from '@/components/AchievementsModal';
import { SettingsModal } from '@/components/SettingsModal';
import { CharacterAffinityModal } from '@/components/CharacterAffinityModal';
import { BattleManager } from '@/components/minigames/BattleManager';

import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { applyBalancedStatDelta } from '@/utils/statBalance';
import { audioEngine } from '@/utils/audio';

const INITIAL_STATS: PlayerStats = {
  salud: 72,
  liderazgo: 55,
  estrategia: 60,
  prestigio: 40,
  patriotismo: 65,
  relaciones: 50,
  recursos: 48,
  caballeria: 42,
  experiencia: 30,
};

const calculatePoderDeGobierno = (stats: PlayerStats): number => {
  const vals = Object.values(stats) as number[];
  if (!vals.length) return 50;
  const sum = vals.reduce((a: number, v: number) => a + v, 0);
  return Math.round(sum / vals.length);
};

export default function GamePage() {
  const [view, setView] = useState<
    'menu' | 'event' | 'transition' | 'ending' | 'battle'
  >('menu');

  const [gameState, setGameState] = useState<GameState>({
    stats: { ...INITIAL_STATS },
    poderDeGobierno: calculatePoderDeGobierno(INITIAL_STATS),
    currentEventId: 'evt_yapeyu_1778',
    year: 1778,
    age: 5,
    location: 'Yapeyú, Misiones',
    history: [],
    characterAffinities: {},
    unlockedAchievements: [],
    unlockedEncyclopedia: ['enc_san_martin', 'enc_yapeyu'],
    soundEnabled: true,
    textSpeed: 'normal',
    isGameOver: false,
    hasSavedGame: false,
  });

  const [currentOption, setCurrentOption] = useState<DecisionOption | null>(null);
  const [recentDeltas, setRecentDeltas] = useState<Array<{ stat: StatKey; value: number }>>([]);
  const [visitedWaypoints, setVisitedWaypoints] = useState<MapCoordinates[]>([]);
  const [activeBattleConfig, setActiveBattleConfig] = useState<BattleMinigameConfig | null>(null);
  const [activeModal, setActiveModal] = useState<
    'encyclopedia' | 'achievements' | 'settings' | 'characters' | null
  >(null);

  useEffect(() => {
    const saved = loadGameState();
    if (saved?.hasSavedGame) {
      setGameState({
        ...saved,
        poderDeGobierno: calculatePoderDeGobierno(saved.stats),
      });
    }
  }, []);

  useEffect(() => {
    if (view !== 'menu') {
      saveGameState(gameState);
    }
  }, [gameState, view]);

  const handleStartNewGame = () => {
    const newState: GameState = {
      stats: { ...INITIAL_STATS },
      poderDeGobierno: calculatePoderDeGobierno(INITIAL_STATS),
      currentEventId: 'evt_yapeyu_1778',
      year: 1778,
      age: 5,
      location: 'Yapeyú, Misiones',
      history: [],
      characterAffinities: {},
      unlockedAchievements: gameState.unlockedAchievements,
      unlockedEncyclopedia: ['enc_san_martin', 'enc_yapeyu'],
      soundEnabled: gameState.soundEnabled,
      textSpeed: 'normal',
      isGameOver: false,
      hasSavedGame: true,
    };

    setGameState(newState);
    saveGameState(newState);
    setVisitedWaypoints([]);
    setRecentDeltas([]);
    setView('event');
  };

  const handleContinueGame = () => {
    if (gameState.isGameOver && gameState.currentEndingId) {
      setView('ending');
    } else {
      setView('event');
    }
  };

  const handleSelectOption = (option: DecisionOption) => {
    setCurrentOption(option);

    // Apply stat deltas
    const { updatedStats, appliedDeltas } = applyBalancedStatDelta(
      gameState.stats,
      option.statsEffect
    );

    const newPoder = calculatePoderDeGobierno(updatedStats);
    setRecentDeltas(appliedDeltas);

    // Character affinities
    const updatedAffinities = { ...gameState.characterAffinities };

    option.affinityEffect?.forEach(
      ({ characterId, delta }: { characterId: string; delta: number }) => {
        const cur = updatedAffinities[characterId] ?? 70;
        updatedAffinities[characterId] = Math.max(
          0,
          Math.min(100, cur + delta)
        );
      }
    );

    // Achievements
    const achs = [...gameState.unlockedAchievements];

    if (updatedStats.estrategia >= 80 && !achs.includes('gran_estratega')) {
      achs.push('gran_estratega');
    }
    if (
      updatedStats.liderazgo >= 80 &&
      updatedStats.caballeria >= 80 &&
      !achs.includes('conquistador')
    ) {
      achs.push('conquistador');
    }
    if (updatedStats.prestigio >= 85 && !achs.includes('heroe_nacional')) {
      achs.push('heroe_nacional');
    }
    if (newPoder >= 75 && !achs.includes('padre_patria')) {
      achs.push('padre_patria');
    }
    if (updatedStats.patriotismo >= 85 && !achs.includes('patriota_supremo')) {
      achs.push('patriota_supremo');
    }

    // Encyclopedia unlocks
    const enc = [...gameState.unlockedEncyclopedia];
    const nid = option.nextEventId;

    if (nid.includes('san_lorenzo') && !enc.includes('enc_san_lorenzo')) {
      enc.push('enc_san_lorenzo', 'enc_granaderos');
    }
    if (nid.includes('cruce') && !enc.includes('enc_cruce_andes')) {
      enc.push('enc_cruce_andes', 'enc_cuyo');
    }
    if (nid.includes('chacabuco') && !enc.includes('enc_chacabuco')) {
      enc.push('enc_chacabuco');
    }
    if (nid.includes('maipu') && !enc.includes('enc_maipu')) {
      enc.push('enc_maipu');
    }
    if (nid.includes('guayaquil') && !enc.includes('enc_guayaquil')) {
      enc.push('enc_guayaquil');
    }

    // Save visited map coordinates
    const currentEvt = GAME_EVENTS[gameState.currentEventId];

    if (currentEvt) {
      const prevCoords = currentEvt.mapCoords;

      if (prevCoords.lat !== undefined && prevCoords.lng !== undefined) {
        setVisitedWaypoints((prev) => {
          const last = prev[prev.length - 1];

          if (
            last &&
            last.lat === prevCoords.lat &&
            last.lng === prevCoords.lng
          ) {
            return prev;
          }

          return [...prev, prevCoords];
        });
      }
    }

    setGameState((prev: GameState) => ({
      ...prev,
      stats: updatedStats,
      poderDeGobierno: newPoder,
      history: [...prev.history, option.id],
      characterAffinities: updatedAffinities,
      unlockedAchievements: achs,
      unlockedEncyclopedia: enc,
    }));

    if (option.battleMinigameConfig) {
      setActiveBattleConfig(option.battleMinigameConfig);
      setView('battle');
    } else {
      setView('transition');
    }
  };

  const handleFinishBattle = (result: MinigameResult) => {
    const { updatedStats, appliedDeltas } = applyBalancedStatDelta(
      gameState.stats,
      result.statDeltas
    );

    const newPoder = calculatePoderDeGobierno(updatedStats);

    setRecentDeltas(appliedDeltas);

    setGameState((prev: GameState) => ({
      ...prev,
      stats: updatedStats,
      poderDeGobierno: newPoder,
    }));

    setView('transition');
  };

  const handleTransitionContinue = () => {
    if (!currentOption) return;

    const newYear = gameState.year + currentOption.yearsPassed;
    const newAge = gameState.age + currentOption.yearsPassed;
    const nextEvtId = currentOption.nextEventId;
    const nextEvt = GAME_EVENTS[nextEvtId];

    if (
      nextEvtId === 'END_CALCULATED' ||
      nextEvtId.startsWith('END_') ||
      newYear >= 1850
    ) {
      const matchedEnding =
        GAME_ENDINGS.find((e) =>
          e.condition(
            gameState.stats,
            gameState.history,
            gameState.poderDeGobierno
          )
        ) ?? GAME_ENDINGS[0];

      setGameState((prev: GameState) => ({
        ...prev,
        isGameOver: true,
        currentEndingId: matchedEnding.id,
        year: 1850,
        age: 72,
        location: 'Boulogne-sur-Mer, Francia',
      }));

      setView('ending');
      return;
    }

    if (nextEvt) {
      setGameState((prev: GameState) => ({
        ...prev,
        currentEventId: nextEvtId,
        year: nextEvt.year || newYear,
        age: nextEvt.age || newAge,
        location: nextEvt.location,
      }));

      setView('event');
    } else {
      const matchedEnding =
        GAME_ENDINGS.find((e) =>
          e.condition(
            gameState.stats,
            gameState.history,
            gameState.poderDeGobierno
          )
        ) ?? GAME_ENDINGS[0];

      setGameState((prev: GameState) => ({
        ...prev,
        isGameOver: true,
        currentEndingId: matchedEnding.id,
        year: 1850,
        age: 72,
        location: 'Boulogne-sur-Mer, Francia',
      }));

      setView('ending');
    }
  };

  const handleResetData = () => {
    clearGameState();

    const resetState: GameState = {
      stats: { ...INITIAL_STATS },
      poderDeGobierno: calculatePoderDeGobierno(INITIAL_STATS),
      currentEventId: 'evt_yapeyu_1778',
      year: 1778,
      age: 5,
      location: 'Yapeyú, Misiones',
      history: [],
      characterAffinities: {},
      unlockedAchievements: [],
      unlockedEncyclopedia: ['enc_san_martin', 'enc_yapeyu'],
      soundEnabled: true,
      textSpeed: 'normal',
      isGameOver: false,
      hasSavedGame: false,
    };

    setGameState(resetState);
    setActiveModal(null);
    setView('menu');
  };

  /* ─── Resolved references ─── */
  const currentEvent =
    GAME_EVENTS[gameState.currentEventId] ??
    GAME_EVENTS['evt_yapeyu_1778'];

  const currentEnding =
    GAME_ENDINGS.find((e) => e.id === gameState.currentEndingId) ??
    GAME_ENDINGS[0];

  /* ─────────────────────────────
  RENDER
  ───────────────────────────── */
  return (
    <main className="min-h-screen flex flex-col bg-fondo-patrio text-texto-patrio font-merriweather">
      {/* MAIN MENU */}
      {view === 'menu' && (
        <MainMenu
          hasSavedGame={gameState.hasSavedGame}
          onNewGame={handleStartNewGame}
          onContinueGame={handleContinueGame}
          onOpenAchievements={() => setActiveModal('achievements')}
          onOpenEncyclopedia={() => setActiveModal('encyclopedia')}
          onOpenSettings={() => setActiveModal('settings')}
        />
      )}

      {/* ACTIVE GAME */}
      {view !== 'menu' && (
        <div className="flex-1 flex flex-col">
          <HeaderStatsBar
            stats={gameState.stats}
            poderDeGobierno={gameState.poderDeGobierno}
            year={gameState.year}
            age={gameState.age}
            location={gameState.location}
            recentDeltas={recentDeltas}
            onOpenCharacters={() => setActiveModal('characters')}
            onOpenAchievements={() => setActiveModal('achievements')}
            onOpenEncyclopedia={() => setActiveModal('encyclopedia')}
            onOpenSettings={() => setActiveModal('settings')}
            onGoToMenu={() => setView('menu')}
          />

          <div className="flex-1 py-4 px-3 sm:px-6 max-w-5xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {/* EVENT VIEW */}
              {view === 'event' && currentEvent && (
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <LeafletMapClient
                    location={gameState.location}
                    coords={currentEvent.mapCoords}
                    visitedWaypoints={visitedWaypoints}
                  />

                  <EventCard
                    event={currentEvent}
                    playerStats={gameState.stats}
                    onSelectOption={handleSelectOption}
                  />
                </motion.div>
              )}

              {/* BATTLE VIEW */}
              {view === 'battle' && activeBattleConfig && (
                <motion.div
                  key="battle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <BattleManager
                    config={activeBattleConfig}
                    playerStats={gameState.stats}
                    onFinishBattle={handleFinishBattle}
                  />
                </motion.div>
              )}

              {/* TRANSITION VIEW */}
              {view === 'transition' && currentOption && (
                <TransitionScreen
                  key="transition"
                  chosenOption={currentOption}
                  currentYear={gameState.year}
                  currentLocation={gameState.location}
                  visitedWaypoints={visitedWaypoints}
                  onContinue={handleTransitionContinue}
                />
              )}

              {/* ENDING VIEW */}
              {view === 'ending' && (
                <EndingScreen
                  key="ending"
                  ending={currentEnding}
                  finalStats={gameState.stats}
                  poderDeGobierno={gameState.poderDeGobierno}
                  unlockedAchievementsCount={
                    gameState.unlockedAchievements.length
                  }
                  onPlayAgain={handleStartNewGame}
                />
              )}
            </AnimatePresence>
          </div>

          {/* MODALS */}
          <AnimatePresence>
            {activeModal === 'encyclopedia' && (
              <EncyclopediaModal
                unlockedIds={gameState.unlockedEncyclopedia}
                onClose={() => setActiveModal(null)}
              />
            )}
            {activeModal === 'achievements' && (
              <AchievementsModal
                unlockedIds={gameState.unlockedAchievements}
                onClose={() => setActiveModal(null)}
              />
            )}
            {activeModal === 'settings' && (
              <SettingsModal
                soundEnabled={gameState.soundEnabled}
                onToggleSound={(val) =>
                  setGameState((prev) => ({ ...prev, soundEnabled: val }))
                }
                onResetData={handleResetData}
                onClose={() => setActiveModal(null)}
              />
            )}
            {activeModal === 'characters' && (
              <CharacterAffinityModal
                affinities={gameState.characterAffinities}
                onClose={() => setActiveModal(null)}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}