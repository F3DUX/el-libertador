import { EncyclopediaEntry } from '@/types/game';

export const INITIAL_ENCYCLOPEDIA: EncyclopediaEntry[] = [
  {
    id: 'enc_san_martin',
    category: 'personaje',
    title: 'José Francisco de San Martín',
    subtitle: 'El Padre de la Patria y Libertador de América',
    date: '1778 — 1850',
    location: 'Yapeyú / Boulogne-sur-Mer',
    description: 'Militar y político argentino, una de las figuras más veneradas de la emancipación sudamericana. Lideró las campañas de independencia de Argentina, Chile y Perú.',
    historicalFact: 'San Martín combatió durante más de 20 años en el ejército español librando combates contra la Francia napoleónica antes de volver a su patria natal.',
    unlocked: true
  },
  {
    id: 'enc_yapeyu',
    category: 'ciudad',
    title: 'Yapeyú',
    subtitle: 'Cuna del Libertador',
    date: 'fundada en 1626',
    location: 'Gobernación de las Misiones',
    description: 'Pueblo fundado como reducción jesuítica a orillas del río Uruguay. Allí nació José de San Martín el 25 de febrero de 1778, rodeado de naturaleza guaraní.',
    historicalFact: 'Su padre, Juan de San Martín, era el gobernador del departamento jesuítico de Yapeyú.',
    unlocked: true
  },
  {
    id: 'enc_bailen',
    category: 'batalla',
    title: 'Batalla de Bailén',
    subtitle: 'Primera gran derrota militar del imperio napoleónico',
    date: '19 de julio de 1808',
    location: 'Jaén, España',
    description: 'Encuentro bélico donde el ejército español derrotó a las tropas francesas del General Dupont. San Martín se destacó por su valentía táctica.',
    historicalFact: 'Por su heroico desempeño en Bailén, San Martín fue ascendido a Teniente Coronel y condecorado con medalla de oro.',
    unlocked: false
  },
  {
    id: 'enc_granaderos',
    category: 'acontecimiento',
    title: 'Regimiento de Granaderos a Caballo',
    subtitle: 'Cuerpo militar de élite sudamericano',
    date: '16 de marzo de 1812',
    location: 'Buenos Aires',
    description: 'Unidad militar creada por San Martín caracterizada por su férrea disciplina, destreza ecuestre y código de honor inquebrantable.',
    historicalFact: 'El sable corvo comprado por San Martín en Londres se convirtió en el arma emblemática del regimiento.',
    unlocked: false
  },
  {
    id: 'enc_san_lorenzo',
    category: 'batalla',
    title: 'Combate de San Lorenzo',
    subtitle: 'Bautismo de fuego de los Granaderos',
    date: '3 de febrero de 1813',
    location: 'San Lorenzo, Santa Fe',
    description: 'Enfrentamiento fulminante donde 120 granaderos emboscaron a una expedición realista realista proveniente de Montevideo.',
    historicalFact: 'Cuando el caballo de San Martín fue derribado aprisionándole la pierna, el sargento Juan Bautista Cabral dio su vida para salvarlo.',
    unlocked: false
  },
  {
    id: 'enc_cuyo',
    category: 'ciudad',
    title: 'Mendoza y la Gobernación de Cuyo',
    subtitle: 'Cuna de la epopeya libertadora',
    date: '1814 — 1817',
    location: 'Región de Cuyo',
    description: 'Pueblo mendocino que se convirtió en una verdadera fragua militar e industrial bajo el mando visionario de San Martín.',
    historicalFact: 'Todo el pueblo cuyano donó mantas, comida, mulas y armas; las Patricias Mendocinas bordaron la Bandera de los Andes.',
    unlocked: false
  },
  {
    id: 'enc_cruce_andes',
    category: 'acontecimiento',
    title: 'El Cruce de los Andes',
    subtitle: 'Una de las mayores hazañas militares de la historia humana',
    date: 'Enero — Febrero de 1817',
    location: 'Cordillera de los Andes',
    description: 'Movilización estratégica de más de 5.000 hombres, cañones y mulas a través de pasos montañosos superiores a 4.000 metros de altura.',
    historicalFact: 'San Martín padecía ataques severos de asma y úlcera estomacal, siendo transportado en camilla en varios tramos.',
    unlocked: false
  },
  {
    id: 'enc_chacabuco',
    category: 'batalla',
    title: 'Batalla de Chacabuco',
    subtitle: 'La victoria que abrió las puertas de Santiago',
    date: '12 de febrero de 1817',
    location: 'Chacabuco, Chile',
    description: 'Brillante maniobra de doble tenaza liderada por San Martín y O\'Higgins que aplastó a las tropas realistas de Marco del Pont.',
    historicalFact: 'En solo 24 horas, la victoria restauró la causa patriota chilena y quebró el dominio español en el centro de Chile.',
    unlocked: false
  },
  {
    id: 'enc_maipu',
    category: 'batalla',
    title: 'Batalla de Maipú',
    subtitle: 'Consolidación definitiva de la independencia chilena',
    date: '5 de abril de 1818',
    location: 'Llanos de Maipú, Chile',
    description: 'Magistral lección táctica de San Martín contra el ejército del General Osorio, sellada con el emotivo Abrazo de Maipú.',
    historicalFact: 'Esta batalla destruyó definitivamente el poder realista en el Reino de Chile.',
    unlocked: false
  },
  {
    id: 'enc_guayaquil',
    category: 'acontecimiento',
    title: 'La Entrevista de Guayaquil',
    subtitle: 'El enigma histórico entre los dos grandes libertadores',
    date: '26 y 27 de julio de 1822',
    location: 'Guayaquil, Ecuador',
    description: 'Encuentro a puertas cerradas entre José de San Martín y Simón Bolívar para decidir el destino final de Sudamérica.',
    historicalFact: 'San Martín comprendió que solo uno de los dos debía liderar la fase final, cediendo generosamente el mando a Bolívar.',
    unlocked: false
  }
];
