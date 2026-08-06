import { PlayerStats, StatKey } from '@/types/game';

export interface StatRankInfo {
  label: string;
  colorClass: string;
  badgeBg: string;
}

/**
 * Returns rank tier (Muy malo -> Legendario) based on stat value (0 - 100)
 */
export function getStatRank(value: number): StatRankInfo {
  if (value >= 95) {
    return {
      label: 'Legendario 👑',
      colorClass: 'text-amber-300 font-extrabold animate-pulse',
      badgeBg: 'bg-amber-950/80 border-amber-400',
    };
  }
  if (value >= 86) {
    return {
      label: 'Extraordinario',
      colorClass: 'text-sky-300 font-bold',
      badgeBg: 'bg-sky-950/80 border-sky-400',
    };
  }
  if (value >= 76) {
    return {
      label: 'Excelente',
      colorClass: 'text-emerald-300 font-bold',
      badgeBg: 'bg-emerald-950/80 border-emerald-400',
    };
  }
  if (value >= 61) {
    return {
      label: 'Bueno',
      colorClass: 'text-celeste-brillante font-semibold',
      badgeBg: 'bg-celeste-patrio/20 border-celeste-patrio',
    };
  }
  if (value >= 41) {
    return {
      label: 'Promedio',
      colorClass: 'text-yellow-200 font-normal',
      badgeBg: 'bg-yellow-950/40 border-yellow-500/40',
    };
  }
  if (value >= 21) {
    return {
      label: 'Bajo',
      colorClass: 'text-orange-400 font-normal',
      badgeBg: 'bg-orange-950/40 border-orange-500/40',
    };
  }
  return {
    label: 'Muy malo',
    colorClass: 'text-red-400 font-bold',
    badgeBg: 'bg-red-950/60 border-red-500',
  };
}

/**
 * Applies diminishing returns and specialization trade-offs to raw stat changes.
 *
 * Diminishing Returns logic for INCREASES:
 * - Current < 50: 100% gain
 * - Current 50..69: 70% gain (-30%)
 * - Current 70..84: 40% gain (-60%)
 * - Current 85..94: 20% gain (-80%)
 * - Current >= 95: 5% gain (-95%)
 *
 * Overall Mean Character Dampener:
 * - If overall average of all 9 stats > 72, gain multiplier is reduced by an extra 20%.
 *
 * DECREASES (penalties/losses) are NOT diminished (applied 100%).
 */
export function applyBalancedStatDelta(
  currentStats: PlayerStats,
  rawDeltas: Partial<PlayerStats>
): { updatedStats: PlayerStats; appliedDeltas: Array<{ stat: StatKey; value: number }> } {
  const updatedStats: PlayerStats = { ...currentStats };
  const appliedDeltas: Array<{ stat: StatKey; value: number }> = [];

  // Calculate current overall average
  const vals = Object.values(currentStats);
  const overallAvg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 50;

  // Global mean dampener factor
  const globalDampener = overallAvg > 72 ? 0.8 : 1.0;

  // Process each delta
  (Object.keys(rawDeltas) as StatKey[]).forEach((key) => {
    const rawVal = rawDeltas[key];
    if (rawVal === undefined || rawVal === 0) return;

    const currentVal = currentStats[key] ?? 50;

    let finalValChange = 0;

    if (rawVal > 0) {
      // Apply diminishing returns multiplier for stat gains
      let gainMult = 1.0;
      if (currentVal >= 95) gainMult = 0.05;
      else if (currentVal >= 85) gainMult = 0.20;
      else if (currentVal >= 70) gainMult = 0.40;
      else if (currentVal >= 50) gainMult = 0.70;

      // Apply gain, rounded to at least 1 if rawVal >= 1 and currentVal < 95
      const calculatedGain = rawVal * gainMult * globalDampener;
      finalValChange = Math.max(1, Math.round(calculatedGain));
      if (currentVal >= 95 && rawVal < 4) {
        finalValChange = 0; // Extremely hard to gain at 95+
      }
    } else {
      // Losses are fully applied
      finalValChange = rawVal;
    }

    if (finalValChange !== 0) {
      updatedStats[key] = Math.max(0, Math.min(100, currentVal + finalValChange));
      appliedDeltas.push({ stat: key, value: finalValChange });
    }
  });

  return { updatedStats, appliedDeltas };
}
