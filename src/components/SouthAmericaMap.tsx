'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapCoordinates } from '@/types/game';

interface SouthAmericaMapProps {
  location: string;
  coords: MapCoordinates;
  previousCoords?: MapCoordinates;
}

/**
 * SouthAmericaMap — Cartografía Histórica Real
 * 
 * ViewBox: 0 0 280 220
 * Left region (x 0-185): América del Sur
 * Right region (x 185-280): Europa occidental (España/Francia)
 * 
 * Coordinates are calibrated to match real geography.
 */
export const SouthAmericaMap: React.FC<SouthAmericaMapProps> = ({
  location,
  coords,
  previousCoords,
}) => {
  // Known city pins (x,y in SVG viewBox units 0-280 × 0-220)
  const cities = [
    { name: 'Yapeyú',          region: 'Corrientes',   x: 127, y: 118 },
    { name: 'Buenos Aires',    region: 'Argentina',    x: 122, y: 137 },
    { name: 'San Lorenzo',     region: 'Santa Fe',     x: 119, y: 127 },
    { name: 'Mendoza',         region: 'Cuyo',         x: 98,  y: 134 },
    { name: 'Santiago',        region: 'Chile',        x: 84,  y: 136 },
    { name: 'Lima',            region: 'Perú',         x: 70,  y: 90  },
    { name: 'Guayaquil',       region: 'Ecuador',      x: 62,  y: 72  },
    { name: 'Potosí',          region: 'Bolivia',      x: 103, y: 105 },
    { name: 'Asunción',        region: 'Paraguay',     x: 128, y: 110 },
    { name: 'Montevideo',      region: 'Uruguay',      x: 130, y: 140 },
    { name: 'Cádiz',           region: 'España',       x: 217, y: 60  },
    { name: 'Madrid',          region: 'España',       x: 224, y: 52  },
    { name: 'Boulogne-sur-Mer',region: 'Francia',      x: 237, y: 36  },
  ];

  // Build travel path: the historical route of San Martín
  const travelPath = [
    { x: 127, y: 118 }, // Yapeyú
    { x: 122, y: 137 }, // Buenos Aires
    { x: 217, y: 60  }, // Cádiz
    { x: 224, y: 52  }, // Madrid
    { x: 122, y: 137 }, // Buenos Aires
    { x: 119, y: 127 }, // San Lorenzo
    { x: 98,  y: 134 }, // Mendoza
    { x: 84,  y: 136 }, // Santiago
    { x: 70,  y: 90  }, // Lima
    { x: 62,  y: 72  }, // Guayaquil
    { x: 98,  y: 134 }, // Mendoza (retiro)
    { x: 122, y: 137 }, // Buenos Aires
    { x: 237, y: 36  }, // Boulogne-sur-Mer
  ];

  const pathD = travelPath.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    // curve through the ocean between continents
    const prev = travelPath[i - 1];
    const cx = (prev.x + pt.x) / 2;
    const cy = (prev.y + pt.y) / 2;
    return `${acc} Q ${cx} ${cy} ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-patrio border-2 border-celeste-patrio"
      style={{ background: 'linear-gradient(160deg, #dbedf9 0%, #c8e3f5 40%, #b8d9f2 100%)' }}
    >
      {/* Map Legend */}
      <div className="absolute top-2 left-2 z-20 flex items-center space-x-1.5 bg-azul-profundo/90 text-blanco-patrio text-[9px] font-cinzel font-bold px-2 py-1 rounded-md border border-dorado-sol/60 shadow-md">
        <div className="w-2.5 h-2.5 rounded-full escarapela-crest flex-shrink-0" />
        <span>Cartografía Histórica — Virreinato del Río de la Plata</span>
      </div>

      {/* Location Badge */}
      <div className="absolute top-2 right-2 z-20 bg-rojo-patrio text-blanco-patrio text-[9px] font-cinzel font-bold px-2.5 py-1 rounded-md shadow border border-red-300/40 max-w-[140px] truncate">
        📍 {location}
      </div>

      <svg
        viewBox="0 0 280 220"
        className="w-full"
        style={{ display: 'block', minHeight: '180px', maxHeight: '280px' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ocean gradient */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#c0dff5" />
            <stop offset="100%" stopColor="#a8d0ed" />
          </linearGradient>
          {/* Land gradient */}
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#e8f4e8" />
            <stop offset="100%" stopColor="#d4eccc" />
          </linearGradient>
          {/* Andes gradient */}
          <linearGradient id="andesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c8d8e8" />
            <stop offset="100%" stopColor="#b8c8d8" />
          </linearGradient>
          {/* Route gradient */}
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#75AADB" />
            <stop offset="50%"  stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C0392B" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="markerGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ===================== OCÉANO ===================== */}
        <rect x="0" y="0" width="280" height="220" fill="url(#oceanGrad)" />

        {/* Líneas de latitud (cartografía histórica) */}
        {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map(y => (
          <line key={y} x1="0" y1={y} x2="280" y2={y}
            stroke="#1B365D" strokeWidth="0.15" opacity="0.15" strokeDasharray="2 4" />
        ))}
        {[0, 40, 80, 120, 160, 200, 240, 280].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="220"
            stroke="#1B365D" strokeWidth="0.15" opacity="0.15" strokeDasharray="2 4" />
        ))}

        {/* Ecuator line */}
        <line x1="0" y1="68" x2="280" y2="68"
          stroke="#1B365D" strokeWidth="0.4" opacity="0.25" strokeDasharray="4 3" />
        <text x="2" y="67" fontSize="3.5" fill="#1B365D" opacity="0.4" fontFamily="Cinzel">Ecuador</text>

        {/* ===================== AMÉRICA DEL SUR ===================== */}
        {/* Masa continental principal — aproximación real */}
        <path
          d={`
            M 88  4
            L 110 3
            L 130 8
            L 142 15
            L 148 26
            L 150 36
            L 155 45
            L 158 55
            L 160 65
            L 155 75
            L 148 82
            L 140 88
            L 135 95
            L 138 105
            L 136 115
            L 130 120
            L 128 128
            L 126 140
            L 120 155
            L 110 170
            L 100 183
            L 90  192
            L 80  196
            L 72  188
            L 68  175
            L 65  160
            L 58  148
            L 50  138
            L 42  125
            L 36  112
            L 33  97
            L 35  85
            L 40  73
            L 48  63
            L 55  54
            L 60  45
            L 63  35
            L 68  26
            L 75  16
            L 82  8
            Z
          `}
          fill="url(#landGrad)"
          stroke="#1B365D"
          strokeWidth="0.8"
          opacity="0.95"
        />

        {/* Patagonia sur */}
        <path
          d={`
            M 90 192
            L 80 196
            L 72 188
            L 68 175
            L 75 180
            L 82 186
            Z
          `}
          fill="#d0e8c8"
          stroke="#1B365D"
          strokeWidth="0.5"
        />

        {/* Tierra del Fuego */}
        <path
          d="M 80 198 L 88 203 L 85 208 L 78 205 Z"
          fill="#c8e0c0"
          stroke="#1B365D"
          strokeWidth="0.5"
        />

        {/* ===== CORDILLERA DE LOS ANDES ===== */}
        <path
          d="M 68 26 Q 58 55 50 85 Q 42 115 45 145 Q 48 165 52 178"
          fill="none"
          stroke="#8899aa"
          strokeWidth="3.5"
          opacity="0.55"
          strokeLinecap="round"
        />
        {/* Picos nevados */}
        <path
          d="M 60 55 L 57 49 L 54 55 M 52 75 L 49 68 L 46 75 M 47 100 L 44 92 L 41 100"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.8"
          strokeLinecap="round"
        />
        <text x="38" y="90" fontSize="4" fill="#5A6A7A" fontFamily="Cinzel" fontWeight="bold"
          transform="rotate(-60 38 90)" opacity="0.65">
          ANDES
        </text>

        {/* ===== RÍO DE LA PLATA ===== */}
        <path
          d="M 122 137 Q 126 140 132 140 Q 136 140 138 143"
          fill="#75AADB"
          stroke="#5592C8"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* ===== RÍO PARANÁ ===== */}
        <path
          d="M 127 118 Q 125 125 123 133 Q 121 136 122 137"
          fill="none"
          stroke="#75AADB"
          strokeWidth="1.2"
          opacity="0.7"
        />

        {/* ===== PAMPA (región de pastizales) ===== */}
        <ellipse cx="118" cy="142" rx="15" ry="8" fill="#c8e4b0" opacity="0.4" />
        <text x="108" y="146" fontSize="3.2" fill="#4A7A30" fontFamily="Cinzel" opacity="0.6">PAMPAS</text>

        {/* Labels continentales */}
        <text x="100" y="55" fontSize="5.5" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.45" transform="rotate(-5 100 55)">BRASIL</text>
        <text x="95" y="100" fontSize="4.5" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5">ARGENTINA</text>
        <text x="44" y="78" fontSize="3.5" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5" transform="rotate(-70 44 78)">CHILE</text>
        <text x="58" y="68" fontSize="3.8" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5">PERÚ</text>
        <text x="95" y="82" fontSize="3.5" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5">BOLIVIA</text>
        <text x="128" y="96" fontSize="3.2" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5">PARAGUAY</text>
        <text x="128" y="132" fontSize="3" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.5">URUGUAY</text>

        {/* ===================== EUROPA ===================== */}
        {/* Separador: Océano Atlántico label */}
        <text x="175" y="115" fontSize="4.8" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.2" transform="rotate(-90 175 115)">ATLÁNTICO</text>

        {/* Península Ibérica (España/Portugal) */}
        <path
          d={`
            M 210 40
            L 220 36
            L 238 38
            L 244 44
            L 244 56
            L 240 64
            L 232 68
            L 220 66
            L 212 60
            L 208 52
            Z
          `}
          fill="url(#landGrad)"
          stroke="#1B365D"
          strokeWidth="0.7"
          opacity="0.9"
        />
        <text x="218" y="58" fontSize="3.8" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.7">ESPAÑA</text>

        {/* Francia */}
        <path
          d={`
            M 228 16
            L 248 14
            L 260 22
            L 258 36
            L 248 40
            L 238 38
            L 228 32
            Z
          `}
          fill="url(#landGrad)"
          stroke="#1B365D"
          strokeWidth="0.7"
          opacity="0.9"
        />
        <text x="240" y="32" fontSize="3.5" fontFamily="Cinzel" fontWeight="bold"
          fill="#1B365D" opacity="0.7">FRANCIA</text>

        {/* Estrecho de Gibraltar */}
        <line x1="218" y1="66" x2="214" y2="70" stroke="#1B365D" strokeWidth="0.4" opacity="0.4" />
        <text x="205" y="74" fontSize="2.5" fill="#1B365D" opacity="0.45" fontFamily="Cinzel">Gibraltar</text>

        {/* ===================== RUTA HISTÓRICA ===================== */}
        {/* Historical path — permanent faint background route */}
        <path
          d={pathD}
          fill="none"
          stroke="#75AADB"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          opacity="0.3"
        />

        {/* Current travel segment — animated */}
        {previousCoords && (
          <motion.path
            d={`M ${previousCoords.x} ${previousCoords.y} Q ${(previousCoords.x + coords.x) / 2} ${Math.min(previousCoords.y, coords.y) - 15} ${coords.x} ${coords.y}`}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
          />
        )}

        {/* ===================== CITY MARKERS ===================== */}
        {cities.map((city) => {
          const distX = Math.abs(city.x - coords.x);
          const distY = Math.abs(city.y - coords.y);
          const isCurrent = distX < 7 && distY < 7;

          return (
            <g key={city.name}>
              {isCurrent ? (
                <>
                  {/* Pulse ring for current location */}
                  <motion.circle
                    cx={city.x} cy={city.y} r={5}
                    fill="none"
                    stroke="#C0392B"
                    strokeWidth="1"
                    opacity={0.6}
                    animate={{ r: [5, 9, 5], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle
                    cx={city.x} cy={city.y} r={3.5}
                    fill="#C0392B"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                    filter="url(#markerGlow)"
                  />
                  {/* City label for current */}
                  <rect
                    x={city.x + 5} y={city.y - 7}
                    width={city.name.length * 3.2 + 4} height={10}
                    rx={2} fill="#1B365D" opacity={0.9}
                  />
                  <text
                    x={city.x + 7} y={city.y + 0.5}
                    fontSize="3.8" fontFamily="Cinzel" fontWeight="bold"
                    fill="#F5C518"
                  >
                    {city.name}
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx={city.x} cy={city.y} r={2}
                    fill="#D4AF37"
                    stroke="#1B365D"
                    strokeWidth="0.8"
                    opacity={0.8}
                  />
                  <text
                    x={city.x + 3} y={city.y + 1.5}
                    fontSize="3" fontFamily="Cinzel"
                    fill="#1B365D" opacity={0.55}
                  >
                    {city.name}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* ===================== ANIMATED TROOPER ===================== */}
        <motion.g
          initial={{
            x: previousCoords ? previousCoords.x - coords.x : 0,
            y: previousCoords ? previousCoords.y - coords.y : 0,
          }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
          style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
        >
          {/* Horse + rider icon at current location */}
          <circle
            cx={coords.x} cy={coords.y} r={5}
            fill="#D4AF37"
            stroke="#1B365D"
            strokeWidth="1.2"
            filter="url(#markerGlow)"
          />
          <text
            x={coords.x} y={coords.y + 2}
            fontSize="5" textAnchor="middle"
          >
            🐎
          </text>
        </motion.g>

        {/* Compass rose */}
        <g transform="translate(262, 190)">
          <circle cx="0" cy="0" r="10" fill="#1B365D" opacity="0.85" stroke="#D4AF37" strokeWidth="0.8"/>
          <text x="0" y="-5"  fontSize="4" fill="#D4AF37" textAnchor="middle" fontFamily="Cinzel" fontWeight="bold">N</text>
          <text x="0" y="7"   fontSize="3.5" fill="#D4AF37" textAnchor="middle" fontFamily="Cinzel">S</text>
          <text x="-6" y="1.5" fontSize="3.5" fill="#D4AF37" textAnchor="middle" fontFamily="Cinzel">O</text>
          <text x="6"  y="1.5" fontSize="3.5" fill="#D4AF37" textAnchor="middle" fontFamily="Cinzel">E</text>
          <line x1="0" y1="-8" x2="0" y2="8"  stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          <line x1="-8" y1="0" x2="8" y2="0"  stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
        </g>

        {/* Scale bar */}
        <g transform="translate(8, 208)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#1B365D" strokeWidth="1" opacity="0.5"/>
          <line x1="0" y1="-2" x2="0" y2="2" stroke="#1B365D" strokeWidth="1" opacity="0.5"/>
          <line x1="30" y1="-2" x2="30" y2="2" stroke="#1B365D" strokeWidth="1" opacity="0.5"/>
          <text x="15" y="-3" fontSize="3" fill="#1B365D" opacity="0.5" textAnchor="middle" fontFamily="Cinzel">
            1000 km
          </text>
        </g>

      </svg>
    </div>
  );
};
