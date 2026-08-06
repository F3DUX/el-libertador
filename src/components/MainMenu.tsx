'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HISTORICAL_QUOTES, HistoricalQuote } from '@/data/quotes';
import { Play, RotateCcw, Award, Book, Settings, Quote } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface MainMenuProps {
  hasSavedGame: boolean;
  onNewGame: () => void;
  onContinueGame: () => void;
  onOpenAchievements: () => void;
  onOpenEncyclopedia: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  hasSavedGame,
  onNewGame,
  onContinueGame,
  onOpenAchievements,
  onOpenEncyclopedia,
  onOpenSettings,
}) => {
  const [randomQuote, setRandomQuote] = useState<HistoricalQuote>(HISTORICAL_QUOTES[0]);

  useEffect(() => {
    const idx = Math.floor(Math.random() * HISTORICAL_QUOTES.length);
    setRandomQuote(HISTORICAL_QUOTES[idx]);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-filigrana">

      {/* ===== BACKGROUND: BANDERA ARGENTINA SUBTLE STRIPE ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top celeste band */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-celeste-patrio opacity-80" />
        {/* Bottom celeste band */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-celeste-patrio opacity-80" />
        {/* Central white stripe with subtle shimmer */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* ===== SOL DE MAYO — BACKGROUND ROTATING ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          className="w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] opacity-[0.06] animate-spin-slow"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="22" fill="#D4AF37" />
          <circle cx="100" cy="100" r="14" fill="#F5C518" />
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
              {/* Alternating straight and wavy rays */}
              {i % 2 === 0 ? (
                <path d="M 100 72 L 96 94 L 104 94 Z" fill="#D4AF37" />
              ) : (
                <path d="M 100 72 Q 96 82 100 88 Q 104 82 100 72 Z" fill="#D4AF37" />
              )}
            </g>
          ))}
          {/* Face features */}
          <circle cx="92" cy="96" r="2" fill="#1B365D" />
          <circle cx="108" cy="96" r="2" fill="#1B365D" />
          <path d="M 94 106 Q 100 112 106 106" stroke="#1B365D" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* ===== MAIN CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl mx-4 sm:mx-auto"
      >
        {/* Top accent bar — Bandera Argentina colors */}
        <div className="h-3 rounded-t-2xl bandera-stripe" />

        <div className="bg-white/92 backdrop-blur-md border-x-4 border-b-4 border-celeste-patrio rounded-b-2xl shadow-patrio-lg p-6 sm:p-10 text-center space-y-6"
          style={{ boxShadow: '0 20px 60px rgba(27,54,93,0.2), 0 0 0 1px #D4AF37' }}
        >

          {/* ===== ESCARAPELA HERO ===== */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full animate-glow" />
              <div className="w-24 h-24 rounded-full escarapela-crest flex items-center justify-center shadow-gold relative">
                {/* Sol de Mayo SVG at center */}
                <svg viewBox="0 0 60 60" className="w-14 h-14">
                  <circle cx="30" cy="30" r="10" fill="#D4AF37"/>
                  <circle cx="30" cy="30" r="6"  fill="#F5C518"/>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 22.5} 30 30)`}>
                      {i % 2 === 0
                        ? <path d="M 30 14 L 27.5 24 L 32.5 24 Z" fill="#D4AF37" />
                        : <path d="M 30 14 Q 27.5 19 30 22 Q 32.5 19 30 14 Z" fill="#D4AF37" />
                      }
                    </g>
                  ))}
                  <circle cx="26" cy="28" r="1.2" fill="#1B365D" />
                  <circle cx="34" cy="28" r="1.2" fill="#1B365D" />
                  <path d="M 26.5 33 Q 30 36.5 33.5 33" stroke="#1B365D" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          {/* ===== TITLE ===== */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl font-cinzel font-black tracking-widest text-azul-profundo leading-none"
              style={{ textShadow: '0 2px 8px rgba(27,54,93,0.2)' }}
            >
              EL
            </h1>
            <h1 className="text-4xl sm:text-6xl font-cinzel font-black tracking-[0.2em] text-azul-profundo leading-none">
              LIBERTADOR
            </h1>
            {/* Golden underline */}
            <div className="flex justify-center pt-1">
              <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-dorado-sol to-transparent rounded-full" />
            </div>
            <p className="font-cormorant text-base sm:text-xl font-bold text-celeste-brillante italic pt-1">
              La epopeya del General José de San Martín
            </p>
            <p className="font-cinzel text-[10px] sm:text-xs font-bold text-azul-profundo/60 tracking-[0.3em] uppercase">
              1778 — 17 de Agosto de 1850
            </p>
          </div>

          {/* ===== QUOTE BOX ===== */}
          <div className="bg-celeste-claro border border-celeste-patrio/50 rounded-xl p-4 text-left space-y-2 shadow-inset-celeste">
            <div className="flex items-start space-x-2">
              <Quote className="w-4 h-4 text-dorado-sol flex-shrink-0 mt-0.5" />
              <p className="font-merriweather text-xs sm:text-sm text-texto-patrio italic leading-relaxed">
                &ldquo;{randomQuote.text}&rdquo;
              </p>
            </div>
            <p className="text-right text-[10px] font-cinzel font-bold text-azul-profundo/70 pr-1">
              — {randomQuote.author}{randomQuote.year ? ` (${randomQuote.year})` : ''}
            </p>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="space-y-3 pt-2">
            {hasSavedGame && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { audioEngine.playClickSound(); onContinueGame(); }}
                className="w-full flex items-center justify-center space-x-3 bg-celeste-patrio hover:bg-celeste-brillante text-azul-profundo hover:text-white font-cinzel font-bold text-sm sm:text-base py-4 px-6 rounded-xl border-2 border-dorado-sol shadow-gold transition-all min-h-[52px]"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Continuar Partida Guardada</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { audioEngine.playClickSound(); onNewGame(); }}
              className="w-full flex items-center justify-center space-x-3 bg-azul-profundo hover:bg-azul-marino text-blanco-patrio font-cinzel font-bold text-sm sm:text-base py-4 px-6 rounded-xl border-2 border-dorado-sol shadow-gold transition-all min-h-[52px]"
              style={{ boxShadow: '0 4px 20px rgba(27,54,93,0.4), 0 0 0 1px #D4AF37' }}
            >
              <Play className="w-5 h-5 text-dorado-sol" />
              <span>Nueva Partida — Vida Completa</span>
            </motion.button>

            {/* Secondary buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: Award, label: 'Logros', color: 'text-dorado-sol', onClick: onOpenAchievements },
                { icon: Book,  label: 'Enciclopedia', color: 'text-celeste-brillante', onClick: onOpenEncyclopedia },
                { icon: Settings, label: 'Ajustes', color: 'text-azul-profundo', onClick: onOpenSettings },
              ].map(({ icon: Icon, label, color, onClick }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { audioEngine.playClickSound(); onClick(); }}
                  className="flex flex-col items-center justify-center gap-1 py-3 bg-fondo-patrio hover:bg-celeste-claro border border-celeste-patrio/40 hover:border-celeste-patrio rounded-xl font-cinzel text-[11px] font-bold text-azul-profundo transition-all min-h-[52px] shadow-card"
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="pt-3 border-t border-celeste-patrio/30 flex items-center justify-center space-x-3 text-[10px] sm:text-xs font-cinzel font-bold text-azul-profundo/60 tracking-widest uppercase">
            <span>🇦🇷</span>
            <span>Provincias Unidas del Río de la Plata</span>
            <span>🇦🇷</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
