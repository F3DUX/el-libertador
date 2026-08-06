'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Swords, Zap, CheckCircle2, XCircle } from 'lucide-react';

interface ReflejosMandoProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

interface CommandQTE {
  id: number;
  label: string; // e.g. "¡CARGAR DE FRENTE!"
  keyReq: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE';
  keyName: string; // "⬆️ ARRIBA", "⚔️ CARGA", etc.
}

const COMMAND_SEQUENCE: CommandQTE[] = [
  { id: 1, label: '¡CARGAR CON GRANADEROS!', keyReq: 'FIRE', keyName: '⚔️ CARGAR' },
  { id: 2, label: '¡FLANQUEAR POR LA DERECHA!', keyReq: 'RIGHT', keyName: '➡️ DERECHA' },
  { id: 3, label: '¡FUEGO DE ARTILLERÍA!', keyReq: 'UP', keyName: '⬆️ FUEGO' },
  { id: 4, label: '¡DESPLIEGUE EN TENAZA!', keyReq: 'LEFT', keyName: '⬅️ IZQUIERDA' },
  { id: 5, label: '¡CONTRAATAQUE FINAL!', keyReq: 'FIRE', keyName: '⚔️ CARGAR' },
];

export const ReflejosMando: React.FC<ReflejosMandoProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [qteTimer, setQteTimer] = useState<number>(100); // 100% down to 0%
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<'HIT' | 'MISS' | null>(null);

  const liderazgoLevel = playerStats.liderazgo ?? 50;

  // QTE time window: 2.2s for normal, 2.6s if high leadership
  const timeWindowMs = liderazgoLevel >= 65 ? 2600 : 2000;

  const advanceQTE = useCallback((success: boolean) => {
    if (isFinished) return;

    if (success) {
      audioEngine.playSwordSound();
      setHits((h) => h + 1);
      setLastFeedback('HIT');
    } else {
      audioEngine.playCannonSound();
      setMisses((m) => m + 1);
      setLastFeedback('MISS');
    }

    setQteTimer(100);

    if (currentIdx < COMMAND_SEQUENCE.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIdx, isFinished]);

  // Timer loop for active QTE item
  useEffect(() => {
    if (isFinished) return;

    const intervalMs = 40;
    const decrement = (intervalMs / timeWindowMs) * 100;

    const timer = setInterval(() => {
      setQteTimer((prev) => {
        if (prev <= decrement) {
          clearInterval(timer);
          advanceQTE(false); // Time out counts as miss
          return 0;
        }
        return prev - decrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [currentIdx, timeWindowMs, isFinished, advanceQTE]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      const curCmd = COMMAND_SEQUENCE[currentIdx];
      let triggeredKey: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FIRE' | null = null;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') triggeredKey = 'UP';
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') triggeredKey = 'DOWN';
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') triggeredKey = 'LEFT';
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') triggeredKey = 'RIGHT';
      if (e.key === ' ' || e.key === 'Enter') triggeredKey = 'FIRE';

      if (triggeredKey) {
        advanceQTE(triggeredKey === curCmd.keyReq);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, isFinished, advanceQTE]);

  // Final evaluation
  useEffect(() => {
    if (!isFinished) return;

    const isVictory = hits >= 3;
    const score = Math.round((hits / COMMAND_SEQUENCE.length) * 100);

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playTriumphFanfare();
      narrative = `¡Voz de mando relámpago! Tus órdenes decisivas infundieron valor supremo en las tropas y aplastaron las líneas enemigas.`;
      statDeltas = { liderazgo: 3, prestigio: 2, experiencia: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `Vacilación en el mando: las órdenes tardías causaron confusión en la carga patriota.`;
      statDeltas = { liderazgo: -2, caballeria: -2, prestigio: -1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡ÓRDENES DECISIVAS!' : 'DUDAS EN EL MANDO',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [isFinished, hits, onComplete]);

  const currentCmd = COMMAND_SEQUENCE[currentIdx];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-dorado-brillante" />
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">
            ÓRDENES DE MANDO EN VIVO
          </span>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
          ÓRDEN {currentIdx + 1} DE {COMMAND_SEQUENCE.length}
        </div>
      </div>

      {/* QTE Active Display Box */}
      <div className="w-full h-48 bg-gradient-to-b from-black/80 to-azul-profundo/80 rounded-2xl border-2 border-dorado-sol p-4 relative flex flex-col items-center justify-center gap-3 overflow-hidden shadow-inner">
        {/* Progress Ring / Bar */}
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-dorado-sol/40">
          <div
            className={`h-full transition-all duration-75 ${
              qteTimer > 40 ? 'bg-dorado-brillante' : 'bg-red-500'
            }`}
            style={{ width: `${qteTimer}%` }}
          />
        </div>

        {/* Command Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCmd.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="text-center space-y-1"
          >
            <div className="text-xl sm:text-2xl font-cinzel font-black text-dorado-brillante tracking-widest drop-shadow-md">
              {currentCmd.label}
            </div>
            <div className="text-xs font-merriweather text-celeste-patrio">
              ¡Ejecuta la orden antes que expire la barra!
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feedback animation */}
        {lastFeedback && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-2 right-4 text-xs font-cinzel font-bold"
          >
            {lastFeedback === 'HIT' ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> ¡ACIERTO!
              </span>
            ) : (
              <span className="text-red-400 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> ¡ERROR!
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* Command Trigger Buttons Palette */}
      <div className="w-full grid grid-cols-3 gap-2 pt-1">
        {[
          { keyReq: 'LEFT', label: '⬅️ IZQUIERDA' },
          { keyReq: 'UP', label: '⬆️ FUEGO' },
          { keyReq: 'RIGHT', label: '➡️ DERECHA' },
          { keyReq: 'FIRE', label: '⚔️ CARGAR' },
          { keyReq: 'DOWN', label: '⬇️ ABAJO' },
        ].map((btn, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => advanceQTE(btn.keyReq === currentCmd.keyReq)}
            className={`py-3 px-2 rounded-xl font-cinzel font-bold text-xs border-2 shadow-gold transition-all ${
              btn.keyReq === currentCmd.keyReq
                ? 'bg-dorado-sol text-azul-profundo border-white animate-pulse'
                : 'bg-azul-profundo hover:bg-azul-marino text-blanco-patrio border-celeste-patrio/50'
            }`}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
