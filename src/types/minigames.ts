import { PlayerStats } from '@/types/game';

export type MinigameId =
  | 'tateti'
  | 'carga_caballeria'
  | 'organizar_ejercito'
  | 'memoria_espia'
  | 'mensaje_cifrado'
  | 'logistica_cruce'
  | 'reflejos_mando';

export interface EnemyGeneral {
  name: string;
  title: string;
  portrait: string; // Emoji or SVG avatar representation
  armyName: string;
  reactionQuotes: {
    intro: string;
    taunt: string;
    defeat: string;
    victory: string;
  };
}

export interface BattleMinigameConfig {
  id: MinigameId;
  battleTitle: string;
  location: string;
  year: number;
  enemy: EnemyGeneral;
  historicalContext: string;
  objectiveText: string;
  timeLimitSeconds?: number;
  baseDifficulty: 'fácil' | 'normal' | 'difícil' | 'épico';
}

export interface MinigameResult {
  victory: boolean;
  score: number; // 0 - 100
  statDeltas: Partial<PlayerStats>;
  headline: string;
  narrativeSummary: string;
  achievementUnlockedId?: string;
}
