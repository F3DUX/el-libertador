'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BattleMinigameConfig, MinigameResult } from '@/types/minigames';
import { PlayerStats } from '@/types/game';
import { audioEngine } from '@/utils/audio';
import { Shield, Clock, CheckCircle2 } from 'lucide-react';

interface OrganizarEjercitoProps {
  config: BattleMinigameConfig;
  playerStats: PlayerStats;
  onComplete: (result: MinigameResult) => void;
}

type DivisionType = 'INFANTERIA' | 'CABALLERIA' | 'ARTILLERIA' | 'RESERVA';

interface TacticalSlot {
  id: string;
  name: string;
  optimalType: DivisionType;
  assigned: DivisionType | null;
  hint: string;
}

const DIVISIONS: Array<{ type: DivisionType; name: string; icon: string }> = [
  { type: 'INFANTERIA', name: 'Infantería de Línea', icon: '💂‍♂️' },
  { type: 'CABALLERIA', name: 'Granaderos a Caballo', icon: '🐎' },
  { type: 'ARTILLERIA', name: 'Artillería de Montaña', icon: '💣' },
  { type: 'RESERVA',    name: 'Reserva Estratégica',   icon: '🛡️' },
];

export const OrganizarEjercito: React.FC<OrganizarEjercitoProps> = ({
  config,
  playerStats,
  onComplete,
}) => {
  const [slots, setSlots] = useState<TacticalSlot[]>([
    { id: 'vanguardia', name: 'Vanguardia / Centro', optimalType: 'INFANTERIA', assigned: null, hint: 'Resistir el choque principal' },
    { id: 'flanco_izq', name: 'Flanco Izquierdo',    optimalType: 'CABALLERIA', assigned: null, hint: 'Carga envolvente y persecución' },
    { id: 'flanco_der', name: 'Altura / Colina',      optimalType: 'ARTILLERIA', assigned: null, hint: 'Dominio de campo de tiro' },
    { id: 'retaguardia', name: 'Retaguardia',         optimalType: 'RESERVA',    assigned: null, hint: 'Contragolpe en momento decisivo' },
  ]);

  const [selectedDivision, setSelectedDivision] = useState<DivisionType | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const estrategiaLevel = playerStats.estrategia ?? 50;

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

  // Assign division to slot
  const handleAssignToSlot = (slotId: string) => {
    if (!selectedDivision || isFinished) return;

    audioEngine.playPaperSound();
    setSlots((prev) =>
      prev.map((s) => {
        if (s.id === slotId) return { ...s, assigned: selectedDivision };
        if (s.assigned === selectedDivision) return { ...s, assigned: null }; // Unassign if re-placed
        return s;
      })
    );
    setSelectedDivision(null);
  };

  // Check completion
  const assignedCount = slots.filter((s) => s.assigned !== null).length;

  const handleSubmitDeployment = () => {
    if (isFinished) return;
    setIsFinished(true);
  };

  // Evaluate Deployment
  useEffect(() => {
    if (!isFinished) return;

    let correctCount = 0;
    slots.forEach((s) => {
      if (s.assigned === s.optimalType) correctCount++;
    });

    const isVictory = correctCount >= 3;
    const score = Math.round((correctCount / 4) * 100);

    let statDeltas: Partial<PlayerStats> = {};
    let narrative = '';

    if (isVictory) {
      audioEngine.playTriumphFanfare();
      narrative = `¡Despliegue magistral! Las tropas tomaron las posiciones óptimas en el terreno, garantizando una enorme ventaja estratégica.`;
      statDeltas = { estrategia: 3, liderazgo: 2, experiencia: 1 };
    } else {
      audioEngine.playDefeatSound();
      narrative = `El despliegue apresurado desorganizó las líneas patriotas, reduciendo la efectividad del ataque.`;
      statDeltas = { estrategia: -2, liderazgo: -2, recursos: -1 };
    }

    const timer = setTimeout(() => {
      onComplete({
        victory: isVictory,
        score,
        statDeltas,
        headline: isVictory ? '¡DESPLIEGUE PERFECTO!' : 'DESPLIEGUE DEFECTUOSO',
        narrativeSummary: narrative,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [isFinished, slots, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-4 bg-azul-profundo/95 rounded-2xl border-2 border-dorado-sol shadow-2xl">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between bg-white/10 p-3 rounded-xl border border-dorado-sol/30">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-dorado-brillante" />
          <span className="text-xs font-cinzel font-bold text-blanco-patrio">
            DISPOSICIÓN DE LAS TROPAS
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 text-yellow-300 border border-yellow-500/40">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs font-merriweather text-celeste-patrio">
        Selecciona una división abajo y asígnala al nodo táctico correspondiente en el campo.
      </div>

      {/* Tactical Map Grid with 4 Slots */}
      <div className="w-full grid grid-cols-2 gap-3 p-3 bg-black/40 rounded-2xl border border-dorado-sol/30">
        {slots.map((s) => {
          const assignedDiv = DIVISIONS.find((d) => d.type === s.assigned);
          return (
            <motion.div
              key={s.id}
              whileHover={{ scale: selectedDivision ? 1.02 : 1 }}
              onClick={() => handleAssignToSlot(s.id)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[100px] ${
                s.assigned
                  ? 'bg-celeste-patrio/20 border-dorado-sol text-blanco-patrio'
                  : selectedDivision
                  ? 'bg-white/10 border-dashed border-dorado-brillante/70 hover:bg-white/20'
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-bold text-dorado-brillante">
                  {s.name}
                </span>
                {s.assigned && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>

              {assignedDiv ? (
                <div className="flex items-center gap-2 py-2">
                  <span className="text-2xl">{assignedDiv.icon}</span>
                  <span className="text-xs font-bold text-white">{assignedDiv.name}</span>
                </div>
              ) : (
                <div className="text-[10px] font-merriweather italic text-celeste-patrio/70 py-1">
                  💡 {s.hint}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Division Selector Palette */}
      <div className="w-full flex flex-col gap-2">
        <div className="text-xs font-cinzel font-bold text-dorado-sol text-center">
          Divisiones Disponibles:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DIVISIONS.map((d) => {
            const isUsed = slots.some((s) => s.assigned === d.type);
            const isSelected = selectedDivision === d.type;

            return (
              <button
                key={d.type}
                disabled={isUsed || isFinished}
                onClick={() => setSelectedDivision(d.type)}
                className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-xs font-cinzel font-bold ${
                  isUsed
                    ? 'opacity-30 border-gray-600 bg-black/40 text-gray-400'
                    : isSelected
                    ? 'bg-dorado-sol text-azul-profundo border-white shadow-gold scale-105'
                    : 'bg-azul-profundo hover:bg-azul-marino border-celeste-patrio/60 text-blanco-patrio'
                }`}
              >
                <span>{d.icon}</span>
                <span className="truncate">{d.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        disabled={assignedCount < 4 || isFinished}
        onClick={handleSubmitDeployment}
        className="w-full py-3 mt-1 bg-gradient-to-r from-dorado-sol to-yellow-500 hover:from-yellow-400 hover:to-dorado-sol text-azul-profundo font-cinzel font-bold text-sm rounded-xl shadow-gold border border-white disabled:opacity-40 transition-all"
      >
        ¡CONFIRMAR ORDEN DE BATALLA! ({assignedCount}/4)
      </button>
    </div>
  );
};
