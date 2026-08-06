'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Lock, Key, Clock, CheckCircle } from 'lucide-react';

interface MensajeCifradoProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

interface CipherChar {
  code: string; // e.g. "α", "β", "γ", "δ"
  solution: string; // e.g. "A", "T", "A", "Q"
  unlocked: boolean;
}

export const MensajeCifrado: React.FC<MensajeCifradoProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  // Target secret dispatch word: "ATAQUE", "FLANCO", "REFUER", "DESEMB"
  const secretWords = [
    { codeWord: ['⚔️', '🛡️', '⚡', '💣', '🐎', '👑'], decoded: ['A', 'T', 'A', 'Q', 'U', 'E'] },
    { codeWord: ['🛡️', '⚔️', '👑', '📜', '💣', '⚡'], decoded: ['F', 'L', 'A', 'N', 'C', 'O'] },
  ];

  const puzzle = secretWords[0];
  const [userDecoded, setUserDecoded] = useState<string[]>(Array(puzzle.decoded.length).fill('_'));
  const [selectedPos, setSelectedPos] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const experienciaLevel = playerStats.experiencia ?? 40;

  // Alphabet options for decryption keyboard
  const availableLetters = ['A', 'B', 'C', 'E', 'F', 'L', 'N', 'O', 'Q', 'R', 'T', 'U'];

  // Timer
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // Handle letter pick
  const handleSelectLetter = (letter: string) => {
    if (isFinished) return;

    audioEngine.playPaperSound();
    const nextDecoded = [...userDecoded];
    nextDecoded[selectedPos] = letter;
    setUserDecoded(nextDecoded);

    // Auto move to next empty slot
    const nextEmpty = nextDecoded.findIndex((c) => c === '_');
    if (nextEmpty !== -1) {
      setSelectedPos(nextEmpty);
    } else {
      // All filled -> finish
      setIsFinished(true);
    }
  };

  // Evaluate final score
  useEffect(() => {
    if (!isFinished) return;

    let correctMatches = 0;
    puzzle.decoded.forEach((char, idx) => {
      if (userDecoded[idx] === char) correctMatches++;
    });

    const isVictory = correctMatches === puzzle.decoded.length;
    const score = Math.round((correctMatches / puzzle.decoded.length) * 100);

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playTriumphFanfare();
      narrative = `¡Mensaje interceptado y descifrado! Conocemos de antemano el plan de ataque realista.`;
      statDeltas = { estrategia: 3, experiencia: 2, prestigio: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `No se logró descifrar el despacho a tiempo y la vanguardia enemiga atacó por sorpresa.`;
      statDeltas = { estrategia: -2, experiencia: -1, recursos: -1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡CLAVE DESCIFRADA!' : 'TIEMPO AGOTADO',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [isFinished, userDecoded, puzzle.decoded, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-dorado-brillante" />
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">
            DECODIFICADOR DE CLAVE REALISTA
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs font-merriweather text-celeste-patrio">
        Toca cada símbolo y selecciona la letra en español para descifrar el mensaje secreto enemigo.
      </div>

      {/* Intercepted Cipher Slots */}
      <div className="w-full flex justify-center gap-2 p-4 bg-black/40 rounded-2xl border border-dorado-sol/40 shadow-inner">
        {puzzle.codeWord.map((codeGlyph, idx) => {
          const isSelected = selectedPos === idx;
          const letterVal = userDecoded[idx];

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPos(idx)}
              className={`w-12 h-16 rounded-xl border-2 flex flex-col items-center justify-between p-1.5 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-dorado-sol/30 border-dorado-brillante shadow-gold scale-105'
                  : letterVal !== '_'
                  ? 'bg-celeste-patrio/20 border-celeste-patrio text-blanco-patrio'
                  : 'bg-white/5 border-white/20 text-white/40'
              }`}
            >
              <span className="text-base">{codeGlyph}</span>
              <span className="text-lg font-cinzel font-black text-dorado-brillante">
                {letterVal}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Letter Keyboard Palette */}
      <div className="w-full flex flex-col gap-2">
        <div className="text-xs font-cinzel font-bold text-dorado-sol text-center">
          Alfabeto de Solución:
        </div>
        <div className="grid grid-cols-6 gap-2">
          {availableLetters.map((l) => (
            <motion.button
              key={l}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectLetter(l)}
              className="py-2.5 bg-azul-profundo hover:bg-azul-marino border border-celeste-patrio/60 hover:border-dorado-sol rounded-xl text-center font-cinzel font-black text-sm text-blanco-patrio shadow-card transition-all"
            >
              {l}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
