'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface LatLng {
  lat: number;
  lng: number;
}

interface CityWaypoint {
  name: string;
  lat: number;
  lng: number;
  year: number;
  context: string;
  region: string;
}

interface LeafletMapProps {
  location: string;
  coords: LatLng;
  visitedWaypoints: LatLng[];
}

// ---------------------------------------------------------------------------
// Historical city data for the full journey of San Martín
// ---------------------------------------------------------------------------
const JOURNEY_CITIES: CityWaypoint[] = [
  {
    name: 'Yapeyú',
    lat: -29.47,
    lng: -56.82,
    year: 1778,
    region: 'Misiones, Argentina',
    context:
      'Cuna de José de San Martín, a orillas del río Uruguay. Nació el 25 de febrero de 1778.',
  },
  {
    name: 'Buenos Aires',
    lat: -34.61,
    lng: -58.38,
    year: 1812,
    region: 'Argentina',
    context:
      'Capital del Virreinato del Río de la Plata. San Martín regresó aquí en 1812 para crear el Regimiento de Granaderos a Caballo.',
  },
  {
    name: 'San Lorenzo',
    lat: -32.75,
    lng: -60.73,
    year: 1813,
    region: 'Santa Fe, Argentina',
    context:
      'El 3 de febrero de 1813, los Granaderos obtuvieron su primera victoria en el Combate de San Lorenzo contra las fuerzas realistas.',
  },
  {
    name: 'Cádiz',
    lat: 36.53,
    lng: -6.30,
    year: 1791,
    region: 'España',
    context:
      'Puerto español desde donde San Martín partió a sus primeras campañas militares en África y la Península Ibérica.',
  },
  {
    name: 'Madrid',
    lat: 40.42,
    lng: -3.70,
    year: 1784,
    region: 'España',
    context:
      'En Madrid estudió en el Real Seminario de Nobles e ingresó al Regimiento de Murcia a los 11 años.',
  },
  {
    name: 'Londres',
    lat: 51.51,
    lng: -0.12,
    year: 1811,
    region: 'Inglaterra',
    context:
      'Sede de la Logia Lautaro, donde San Martín y Alvear conspiraron el regreso a América para liderar la independencia.',
  },
  {
    name: 'Mendoza',
    lat: -32.89,
    lng: -68.84,
    year: 1815,
    region: 'Cuyo, Argentina',
    context:
      'Base del Ejército de los Andes. San Martín organizó aquí durante dos años la expedición libertadora de Chile.',
  },
  {
    name: 'Cruce de los Andes',
    lat: -32.65,
    lng: -70.01,
    year: 1817,
    region: 'Cordillera',
    context:
      'En enero de 1817, 5.000 hombres cruzaron los Andes a más de 4.000 metros de altura en una de las mayores hazañas militares de la historia.',
  },
  {
    name: 'Santiago de Chile',
    lat: -33.45,
    lng: -70.67,
    year: 1817,
    region: 'Chile',
    context:
      'Liberada tras las batallas de Chacabuco (1817) y Maipú (1818), que aseguraron definitivamente la independencia de Chile.',
  },
  {
    name: 'Lima',
    lat: -12.05,
    lng: -77.04,
    year: 1821,
    region: 'Perú',
    context:
      'El 28 de julio de 1821 San Martín proclamó la Independencia del Perú en la Plaza Mayor y asumió como Protector Supremo.',
  },
  {
    name: 'Guayaquil',
    lat: -2.17,
    lng: -79.92,
    year: 1822,
    region: 'Ecuador',
    context:
      'Escenario de la histórica Entrevista de Guayaquil entre San Martín y Bolívar, el 26 y 27 de julio de 1822.',
  },
  {
    name: 'Montevideo',
    lat: -34.90,
    lng: -56.19,
    year: 1829,
    region: 'Uruguay',
    context:
      'San Martín llegó aquí en 1829 dispuesto a ofrecer su espada en la guerra con el Brasil, pero rechazó intervenir en la guerra civil.',
  },
  {
    name: 'Bruselas',
    lat: 50.85,
    lng: 4.35,
    year: 1824,
    region: 'Bélgica',
    context:
      'San Martín vivió en Bruselas durante su exilio europeo, redactando las Máximas para su hija Mercedes.',
  },
  {
    name: 'Boulogne-sur-Mer',
    lat: 50.73,
    lng: 1.60,
    year: 1850,
    region: 'Francia',
    context:
      'Última residencia del Libertador. Falleció aquí el 17 de agosto de 1850, a las tres de la tarde, rodeado de su hija Mercedes.',
  },
];

// ---------------------------------------------------------------------------
// SVG Marker Factory
// ---------------------------------------------------------------------------
function createCustomIcon(
  type: 'current' | 'visited' | 'future'
): L.DivIcon {
  const colors = {
    current: { fill: '#D4AF37', stroke: '#1B365D', ring: '#C0392B', size: 18 },
    visited: { fill: '#75AADB', stroke: '#1B365D', ring: '', size: 12 },
    future: { fill: '#e8e0cc', stroke: '#8899aa', ring: '', size: 9 },
  };
  const c = colors[type];

  const svg =
    type === 'current'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="${c.size * 2 + 8}" height="${c.size * 2 + 8}" viewBox="0 0 ${c.size * 2 + 8} ${c.size * 2 + 8}">
          <circle cx="${c.size + 4}" cy="${c.size + 4}" r="${c.size + 2}" fill="none" stroke="${c.ring}" stroke-width="2" opacity="0.5">
            <animate attributeName="r" values="${c.size};${c.size + 6};${c.size}" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${c.size + 4}" cy="${c.size + 4}" r="${c.size - 2}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"/>
          <text x="${c.size + 4}" y="${c.size + 8}" text-anchor="middle" font-size="12" font-family="serif">&#x2694;</text>
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="${c.size + 4}" height="${c.size + 4}" viewBox="0 0 ${c.size + 4} ${c.size + 4}">
          <circle cx="${(c.size + 4) / 2}" cy="${(c.size + 4) / 2}" r="${c.size / 2}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>
        </svg>`;

  const size =
    type === 'current' ? c.size * 2 + 8 : c.size + 4;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

// ---------------------------------------------------------------------------
// Camera controller — auto-flies to new location
// ---------------------------------------------------------------------------
interface FlyControllerProps {
  coords: LatLng;
}

function FlyController({ coords }: FlyControllerProps) {
  const map = useMap();
  const prevCoordsRef = useRef<LatLng | null>(null);

  useEffect(() => {
    const prev = prevCoordsRef.current;
    if (prev && prev.lat === coords.lat && prev.lng === coords.lng) return;

    prevCoordsRef.current = coords;

    // Choose zoom level based on geographic region
    let zoom = 5;
    if (coords.lat > 40) {
      // Europe
      zoom = 6;
    } else if (coords.lat > -5) {
      // Northern South America
      zoom = 5;
    } else if (coords.lat < -30 && coords.lng > -72 && coords.lng < -67) {
      // Andes crossing area
      zoom = 6;
    } else {
      zoom = 5;
    }

    map.flyTo([coords.lat, coords.lng], zoom, {
      animate: true,
      duration: 2.0,
      easeLinearity: 0.25,
    });
  }, [coords, map]);

  return null;
}

// ---------------------------------------------------------------------------
// Animated route drawn progressively between waypoints
// ---------------------------------------------------------------------------
interface AnimatedRouteProps {
  waypoints: LatLng[];
  current: LatLng;
}

function AnimatedRoute({ waypoints, current }: AnimatedRouteProps) {
  const [displayedPoints, setDisplayedPoints] = useState<LatLng[]>([]);

  useEffect(() => {
    const all: LatLng[] = [...waypoints];
    const last = all[all.length - 1];
    if (!last || last.lat !== current.lat || last.lng !== current.lng) {
      all.push(current);
    }

    if (all.length <= 1) {
      setDisplayedPoints(all);
      return;
    }

    const prevPoints = displayedPoints.length > 0 ? [...displayedPoints] : [all[0]];
    const startIdx = prevPoints.length - 1;
    const endPoint = all[all.length - 1];
    const lastKnown = prevPoints[prevPoints.length - 1];

    const steps = 30;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const t = step / steps;
      const interp: LatLng = {
        lat: lastKnown.lat + (endPoint.lat - lastKnown.lat) * t,
        lng: lastKnown.lng + (endPoint.lng - lastKnown.lng) * t,
      };
      setDisplayedPoints([...all.slice(0, startIdx + 1), interp]);

      if (step >= steps) {
        clearInterval(interval);
        setDisplayedPoints(all);
      }
    }, 50);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoints, current]);

  if (displayedPoints.length < 2) return null;

  const positions = displayedPoints.map((p) => [p.lat, p.lng] as [number, number]);

  return (
    <>
      {/* Glow shadow */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#D4AF37',
          weight: 6,
          opacity: 0.20,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
      {/* Dashed route */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#D4AF37',
          weight: 2.5,
          opacity: 0.90,
          dashArray: '8 6',
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main LeafletMap component
// ---------------------------------------------------------------------------
export const LeafletMap: React.FC<LeafletMapProps> = ({
  location,
  coords,
  visitedWaypoints,
}) => {
  const [tileError, setTileError] = useState(false);
  const handleTileError = useCallback(() => setTileError(true), []);

  const visitedSet = new Set(
    visitedWaypoints.map((w) => `${w.lat.toFixed(2)},${w.lng.toFixed(2)}`)
  );
  const currentKey = `${coords.lat.toFixed(2)},${coords.lng.toFixed(2)}`;

  const getMarkerType = (city: CityWaypoint): 'current' | 'visited' | 'future' => {
    const key = `${city.lat.toFixed(2)},${city.lng.toFixed(2)}`;
    if (key === currentKey) return 'current';
    if (visitedSet.has(key)) return 'visited';
    return 'future';
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        border: '2px solid #D4AF37',
        boxShadow: '0 0 0 3px rgba(212,175,55,0.15), 0 8px 32px rgba(27,54,93,0.35)',
        height: 'clamp(260px, 38vw, 480px)',
      }}
    >
      {/* Location badge */}
      <div
        className="absolute top-3 left-3 z-[400] flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-sm select-none"
        style={{
          background: 'rgba(27,54,93,0.90)',
          color: '#F5C518',
          border: '1px solid rgba(212,175,55,0.5)',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          boxShadow: '0 2px 10px rgba(0,0,0,0.45)',
        }}
      >
        <span style={{ color: '#75AADB', fontSize: '0.85rem' }}>📍</span>
        {location}
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-8 left-3 z-[400] flex flex-col gap-1.5 px-3 py-2.5 rounded-lg backdrop-blur-sm select-none"
        style={{
          background: 'rgba(15,33,65,0.88)',
          border: '1px solid rgba(212,175,55,0.3)',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.6rem',
          color: '#c8d8e8',
          boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
          minWidth: 140,
        }}
      >
        <div style={{ fontWeight: 700, color: '#D4AF37', marginBottom: 2 }}>
          Recorrido del Libertador
        </div>
        {[
          { color: '#D4AF37', size: 10, label: 'Posición actual' },
          { color: '#75AADB', size: 8, label: 'Visitado' },
          { color: '#c8d8e8', size: 6, label: 'Por visitar' },
        ].map(({ color, size, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
                flexShrink: 0,
                border: '1px solid rgba(27,54,93,0.6)',
              }}
            />
            <span>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            style={{
              width: 18,
              height: 2,
              background: '#D4AF37',
              display: 'inline-block',
              flexShrink: 0,
              opacity: 0.85,
            }}
          />
          <span>Ruta histórica</span>
        </div>
      </div>

      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl
        scrollWheelZoom
        attributionControl
      >
        {!tileError ? (
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, via <a href="https://stadiamaps.com/">Stadia Maps</a>'
            maxZoom={16}
            eventHandlers={{ tileerror: handleTileError }}
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
            className="map-tile-vintage"
          />
        )}

        <AnimatedRoute waypoints={visitedWaypoints} current={coords} />

        {JOURNEY_CITIES.map((city) => {
          const markerType = getMarkerType(city);
          return (
            <Marker
              key={city.name}
              position={[city.lat, city.lng]}
              icon={createCustomIcon(markerType)}
            >
              <Popup maxWidth={220} className="popup-libertador">
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #1B365D 0%, #0f2141 100%)',
                    color: '#e8e0cc',
                    borderRadius: 8,
                    padding: '12px 14px',
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      color: '#D4AF37',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      marginBottom: 3,
                    }}
                  >
                    ⚔ {city.name}
                  </div>
                  <div
                    style={{
                      color: '#75AADB',
                      fontSize: '0.65rem',
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    {city.region} · {city.year}
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      lineHeight: 1.55,
                      color: '#ccd8e8',
                      fontFamily: "'Merriweather', serif",
                    }}
                  >
                    {city.context}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <FlyController coords={coords} />
      </MapContainer>
    </div>
  );
};
