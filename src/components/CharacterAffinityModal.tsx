'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HISTORICAL_CHARACTERS } from '@/data/characters';
import { Users, X, Heart, Shield, Crown, Swords, Briefcase, Feather, Scroll } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface CharacterAffinityModalProps {
  affinities: Record<string, number>;
  onClose: () => void;
}

export const CharacterAffinityModal: React.FC<CharacterAffinityModalProps> = ({
  affinities,
  onClose,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scroll':    return <Scroll    className="w-5 h-5 text-dorado-sol"       />;
      case 'Shield':    return <Shield    className="w-5 h-5 text-celeste-brillante"/>;
      case 'Crown':     return <Crown     className="w-5 h-5 text-dorado-brillante" />;
      case 'Heart':     return <Heart     className="w-5 h-5 text-rojo-patrio"      />;
      case 'Swords':    return <Swords    className="w-5 h-5 text-azul-profundo"    />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-celeste-patrio"   />;
      case 'Feather':   return <Feather   className="w-5 h-5 text-emerald-600"      />;
      default:          return <Users     className="w-5 h-5 text-azul-profundo"    />;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-azul-profundo/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-blanco-patrio border-4 border-celeste-patrio rounded-2xl shadow-patrio overflow-hidden flex flex-col max-h-[85vh]"
        style={{ boxShadow: '0 0 0 1px #D4AF37, 0 20px 50px rgba(27,54,93,0.2)' }}
      >
        {/* ===== HEADER ===== */}
        <div className="bg-azul-profundo text-blanco-patrio px-5 py-4 flex items-center justify-between border-b-2 border-dorado-sol">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full escarapela-crest flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-cinzel font-bold tracking-wide">
              Aliados y Figuras Históricas
            </h2>
          </div>
          <button
            onClick={() => { audioEngine.playClickSound(); onClose(); }}
            className="p-1 rounded-full hover:bg-dorado-sol/20 text-dorado-sol transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {Object.values(HISTORICAL_CHARACTERS).map((char) => {
            const affinity = affinities[char.id] ?? char.affinity;
            const clamped  = Math.max(0, Math.min(100, affinity));

            const { label, barColor } =
              clamped >= 85 ? { label: 'Confianza Absoluta',   barColor: 'bg-emerald-500' } :
              clamped >= 70 ? { label: 'Gran Alianza',         barColor: 'bg-celeste-brillante' } :
              clamped >= 50 ? { label: 'Respeto Mutuo',        barColor: 'bg-dorado-sol' } :
              clamped >= 30 ? { label: 'Relación Tensa',       barColor: 'bg-amber-500' } :
                              { label: 'Conflicto Político',   barColor: 'bg-rojo-patrio' };

            return (
              <div
                key={char.id}
                className="bg-celeste-claro/60 border border-celeste-patrio/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-celeste-patrio transition-colors"
              >
                {/* Avatar + Info */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-11 h-11 rounded-full bg-blanco-patrio border-2 border-celeste-patrio shadow-card flex items-center justify-center flex-shrink-0">
                    {getIcon(char.avatarIcon)}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-azul-profundo text-sm leading-tight">
                      {char.name}
                    </h3>
                    <p className="font-cormorant font-bold text-celeste-brillante text-xs">
                      {char.role}
                    </p>
                    <p className="font-merriweather text-xs text-texto-patrio/80 mt-1 leading-snug max-w-lg">
                      {char.bio}
                    </p>
                  </div>
                </div>

                {/* Affinity Bar */}
                <div className="w-full sm:w-48 flex-shrink-0 bg-blanco-patrio/80 p-2.5 rounded-lg border border-celeste-patrio/30 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-cinzel font-bold text-azul-profundo">
                    <span>{label}</span>
                    <span className="font-mono text-dorado-sol">{clamped}/100</span>
                  </div>
                  <div className="w-full bg-celeste-patrio/20 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${clamped}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
