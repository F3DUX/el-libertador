'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ending, PlayerStats } from '@/types/game';
import { STAT_DEFINITIONS } from '@/data/statsInfo';
import { Award, RotateCcw, Shield, BookOpen, Star } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface EndingScreenProps {
  ending: Ending;
  finalStats: PlayerStats;
  poderDeGobierno: number;
  unlockedAchievementsCount: number;
  onPlayAgain: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  ending,
  finalStats,
  poderDeGobierno,
  unlockedAchievementsCount,
  onPlayAgain,
}) => {
  const poderLabel =
    poderDeGobierno >= 80 ? '★ Inmortal' :
    poderDeGobierno >= 65 ? '⚡ Excepcional' :
    poderDeGobierno >= 50 ? '✔ Notable' :
    poderDeGobierno >= 35 ? '△ Moderado' : '✕ Limitado';

  const poderColor =
    poderDeGobierno >= 65 ? 'text-dorado-brillante' :
    poderDeGobierno >= 40 ? 'text-celeste-brillante' : 'text-rojo-patrio';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto pb-8 space-y-4"
    >
      {/* ===== HERO ENDING CARD ===== */}
      <div
        className="bg-blanco-patrio rounded-2xl overflow-hidden shadow-patrio-lg relative"
        style={{ border: '3px solid #75AADB', boxShadow: '0 0 0 1px #D4AF37, 0 20px 60px rgba(27,54,93,0.2)' }}
      >
        {/* Bandera stripe top */}
        <div className="h-2 bandera-stripe" />

        {/* ===== HEADER ===== */}
        <div className="bg-azul-profundo px-6 py-5 text-center space-y-3">
          {/* Date of death */}
          <div className="inline-flex items-center space-x-2 bg-dorado-sol/15 border border-dorado-sol/40 text-dorado-brillante font-cinzel text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow">
            <span>17 de Agosto de 1850</span>
            <span className="text-dorado-sol/50">•</span>
            <span>Boulogne-sur-Mer, Francia</span>
          </div>

          {/* Escarapela crest */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full escarapela-crest flex items-center justify-center shadow-gold">
              {/* Mini Sol de Mayo */}
              <svg viewBox="0 0 40 40" className="w-9 h-9">
                <circle cx="20" cy="20" r="7" fill="#D4AF37"/>
                <circle cx="20" cy="20" r="4" fill="#F5C518"/>
                {Array.from({ length: 16 }).map((_, i) => (
                  <g key={i} transform={`rotate(${i * 22.5} 20 20)`}>
                    {i % 2 === 0
                      ? <path d="M 20 9 L 18.5 16 L 21.5 16 Z" fill="#D4AF37" />
                      : <path d="M 20 9 Q 18 14 20 16 Q 22 14 20 9 Z" fill="#D4AF37" />
                    }
                  </g>
                ))}
                <circle cx="17.5" cy="18.5" r="0.9" fill="#1B365D" />
                <circle cx="22.5" cy="18.5" r="0.9" fill="#1B365D" />
                <path d="M 17.8 22 Q 20 24 22.2 22" stroke="#1B365D" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          </div>

          {/* Ending title */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-blanco-patrio leading-none">
              {ending.title}
            </h2>
            <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-dorado-sol to-transparent mx-auto my-2" />
            <p className="font-cormorant text-lg sm:text-2xl font-bold text-celeste-patrio italic">
              {ending.subtitle}
            </p>
          </div>

          {/* Poder de Gobierno summary */}
          <div className="inline-flex items-center space-x-3 bg-white/10 border border-celeste-patrio/30 rounded-xl px-5 py-2.5">
            <Star className="w-5 h-5 text-dorado-brillante" />
            <div className="text-left">
              <div className="text-[9px] font-cinzel font-bold text-celeste-patrio/70 uppercase tracking-wider">
                Poder de Gobierno Final
              </div>
              <div className={`text-2xl font-mono font-black ${poderColor}`}>
                {poderDeGobierno}
                <span className="text-sm text-celeste-patrio/50">/100</span>
                <span className="text-sm ml-2 font-cinzel font-bold">{poderLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== NARRATIVE ===== */}
        <div className="p-5 sm:p-8 space-y-5">
          <div className="bg-celeste-claro/80 border-l-4 border-celeste-patrio p-4 sm:p-6 rounded-r-xl shadow-inset-celeste">
            <p className="font-merriweather text-sm sm:text-[15px] text-texto-patrio leading-relaxed whitespace-pre-line">
              {ending.narrative}
            </p>
          </div>

          {/* Historical Comparison */}
          <div className="bg-fondo-suave border border-celeste-patrio/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center space-x-2 text-[11px] font-cinzel font-bold text-azul-profundo uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-dorado-sol" />
              <span>Comparación con la Historia Real:</span>
            </div>
            <p className="font-cormorant text-base sm:text-lg font-bold text-azul-profundo/80 leading-snug">
              {ending.historicalComparison}
            </p>
          </div>

          {/* ===== FINAL STATS ===== */}
          <div className="border-t border-celeste-patrio/30 pt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-[11px] font-cinzel font-bold text-azul-profundo uppercase tracking-widest">
                <Shield className="w-4 h-4 text-dorado-sol" />
                <span>Atributos Finales de San Martín</span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {Object.entries(finalStats).map(([key, val]) => {
                const def = STAT_DEFINITIONS[key as keyof PlayerStats];
                const pct = Math.max(0, Math.min(100, val));
                const color =
                  pct >= 70 ? 'bg-emerald-400' :
                  pct >= 40 ? 'bg-dorado-sol' : 'bg-rojo-patrio';
                return (
                  <div key={key} className="bg-celeste-claro border border-celeste-patrio/30 rounded-xl p-2 text-center space-y-1.5">
                    <div className="text-[9px] font-cinzel font-bold text-azul-profundo uppercase truncate">
                      {def?.label}
                    </div>
                    <div className="font-mono text-lg font-black text-azul-profundo">{val}</div>
                    <div className="w-full h-1 bg-celeste-patrio/20 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="flex items-center justify-center space-x-2 text-xs font-cinzel font-bold text-azul-profundo bg-celeste-claro/60 border border-celeste-patrio/30 rounded-xl py-3">
            <Award className="w-5 h-5 text-dorado-sol" />
            <span>Insignias de Gloria: {unlockedAchievementsCount} / 10</span>
          </div>

          {/* Replay CTA */}
          <div className="pt-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { audioEngine.playClickSound(); onPlayAgain(); }}
              className="flex items-center space-x-3 bg-azul-profundo hover:bg-azul-marino text-blanco-patrio font-cinzel font-bold text-sm sm:text-base px-8 py-4 rounded-xl border-2 border-dorado-sol transition-all min-h-[52px] shadow-gold"
              style={{ boxShadow: '0 4px 20px rgba(27,54,93,0.4), 0 0 0 1px #D4AF37' }}
            >
              <RotateCcw className="w-5 h-5 text-dorado-sol" />
              <span>Volver a Vivir la Historia de San Martín</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-2 bandera-stripe" />
      </div>
    </motion.div>
  );
};
