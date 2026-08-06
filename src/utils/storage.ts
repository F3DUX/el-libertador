import { GameState } from '@/types/game';

const SAVE_KEY = 'el_libertador_save_v1';
const ACHIEVEMENTS_KEY = 'el_libertador_achievements';
const ENCYCLOPEDIA_KEY = 'el_libertador_encyclopedia';

export const saveGameState = (state: GameState): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const dataToSave = {
      ...state,
      hasSavedGame: true
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
    
    // Persist global unlocked achievements & encyclopedia across runs
    if (state.unlockedAchievements.length > 0) {
      const existing = getUnlockedAchievements();
      const merged = Array.from(new Set([...existing, ...state.unlockedAchievements]));
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(merged));
    }

    if (state.unlockedEncyclopedia.length > 0) {
      const existing = getUnlockedEncyclopedia();
      const merged = Array.from(new Set([...existing, ...state.unlockedEncyclopedia]));
      localStorage.setItem(ENCYCLOPEDIA_KEY, JSON.stringify(merged));
    }

    return true;
  } catch (e) {
    console.error('Failed to save game state:', e);
    return false;
  }
};

export const loadGameState = (): GameState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch (e) {
    console.error('Failed to load game state:', e);
    return null;
  }
};

export const clearGameState = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.error('Failed to clear saved game:', e);
  }
};

export const getUnlockedAchievements = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const getUnlockedEncyclopedia = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ENCYCLOPEDIA_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};
