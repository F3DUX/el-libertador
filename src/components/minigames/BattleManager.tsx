'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats, StatKey } from '@/types/game';
import { STAT_DEFINITIONS } from '@/data/statsInfo';
import { audioEngine } from '@/utils/audio';

import { TatetiEstrategico } from './TatetiEstrategico';
import { CargaCaballeria } from './CargaCaballeria';
import { OrganizarEjercito } from './OrganizarEjercito';
import { MemoriaEspia } from './MemoriaEspia';
import { MensajeCifrado } from './MensajeCifrado';
import { LogisticaCruce } from './LogisticaCruce';
import { ReflejosMando } from './ReflejosMando';

import { Swords, ShieldAlert, Award, ArrowRight, TrendingUp, TrendingDown, Clock, MapPin, Calendar } from 'lucide-react';

interface BattleManagerProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onFinishBattle: (result: MinigameResult) => void;
}

export const BattleManager: React.FC<BattleManagerProps> = ({
  config,
  playerStats,
  onFinishBattle,
}) => {
  const [stage, setStage] = useState<'CINEMATIC_INTRO' | 'PLAYING' | 'RESULT'>('CINEMATIC_INTRO');
  const [battleResult, setBattleResult] = useState<MinigameResult | null>(null);

  // Play intro drums when entering battle cinematic
  useEffect(() => {
    audioEngine.playWarDrumSound();
  }, []);

  const handleStartMinigame = () => {
    audioEngine.playBugleCharge();
    setStage('PLAYING');
  };

  const handleMinigameComplete = (result: MinigameResult) => {
    setBattleResult(result);
    setStage('RESULT');
  };

  const handleContinueStory = () => {
    if (battleResult) {
      audioEngine.playClickSound();
      onFinishBattle(battleResult);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden rounded-2xl border-2 border-dorado-sol shadow-2xl bg-black">
      <AnimatePresence mode="wait">
        {/* =========================================================
            STAGE 1: CINEMATIC INTRO
        ========================================================= */}
        {stage === 'CINEMATIC_INTRO' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full p-6 sm:p-10 flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-black via-azul-profundo to-black text-blanco-patrio"
          >
            {/* Top Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-dorado-sol/20 border border-dorado-sol text-dorado-brillante text-xs font-cinzel font-bold tracking-widest uppercase">
              <Swords className="w-4 h-4" /> Batalla Histórica Decisiva
            </div>

            {/* Battle Title & Metadata */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-dorado-brillante drop-shadow-lg">
                {config.battleTitle}
              </h1>
              <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-cinzel text-celeste-patrio">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rojo-patrio" /> {config.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-dorado-sol" /> {config.year}
                </span>
              </div>
            </div>

            {/* Enemy General Card */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-dorado-sol/40 p-4 flex items-center gap-4 text-left shadow-gold">
              <div className="w-16 h-16 rounded-full bg-rojo-patrio/40 border-2 border-dorado-sol flex items-center justify-center text-3xl flex-shrink-0">
                {config.enemy.portrait}
              </div>
              <div>
                <div className="text-xs font-cinzel text-red-300 font-bold uppercase tracking-wider">
                  ENEMIGO DE LA CORONA
                </div>
                <div className="text-base font-cinzel font-bold text-blanco-patrio">
                  {config.enemy.name}
                </div>
                <div className="text-xs font-merriweather text-celeste-patrio">
                  {config.enemy.title} · {config.enemy.armyName}
                </div>
              </div>
            </div>

            {/* Historical Context & Objective */}
            <div className="w-full max-w-xl space-y-3 bg-black/50 p-4 rounded-xl border border-white/10 text-left">
              <div>
                <span className="text-[10px] font-cinzel font-bold text-dorado-sol uppercase tracking-widest block mb-1">
                  Contexto Histórico:
                </span>
                <p className="text-xs font-merriweather text-white/90 leading-relaxed">
                  {config.historicalContext}
                </p>
              </div>

              <div className="border-t border-white/10 pt-2">
                <span className="text-[10px] font-cinzel font-bold text-celeste-patrio uppercase tracking-widest block mb-1">
                  Objetivo Táctico:
                </span>
                <p className="text-xs font-cinzel font-bold text-yellow-300">
                  🎯 {config.objectiveText}
                </p>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartMinigame}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-dorado-sol to-yellow-500 hover:from-yellow-400 hover:to-dorado-sol text-azul-profundo font-cinzel font-black text-base sm:text-lg rounded-xl shadow-gold border-2 border-white transition-all cursor-pointer"
            >
              <span>¡ENTRAR EN COMBATE!</span>
              <Swords className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* =========================================================
            STAGE 2: ACTIVE MINIGAME
        ========================================================= */}
        {stage === 'PLAYING' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full p-4 flex justify-center items-center bg-azul-profundo/90"
          >
            {config.id === 'tateti' && (
              <TatetiEstrategico
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'carga_caballeria' && (
              <CargaCaballeria
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'organizar_ejercito' && (
              <OrganizarEjercito
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'memoria_espia' && (
              <MemoriaEspia
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'mensaje_cifrado' && (
              <MensajeCifrado
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'logistica_cruce' && (
              <LogisticaCruce
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
            {config.id === 'reflejos_mando' && (
              <ReflejosMando
                config={config}
                playerStats={playerStats}
                onComplete={handleMinigameComplete}
              />
            )}
          </motion.div>
        )}

        {/* =========================================================
            STAGE 3: OUTRO & CONSEQUENCES RESULT
        ========================================================= */}
        {stage === 'RESULT' && battleResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full p-6 sm:p-10 flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-black via-azul-profundo to-black text-blanco-patrio"
          >
            {/* Victory or Reorganization Banner */}
            <div className="space-y-1">
              <div
                className={`text-3xl sm:text-5xl font-cinzel font-black tracking-widest drop-shadow-md ${
                  battleResult.victory ? 'text-dorado-brillante' : 'text-red-400'
                }`}
              >
                {battleResult.headline}
              </div>
              <div className="text-xs font-cinzel font-bold text-celeste-patrio tracking-widest uppercase">
                {config.battleTitle} · {config.year}
              </div>
            </div>

            {/* Narrative summary */}
            <div className="w-full max-w-xl bg-white/10 p-5 rounded-2xl border border-dorado-sol/30 text-xs sm:text-sm font-merriweather text-white/90 leading-relaxed shadow-inner">
              {battleResult.narrativeSummary}
            </div>

            {/* Stat Consequences Grid */}
            <div className="w-full max-w-xl space-y-2 text-left bg-black/40 p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-cinzel font-bold text-dorado-sol uppercase tracking-widest">
                Consecuencias en el Ejército y la Campaña:
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.entries(battleResult.statDeltas).map(([key, val]) => {
                  const def = STAT_DEFINITIONS[key as StatKey];
                  const isPos = (val ?? 0) > 0;
                  return (
                    <span
                      key={key}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono font-bold ${
                        isPos
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                          : 'bg-red-950/80 text-red-300 border-red-500/50'
                      }`}
                    >
                      {isPos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{isPos ? `+${val}` : val}</span>
                      <span className="font-cinzel text-[11px] font-bold text-white">{def?.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinueStory}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-dorado-sol to-yellow-500 hover:from-yellow-400 hover:to-dorado-sol text-azul-profundo font-cinzel font-black text-base sm:text-lg rounded-xl shadow-gold border-2 border-white transition-all cursor-pointer"
            >
              <span>CONTINUAR LA CAMPAÑA</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
