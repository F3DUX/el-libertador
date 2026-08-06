import { Ending } from '@/types/game';

export const GAME_ENDINGS: Ending[] = [
  {
    id: 'final_historico',
    title: 'Padre de la Patria e Inmortal',
    subtitle: 'El Libertador de Argentina, Chile y Perú',
    badge: '🇦🇷',
    type: 'historico',
    condition: (stats, history, poderDeGobierno) => poderDeGobierno >= 65 || history.includes('opt_guayaquil_renuncia'),
    narrative: `Has cumplido la mayor epopeya de la historia sudamericana. Tras libertar tres naciones, renunciaste a los laureles del poder absoluto para no derramar jamás la sangre de tus hermanos en guerras civiles. 

Falleces en Boulogne-sur-Mer el 17 de agosto de 1850 rodeado del amor de tu hija Mercedes. Tu figura trasciende las eras como el ejemplo supremo de virtud, desprendimiento y patriotismo.`,
    historicalComparison: 'Coincide exactamente con la vida gloriosa del General José de San Martín.'
  },
  {
    id: 'final_nunca_regreso',
    title: 'Mariscal del Imperio Español',
    subtitle: 'El Héroe de Europa que nunca cruzó el Atlántico',
    badge: '🇪🇸',
    type: 'alternativo',
    condition: (stats, history) => history.includes('opt_ejercito_espanol_permanecer'),
    narrative: `Decidiste no regresar al Río de la Plata y dedicar tu vida entera al servicio militar en Europa. Te convertiste en un brillante Mariscal del Imperio Español, admirado por Duques y Reyes.

Sin embargo, las colonias de América lucharon solas. Argentina sufrió largas décadas de caos y Chile siguió bajo el yugo español. Falleces anciano en Madrid, admirado pero lejos de tu tierra natal.`,
    historicalComparison: 'Ruta alternativa donde San Martín jamás regresa a Buenos Aires en 1812.'
  },
  {
    id: 'final_gobernante_peru',
    title: 'Protector Supremo Dictatorial del Perú',
    subtitle: 'El Monarca Republicano del Pacífico',
    badge: '👑',
    type: 'glorioso',
    condition: (stats, history, poderDeGobierno) => history.includes('opt_peru_reinar') || (poderDeGobierno >= 75 && history.includes('opt_peru_protectorado_absoluto')),
    narrative: `Rechazaste la idea de ceder el mando a Bolívar y decidiste coronarte como Protector Supremo Vitalicio del Perú. Con tu disciplina de hierro organizaste un Estado próspero y poderoso.

El Pacífico es dominado por tu flota y tus leyes. Aunque los historiadores cuestionan tu autoritarismo, nadie niega que creaste la nación más estable y próspera de América del Sur.`,
    historicalComparison: 'San Martín adopta la vía monárquica/dictatorial propuesta por algunos diplomáticos peruanos en 1821.'
  },
  {
    id: 'final_pacifista',
    title: 'El Gran Pacifista Diplomático',
    subtitle: 'La Libertad Lograda sin Sangre',
    badge: '🕊️',
    type: 'glorioso',
    condition: (stats) => stats.relaciones >= 75 && stats.patriotismo >= 75,
    narrative: `Priorizaste los pactos, la diplomacia y las alianzas pacíficas con virreyes y jefes locales sobre la destrucción bélica.

Lograste la emancipación de Sudamérica mediante tratados comerciales, libertad de vientres y amnistías generales. Tu nombre es venerado en todo el globo como el genio que independizó un continente con la pluma y la diplomacia.`,
    historicalComparison: 'Triunfo de las negociaciones pacíficas planteadas en las Conferencias de Punchauca y Miraflores.'
  },
  {
    id: 'final_conquistador',
    title: 'El Imperator de las Provincias Unidas',
    subtitle: 'El Conquistador Militar del Continente',
    badge: '⚔️',
    type: 'glorioso',
    condition: (stats) => stats.caballeria >= 75 && stats.liderazgo >= 75,
    narrative: `Tu Regimiento de Granaderos a Caballo se convirtió en una legión invencible. No solo liberaste Argentina, Chile y Perú, sino que avanzaste hacia la Gran Colombia y el Amazonas integrando todo el continente bajo una sola confederación militar.

Tu genio táctico supera al de Alejandro Magno y Napoleón Bonaparte en los anales militares de la historia humana.`,
    historicalComparison: 'Dominio militar continental absoluto sin ceder mando a Simón Bolívar.'
  },
  {
    id: 'final_exilio_temprano',
    title: 'El Retiro en Europa',
    subtitle: 'Víctima de las Intrigas Políticas de Buenos Aires',
    badge: '📜',
    type: 'alternativo',
    condition: (stats, history) => history.includes('opt_alt_exilio_aceptar') || stats.relaciones < 40,
    narrative: `Asqueado por las luchas fratricidas y las calumnias del partido porteño, decidiste abandonar la contienda militar antes de cruzar los Andes.

Te estableces en Bruselas y París dedicándote a la lectura, las artes y la educación de tu hija. Las Provincias Unidas tardan tres décadas más en consolidar su libertad entre sangrientas guerras civiles.`,
    historicalComparison: 'Abandono prematuro de la causa patriota ante el boicot político porteño de 1815-1816.'
  },
  {
    id: 'final_heroe_olvidado',
    title: 'El Héroe Olvidado',
    subtitle: 'Trágico Destino en la Pobreza del Exilio',
    badge: '🥀',
    type: 'tragico',
    condition: (stats, history, poderDeGobierno) => poderDeGobierno <= 45,
    narrative: `Las deudas y el abandono de los gobiernos sudamericanos arruinaron tu ancianidad. Falleces en una modesta habitación alquilada en Francia sin honores militares ni reconocimiento oficial.

Solo décadas después, historiadores del futuro rescatan tus cartas y descubren la grandeza moral del hombre que dio todo por un continente que lo olvidó.`,
    historicalComparison: 'El triste destino de precariedad económica que acechó a San Martín en sus primeros años europeos.'
  },
  {
    id: 'final_libertador_supremo',
    title: 'Libertador Supremo de la Unión Sudamericana',
    subtitle: 'El Pacto Sagrado entre San Martín y Bolívar',
    badge: '⭐',
    type: 'glorioso',
    condition: (stats, history) => history.includes('opt_guayaquil_pacto_alianza'),
    narrative: `En la Entrevista de Guayaquil de 1822 no hubo renuncias ni desacuerdos: lograste convencer a Simón Bolívar de formar un triunvirato libertador.

Juntos marcharon triunfantes por todo el continente creando la Confederación de los Pueblos Libres de América del Sur. Una potencia mundial nace bajo la bandera del Sol de Mayo y la Gran Colombia.`,
    historicalComparison: 'Alianza perfecta de Guayaquil logrando la unidad política inmediata de Sudamérica.'
  },
  {
    id: 'final_historia_alternativa',
    title: 'El Archiduque del Plata',
    subtitle: 'La Monarquía Constitucional de los Andes',
    badge: '⚜️',
    type: 'alternativo',
    condition: (stats, history) => history.includes('opt_monarquia_inca'),
    narrative: `Impulsaste con éxito junto a Belgrano el establecimiento de una Monarquía Constitucional Inca o de la Casa de Borbón moderada en Buenos Aires.

El Reino del Río de la Plata se convierte en un imperio pacífico, culto y respetado por todas las potencias europeas, evitando las guerras entre unitarios y federales.`,
    historicalComparison: 'Concreción del Plan Inca propuesto por Belgrano y apoyado por San Martín en el Congreso de Tucumán de 1816.'
  }
];
