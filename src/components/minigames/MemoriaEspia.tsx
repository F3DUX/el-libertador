'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Eye, EyeOff, CheckCircle, HelpCircle } from 'lucide-react';

interface MemoriaEspiaProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

interface Question {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export const MemoriaEspia: React.FC<MemoriaEspiaProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'MEMORIZE' | 'RECALL' | 'FINISHED'>('MEMORIZE');
  const [memorizeTimer, setMemorizeTimer] = useState<number>(7);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const estrategiaLevel = playerStats.estrategia ?? 50;

  // Questions for enemy camp reconnaissance
  const questions: Question[] = [
    {
      prompt: '¿Dónde estaba emplazada la Artillería pesada del enemigo?',
      options: ['Colina Norte', 'Valle Sur', 'Flanco Este', 'Frente a la Laguna'],
      correctIndex: 0,
    },
    {
      prompt: '¿Qué cuerpo resguardaba la tienda del General Realista?',
      options: ['Guardia de Infantería', 'Escuadra de Caballería', 'Marinos Realistas', 'Sin resguardo'],
      correctIndex: 1,
    },
    {
      prompt: '¿En qué sector almacenaban las municiones y vituallas?',
      options: ['En el Convento', 'Detrás del Bosque Este', 'Junto al Río', 'En las Trincheras'],
      correctIndex: 1,
    },
  ];

  // Memorization countdown timer
  useEffect(() => {
    if (phase !== 'MEMORIZE') return;

    // Extra time if high estrategia
    const initialTime = estrategiaLevel >= 65 ? 9 : 7;
    setMemorizeTimer(initialTime);

    const timer = setInterval(() => {
      setMemorizeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('RECALL');
          audioEngine.playPaperSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, estrategiaLevel]);

  const handleSelectAnswer = (optIdx: number) => {
    if (phase !== 'RECALL') return;

    audioEngine.playClickSound();
    const nextAnswers = [...answers, optIdx];
    setAnswers(nextAnswers);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setPhase('FINISHED');
    }
  };

  // Evaluate final result
  useEffect(() => {
    if (phase !== 'FINISHED') return;

    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correctIndex) correctCount++;
    });

    const isVictory = correctCount >= 2;
    const score = Math.round((correctCount / questions.length) * 100);

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playTriumphFanfare();
      narrative = `¡Información de inteligencia exacta! Gracias a los datos de tus espías, descubriste las vulnerabilidades realistas antes del primer disparo.`;
      statDeltas = { estrategia: 3, experiencia: 2, prestigio: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `Los informes de espionaje fueron imprecisos y el ejército cayó en una emboscada defensiva enemigo.`;
      statDeltas = { estrategia: -2, experiencia: -1, salud: -1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡INFORMACIÓN PRECIOSA!' : 'FALLO DE INTELIGENCIA',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [phase, answers, questions, onComplete]);

  const curQ = questions[currentQuestionIdx];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-2">
          {phase === 'MEMORIZE' ? (
            <Eye className="w-4 h-4 text-dorado-brillante animate-pulse" />
          ) : (
            <EyeOff className="w-4 h-4 text-red-400" />
          )}
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">
            RECONOCIMIENTO DE ESPIONAJE
          </span>
        </div>
        {phase === 'MEMORIZE' && (
          <div className="text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
            ⏳ MEMORIZA: {memorizeTimer}s
          </div>
        )}
      </div>

      {/* PHASE 1: MEMORIZE MAP */}
      {phase === 'MEMORIZE' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full flex flex-col items-center gap-3"
        >
          <div className="text-xs font-merriweather text-celeste-patrio text-center">
            Observa atentamente el mapa del campamento enemigo antes de que la niebla de guerra lo cubra.
          </div>

          <div className="w-full h-56 bg-gradient-to-b from-amber-950 via-yellow-900 to-amber-900 rounded-2xl border-2 border-dorado-sol p-4 relative shadow-inner grid grid-cols-2 grid-rows-2 gap-2">
            {/* North Sector */}
            <div className="bg-black/40 rounded-xl p-2 border border-dorado-sol/30 flex flex-col items-center justify-center text-center">
              <span className="text-2xl">💣💣</span>
              <span className="text-[10px] font-cinzel font-bold text-dorado-brillante">
                COLINA NORTE: Artillería Pesada
              </span>
            </div>

            {/* East Sector */}
            <div className="bg-black/40 rounded-xl p-2 border border-dorado-sol/30 flex flex-col items-center justify-center text-center">
              <span className="text-2xl">📦🪵</span>
              <span className="text-[10px] font-cinzel font-bold text-dorado-brillante">
                BOSQUE ESTE: Depósito de Suministros
              </span>
            </div>

            {/* South Sector */}
            <div className="bg-black/40 rounded-xl p-2 border border-dorado-sol/30 flex flex-col items-center justify-center text-center">
              <span className="text-2xl">🎪👑</span>
              <span className="text-[10px] font-cinzel font-bold text-dorado-brillante">
                TIENDA GENERAL: Caballería de Guardia
              </span>
            </div>

            {/* West Sector */}
            <div className="bg-black/40 rounded-xl p-2 border border-dorado-sol/30 flex flex-col items-center justify-center text-center">
              <span className="text-2xl">🤺🤺</span>
              <span className="text-[10px] font-cinzel font-bold text-dorado-brillante">
                VALLE OESTE: Infantería Realista
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 2: RECALL QUESTIONS */}
      {phase === 'RECALL' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col gap-3"
        >
          <div className="flex items-center justify-between text-xs font-cinzel text-dorado-sol px-1">
            <span>PREGUNTA {currentQuestionIdx + 1} DE {questions.length}</span>
            <span>Niebla de Guerra Activa 🌫️</span>
          </div>

          <div className="p-4 bg-white/10 rounded-xl border border-dorado-sol/40 text-sm font-merriweather text-blanco-patrio leading-relaxed">
            {curQ.prompt}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {curQ.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleSelectAnswer(oIdx)}
                className="p-3 bg-azul-profundo hover:bg-azul-marino border border-celeste-patrio/60 hover:border-dorado-sol rounded-xl text-left font-cinzel font-bold text-xs text-blanco-patrio transition-all flex items-center justify-between shadow-card"
              >
                <span>{opt}</span>
                <HelpCircle className="w-4 h-4 text-dorado-sol/60" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
