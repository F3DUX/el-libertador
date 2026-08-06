'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Swords, ShieldAlert, Award } from 'lucide-react';

interface TatetiEstrategicoProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

type BoardCell = 'PATRIOTA' | 'REALISTA' | null;

export const TatetiEstrategico: React.FC<TatetiEstrategicoProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [board, setBoard] = useState<BoardCell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [enemyQuote, setEnemyQuote] = useState<string>(config.enemy.reactionQuotes.intro);
  const [winner, setWinner] = useState<'PATRIOTA' | 'REALISTA' | 'TIE' | null>(null);

  // Dynamic strategy factor: high estrategia makes minimax AI slightly more human/forgiving
  const estrategiaLevel = playerStats.estrategia ?? 50;

  // Check winner utility
  const checkWinningCombo = (b: BoardCell[]): { winner: 'PATRIOTA' | 'REALISTA' | 'TIE' | null; line?: number[] } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],           // Diagonals
    ];

    for (const l of lines) {
      const [a, bIdx, c] = l;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return { winner: b[a]!, line: l };
      }
    }

    if (b.every((cell) => cell !== null)) {
      return { winner: 'TIE' };
    }

    return { winner: null };
  };

  // Minimax algorithm for AI (Realistas)
  const minimax = useCallback((
    b: BoardCell[],
    depth: number,
    isMax: boolean,
    maxDepthLimit: number
  ): { score: number; index?: number } => {
    const check = checkWinningCombo(b);
    if (check.winner === 'REALISTA') return { score: 10 - depth };
    if (check.winner === 'PATRIOTA') return { score: depth - 10 };
    if (check.winner === 'TIE' || depth >= maxDepthLimit) return { score: 0 };

    const availables = b.map((val, idx) => (val === null ? idx : null)).filter((val): val is number => val !== null);

    if (isMax) {
      let bestScore = -Infinity;
      let bestMove = availables[0];

      for (const idx of availables) {
        b[idx] = 'REALISTA';
        const result = minimax(b, depth + 1, false, maxDepthLimit);
        b[idx] = null;
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = idx;
        }
      }
      return { score: bestScore, index: bestMove };
    } else {
      let bestScore = Infinity;
      let bestMove = availables[0];

      for (const idx of availables) {
        b[idx] = 'PATRIOTA';
        const result = minimax(b, depth + 1, true, maxDepthLimit);
        b[idx] = null;
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = idx;
        }
      }
      return { score: bestScore, index: bestMove };
    }
  }, []);

  // AI turn logic
  const handleAITurn = useCallback((currentBoard: BoardCell[]) => {
    const check = checkWinningCombo(currentBoard);
    if (check.winner) return;

    // AI Minimax depth varies: high strategy = AI has lower max depth (makes mistakes)
    const maxDepth = estrategiaLevel >= 75 ? 2 : estrategiaLevel >= 55 ? 3 : 5;

    // Small chance for random move if player has very high strategy
    const available = currentBoard.map((val, idx) => (val === null ? idx : null)).filter((val): val is number => val !== null);
    if (available.length === 0) return;

    let targetIndex: number;
    if (Math.random() < (estrategiaLevel / 200)) {
      targetIndex = available[Math.floor(Math.random() * available.length)];
    } else {
      const best = minimax([...currentBoard], 0, true, maxDepth);
      targetIndex = best.index ?? available[0];
    }

    const nextBoard = [...currentBoard];
    nextBoard[targetIndex] = 'REALISTA';
    setBoard(nextBoard);
    audioEngine.playCannonSound();

    const res = checkWinningCombo(nextBoard);
    if (res.winner) {
      setWinner(res.winner);
    } else {
      setEnemyQuote(config.enemy.reactionQuotes.taunt);
      setIsPlayerTurn(true);
    }
  }, [estrategiaLevel, minimax, config.enemy.reactionQuotes.taunt]);

  const handleCellClick = (index: number) => {
    if (board[index] !== null || !isPlayerTurn || winner) return;

    audioEngine.playSwordSound();
    const newBoard = [...board];
    newBoard[index] = 'PATRIOTA';
    setBoard(newBoard);

    const res = checkWinningCombo(newBoard);
    if (res.winner) {
      setWinner(res.winner);
      return;
    }

    setIsPlayerTurn(false);
    setTimeout(() => {
      handleAITurn(newBoard);
    }, 600);
  };

  // Finish minigame on win/loss/tie
  useEffect(() => {
    if (!winner) return;

    let isVictory = false;
    let finalScore = 50;
    let narrative = '';
    let statDeltas: Partial<PlayerStats> = {};

    if (winner === 'PATRIOTA') {
      isVictory = true;
      finalScore = 100;
      setEnemyQuote(config.enemy.reactionQuotes.defeat);
      audioEngine.playTriumphFanfare();
      narrative = `¡Brillante maniobra táctica! Has superado al ${config.enemy.name} en el campo de batalla, rompiendo sus líneas realistas.`;
      statDeltas = { prestigio: 3, experiencia: 2, liderazgo: 1 };
    } else if (winner === 'REALISTA') {
      isVictory = false;
      finalScore = 20;
      setEnemyQuote(config.enemy.reactionQuotes.victory);
      audioEngine.playDefeatSound();
      narrative = `El ${config.enemy.name} logró flanquear a las fuerzas patriotas. Las tropas sufrieron una costosa reorganización bajo fuego enemigo.`;
      statDeltas = { prestigio: -3, recursos: -2, liderazgo: -1 };
    } else {
      // Tie counts as minor tactical victory (holding ground)
      isVictory = true;
      finalScore = 65;
      audioEngine.playMarchFanfare();
      narrative = `Batalla ferozmente disputada. Mantuviste la posición e impediste el avance realista.`;
      statDeltas = { experiencia: 1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score: finalScore,
        statDeltas,
        headline: isVictory ? '¡VICTORIA TÁCTICA!' : 'REORGANIZACIÓN BAJO FUEGO',
        narrativeSummary: narrative,
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [winner, config.enemy, onComplete]);

  const winningCombo = checkWinningCombo(board);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Enemy general status header */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rojo-patrio/30 border-2 border-dorado-sol flex items-center justify-center text-2xl shadow">
            {config.enemy.portrait}
          </div>
          <div>
            <div className="text-sm font-cinzel font-bold text-dorado-brillante">
              {config.enemy.name}
            </div>
            <div className="text-[11px] font-merriweather text-celeste-patrio">
              {config.enemy.title} · {config.enemy.armyName}
            </div>
          </div>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
          {isPlayerTurn ? '⚔ TU TURNO' : '⏳ TURNO ENEMIGO'}
        </div>
      </div>

      {/* Enemy taunt quote bubble */}
      <div className="w-full bg-celeste-claro/10 border border-celeste-patrio/30 rounded-xl p-3 text-center">
        <p className="text-xs italic font-merriweather text-blanco-patrio">
          &ldquo;{enemyQuote}&rdquo;
        </p>
      </div>

      {/* 3x3 Battlefield Grid */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-black/40 rounded-2xl border border-dorado-sol/40 shadow-inner w-full max-w-[320px] aspect-square">
        {board.map((cell, idx) => {
          const isWinningCell = winningCombo.line?.includes(idx);
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: cell === null && isPlayerTurn ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCellClick(idx)}
              disabled={cell !== null || !isPlayerTurn || !!winner}
              className={`flex flex-col items-center justify-center rounded-xl font-cinzel font-black transition-all select-none relative border-2 ${
                isWinningCell
                  ? 'bg-dorado-sol/40 border-dorado-brillante shadow-gold animate-pulse'
                  : cell === 'PATRIOTA'
                  ? 'bg-celeste-patrio/30 border-celeste-patrio text-celeste-claro'
                  : cell === 'REALISTA'
                  ? 'bg-rojo-patrio/40 border-red-500 text-red-200'
                  : 'bg-white/5 border-white/10 hover:border-dorado-sol/60 hover:bg-white/10'
              }`}
            >
              {cell === 'PATRIOTA' && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl drop-shadow">⚔️</span>
                  <span className="text-[9px] font-bold text-dorado-brillante">ANDES</span>
                </motion.div>
              )}
              {cell === 'REALISTA' && (
                <motion.div
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl drop-shadow">👑</span>
                  <span className="text-[9px] font-bold text-red-300">CORONA</span>
                </motion.div>
              )}
              {cell === null && (
                <span className="text-[10px] opacity-20 font-mono text-dorado-sol">
                  {idx + 1}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend & Stats help */}
      <div className="flex items-center justify-between text-[11px] font-cinzel text-celeste-patrio/80 w-full px-2">
        <span className="flex items-center gap-1">
          <Swords className="w-3.5 h-3.5 text-dorado-sol" /> Estrategia: {estrategiaLevel}
        </span>
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Nivel de IA: {estrategiaLevel >= 70 ? 'Vulnerable' : 'Táctica'}
        </span>
      </div>
    </div>
  );
};
