'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EncyclopediaEntry } from '@/types/game';
import { INITIAL_ENCYCLOPEDIA } from '@/data/encyclopedia';
import { Book, X, Lock, MapPin, Calendar, Search } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

interface EncyclopediaModalProps {
  unlockedIds: string[];
  onClose: () => void;
}

export const EncyclopediaModal: React.FC<EncyclopediaModalProps> = ({ unlockedIds, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<EncyclopediaEntry | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'personaje', label: 'Personajes' },
    { id: 'batalla', label: 'Batallas' },
    { id: 'ciudad', label: 'Ciudades' },
    { id: 'acontecimiento', label: 'Eventos' }
  ];

  const filteredEntries = INITIAL_ENCYCLOPEDIA.filter((entry) => {
    const matchesCategory = selectedCategory === 'todos' || entry.category === selectedCategory;
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[9999] bg-azul-profundo/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-blanco-patrio border-4 border-celeste-patrio rounded-2xl shadow-patrio overflow-hidden flex flex-col max-h-[90vh] patrio-border"
      >
        {/* Header */}
        <div className="bg-azul-profundo text-blanco-patrio px-6 py-4 flex items-center justify-between border-b-2 border-dorado-sol">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full escarapela-crest flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold tracking-wide">
              Enciclopedia Histórica de la Patria
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

        {/* Filters & Search */}
        <div className="p-4 bg-celeste-claro border-b border-celeste-patrio/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioEngine.playClickSound();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-azul-profundo text-blanco-patrio shadow'
                    : 'bg-blanco-patrio text-azul-profundo hover:bg-celeste-patrio/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-azul-profundo absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar histórico..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-blanco-patrio border border-celeste-patrio/40 rounded-lg text-xs font-merriweather text-texto-patrio focus:outline-none focus:border-azul-profundo"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {filteredEntries.map((entry) => {
            const isUnlocked = entry.unlocked || unlockedIds.includes(entry.id);

            return (
              <div
                key={entry.id}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playPaperSound();
                    setSelectedEntry(entry);
                  }
                }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-celeste-claro/50 border-celeste-patrio/40 hover:border-dorado-sol hover:shadow-card'
                    : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-cinzel font-bold text-azul-profundo uppercase tracking-wider">
                      {entry.category}
                    </span>
                    <h3 className="text-lg font-cinzel font-bold text-azul-profundo leading-tight">
                      {isUnlocked ? entry.title : '??? (Bloqueado)'}
                    </h3>
                  </div>
                  {!isUnlocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <span className="text-xs font-cinzel text-dorado-sol font-bold">Ver Ficha</span>
                  )}
                </div>

                <p className="font-cormorant font-bold text-azul-profundo/80 text-sm mt-1">
                  {isUnlocked ? entry.subtitle : 'Descubre este hito histórico durante tu partida.'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detail Popup */}
        {selectedEntry && (
          <div className="fixed inset-0 z-60 bg-azul-profundo/50 flex items-center justify-center p-4">
            <div className="bg-blanco-patrio border-4 border-dorado-sol rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 patrio-border">
              <div className="flex justify-between items-start border-b border-celeste-patrio/30 pb-2">
                <div>
                  <span className="bg-azul-profundo text-blanco-patrio text-[10px] font-cinzel font-bold px-2 py-0.5 rounded">
                    {selectedEntry.category.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-cinzel font-bold text-azul-profundo mt-1">
                    {selectedEntry.title}
                  </h3>
                  <p className="font-cormorant font-bold text-celeste-brillante">{selectedEntry.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="p-1 rounded-full text-azul-profundo hover:bg-celeste-claro"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 text-xs font-cinzel font-bold text-azul-profundo">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-celeste-patrio" />
                  <span>{selectedEntry.date}</span>
                </span>
                <span className="flex items-center space-x-1 text-rojo-patrio">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedEntry.location}</span>
                </span>
              </div>

              <p className="font-merriweather text-sm text-texto-patrio leading-relaxed">
                {selectedEntry.description}
              </p>

              <div className="bg-celeste-claro p-3 rounded-lg border border-celeste-patrio/30 text-xs font-merriweather italic text-azul-profundo">
                💡 <span className="font-bold">Dato Histórico:</span> {selectedEntry.historicalFact}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="bg-azul-profundo text-blanco-patrio font-cinzel font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
