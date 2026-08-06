import { Achievement } from '@/types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'padre_patria',
    title: 'Padre de la Patria',
    description: 'Completa la vida de José de San Martín alcanzando la máxima independencia de Argentina, Chile y Perú.',
    icon: 'Flag',
    unlocked: false
  },
  {
    id: 'cruce_perfecto',
    title: 'Cruce Perfecto',
    description: 'Cruza la Cordillera de los Andes conservando más del 80% de Salud y Caballería.',
    icon: 'Mountain',
    unlocked: false
  },
  {
    id: 'libertador',
    title: 'Libertador',
    description: 'Consigue liberar a tres naciones suramericanas del dominio realista.',
    icon: 'Crown',
    unlocked: false
  },
  {
    id: 'nunca_herido',
    title: 'Nunca Herido',
    description: 'Termina el juego sin que tu Salud caiga por debajo de 40.',
    icon: 'Shield',
    unlocked: false
  },
  {
    id: 'gran_estratega',
    title: 'Gran Estratega',
    description: 'Alcanza 90 o más puntos en la estadística de Estrategia.',
    icon: 'Brain',
    unlocked: false
  },
  {
    id: 'gobernante_peru',
    title: 'Gobernante del Perú',
    description: 'Acepta y consolida el Protectorado Supremo del Perú en Lima.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'pacifista',
    title: 'Pacifista',
    description: 'Logra victorias continentales priorizando la diplomacia y negociaciones de paz sobre las bajas bélicas.',
    icon: 'Feather',
    unlocked: false
  },
  {
    id: 'historia_alternativa',
    title: 'Historia Alternativa',
    description: 'Toma decisiones audaces que cambien el curso histórico oficial de América o Europa.',
    icon: 'Compass',
    unlocked: false
  },
  {
    id: 'conquistador',
    title: 'Conquistador',
    description: 'Construye un ejército invencible con el máximo poder de Liderazgo y Caballería (90+).',
    icon: 'Swords',
    unlocked: false
  },
  {
    id: 'heroe_nacional',
    title: 'Héroe Nacional',
    description: 'Consigue 95 o más puntos de Prestigio ante todos los pueblos libres.',
    icon: 'Star',
    unlocked: false
  }
];
