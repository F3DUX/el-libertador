// ============================================================
//  backgroundConfig.ts — Region detection & visual config
//  EL LIBERTADOR — Living Background System
// ============================================================

export type RegionId =
  | 'misiones'
  | 'buenos_aires'
  | 'cuyo'
  | 'andes'
  | 'chile'
  | 'peru'
  | 'europa';

export interface SkyPalette {
  /** Dawn gradient stops */
  dawn: [string, string, string];
  /** Day gradient stops */
  day: [string, string, string];
  /** Dusk gradient stops */
  dusk: [string, string, string];
  /** Night gradient stops */
  night: [string, string, string];
}

export interface RegionConfig {
  id: RegionId;
  label: string;
  /** Mountain silhouette heights [far, mid, near] as 0–1 fraction of canvas height */
  mountainHeights: [number, number, number];
  /** Primary mountain fill colors [far, mid, near] */
  mountainColors: [string, string, string];
  /** Whether to draw snow caps on mountains */
  snowCaps: boolean;
  /** Sky color palette */
  sky: SkyPalette;
  /** Ground / horizon color */
  groundColor: string;
  /** Landscape type for the foreground SVG */
  landscape: 'pampa' | 'selva' | 'andes_valley' | 'andean_cross' | 'coastal' | 'altiplano' | 'european';
  /** Particle type to spawn */
  particles: 'dust' | 'leaves' | 'snow' | 'rain' | 'petals';
  /** Ambient sound label (for future Howler integration) */
  ambientSound: string;
  /** Fog/mist opacity (0–1) */
  mistOpacity: number;
  /** Wind strength for flag and vegetation (0–1) */
  windStrength: number;
  /** Show gaucho ambient character */
  showGaucho: boolean;
  /** Show condor ambient character */
  showCondor: boolean;
  /** Show birds flock */
  showBirds: boolean;
}

// ──────────────────────────────────────────────────────────────
//  REGION CONFIGS
// ──────────────────────────────────────────────────────────────

export const REGION_CONFIGS: Record<RegionId, RegionConfig> = {
  misiones: {
    id: 'misiones',
    label: 'Misiones',
    mountainHeights: [0.45, 0.55, 0.62],
    mountainColors: ['#2d6a4f', '#1b4332', '#0d2b1a'],
    snowCaps: false,
    sky: {
      dawn:  ['#f4a261', '#e76f51', '#264653'],
      day:   ['#90e0ef', '#caf0f8', '#90e0ef'],
      dusk:  ['#e9c46a', '#f4a261', '#264653'],
      night: ['#0a1628', '#122244', '#0a1628'],
    },
    groundColor: '#2d6a4f',
    landscape: 'selva',
    particles: 'leaves',
    ambientSound: 'jungle',
    mistOpacity: 0.35,
    windStrength: 0.4,
    showGaucho: false,
    showCondor: false,
    showBirds: true,
  },

  buenos_aires: {
    id: 'buenos_aires',
    label: 'Buenos Aires',
    mountainHeights: [0.15, 0.22, 0.30],
    mountainColors: ['#adb5bd', '#6c757d', '#495057'],
    snowCaps: false,
    sky: {
      dawn:  ['#ffd166', '#ef9d6b', '#457b9d'],
      day:   ['#75aadb', '#c8e6f5', '#75aadb'],
      dusk:  ['#f4a261', '#e63946', '#1d3557'],
      night: ['#0a1628', '#1d3557', '#0a1628'],
    },
    groundColor: '#7fb069',
    landscape: 'pampa',
    particles: 'dust',
    ambientSound: 'port',
    mistOpacity: 0.1,
    windStrength: 0.6,
    showGaucho: true,
    showCondor: false,
    showBirds: true,
  },

  cuyo: {
    id: 'cuyo',
    label: 'Cuyo / Mendoza',
    mountainHeights: [0.50, 0.60, 0.70],
    mountainColors: ['#8d6e63', '#6d4c41', '#4e342e'],
    snowCaps: true,
    sky: {
      dawn:  ['#f9c784', '#f48c5a', '#3d5a80'],
      day:   ['#75aadb', '#aed9f0', '#75aadb'],
      dusk:  ['#e07a5f', '#f2cc8f', '#3d405b'],
      night: ['#0a1628', '#1b2a4a', '#0a1628'],
    },
    groundColor: '#8fbc8f',
    landscape: 'andes_valley',
    particles: 'dust',
    ambientSound: 'mountain_wind',
    mistOpacity: 0.18,
    windStrength: 0.75,
    showGaucho: true,
    showCondor: true,
    showBirds: false,
  },

  andes: {
    id: 'andes',
    label: 'Cordillera de los Andes',
    mountainHeights: [0.62, 0.72, 0.82],
    mountainColors: ['#adb5bd', '#6c757d', '#495057'],
    snowCaps: true,
    sky: {
      dawn:  ['#caf0f8', '#90e0ef', '#023e8a'],
      day:   ['#90e0ef', '#caf0f8', '#90e0ef'],
      dusk:  ['#ffd166', '#ef9d6b', '#073b6f'],
      night: ['#03045e', '#023e8a', '#03045e'],
    },
    groundColor: '#e0e0e0',
    landscape: 'andean_cross',
    particles: 'snow',
    ambientSound: 'andean_wind',
    mistOpacity: 0.45,
    windStrength: 0.9,
    showGaucho: false,
    showCondor: true,
    showBirds: false,
  },

  chile: {
    id: 'chile',
    label: 'Chile',
    mountainHeights: [0.40, 0.52, 0.62],
    mountainColors: ['#52796f', '#354f52', '#2f3e46'],
    snowCaps: true,
    sky: {
      dawn:  ['#ffd166', '#ef9d6b', '#2b6cb0'],
      day:   ['#48cae4', '#90e0ef', '#48cae4'],
      dusk:  ['#f4a261', '#e63946', '#023e8a'],
      night: ['#0a1628', '#023e8a', '#0a1628'],
    },
    groundColor: '#52796f',
    landscape: 'coastal',
    particles: 'leaves',
    ambientSound: 'coastal_wind',
    mistOpacity: 0.22,
    windStrength: 0.7,
    showGaucho: false,
    showCondor: true,
    showBirds: true,
  },

  peru: {
    id: 'peru',
    label: 'Perú',
    mountainHeights: [0.45, 0.58, 0.65],
    mountainColors: ['#b5838d', '#6d6875', '#4a4e69'],
    snowCaps: false,
    sky: {
      dawn:  ['#f4a261', '#e76f51', '#4a4e69'],
      day:   ['#87c2e0', '#b0d4e8', '#87c2e0'],
      dusk:  ['#e9c46a', '#f4a261', '#4a4e69'],
      night: ['#0a1628', '#1b2a4a', '#0a1628'],
    },
    groundColor: '#d4a574',
    landscape: 'altiplano',
    particles: 'dust',
    ambientSound: 'altiplano_wind',
    mistOpacity: 0.28,
    windStrength: 0.65,
    showGaucho: false,
    showCondor: true,
    showBirds: false,
  },

  europa: {
    id: 'europa',
    label: 'Europa',
    mountainHeights: [0.20, 0.30, 0.38],
    mountainColors: ['#a8c5da', '#8fa9b8', '#6d8799'],
    snowCaps: false,
    sky: {
      dawn:  ['#f9e4b7', '#f2c98a', '#5b7a9b'],
      day:   ['#87ceeb', '#b0d8f0', '#87ceeb'],
      dusk:  ['#ffb347', '#ff6b6b', '#4a4e69'],
      night: ['#1a1a2e', '#16213e', '#1a1a2e'],
    },
    groundColor: '#6a8f4e',
    landscape: 'european',
    particles: 'petals',
    ambientSound: 'european_town',
    mistOpacity: 0.15,
    windStrength: 0.45,
    showGaucho: false,
    showCondor: false,
    showBirds: true,
  },
};

// ──────────────────────────────────────────────────────────────
//  REGION DETECTION
// ──────────────────────────────────────────────────────────────

export function detectRegion(
  coords: { lat: number; lng: number } | null,
  location: string,
): RegionConfig {
  const locLower = location.toLowerCase();

  // Fast string match first
  if (locLower.includes('europa') || locLower.includes('boulogne') || locLower.includes('bruselas') || locLower.includes('paris') || locLower.includes('grand bourg')) {
    return REGION_CONFIGS.europa;
  }
  if (locLower.includes('yapeyú') || locLower.includes('yapeyu') || locLower.includes('misiones') || locLower.includes('corrientes')) {
    return REGION_CONFIGS.misiones;
  }
  if (locLower.includes('andes') || locLower.includes('uspallata') || locLower.includes('patos') || locLower.includes('cruce')) {
    return REGION_CONFIGS.andes;
  }
  if (locLower.includes('mendoza') || locLower.includes('cuyo') || locLower.includes('plumerillo')) {
    return REGION_CONFIGS.cuyo;
  }
  if (locLower.includes('lima') || locLower.includes('pisco') || locLower.includes('guayaquil') || locLower.includes('perú') || locLower.includes('peru')) {
    return REGION_CONFIGS.peru;
  }
  if (locLower.includes('santiago') || locLower.includes('chile') || locLower.includes('chacabuco') || locLower.includes('maipú') || locLower.includes('maipu') || locLower.includes('valparaíso')) {
    return REGION_CONFIGS.chile;
  }

  // Coordinate-based fallback
  if (coords) {
    const { lat, lng } = coords;
    if (lat > 40) return REGION_CONFIGS.europa;
    if (lat > -28) return REGION_CONFIGS.misiones;
    if (lat < -10 && lng > -78) return REGION_CONFIGS.peru;
    if (lng < -69 && lat > -35 && lat < -30) return REGION_CONFIGS.andes;
    if (lng < -69 && lat < -30) return REGION_CONFIGS.chile;
    if (lng < -65 && lat > -36 && lat < -30) return REGION_CONFIGS.cuyo;
    return REGION_CONFIGS.buenos_aires;
  }

  return REGION_CONFIGS.buenos_aires;
}

// ──────────────────────────────────────────────────────────────
//  DAY/NIGHT CYCLE UTILS
// ──────────────────────────────────────────────────────────────

export type DayPhase = 'dawn' | 'day' | 'dusk' | 'night';

/** Returns 0–1 cycle progress from game start. Cycle = 8 minutes real time. */
export function getDayProgress(): number {
  const CYCLE_MS = 8 * 60 * 1000;
  return (Date.now() % CYCLE_MS) / CYCLE_MS;
}

/** Maps 0–1 cycle progress to a DayPhase */
export function getDayPhase(progress: number): DayPhase {
  if (progress < 0.12) return 'dawn';
  if (progress < 0.55) return 'day';
  if (progress < 0.72) return 'dusk';
  return 'night';
}

/** Linearly interpolates between two hex colors */
export function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const ca = parse(a);
  const cb = parse(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
