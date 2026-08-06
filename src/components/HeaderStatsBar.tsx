'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerStats, StatKey } from '@/types/game';
import { STAT_DEFINITIONS } from '@/data/statsInfo';
import { getStatRank } from '@/utils/statBalance';
import {
  Heart,
  Swords,
  Brain,
  Star,
  Flag,
  Users,
  Coins,
  Scroll,
  Calendar,
  User,
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Settings,
} from 'lucide-react';

interface HeaderStatsBarProps {
  stats: PlayerStats;
  poderDeGobierno: number;
  year: number;
  age: number;
  location: string;
  recentDeltas?: Array<{ stat: StatKey; value: number }>;
  onOpenCharacters?: () => void;
  onOpenAchievements?: () => void;
  onOpenEncyclopedia?: () => void;
  onOpenSettings?: () => void;
  onGoToMenu?: () => void;
}

const STAT_ICON_MAP: Record<StatKey, React.ReactNode> = {
  salud:       <Heart   className="w-3 h-3 text-red-400" />,
  liderazgo:   <Swords  className="w-3 h-3 text-dorado-brillante" />,
  estrategia:  <Brain   className="w-3 h-3 text-celeste-patrio" />,
  prestigio:   <Star    className="w-3 h-3 text-dorado-sol" />,
  patriotismo: <Flag    className="w-3 h-3 text-celeste-brillante" />,
  relaciones:  <Users   className="w-3 h-3 text-emerald-400" />,
  recursos:    <Coins   className="w-3 h-3 text-yellow-300" />,
  caballeria:  <span className="text-[10px]">🐎</span>,
  experiencia: <Scroll  className="w-3 h-3 text-sky-300" />,
};

const STAT_PROGRESS_COLOR: Record<StatKey, string> = {
  salud:       'bg-red-400',
  liderazgo:   'bg-dorado-brillante',
  estrategia:  'bg-celeste-patrio',
  prestigio:   'bg-dorado-sol',
  patriotismo: 'bg-celeste-brillante',
  relaciones:  'bg-emerald-400',
  recursos:    'bg-yellow-300',
  caballeria:  'bg-amber-500',
  experiencia: 'bg-sky-300',
};

function getStatColor(value: number): string {
  if (value >= 70) return 'text-emerald-400';
  if (value >= 40) return 'text-dorado-brillante';
  return 'text-red-400';
}

export const HeaderStatsBar: React.FC<HeaderStatsBarProps> = ({
  stats,
  poderDeGobierno,
  year,
  age,
  location,
  recentDeltas = [],
  onOpenCharacters,
  onOpenAchievements,
  onOpenEncyclopedia,
  onOpenSettings,
  onGoToMenu,
}) => {
  const [isMobileStatsExpanded, setIsMobileStatsExpanded] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<StatKey | null>(null);

  const startYear = 1778;
  const endYear   = 1850;
  const pct = Math.round(((Math.min(endYear, Math.max(startYear, year)) - startYear) / (endYear - startYear)) * 100);

  const poderColor = poderDeGobierno >= 65
    ? 'text-emerald-400'
    : poderDeGobierno >= 40
    ? 'text-dorado-brillante'
    : 'text-red-400';

  const statKeys = Object.keys(STAT_DEFINITIONS) as StatKey[];

  return (
    <header className="sticky top-0 z-[4000] bg-azul-profundo text-blanco-patrio shadow-patrio-lg">

      {/* ===== TOP STRIPE: Bandera colors ===== */}
      <div className="h-1 bg-celeste-patrio" />

      {/* ===== MAIN HEADER ROW ===== */}
      <div className="px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">

          {/* LEFT: Escarapela + Info Chips */}
          <div className="flex items-center space-x-2 flex-wrap gap-1.5">
            {/* Escarapela icon */}
            <button
              onClick={onGoToMenu}
              className="flex-shrink-0 w-8 h-8 rounded-full escarapela-crest flex items-center justify-center hover:scale-110 transition-transform"
              title="Volver al Menú"
            >
              <span className="text-[10px] font-cinzel font-black text-azul-profundo">SM</span>
            </button>

            {/* Year chip */}
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm border border-celeste-patrio/30 rounded-lg px-2.5 py-1 text-xs font-cinzel font-bold">
              <Calendar className="w-3.5 h-3.5 text-celeste-patrio" />
              <span className="text-celeste-medio">Año</span>
              <span className="text-dorado-brillante font-extrabold text-sm ml-0.5">{year}</span>
            </div>

            {/* Age chip */}
            <div className="flex items-center space-x-1 bg-white/10 border border-celeste-patrio/30 rounded-lg px-2.5 py-1 text-xs font-cinzel font-bold">
              <User className="w-3.5 h-3.5 text-celeste-patrio" />
              <span className="text-celeste-medio">Edad</span>
              <span className="text-blanco-patrio ml-0.5">{age}a</span>
            </div>

            {/* Location chip — hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-1 bg-white/10 border border-celeste-patrio/30 rounded-lg px-2.5 py-1 text-xs font-cinzel font-bold">
              <MapPin className="w-3.5 h-3.5 text-rojo-patrio" />
              <span className="text-celeste-medio">Lugar</span>
              <span className="text-blanco-patrio truncate max-w-[160px] ml-0.5">{location}</span>
            </div>
          </div>

          {/* RIGHT: Poder de Gobierno + tools */}
          <div className="flex items-center space-x-2">

            {/* Poder de Gobierno Badge */}
            <div
              className="flex items-center space-x-2 bg-gradient-to-r from-azul-marino to-azul-profundo px-3 py-1.5 rounded-xl border-2 border-dorado-sol animate-glow cursor-default"
              title="Promedio de todas las estadísticas"
            >
              <Award className="w-4 h-4 text-dorado-brillante" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] font-cinzel font-bold text-celeste-patrio uppercase tracking-wider">
                  Poder de Gobierno
                </span>
                <span className={`text-base font-mono font-black ${poderColor}`}>
                  {poderDeGobierno}<span className="text-[10px] text-celeste-medio font-normal">/100</span>
                </span>
              </div>
            </div>

            {/* Mobile: toggle stats */}
            <button
              onClick={() => setIsMobileStatsExpanded((v) => !v)}
              className="sm:hidden flex items-center space-x-1 bg-celeste-patrio text-azul-profundo px-2.5 py-1.5 rounded-lg font-cinzel font-bold text-[11px] shadow border border-dorado-sol/50 min-h-[36px]"
            >
              <span>Stats</span>
              {isMobileStatsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Desktop quick-action icons */}
            <div className="hidden sm:flex items-center space-x-1">
              {onOpenCharacters && (
                <button
                  onClick={onOpenCharacters}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Aliados Históricos"
                >
                  <Users className="w-4 h-4 text-celeste-patrio" />
                </button>
              )}
              {onOpenAchievements && (
                <button
                  onClick={onOpenAchievements}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Logros"
                >
                  <Award className="w-4 h-4 text-dorado-sol" />
                </button>
              )}
              {onOpenEncyclopedia && (
                <button
                  onClick={onOpenEncyclopedia}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Enciclopedia"
                >
                  <BookOpen className="w-4 h-4 text-celeste-brillante" />
                </button>
              )}
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Ajustes"
                >
                  <Settings className="w-4 h-4 text-blanco-patrio/60" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ===== TIMELINE PROGRESS ===== */}
        <div className="max-w-7xl mx-auto mt-2">
          <div className="relative w-full h-2 bg-azul-marino rounded-full overflow-hidden border border-celeste-patrio/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-celeste-patrio via-blanco-patrio to-dorado-sol"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-cinzel font-bold text-celeste-patrio/50 mt-0.5 px-0.5">
            <span>Yapeyú 1778</span>
            <span className="text-dorado-sol/70">{pct}% de la vida transcurrida</span>
            <span>Boulogne 1850</span>
          </div>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <AnimatePresence>
        {(true) && (  /* Always show on desktop; toggle on mobile via CSS */
          <div className={`border-t border-celeste-patrio/20 ${isMobileStatsExpanded ? 'block' : 'hidden sm:block'}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                {statKeys.map((key) => {
                  const def = STAT_DEFINITIONS[key];
                  const val = Math.max(0, Math.min(100, stats[key] ?? 50));
                  const delta = recentDeltas.find((d) => d.stat === key);

                  return (
                    <div
                      key={key}
                      className="relative bg-azul-marino/80 rounded-lg p-1.5 border border-celeste-patrio/20 hover:border-dorado-sol/60 transition-all cursor-help group"
                      onMouseEnter={() => setActiveTooltip(key)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      {/* Stat label + value */}
                      <div className="flex items-center justify-between text-[10px] font-cinzel font-bold mb-1 leading-none">
                        <div className="flex items-center space-x-1 min-w-0">
                          {STAT_ICON_MAP[key]}
                          <span className="text-celeste-medio truncate">{def.label}</span>
                        </div>
                        <span className={`font-mono text-xs font-black ml-1 ${getStatColor(val)}`}>
                          {val}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-azul-profundo/60 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${STAT_PROGRESS_COLOR[key]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                        />
                      </div>

                      {/* Delta popup */}
                      <AnimatePresence>
                        {delta && (
                          <motion.div
                            key={`${key}-${delta.value}`}
                            initial={{ opacity: 0, y: 8, scale: 0.8 }}
                            animate={{ opacity: 1, y: -20, scale: 1 }}
                            exit={{ opacity: 0, y: -32 }}
                            transition={{ duration: 1.4, ease: 'easeOut' }}
                            className={`absolute -top-2 right-0 z-50 text-[10px] font-mono font-black px-1.5 py-0.5 rounded shadow-lg pointer-events-none ${
                              delta.value > 0
                                ? 'bg-emerald-600 text-white border border-emerald-400'
                                : 'bg-rojo-patrio text-white border border-red-300'
                            }`}
                          >
                            {delta.value > 0 ? `+${delta.value}` : delta.value}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {activeTooltip === key && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-azul-noche text-blanco-patrio text-xs p-3 rounded-xl shadow-xl z-50 pointer-events-none border border-dorado-sol/60 font-merriweather leading-relaxed"
                          >
                            <div className="font-cinzel font-bold text-dorado-sol mb-1 flex items-center justify-between">
                              <span>{def.label}</span>
                              <span className={`font-mono text-xs ${getStatColor(val)}`}>{val}/100</span>
                            </div>
                            <div className="text-[10px] font-cinzel font-bold mb-1.5 px-2 py-0.5 rounded w-max border border-white/20 bg-white/10">
                              Nivel: <span className={getStatRank(val).colorClass}>{getStatRank(val).label}</span>
                            </div>
                            <p className="text-[11px] opacity-80">{def.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== BOTTOM STRIPE ===== */}
      <div className="h-0.5 bg-gradient-to-r from-celeste-patrio via-dorado-sol to-celeste-patrio" />
    </header>
  );
};
