'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionOption, StatKey } from '@/types/game';
import { STAT_DEFINITIONS } from '@/data/statsInfo';
import { LeafletMapClient } from '@/components/LeafletMapClient';
import { GAME_EVENTS } from '@/data/events';
import { ArrowRight, BookOpen, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { audioEngine } from '@/utils/audio';
import { MapCoordinates } from '@/types/game';

interface TransitionScreenProps {
  chosenOption: DecisionOption;
  currentYear: number;
  currentLocation: string;
  visitedWaypoints?: MapCoordinates[];
  onContinue: () => void;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({
  chosenOption,
  currentYear,
  currentLocation,
  visitedWaypoints = [],
  onContinue,
}) => {
  const newYear = currentYear + chosenOption.yearsPassed;
  const newLocation = chosenOption.newLocation || currentLocation;
  const fullText = chosenOption.narrativeTransition;

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const nextEvent = GAME_EVENTS[chosenOption.nextEventId];
  const targetCoords = nextEvent?.mapCoords || { lat: -34.61, lng: -58.38 };

  useEffect(() => {
    audioEngine.playMarchFanfare();
    let i = 0;
    const iv = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(iv);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [fullText]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setIsTypingComplete(true);
  };

  const statChanges = Object.entries(chosenOption.statsEffect).filter(([, v]) => v && v !== 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto space-y-4 pb-6"
    >
      {/* ===== MAP ===== */}
      <div
        className="rounded-2xl overflow-hidden border-2 border-celeste-patrio shadow-patrio"
        style={{ boxShadow: '0 0 0 1px #D4AF37, 0 8px 24px rgba(27,54,93,0.15)' }}
      >
        <LeafletMapClient
          location={newLocation}
          coords={targetCoords}
          visitedWaypoints={visitedWaypoints}
        />
      </div>

      {/* ===== NARRATIVE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blanco-patrio rounded-2xl overflow-hidden shadow-patrio"
        style={{ border: '2px solid #75AADB', boxShadow: '0 0 0 1px #D4AF37, 0 12px 40px rgba(27,54,93,0.12)' }}
        onClick={!isTypingComplete ? handleSkip : undefined}
      >
        {/* Top banner */}
        <div className="h-1 bandera-stripe" />

        <div className="px-5 py-3 bg-azul-profundo flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blanco-patrio font-cinzel font-bold text-sm sm:text-base">
            <BookOpen className="w-4 h-4 text-dorado-sol" />
            <span>Crónica Documental — {newYear}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px] font-cinzel text-celeste-patrio/80">
            <Clock className="w-3.5 h-3.5" />
            <span>{chosenOption.yearsPassed} {chosenOption.yearsPassed === 1 ? 'año' : 'años'} transcurridos</span>
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-5">
          {/* Typewriter area */}
          <div
            className="min-h-[110px] font-merriweather text-sm sm:text-[15px] text-texto-patrio leading-relaxed bg-celeste-claro/50 border-l-4 border-celeste-patrio rounded-r-xl p-4"
          >
            <p className="whitespace-pre-line">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-4 bg-azul-profundo ml-0.5 animate-blink rounded-sm" />
              )}
            </p>
          </div>

          {!isTypingComplete && (
            <p className="text-[10px] font-cinzel italic text-azul-profundo/50 text-right">
              Toca para leer de inmediato →
            </p>
          )}

          {/* Stat changes */}
          {statChanges.length > 0 && (
            <div className="border-t border-celeste-patrio/25 pt-4 space-y-2">
              <div className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-azul-profundo/60">
                Consecuencias inmediatas:
              </div>
              <div className="flex flex-wrap gap-2">
                {statChanges.map(([key, val]) => {
                  const def = STAT_DEFINITIONS[key as StatKey];
                  const isPos = (val ?? 0) > 0;
                  return (
                    <span
                      key={key}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${
                        isPos
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-red-50 text-rojo-patrio border-red-300'
                      }`}
                    >
                      {isPos
                        ? <TrendingUp className="w-3.5 h-3.5" />
                        : <TrendingDown className="w-3.5 h-3.5" />
                      }
                      <span>{isPos ? `+${val}` : val}</span>
                      <span className="font-cormorant font-bold text-xs">{def?.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ===== CTA BUTTON ===== */}
      <div className="flex justify-center pt-1">
        <motion.button
          onClick={() => { audioEngine.playClickSound(); onContinue(); }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center space-x-3 bg-azul-profundo hover:bg-azul-marino text-blanco-patrio font-cinzel font-bold text-sm sm:text-base px-8 py-4 rounded-xl border-2 border-dorado-sol transition-all min-h-[52px] shadow-gold"
          style={{ boxShadow: '0 4px 20px rgba(27,54,93,0.4), 0 0 0 1px #D4AF37' }}
        >
          <span>Continuar la Historia de San Martín</span>
          <ArrowRight className="w-5 h-5 text-dorado-sol" />
        </motion.button>
      </div>
    </motion.div>
  );
};
