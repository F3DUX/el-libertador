'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Package, Clock, Mountain, AlertCircle } from 'lucide-react';

interface LogisticaCruceProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

interface SupplyItem {
  id: string;
  name: string;
  icon: string;
  weight: number;
  allocated: boolean;
}

interface MountainColumn {
  id: string;
  name: string;
  pass: string;
  reqSupplyId: string;
  suppliedItem: SupplyItem | null;
}

export const LogisticaCruce: React.FC<LogisticaCruceProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [columns, setColumns] = useState<MountainColumn[]>([
    { id: 'patos',      name: 'Paso Los Patos (San Martín)',  pass: '4.500m altitud', reqSupplyId: 'abrigo',   suppliedItem: null },
    { id: 'uspallata',  name: 'Paso Uspallata (Las Heras)',   pass: 'Artillería',      reqSupplyId: 'mulas',    suppliedItem: null },
    { id: 'guayama',    name: 'Paso Guayama (Vanguardia)',    pass: 'Marcha Rápida',  reqSupplyId: 'comida',   suppliedItem: null },
    { id: 'comech',     name: 'Paso Plumerillo (Hospital)',   pass: 'Enfermería',      reqSupplyId: 'medicina', suppliedItem: null },
  ]);

  const [supplies, setSupplies] = useState<SupplyItem[]>([
    { id: 'abrigo',   name: 'Mantas y Ponchos Helados', icon: '🧥', weight: 20, allocated: false },
    { id: 'mulas',    name: 'Mulas de Carga y Artillería', icon: '🐎', weight: 40, allocated: false },
    { id: 'comida',   name: 'Charqui y Galletas de Campaña', icon: '🌾', weight: 15, allocated: false },
    { id: 'medicina', name: 'Botiquín y Vino de Cuyo', icon: '💊', weight: 10, allocated: false },
  ]);

  const [selectedSupply, setSelectedSupply] = useState<SupplyItem | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Countdown timer
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

  // Handle allocation to column
  const handleAllocateToColumn = (colId: string) => {
    if (!selectedSupply || isFinished) return;

    audioEngine.playPaperSound();

    setColumns((prevCols) =>
      prevCols.map((c) => {
        if (c.id === colId) return { ...c, suppliedItem: selectedSupply };
        if (c.suppliedItem?.id === selectedSupply.id) return { ...c, suppliedItem: null };
        return c;
      })
    );

    setSupplies((prevSups) =>
      prevSups.map((s) => (s.id === selectedSupply.id ? { ...s, allocated: true } : s))
    );

    setSelectedSupply(null);
  };

  const allocatedCount = columns.filter((c) => c.suppliedItem !== null).length;

  // Final evaluation
  useEffect(() => {
    if (!isFinished) return;

    let correctMatches = 0;
    columns.forEach((c) => {
      if (c.suppliedItem?.id === c.reqSupplyId) correctMatches++;
    });

    const isVictory = correctMatches >= 3;
    const score = Math.round((correctMatches / columns.length) * 100);

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playTriumphFanfare();
      narrative = `¡Logística impecable! El Ejército de los Andes cruzó la cordillera helada con víveres, abrigo y munición en perfecto equilibrio.`;
      statDeltas = { recursos: 3, estrategia: 2, salud: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `Desabastecimiento en la alta montaña: las mulas y víveres se agotaron antes de descender a Chile.`;
      statDeltas = { recursos: -3, salud: -2, liderazgo: -1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡ABASTECIMIENTO EXITOSO!' : 'FALLO LOGÍSTICO',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [isFinished, columns, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-celeste-patrio" />
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">
            EQUIPAMIENTO DE LAS COLUMNAS ANDINAS
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs font-merriweather text-celeste-patrio">
        Asigna a cada columna de montaña el insumo crítico que necesita para sobrevivir al cruce helado.
      </div>

      {/* 4 Mountain Columns Grid */}
      <div className="w-full grid grid-cols-2 gap-3 p-3 bg-black/40 rounded-2xl border border-dorado-sol/40 shadow-inner">
        {columns.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: selectedSupply ? 1.02 : 1 }}
            onClick={() => handleAllocateToColumn(c.id)}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[105px] ${
              c.suppliedItem
                ? 'bg-celeste-patrio/20 border-dorado-sol text-blanco-patrio'
                : selectedSupply
                ? 'bg-white/10 border-dashed border-dorado-brillante/70 hover:bg-white/20'
                : 'bg-white/5 border-white/10 text-white/60'
            }`}
          >
            <div>
              <div className="text-xs font-cinzel font-bold text-dorado-brillante">{c.name}</div>
              <div className="text-[10px] font-mono text-celeste-patrio">{c.pass}</div>
            </div>

            {c.suppliedItem ? (
              <div className="flex items-center gap-2 py-1 text-xs font-bold text-white">
                <span className="text-xl">{c.suppliedItem.icon}</span>
                <span className="truncate">{c.suppliedItem.name}</span>
              </div>
            ) : (
              <div className="text-[10px] font-merriweather italic text-yellow-300/80 pt-1">
                ⏳ Pendiente de insumos
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Supplies Palette */}
      <div className="w-full flex flex-col gap-2">
        <div className="text-xs font-cinzel font-bold text-dorado-sol text-center">
          Insumos de El Plumerillo:
        </div>
        <div className="grid grid-cols-2 gap-2">
          {supplies.map((s) => {
            const isAllocated = columns.some((c) => c.suppliedItem?.id === s.id);
            const isSelected = selectedSupply?.id === s.id;

            return (
              <button
                key={s.id}
                disabled={isAllocated || isFinished}
                onClick={() => setSelectedSupply(s)}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all text-xs font-cinzel font-bold ${
                  isAllocated
                    ? 'opacity-30 border-gray-600 bg-black/40 text-gray-400'
                    : isSelected
                    ? 'bg-dorado-sol text-azul-profundo border-white shadow-gold scale-105'
                    : 'bg-azul-profundo hover:bg-azul-marino border-celeste-patrio/60 text-blanco-patrio'
                }`}
              >
                <span className="text-xl">{s.icon}</span>
                <span className="truncate text-[11px]">{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        disabled={allocatedCount < 4 || isFinished}
        onClick={() => setIsFinished(true)}
        className="w-full py-3 mt-1 bg-gradient-to-r from-dorado-sol to-yellow-500 hover:from-yellow-400 hover:to-dorado-sol text-azul-profundo font-cinzel font-bold text-sm rounded-xl shadow-gold border border-white disabled:opacity-40 transition-all"
      >
        ¡INICIAR CRUCE DE LOS ANDES! ({allocatedCount}/4)
      </button>
    </div>
  );
};
