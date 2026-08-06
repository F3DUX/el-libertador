'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_ACHIEVEMENTS } from '@/data/achievements';
import { Award, X, Lock, CheckCircle } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface AchievementsModalProps {
  unlockedIds: string[];
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ unlockedIds, onClose }) => {
  const totalCount = INITIAL_ACHIEVEMENTS.length;
  const unlockedCount = unlockedIds.length;

  return (
    <div className="fixed inset-0 z-[9999] bg-azul-profundo/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-blanco-patrio border-4 border-celeste-patrio rounded-2xl shadow-patrio overflow-hidden flex flex-col max-h-[85vh] patrio-border"
      >
        {/* Header */}
        <div className="bg-azul-profundo text-blanco-patrio px-6 py-4 flex items-center justify-between border-b-2 border-dorado-sol">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-dorado-sol" />
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold tracking-wide">
                Logros y Glorias Patrias
              </h2>
              <p className="text-xs font-cormorant font-bold text-celeste-patrio">
                Progreso: {unlockedCount} de {totalCount} insignias desbloqueadas
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playClickSound();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-dorado-sol/20 text-dorado-sol transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedIds.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border-2 transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-celeste-claro/80 border-dorado-sol shadow-gold'
                    : 'bg-gray-100 border-gray-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border ${
                    isUnlocked ? 'bg-dorado-sol/20 border-dorado-sol text-azul-profundo' : 'bg-gray-200 border-gray-300'
                  }`}
                >
                  {isUnlocked ? '⭐' : <Lock className="w-5 h-5 text-gray-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel font-bold text-azul-profundo text-base leading-snug">
                      {ach.title}
                    </h3>
                    {isUnlocked && <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />}
                  </div>
                  <p className="font-merriweather text-xs text-texto-patrio/90 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
