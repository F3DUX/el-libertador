export interface PlayerStats {
  salud: number;         // 0 - 100
  liderazgo: number;     // 0 - 100
  estrategia: number;    // 0 - 100
  prestigio: number;     // 0 - 100
  patriotismo: number;   // 0 - 100
  relaciones: number;    // 0 - 100
  recursos: number;      // 0 - 100
  caballeria: number;    // 0 - 100
  experiencia: number;   // 0 - 100
}

export type StatKey = keyof PlayerStats;

export interface CharacterAffinity {
  id: string;
  name: string;
  role: string;
  affinity: number; // 0 - 100
  status: 'Confianza' | 'Respeto' | 'Amistad' | 'Tensión' | 'Rivalidad';
  bio: string;
  unlocked: boolean;
  avatarIcon: string;
}

export interface StatDelta {
  stat: StatKey;
  label: string;
  value: number; // e.g. +3 or -2
}

export interface DecisionOption {
  id: string;
  text: string;
  icon?: string;
  statsEffect: Partial<PlayerStats>;
  affinityEffect?: { characterId: string; delta: number }[];
  requires?: Partial<PlayerStats>; // Prerequisites for option gating
  nextEventId: string;
  narrativeTransition: string;
  yearsPassed: number;
  newLocation?: string;
  battleMinigameConfig?: import('@/types/minigames').BattleMinigameConfig;
}

export interface MapCoordinates {
  x: number;
  y: number;

}

export interface GameEvent {
  id: string;
  title: string;
  year: number;
  age: number;
  location: string;
  mapCoords: MapCoordinates;
  era: string;
  historicalContext: string;
  options: DecisionOption[];
}

export interface Ending {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  type: 'historico' | 'alternativo' | 'tragico' | 'glorioso';
  condition: (stats: PlayerStats, history: string[], poderDeGobierno: number) => boolean;
  narrative: string;
  historicalComparison: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface EncyclopediaEntry {
  id: string;
  category: 'personaje' | 'batalla' | 'ciudad' | 'acontecimiento';
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  historicalFact: string;
  unlocked: boolean;
}

export interface GameState {
  stats: PlayerStats;
  poderDeGobierno: number; // Real-time average of all 9 stats
  currentEventId: string;
  year: number;
  age: number;
  location: string;
  history: string[]; // List of chosen option IDs
  characterAffinities: Record<string, number>;
  unlockedAchievements: string[];
  unlockedEncyclopedia: string[];
  soundEnabled: boolean;
  textSpeed: 'normal' | 'fast' | 'instant';
  isGameOver: boolean;
  currentEndingId?: string;
  hasSavedGame: boolean;
}
