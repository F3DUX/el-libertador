import { StatKey } from '@/types/game';

export interface StatDefinition {
  key: StatKey;
  label: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  color: string; // Hex or Tailwind color class
  bgProgress: string;
}

export const STAT_DEFINITIONS: Record<StatKey, StatDefinition> = {
  salud: {
    key: 'salud',
    label: 'Salud',
    icon: 'Heart',
    description: 'Resistencia física y vitalidad de San Martín. Vital para cruces de cordilleras y campañas prolongadas.',
    color: '#E53E3E',
    bgProgress: 'bg-red-600'
  },
  liderazgo: {
    key: 'liderazgo',
    label: 'Liderazgo',
    icon: 'Swords',
    description: 'Capacidad de inspirar a las tropas y mantener la disciplina militar en momentos de crisis.',
    color: '#DD6B20',
    bgProgress: 'bg-amber-600'
  },
  estrategia: {
    key: 'estrategia',
    label: 'Estrategia',
    icon: 'Brain',
    description: 'Sabiduría táctica y visión geopolítica. Aumenta las probabilidades de éxito militar y victoria.',
    color: '#3182CE',
    bgProgress: 'bg-blue-600'
  },
  prestigio: {
    key: 'prestigio',
    label: 'Prestigio',
    icon: 'Star',
    description: 'Reputación ante gobiernos, aristocracia y ejércitos extranjeros. Otorga apoyo político.',
    color: '#D4AF37',
    bgProgress: 'bg-yellow-500'
  },
  patriotismo: {
    key: 'patriotismo',
    label: 'Patriotismo',
    icon: 'Flag',
    description: 'Fervor por la libertad de América del Sur. Desbloquea decisiones independentistas audaces.',
    color: '#75AADB',
    bgProgress: 'bg-sky-500'
  },
  relaciones: {
    key: 'relaciones',
    label: 'Relaciones',
    icon: 'Users',
    description: 'Lazos diplomáticos y alianzas de confianza con héroes clave como Belgrano, O\'Higgins y Bolívar.',
    color: '#38A169',
    bgProgress: 'bg-emerald-600'
  },
  recursos: {
    key: 'recursos',
    label: 'Recursos',
    icon: 'Coins',
    description: 'Finanzas, suministros, pólvora y pertrechos para sostener el Ejército de los Andes y la Armada.',
    color: '#B7791F',
    bgProgress: 'bg-amber-700'
  },
  caballeria: {
    key: 'caballeria',
    label: 'Caballería',
    icon: 'Horse',
    description: 'Fuerza, entrenamiento y coraje del Regimiento de Granaderos a Caballo.',
    color: '#805AD5',
    bgProgress: 'bg-purple-600'
  },
  experiencia: {
    key: 'experiencia',
    label: 'Experiencia',
    icon: 'Scroll',
    description: 'Conocimiento acumulado en guerras europeas y americanas. Desbloquea tácticas avanzadas.',
    color: '#4A5568',
    bgProgress: 'bg-slate-700'
  }
};
