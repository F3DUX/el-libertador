'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Shield, Zap, ArrowLeft, ArrowRight } from 'lucide-react';

interface CargaCaballeriaProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

interface Obstacle {
  id: number;
  lane: 0 | 1 | 2; // 0: Left, 1: Center, 2: Right
  y: number; // 0 (top) to 100 (bottom)
  type: '🪨' | '🌲' | '💣' | '🛒';
  speed: number;
}

export const CargaCaballeria: React.FC<CargaCaballeriaProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [lane, setLane] = useState<0 | 1 | 2>(1); // Start in center lane
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [hp, setHp] = useState<number>(3);
  const [distance, setDistance] = useState<number>(0); // 0 to 100%
  const [dodgedCount, setDodgedCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const caballeriaLevel = playerStats.caballeria ?? 50;
  const experienciaLevel = playerStats.experiencia ?? 40;

  // Extra HP if high experience
  const maxHp = experienciaLevel >= 65 ? 4 : 3;

  const moveLeft = useCallback(() => {
    if (isFinished) return;
    setLane((prev) => (prev > 0 ? (prev - 1) as 0 | 1 | 2 : prev));
    audioEngine.playHorseSound();
  }, [isFinished]);

  const moveRight = useCallback(() => {
    if (isFinished) return;
    setLane((prev) => (prev < 2 ? (prev + 1) as 0 | 1 | 2 : prev));
    audioEngine.playHorseSound();
  }, [isFinished]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight]);

  // Game Loop
  useEffect(() => {
    if (isFinished) return;

    let obstacleId = 0;
    const types: Array<'🪨' | '🌲' | '💣' | '🛒'> = ['🪨', '🌲', '💣', '🛒'];

    // Spawn obstacles periodically
    const spawnInterval = setInterval(() => {
      const randomLane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
      const randomType = types[Math.floor(Math.random() * types.length)];
      obstacleId++;

      setObstacles((prev) => [
        ...prev,
        {
          id: obstacleId,
          lane: randomLane,
          y: 0,
          type: randomType,
          speed: 2.8 + Math.random() * 1.2,
        },
      ]);
    }, 900);

    // Update positions and check collisions
    const tickInterval = setInterval(() => {
      setDistance((prev) => {
        const nextDist = prev + 1.2;
        if (nextDist >= 100) {
          setIsFinished(true);
        }
        return Math.min(100, nextDist);
      });

      setObstacles((prev) => {
        const nextObstacles: Obstacle[] = [];

        for (const obs of prev) {
          const nextY = obs.y + obs.speed;

          // Collision detection near player (y between 78 and 92 in same lane)
          if (nextY >= 78 && nextY <= 92 && obs.lane === lane) {
            audioEngine.playCannonSound();
            setHp((curHp) => {
              const newHp = curHp - 1;
              if (newHp <= 0) {
                setIsFinished(true);
              }
              return newHp;
            });
            // Obstacle breaks on collision
            continue;
          }

          if (nextY >= 100) {
            setDodgedCount((cnt) => cnt + 1);
          } else {
            nextObstacles.push({ ...obs, y: nextY });
          }
        }

        return nextObstacles;
      });
    }, 40);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(tickInterval);
    };
  }, [lane, isFinished]);

  // Completion evaluation
  useEffect(() => {
    if (!isFinished) return;

    const isVictory = hp > 0 && distance >= 100;
    const score = Math.min(100, Math.round((dodgedCount * 12) + (hp * 20)));

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playBugleCharge();
      narrative = `¡Carga de caballería arrolladora! Los Granaderos rompieron las líneas enemigas con ímpetu invencible.`;
      statDeltas = { caballeria: 3, prestigio: 2, experiencia: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `La carga sufrió severas pérdidas ante el nutrido fuego de artillería enemiga.`;
      statDeltas = { caballeria: -2, salud: -2, prestigio: -2 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡CARGA VICTORIOSA!' : 'CARGA INTERRUMPIDA',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [isFinished, hp, distance, dodgedCount, onComplete]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-3 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Top Bar: Charge Distance & HP */}
      <div className="w-full flex items-center justify-between bg-white/10 px-4 py-2 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-red-400" />
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">SALUD DE FORMACIÓN:</span>
          <div className="flex gap-1 ml-1">
            {Array.from({ length: maxHp }).map((_, i) => (
              <span key={i} className={`text-sm ${i < hp ? 'opacity-100' : 'opacity-20'}`}>
                ❤️
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-dorado-brillante" />
          <div className="w-24 bg-black/50 h-3 rounded-full overflow-hidden border border-dorado-sol/40">
            <div
              className="bg-gradient-to-r from-celeste-patrio to-dorado-brillante h-full transition-all duration-100"
              style={{ width: `${distance}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3-Lane Track Screen */}
      <div className="relative w-full h-[320px] bg-gradient-to-b from-emerald-950 via-green-900 to-amber-950 rounded-2xl overflow-hidden border-2 border-dorado-sol/40 shadow-inner flex">
        {/* Lane dividing lines */}
        <div className="w-1/3 h-full border-r border-dashed border-white/20 relative" />
        <div className="w-1/3 h-full border-r border-dashed border-white/20 relative" />
        <div className="w-1/3 h-full relative" />

        {/* Incoming Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute transition-all duration-75 text-3xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md"
            style={{
              left: `${(obs.lane * 33.33) + 16.66}%`,
              top: `${obs.y}%`,
            }}
          >
            {obs.type}
          </div>
        ))}

        {/* Player Trooper (Granadero) */}
        <motion.div
          animate={{ left: `${(lane * 33.33) + 16.66}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute bottom-4 -translate-x-1/2 text-4xl flex flex-col items-center pointer-events-none drop-shadow-lg z-10"
        >
          <span className="animate-bounce">🐎</span>
          <span className="text-[9px] font-cinzel font-bold text-dorado-brillante bg-black/60 px-1.5 py-0.5 rounded border border-dorado-sol/50 -mt-1">
            GRANADEROS
          </span>
        </motion.div>

        {/* Track direction indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 text-dorado-sol text-[10px] font-cinzel px-3 py-0.5 rounded-full border border-dorado-sol/30">
          ¡Carga a la Victoria! ({dodgedCount} esquivados)
        </div>
      </div>

      {/* Touch Control Buttons */}
      <div className="w-full grid grid-cols-2 gap-3 pt-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={moveLeft}
          className="flex items-center justify-center gap-2 py-3 bg-azul-profundo hover:bg-azul-marino border-2 border-celeste-patrio rounded-xl text-blanco-patrio font-cinzel font-bold text-sm shadow-gold"
        >
          <ArrowLeft className="w-5 h-5 text-dorado-sol" />
          <span>IZQUIERDA [A]</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={moveRight}
          className="flex items-center justify-center gap-2 py-3 bg-azul-profundo hover:bg-azul-marino border-2 border-celeste-patrio rounded-xl text-blanco-patrio font-cinzel font-bold text-sm shadow-gold"
        >
          <span>DERECHA [D]</span>
          <ArrowRight className="w-5 h-5 text-dorado-sol" />
        </motion.button>
      </div>
    </div>
  );
};
