'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, RotateCcw, X, Info } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface SettingsModalProps {
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  soundEnabled,
  onToggleSound,
  onResetData,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-azul-profundo/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-blanco-patrio border-4 border-celeste-patrio rounded-2xl shadow-patrio overflow-hidden flex flex-col patrio-border"
      >
        {/* Header */}
        <div className="bg-azul-profundo text-blanco-patrio px-6 py-4 flex items-center justify-between border-b-2 border-dorado-sol">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-dorado-sol" />
            <h2 className="text-xl font-cinzel font-bold tracking-wide">
              Configuración del Juego
            </h2>
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

        {/* Content */}
        <div className="p-6 space-y-6 font-merriweather text-sm text-texto-patrio">
          {/* Sound toggle */}
          <div className="flex items-center justify-between p-3.5 bg-celeste-claro rounded-xl border border-celeste-patrio/30">
            <div className="flex items-center space-x-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-azul-profundo" />
              ) : (
                <VolumeX className="w-5 h-5 text-rojo-patrio" />
              )}
              <div>
                <h3 className="font-cinzel font-bold text-azul-profundo">Efectos de Sonido Patrios</h3>
                <p className="text-xs text-azul-profundo/80">Marchas, sables, caballos y fanfarria</p>
              </div>
            </div>

            <button
              onClick={() => {
                const nextVal = !soundEnabled;
                onToggleSound(nextVal);
                audioEngine.setSoundEnabled(nextVal);
                audioEngine.playClickSound();
              }}
              className={`px-4 py-2 rounded-lg font-cinzel font-bold text-xs transition-colors ${
                soundEnabled ? 'bg-emerald-700 text-white' : 'bg-rojo-patrio text-white'
              }`}
            >
              {soundEnabled ? 'ACTIVADO' : 'SILENCIADO'}
            </button>
          </div>

          {/* About game info */}
          <div className="p-4 bg-celeste-claro/50 rounded-xl border border-celeste-patrio/30 space-y-2">
            <div className="flex items-center space-x-2 text-azul-profundo font-cinzel font-bold text-sm">
              <Info className="w-4 h-4 text-dorado-sol" />
              <span>Acerca de EL LIBERTADOR</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Inspirado en la vida y epopeya militar del General José de San Martín (1778 — 1850). Cada decisión recalcula la estrategia, el Poder de Gobierno y el legado patrio final.
            </p>
          </div>

          {/* Reset data */}
          <div className="pt-2 border-t border-celeste-patrio/30">
            <button
              onClick={() => {
                if (window.confirm('¿Seguro que deseas reiniciar tus partidas guardadas y borrar el progreso?')) {
                  audioEngine.playClickSound();
                  onResetData();
                }
              }}
              className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-rojo-patrio text-rojo-patrio hover:text-white font-cinzel font-bold text-xs py-3 px-4 rounded-xl border border-red-300 transition-all min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Borrar Partida Guardada y Reiniciar</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
