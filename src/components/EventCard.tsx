'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GameEvent, DecisionOption, StatKey, PlayerStats } from '@/types/game';
import { STAT_DEFINITIONS } from '@/data/statsInfo';
import { Shield, MapPin, Calendar, User, ChevronRight, Lock, Scroll } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface EventCardProps {
  event: GameEvent;
  playerStats: PlayerStats;
  onSelectOption: (option: DecisionOption) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, playerStats, onSelectOption }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const checkPrerequisites = (requires?: Partial<PlayerStats>): { isMet: boolean; reason?: string } => {
    if (!requires) return { isMet: true };
    for (const [key, reqVal] of Object.entries(requires)) {
      if (reqVal !== undefined) {
        const k = key as StatKey;
        const playerVal = playerStats[k] ?? 0;
        if (playerVal < reqVal) {
          const statLabel = STAT_DEFINITIONS[k]?.label ?? k;
          return { isMet: false, reason: `Requiere ${statLabel} ≥ ${reqVal} (tienes: ${playerVal})` };
        }
      }
    }
    return { isMet: true };
  };

  const handleChoose = (option: DecisionOption, isMet: boolean) => {
    if (selectedOptionId || !isMet) return;
    setSelectedOptionId(option.id);
    audioEngine.playClickSound();
    setTimeout(() => { onSelectOption(option); }, 500);
  };

  const renderStatBadge = (key: string, value: number) => {
    const def = STAT_DEFINITIONS[key as StatKey];
    const isPos = value > 0;
    return (
      <span
        key={key}
        className={`inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded border ${
          isPos
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
            : 'bg-red-50 text-rojo-patrio border-red-300'
        }`}
      >
        <span>{isPos ? `+${value}` : value}</span>
        <span className="font-cormorant font-bold">{def?.label ?? key}</span>
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto bg-blanco-patrio rounded-2xl overflow-hidden shadow-patrio"
      style={{ border: '2px solid #75AADB', boxShadow: '0 0 0 1px #D4AF37, 0 12px 40px rgba(27,54,93,0.15)' }}
    >
      {/* ===== CARD TOP ACCENT STRIPE ===== */}
      <div className="h-1.5 bandera-stripe" />

      {/* ===== HEADER BLOCK ===== */}
      <div className="bg-azul-profundo px-5 py-3 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Era badge + Escarapela */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full escarapela-crest flex-shrink-0" />
          <span className="bg-dorado-sol text-azul-profundo text-[10px] font-cinzel font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
            {event.era}
          </span>
        </div>

        {/* Right: Year, Age, Location */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-cinzel font-bold text-celeste-medio">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-celeste-patrio" />
            <span>{event.year}</span>
          </span>
          <span className="text-celeste-patrio/40">|</span>
          <span className="flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-celeste-patrio" />
            <span>{event.age} años</span>
          </span>
          <span className="text-celeste-patrio/40">|</span>
          <span className="flex items-center space-x-1 text-rojo-suave">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[130px] sm:max-w-none">{event.location}</span>
          </span>
        </div>
      </div>

      {/* ===== EVENT BODY ===== */}
      <div className="p-4 sm:p-7 space-y-5">

        {/* Title */}
        <h2 className="text-xl sm:text-3xl font-cinzel font-extrabold text-azul-profundo leading-snug tracking-tight">
          {event.title}
        </h2>

        {/* Historical Context */}
        <div className="bg-celeste-claro border-l-4 border-celeste-patrio p-4 sm:p-5 rounded-r-xl rounded-l-sm shadow-inset-celeste">
          <p className="font-merriweather text-sm sm:text-[15px] text-texto-patrio leading-relaxed first-letter:text-4xl first-letter:font-cinzel first-letter:font-bold first-letter:text-azul-profundo first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            {event.historicalContext}
          </p>
        </div>

        {/* Options label */}
        <div className="flex items-center space-x-2 text-xs font-cinzel font-bold text-azul-profundo/80 uppercase tracking-widest border-b border-celeste-patrio/30 pb-2">
          <Shield className="w-4 h-4 text-dorado-sol" />
          <span>Decisión Estratégica — ¿Qué camino tomará San Martín?</span>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {event.options.map((option) => {
            const { isMet, reason } = checkPrerequisites(option.requires);
            const isSelected    = selectedOptionId === option.id;
            const isOtherPicked = selectedOptionId !== null && !isSelected;

            return (
              <motion.div
                key={option.id}
                onClick={() => handleChoose(option, isMet)}
                animate={{
                  opacity: isOtherPicked ? 0.3 : !isMet ? 0.55 : 1,
                  scale:   isSelected ? 1.015 : 1,
                }}
                whileHover={
                  isMet && !selectedOptionId
                    ? { scale: 1.008, transition: { duration: 0.15 } }
                    : {}
                }
                className={`relative p-4 rounded-xl border-2 transition-colors overflow-hidden card-lift ${
                  !isMet
                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
                    : isSelected
                    ? 'bg-celeste-claro border-dorado-sol ring-2 ring-dorado-sol/40'
                    : 'bg-white border-celeste-patrio/50 hover:border-celeste-patrio hover:bg-celeste-claro/60 cursor-pointer'
                }`}
                style={isSelected ? { boxShadow: '0 0 18px rgba(212,175,55,0.35)' } : {}}
              >
                {/* Left accent line for selected */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-dorado-sol rounded-l-xl" />
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-cormorant text-base sm:text-xl font-bold text-azul-profundo leading-snug">
                      {option.text}
                    </p>
                    {!isMet && (
                      <div className="flex items-center space-x-1.5 text-rojo-patrio text-[11px] font-cinzel font-bold">
                        <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    )}
                  </div>

                  <div className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    isMet ? 'bg-azul-profundo text-blanco-patrio' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isMet ? <ChevronRight className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Stat badges */}
                {isMet && (
                  <div className="mt-3 pt-2.5 border-t border-celeste-patrio/20 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-cinzel font-bold text-azul-profundo/60 uppercase tracking-wider flex items-center space-x-1 mr-1">
                      <Scroll className="w-3 h-3 text-dorado-sol" />
                      <span>Efectos:</span>
                    </span>
                    {Object.entries(option.statsEffect).map(([k, v]) =>
                      v !== undefined && v !== 0 ? renderStatBadge(k, v) : null
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
