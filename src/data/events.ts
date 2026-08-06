import { GameEvent } from '@/types/game';

export const GAME_EVENTS: Record<string, GameEvent> = {
  evt_yapeyu_1778: {
    id: 'evt_yapeyu_1778',
    title: 'Infancia en las Misiones Guaraníes',
    year: 1778,
    age: 5,
    location: 'Yapeyú, Misiones',
    mapCoords: { lat: -29.47, lng: -56.82 },
    era: 'Virreinato del Río de la Plata',
    historicalContext: 'Naces a orillas del río Uruguay. Tu padre es el gobernador de las misiones jesuíticas y creces entre juegos en la selva, en contacto cercano con la naturaleza y la cultura guaraní. En 1783 tu familia decide viajar a la capital de la metrópoli española.',
    options: [
      {
        id: 'opt_yapeyu_militar',
        text: 'Jugar a las batallas y emular a los soldados del fuerte',
        statsEffect: { estrategia: 2, experiencia: 1, salud: 1, recursos: -1 },
        nextEventId: 'evt_viaje_espana_1784',
        yearsPassed: 6,
        newLocation: 'Madrid, España',
        narrativeTransition: 'Tus primeros años en la selva guaraní forjaron tu cuerpo y tu imaginación militar. En 1784 embarcas con tu familia rumbo a Cádiz a bordo del navío San Cristóbal. La inmensidad del océano Atlántico abre una nueva etapa en tu juventud.'
      },
      {
        id: 'opt_yapeyu_lectura',
        text: 'Observar los mapas y leer los libros de la biblioteca paterna',
        statsEffect: { estrategia: 2, prestigio: 1, experiencia: 2, liderazgo: -1 },
        nextEventId: 'evt_viaje_espana_1784',
        yearsPassed: 6,
        newLocation: 'Madrid, España',
        narrativeTransition: 'Desarrollas una devoción apasionada por la geografía y los clásicos. Al cumplir seis años, cruzas el Atlántico con tu familia. La llegada a la próspera corte peninsular impacta profundamente tu mente inquisitiva.'
      },
      {
        id: 'opt_yapeyu_guarani',
        text: 'Aprender la lengua guaraní y la destreza de los nativos',
        statsEffect: { patriotismo: 2, relaciones: 2, liderazgo: 1, prestigio: -1 },
        nextEventId: 'evt_viaje_espana_1784',
        yearsPassed: 6,
        newLocation: 'Madrid, España',
        narrativeTransition: 'Comprendes desde niño el espíritu autóctono de América. Al viajar a España en 1784 llevas contigo el recuerdo indeleble del suelo nativo, un lazo espiritual que nunca se romperá.'
      }
    ]
  },

  evt_viaje_espana_1784: {
    id: 'evt_viaje_espana_1784',
    title: 'Estudios en el Real Seminario de Nobles',
    year: 1784,
    age: 11,
    location: 'Madrid, España',
    mapCoords: { lat: 40.42, lng: -3.70 },
    era: 'España Borbónica',
    historicalContext: 'En Madrid ingresas al prestigioso Real Seminario de Nobles de Madrid. Aprendes latín, francés, matemáticas, dibujo cartográfico y esgrima. Es el momento de elegir el camino para tu vocación de vida.',
    options: [
      {
        id: 'opt_ingresar_ejercito',
        text: 'Ingresar al Ejército Español como cadete del Regimiento de Murcia',
        statsEffect: { liderazgo: 2, experiencia: 2, estrategia: 1, salud: -1 },
        nextEventId: 'evt_ejercito_espanol_1789',
        yearsPassed: 5,
        newLocation: 'Cádiz / Orán',
        narrativeTransition: 'Con solo once años vistes el uniforme del célebre Regimiento de Murcia, el "El Desteñido". Te trasladas a las guarniciones del Mediterráneo para aprender el arte de las armas bajo el rigor y la disciplina borbónica.'
      },
      {
        id: 'opt_estudios_marina',
        text: 'Ingresar a la Real Armada para estudiar tácticas navales',
        statsEffect: { estrategia: 3, recursos: 2, experiencia: 2, caballeria: -1 },
        nextEventId: 'evt_ejercito_espanol_1789',
        yearsPassed: 5,
        newLocation: 'Cádiz, España',
        narrativeTransition: 'Estudias la navegación y las batallas navales en Cádiz. La visión de la logística marítima te otorgará años más tarde una enorme ventaja para planificar operaciones anfibias en el Pacífico.'
      },
      {
        id: 'opt_quedarse_espana',
        text: 'Buscar una carrera administrativa en las finanzas de la Corte',
        statsEffect: { recursos: 3, prestigio: 2, patriotismo: -2 },
        nextEventId: 'evt_ejercito_espanol_1789',
        yearsPassed: 5,
        newLocation: 'Madrid, España',
        narrativeTransition: 'Te perfeccionas en la economía colonial y la administración. Sin embargo, el estallido de las guerras en Europa pronto te empujará inevitablemente hacia los campos de batalla.'
      }
    ]
  },

  evt_ejercito_espanol_1789: {
    id: 'evt_ejercito_espanol_1789',
    title: 'Bautismo de Fuego en Orán y Guerras Pirineicas',
    year: 1791,
    age: 13,
    location: 'Cádiz / Orán',
    mapCoords: { lat: 36.53, lng: -6.30 },
    era: 'Campañas Europeas',
    historicalContext: 'A los 13 años vives el horror del sitio de Orán en el norte de África sosteniendo combates contra los moros. Luego combates en la Guerra de los Pirineos contra la Francia Revolucionaria. Demuestras un valor sereno que asombra a tus superiores.',
    options: [
      {
        id: 'opt_combate_vanguardia',
        text: 'Liderar las cargas de vanguardia en combates cuerpo a cuerpo',
        statsEffect: { salud: -2, liderazgo: 2, caballeria: 2, prestigio: 2 },
        nextEventId: 'evt_guerra_napoleonica_1808',
        yearsPassed: 17,
        newLocation: 'Bailén, España',
        narrativeTransition: 'Durante los siguientes 17 años participas en decenas de acciones de guerra en África, Portugal y España. Te convierten en Capitán de Caballería por mérito estricto de combate.',
        battleMinigameConfig: {
          id: 'reflejos_mando',
          battleTitle: 'Combate en el Sitio de Orán',
          location: 'Orán, África del Norte',
          year: 1791,
          enemy: {
            name: 'Fuerzas del Bey de Mascara',
            title: 'Ejército Otomano / Bereber',
            portrait: '⚔️',
            armyName: 'Tropas de Infantería Pesada',
            reactionQuotes: {
              intro: '¡Los cristianos no resistirán nuestro asedio!',
              taunt: '¡Mantengan la línea!',
              defeat: '¡Su velocidad de mando nos ha dispersado!',
              victory: '¡Retirada patriota!',
            },
          },
          historicalContext: 'A los 13 años vives el horror del sitio de Orán en el norte de África. Debes reaccionar con órdenes relámpago en el fragor del combate.',
          objectiveText: 'Ejecuta las órdenes de mando a contrarreloj antes que expire el cronómetro.',
          baseDifficulty: 'normal',
        },
      },
      {
        id: 'opt_combate_táctica',
        text: 'Especializarse en la dirección de infantería y fortificaciones',
        statsEffect: { estrategia: 3, experiencia: 2, liderazgo: 1, caballeria: -1 },
        nextEventId: 'evt_guerra_napoleonica_1808',
        yearsPassed: 17,
        newLocation: 'Bailén, España',
        narrativeTransition: 'Estudias minuciosamente los manuales de guerra franceses y británicos. Tu mente analítica absorbe cada lección sobre suministro, artillería y movimientos nocturnos.'
      }
    ]
  },

  evt_guerra_napoleonica_1808: {
    id: 'evt_guerra_napoleonica_1808',
    title: 'La Invasión Napoleónica y la Batalla de Bailén',
    year: 1808,
    age: 30,
    location: 'Bailén, España',
    mapCoords: { lat: 38.09, lng: -3.79 },
    era: 'Guerra de Independencia Española',
    historicalContext: 'Napoleón invadió España y capturó al Rey. El pueblo español se levanta en armas. En los campos de Bailén, el regimiento de caballería de San Martín ataca por sorpresa al ejército imperial del General Dupont, logrando una victoria histórica.',
    options: [
      {
        id: 'opt_bailen_carga',
        text: 'Ejecutar una feroz carga de caballería sobre los flancos franceses',
        statsEffect: { prestigio: 3, liderazgo: 2, caballeria: 2, salud: -1 },
        nextEventId: 'evt_logia_londres_1811',
        yearsPassed: 3,
        newLocation: 'Londres, Inglaterra',
        narrativeTransition: 'Por tu heroísmo en Bailén eres ascendido a Teniente Coronel y condecorado con Medalla de Oro. Sin embargo, las noticias que llegan de Buenos Aires sobre la Revolución de Mayo de 1810 despiertan tu llamado interior.'
      },
      {
        id: 'opt_ejercito_espanol_permanecer',
        text: 'Aceptar el ascenso en la Corona pero mantener simpatías con la patria',
        statsEffect: { prestigio: 2, recursos: 2, patriotismo: -1 },
        nextEventId: 'evt_logia_londres_1811',
        yearsPassed: 3,
        newLocation: 'Londres, Inglaterra',
        narrativeTransition: 'Comprendes que la verdadera batalla por la libertad se librará en el continente americano. Te trasladas secretamente a Londres.'
      }
    ]
  },

  evt_logia_londres_1811: {
    id: 'evt_logia_londres_1811',
    title: 'La Logia Lautaro y la Decisión en Londres',
    year: 1811,
    age: 33,
    location: 'Londres, Inglaterra',
    mapCoords: { lat: 51.51, lng: -0.12 },
    era: 'Conspiración Emancipadora',
    historicalContext: 'Solicitas el retiro del ejército español y viajas secretamente a Londres. En la casa de Francisco de Miranda te reúnes con Carlos María de Alvear y otros jóvenes sudamericanos en la Logia Lautaro. Deciden regresar a Buenos Aires a libertar la patria.',
    options: [
      {
        id: 'opt_embarco_george_canning',
        text: 'Embarcar en la fragata George Canning rumbo a Buenos Aires',
        statsEffect: { patriotismo: 5, relaciones: 4, estrategia: 3, recursos: -2 },
        affinityEffect: [{ characterId: 'guido', delta: 10 }],
        nextEventId: 'evt_retorno_buenos_aires_1812',
        yearsPassed: 1,
        newLocation: 'Buenos Aires',
        narrativeTransition: 'El 9 de marzo de 1812 la fragata George Canning fondéa en el puerto de Buenos Aires. Traes contigo la experiencia de 22 años de guerras europeas y una resolución inflexible.'
      },
      {
        id: 'opt_viajar_venezuela',
        text: 'Viajar apoyado por diplomáticos con estratégica prudencia',
        statsEffect: { relaciones: 4, prestigio: 3, estrategia: 3 },
        affinityEffect: [{ characterId: 'bolivar', delta: 5 }],
        nextEventId: 'evt_retorno_buenos_aires_1812',
        yearsPassed: 1,
        newLocation: 'Buenos Aires',
        narrativeTransition: 'La magnitud de la revolución sudamericana se revela ante tus ojos al arribar a las costas del Río de la Plata.'
      }
    ]
  },

  evt_retorno_buenos_aires_1812: {
    id: 'evt_retorno_buenos_aires_1812',
    title: 'Creación del Regimiento de Granaderos a Caballo',
    year: 1812,
    age: 34,
    location: 'Buenos Aires',
    mapCoords: { lat: -34.61, lng: -58.38 },
    era: 'Provincias Unidas del Río de la Plata',
    historicalContext: 'El Triunvirato porteño te encarga la creación de un cuerpo ecuestre especial para proteger las costas del Paraná de los saqueos realistas. Diseñas el Regimiento de Granaderos a Caballo imponiendo un estricto código de honor militar.',
    options: [
      {
        id: 'opt_granaderos_disciplina',
        text: 'Exigir selección rigurosa, disciplina férrea y código de honor',
        statsEffect: { caballeria: 3, liderazgo: 2, estrategia: 1, recursos: -1 },
        nextEventId: 'evt_boda_remedios_1812',
        yearsPassed: 1,
        newLocation: 'Buenos Aires',
        narrativeTransition: 'Tus granaderos se convierten en el cuerpo militar más temido y respetado del continente. Cada soldado jura defender la patria hasta derramar la última gota de sangre.'
      },
      {
        id: 'opt_granaderos_rapidez',
        text: 'Priorizar el reclutamiento masivo y entrenamiento rápido en el sable',
        statsEffect: { caballeria: 2, recursos: 2, salud: 1, liderazgo: -1 },
        nextEventId: 'evt_boda_remedios_1812',
        yearsPassed: 1,
        newLocation: 'Buenos Aires',
        narrativeTransition: 'Formas un regimiento numeroso en tiempo récord, listo para entrar inmediatamente en operaciones en los ríos interiores.'
      }
    ]
  },

  evt_boda_remedios_1812: {
    id: 'evt_boda_remedios_1812',
    title: 'Matrimonio con Remedios de Escalada',
    year: 1812,
    age: 34,
    location: 'Buenos Aires',
    mapCoords: { lat: -34.61, lng: -58.38 },
    era: 'Provincias Unidas',
    historicalContext: 'En la sociedad porteña conoces a la aristocrática joven María de los Remedios de Escalada. La unión fortalece tus vínculos políticos con las familias influyentes de Buenos Aires.',
    options: [
      {
        id: 'opt_matrimonio_escalada',
        text: 'Contraer matrimonio e integrar la causa independentista a la sociedad',
        statsEffect: { relaciones: 3, prestigio: 2, recursos: 2 },
        affinityEffect: [{ characterId: 'remedios', delta: 15 }, { characterId: 'pueyrredon', delta: 8 }],
        nextEventId: 'evt_san_lorenzo_1813',
        yearsPassed: 1,
        newLocation: 'San Lorenzo, Santa Fe',
        narrativeTransition: 'Te casas en la Catedral de Buenos Aires. Remedios se convierte en tu compañera devota. A principios de 1813 recibes noticias de la llegada de una escuadra realista por el río Paraná.'
      },
      {
        id: 'opt_vida_militar_exclusiva',
        text: 'Mantener perfil sobrio y enfocado puramente en la preparación militar',
        statsEffect: { estrategia: 2, caballeria: 2, relaciones: -1 },
        nextEventId: 'evt_san_lorenzo_1813',
        yearsPassed: 1,
        newLocation: 'San Lorenzo, Santa Fe',
        narrativeTransition: 'Mantienes tu mente concentrada exclusivamente en los cuarteles del Retiro, preparando la trampa perfecta para las tropas realistas.'
      }
    ]
  },

  evt_san_lorenzo_1813: {
    id: 'evt_san_lorenzo_1813',
    title: 'El Combate de San Lorenzo',
    year: 1813,
    age: 35,
    location: 'San Lorenzo, Santa Fe',
    mapCoords: { lat: -32.75, lng: -60.73 },
    era: 'Campañas del Paraná',
    historicalContext: 'El 3 de febrero de 1813, escondes a 120 granaderos tras los muros del Convento de San Carlos. Cuando desembarcan 250 marinos realistas, ordenas una maniobra de envoltorio en tenaza. Durante la carga, un cañonazo derriba a tu caballo, dejándote aprisionado.',
    options: [
      {
        id: 'opt_san_lorenzo_cabral',
        text: 'Resistir en el suelo mientras los granaderos Cabral y Baigorria te salvan',
        statsEffect: { liderazgo: 5, caballeria: 4, prestigio: 4, salud: -3 },
        nextEventId: 'evt_ejercito_norte_1814',
        yearsPassed: 1,
        newLocation: 'Yatasto, Salta',
        narrativeTransition: 'El sargento Juan Bautista Cabral salva tu vida al precio de la suya. La carga relámpago pulveriza a los realistas en 15 minutos. Es el victorioso bautismo de fuego de los Granaderos.',
        battleMinigameConfig: {
          id: 'carga_caballeria',
          battleTitle: 'Combate de San Lorenzo',
          location: 'San Lorenzo, Santa Fe',
          year: 1813,
          enemy: {
            name: 'Capitán Juan Antonio Zabala',
            title: 'Comandante de la Flota Realista',
            portrait: '⚓',
            armyName: 'Marinos y Realistas de Montevideo',
            reactionQuotes: {
              intro: '¡Desembarquen y arrasen la costa del Paraná!',
              taunt: '¡Fuego de mosquetes a la caballería!',
              defeat: '¡Esos demonios con sables nos rodean!',
              victory: '¡Los expulsamos al río!',
            },
          },
          historicalContext: '120 Granaderos a Caballo ocultos en el Convento de San Carlos se lanzan a la carga envolvente contra 250 marinos realistas desembarcados.',
          objectiveText: 'Mueve a los Granaderos a izquierda y derecha para esquivar rocas, cañonazos y barrancos.',
          baseDifficulty: 'fácil',
        },
      },
      {
        id: 'opt_san_lorenzo_reserva',
        text: 'Dirigir el combate resguardando la reserva para un contragolpe perfecto',
        statsEffect: { estrategia: 3, caballeria: 2, salud: 1, prestigio: -1 },
        nextEventId: 'evt_ejercito_norte_1814',
        yearsPassed: 1,
        newLocation: 'Yatasto, Salta',
        narrativeTransition: 'La maniobra envolvente coordinada desde la altura destruye el desembarco enemigo sin arriesgar la vida del comandante.'
      }
    ]
  },

  evt_ejercito_norte_1814: {
    id: 'evt_ejercito_norte_1814',
    title: 'Encuentro de Yatasto y el Mando del Norte',
    year: 1814,
    age: 36,
    location: 'Yatasto, Salta',
    mapCoords: { lat: -24.89, lng: -65.05 },
    era: 'Frente Norte',
    historicalContext: 'Viajas al Norte para asumir el mando del golpeado Ejército del Norte tras las derrotas de Vilcapugio y Ayohuma. En la Posta de Yatasto te abrazas fraternalmente con el General Manuel Belgrano.',
    options: [
      {
        id: 'opt_yatasto_plan_continental',
        text: 'Abrazar a Belgrano y concluir que la ruta del Alto Perú es impracticable',
        statsEffect: { estrategia: 3, relaciones: 3, patriotismo: 2 },
        affinityEffect: [{ characterId: 'belgrano', delta: 15 }],
        nextEventId: 'evt_gobernacion_cuyo_1814',
        yearsPassed: 1,
        newLocation: 'Mendoza, Cuyo',
        narrativeTransition: 'Forjas una profunda amistad y admiración con Belgrano. Le confiesas tu plan secreto: "La patria no hará armas en el Norte... Hay que cruzar los Andes, liberar Chile y llegar por mar a Lima". Solicitas la Gobernación de Cuyo.'
      },
      {
        id: 'opt_yatasto_reorganizar_norte',
        text: 'Reorganizar defensivamente las quebradas e idear la estrategia continental',
        statsEffect: { liderazgo: 2, experiencia: 2, salud: -1 },
        affinityEffect: [{ characterId: 'belgrano', delta: 8 }],
        nextEventId: 'evt_gobernacion_cuyo_1814',
        yearsPassed: 1,
        newLocation: 'Mendoza, Cuyo',
        narrativeTransition: 'Compruebas la aridez y las fortalezas realistas en las montañas del Perú. Confirmas que la única llave de la victoria es el Cruce de los Andes.'
      }
    ]
  },

  evt_gobernacion_cuyo_1814: {
    id: 'evt_gobernacion_cuyo_1814',
    title: 'Gobernación de Cuyo y el Plumerillo',
    year: 1815,
    age: 37,
    location: 'Mendoza, Cuyo',
    mapCoords: { lat: -32.89, lng: -68.84 },
    era: 'El Campamento del Plumerillo',
    historicalContext: 'Te instalas en Mendoza como Gobernador Intendente de Cuyo. Transformas la provincia en una gigantesca fábrica militar. El Fray Luis Beltrán funde cañones; las damas cuyanas bordan la Bandera de los Andes.',
    options: [
      {
        id: 'opt_cuyo_pueblo_total',
        text: 'Movilizar a toda la sociedad cuyana y crear el Ejército de los Andes',
        statsEffect: { recursos: 3, liderazgo: 3, patriotismo: 2, experiencia: 1 },
        affinityEffect: [{ characterId: 'ohiggins', delta: 10 }, { characterId: 'pueyrredon', delta: 10 }],
        nextEventId: 'evt_congreso_tucuman_1816',
        yearsPassed: 1,
        newLocation: 'Tucumán / Mendoza',
        narrativeTransition: 'Bernardo O\'Higgins llega exiliado desde Chile y se une a tu Estado Mayor. Con el apoyo del Director Supremo Pueyrredón, logras armar a más de 4.000 combatientes en el campamento de El Plumerillo.'
      },
      {
        id: 'opt_cuyo_espionaje',
        text: 'Priorizar la "Guerra de Zapa" (espionaje y desinformación al enemigo)',
        statsEffect: { estrategia: 3, relaciones: 2, recursos: 1 },
        nextEventId: 'evt_congreso_tucuman_1816',
        yearsPassed: 1,
        newLocation: 'Tucumán / Mendoza',
        narrativeTransition: 'Envías espías a Chile spreading falsas rutas del cruce. El Capitán General realista Marcó del Pont dispersa locamente sus fuerzas por toda la cordillera.'
      }
    ]
  },

  evt_congreso_tucuman_1816: {
    id: 'evt_congreso_tucuman_1816',
    title: 'El Congreso de Tucumán y la Independencia',
    year: 1816,
    age: 38,
    location: 'Tucumán / Mendoza',
    mapCoords: { lat: -26.82, lng: -65.21 },
    era: 'La Declaración Sagrada',
    historicalContext: 'Exiges por carta a los diputados reunidos en Tucumán que declaren sin demoras la Independencia. "¿Hasta cuándo esperaremos para declarar nuestra Independencia?", escribes con impaciencia militar.',
    options: [
      {
        id: 'opt_independencia_urgente',
        text: 'Presionar para declarar la Independencia absoluta inmediatamente',
        statsEffect: { patriotismo: 3, prestigio: 2, liderazgo: 2 },
        nextEventId: 'evt_cruce_andes_1817',
        yearsPassed: 1,
        newLocation: 'Cordillera de los Andes',
        narrativeTransition: 'El 9 de julio de 1816 el Congreso declara la Independencia de las Provincias Unidas de Sudamérica. Ahora eres el General en Jefe de un ejército soberano.'
      },
      {
        id: 'opt_monarquia_inca',
        text: 'Apoyar el proyecto de Belgrano de instaurar una Monarquía Inca',
        statsEffect: { patriotismo: 3, relaciones: 2, prestigio: 1 },
        affinityEffect: [{ characterId: 'belgrano', delta: 15 }],
        nextEventId: 'evt_cruce_andes_1817',
        yearsPassed: 1,
        newLocation: 'Cordillera de los Andes',
        narrativeTransition: 'El proyecto del Rey Inca entusiasma a los pueblos originarios y a las provincias. El Ejército de los Andes inicia su marcha portando la llama de la emancipación.'
      }
    ]
  },

  evt_cruce_andes_1817: {
    id: 'evt_cruce_andes_1817',
    title: 'El Épico Cruce de los Andes',
    year: 1817,
    age: 39,
    location: 'Pasos de Uspallata y Los Patos',
    mapCoords: { lat: -32.65, lng: -70.01 },
    era: 'La Epopeya de las Cumbres',
    historicalContext: 'En enero de 1817, 5.000 hombres, 10.000 mulas y 18 cañones inician la marcha divididos en seis columnas a través de picos helados de más de 4.000 metros de altura. Padeces insoportables dolencias de asma y gastritis.',
    options: [
      {
        id: 'opt_cruce_enfermo_camilla',
        text: 'Soportar el dolor en camilla y mantener la marcha sincronizada de 6 columnas',
        requires: { salud: 35 },
        statsEffect: { salud: -2, estrategia: 4, liderazgo: 3, experiencia: 2 },
        affinityEffect: [{ characterId: 'las_heras', delta: 10 }],
        nextEventId: 'evt_batalla_chacabuco_1817',
        yearsPassed: 1,
        newLocation: 'Chacabuco, Chile',
        narrativeTransition: 'Las seis columnas descienden exactamente el mismo día al valle chileno, tomando por absoluta sorpresa a los realistas. Es una hazaña de coordinación que asombra al mundo.',
        battleMinigameConfig: {
          id: 'logistica_cruce',
          battleTitle: 'El Épico Cruce de los Andes',
          location: 'Pasos de Los Patos y Uspallata',
          year: 1817,
          enemy: {
            name: 'Cordillera de los Andes',
            title: 'El Clima Helado y los Picos Andinos',
            portrait: '🏔️',
            armyName: '4.500m de Altitud y Nieve',
            reactionQuotes: {
              intro: '¡El frío y las cumbres quebrarán a cualquier ejército!',
              taunt: 'Las mulas caen por las laderas heladas...',
              defeat: '¡Lograron cruzar el gigante de piedra!',
              victory: 'El ejército ha sucumbido a las nieves...',
            },
          },
          historicalContext: '5.000 hombres y 10.000 mulas cruzan la cordillera divididos en 6 columnas a temperaturas bajo cero. Debes repartir los insumos críticos.',
          objectiveText: 'Asigna poncho helado, mulas, comida y medicina a la columna andina adecuada.',
          baseDifficulty: 'normal',
        },
      },
      {
        id: 'opt_cruce_cauteloso',
        text: 'Avanzar cuidando rigurosamente el estado de los hombres y mulas',
        statsEffect: { salud: 2, caballeria: 2, estrategia: 2 },
        nextEventId: 'evt_batalla_chacabuco_1817',
        yearsPassed: 1,
        newLocation: 'Chacabuco, Chile',
        narrativeTransition: 'Logras conservar el 90% de tus fuerzas vivas. En los llanos de Chacabuco, el ejército de la Corona te espera apresuradamente reorganizado.'
      }
    ]
  },

  evt_batalla_chacabuco_1817: {
    id: 'evt_batalla_chacabuco_1817',
    title: 'La Batalla de Chacabuco',
    year: 1817,
    age: 39,
    location: 'Chacabuco, Chile',
    mapCoords: { lat: -33.00, lng: -70.64 },
    era: 'Liberación de Chile',
    historicalContext: 'El 12 de febrero de 1817 te enfrentas al ejército realista de Rafael Maroto. Divides tu fuerza en dos alas: Soler por la izquierda en ataque envolvente y O\'Higgins por el centro.',
    options: [
      {
        id: 'opt_chacabuco_carga_ohiggins',
        text: 'Lanzar a la caballería de Granaderos para apoyar la carga impetuosa de O\'Higgins',
        requires: { caballeria: 45 },
        statsEffect: { prestigio: 3, caballeria: 3, liderazgo: 2, patriotismo: 2 },
        affinityEffect: [{ characterId: 'ohiggins', delta: 15 }],
        nextEventId: 'evt_cancha_rayada_1818',
        yearsPassed: 1,
        newLocation: 'Santiago / Maipú',
        narrativeTransition: 'La carga arrolladora de los Granaderos quiebra la resistencia enemiga. El cabildo de Santiago te ofrece el cargo de Director Supremo de Chile, pero lo rechazas caballerosamente para cederlo a Bernardo O\'Higgins.',
        battleMinigameConfig: {
          id: 'organizar_ejercito',
          battleTitle: 'Batalla de Chacabuco',
          location: 'Chacabuco, Chile',
          year: 1817,
          enemy: {
            name: 'Brigadier Rafael Maroto',
            title: 'Comandante del Ejército Realista de Chile',
            portrait: '👑',
            armyName: 'Regimiento Talavera y Realistas',
            reactionQuotes: {
              intro: '¡Los insurgentes bajaron de los cerros, ataquen!',
              taunt: '¡Nuestras posiciones defensivas son inexpugnables!',
              defeat: '¡Nos han envuelto por la izquierda!',
              victory: '¡Chile sigue bajo la bandera del Rey!',
            },
          },
          historicalContext: 'Tras cruzar los Andes, el Ejército Patriota enfrenta a Maroto. Debes desplegar tus divisiones en las alturas y valles antes de atacar.',
          objectiveText: 'Asigna la Infantería, Caballería, Artillería y Reserva a sus posiciones óptimas.',
          baseDifficulty: 'normal',
        },
      },
      {
        id: 'opt_chacabuco_envolvente',
        text: 'Esperar a que la columna de Soler complete el cerco perfecto por el cerro',
        statsEffect: { estrategia: 3, experiencia: 2, caballeria: 1 },
        nextEventId: 'evt_cancha_rayada_1818',
        yearsPassed: 1,
        newLocation: 'Santiago / Maipú',
        narrativeTransition: 'El cerro Chacabuco se convierte en una trampa impenetrable. La victoria patriota es aplastante y total.'
      }
    ]
  },

  evt_cancha_rayada_1818: {
    id: 'evt_cancha_rayada_1818',
    title: 'Sorpresa de Cancha Rayada y la Gloria de Maipú',
    year: 1818,
    age: 40,
    location: 'Llanos de Maipú, Chile',
    mapCoords: { lat: -33.52, lng: -70.76 },
    era: 'El Triunfo Definitivo en Chile',
    historicalContext: 'El 19 de marzo de 1818 el ejército realista ataca por sorpresa en la oscuridad de Cancha Rayada. La confusión cunde, pero reorganizas la fuerza en solo 17 días. El 5 de abril de 1818 te enfrentas al General Osorio en Maipú.',
    options: [
      {
        id: 'opt_maipu_ataque_martillo',
        text: 'Aplicar el ataque de martillo y yunque con la reserva de Las Heras',
        requires: { estrategia: 50 },
        statsEffect: { estrategia: 4, liderazgo: 3, prestigio: 3, caballeria: 2 },
        affinityEffect: [{ characterId: 'las_heras', delta: 12 }, { characterId: 'ohiggins', delta: 12 }],
        nextEventId: 'evt_preparacion_peru_1819',
        yearsPassed: 2,
        newLocation: 'Valparaíso, Chile',
        narrativeTransition: 'La Batalla de Maipú es una obra maestra de la táctica militar. O\'Higgins, herido, llega al campo para darse el legendario "Abrazo de Maipú". Chile queda libre para siempre.',
        battleMinigameConfig: {
          id: 'tateti',
          battleTitle: 'Batalla de Maipú',
          location: 'Llanos de Maipú, Chile',
          year: 1818,
          enemy: {
            name: 'General Mariano Osorio',
            title: 'Comandante de la Expedición Realista',
            portrait: '🎩',
            armyName: 'Ejército Real del Perú y Chile',
            reactionQuotes: {
              intro: '¡En los llanos de Maipú aplastaremos la rebelión!',
              taunt: '¡Nuestros cañones destrozan sus líneas!',
              defeat: '¡Imposible! ¡Mi ejército ha sido aniquilado!',
              victory: '¡La victoria real es completa!',
            },
          },
          historicalContext: 'El 5 de abril de 1818 en los llanos de Maipú se decide el destino del Cono Sur. Aplica una estrategia envolvente contra Osorio.',
          objectiveText: 'Forma 3 fichas en línea en el campo de batalla 3x3 superando a la Inteligencia Enemiga.',
          baseDifficulty: 'épico',
        },
      },
      {
        id: 'opt_maipu_defensiva',
        text: 'Atraer al enemigo hacia tus posiciones fortificadas de artillería',
        statsEffect: { estrategia: 3, salud: 1, recursos: 2 },
        nextEventId: 'evt_preparacion_peru_1819',
        yearsPassed: 2,
        newLocation: 'Valparaíso, Chile',
        narrativeTransition: 'La artillería del Fray Luis Beltrán hace estragos en las filas enemigas. La victoria asegura la independencia del cono sur.'
      }
    ]
  },

  evt_preparacion_peru_1819: {
    id: 'evt_preparacion_peru_1819',
    title: 'Organización de la Expedición Libertadora al Perú',
    year: 1820,
    age: 42,
    location: 'Valparaíso, Chile',
    mapCoords: { lat: -33.04, lng: -71.63 },
    era: 'Hacia la Cuna del Poder Realista',
    historicalContext: 'El gobierno de Buenos Aires cae en la guerra civil y te ordena regresar con el ejército para sofocar a los caudillos del litoral. Te niegas rotundamente: "Mi sable nunca se manchará con sangre de hermanos". Con apoyo de O\'Higgins zarpas con la flota de Thomas Cochrane.',
    options: [
      {
        id: 'opt_desobedecer_buenos_aires',
        text: 'Desobedecer el mandato de Buenos Aires y zarpar con la flota al Perú',
        statsEffect: { patriotismo: 3, relaciones: 2, estrategia: 2, prestigio: 2 },
        affinityEffect: [{ characterId: 'ohiggins', delta: 15 }, { characterId: 'guido', delta: 15 }],
        nextEventId: 'evt_desembarco_pisco_1820',
        yearsPassed: 1,
        newLocation: 'Pisco / Lima',
        narrativeTransition: 'Firmas el Acta de Rancagua donde los oficiales ratifican tu mando. El 20 de agosto de 1820, 24 buques zarpan de Valparaíso rumbo al virreinato del Perú.'
      },
      {
        id: 'opt_obedecer_buenos_aires',
        text: 'Retornar con prudencia a mediar pacíficamente antes de zarpar al norte',
        statsEffect: { relaciones: 2, patriotismo: 1, prestigio: -2 },
        nextEventId: 'evt_desembarco_pisco_1820',
        yearsPassed: 1,
        newLocation: 'Pisco / Lima',
        narrativeTransition: 'Despliegas gestiones diplomáticas en el litoral antes de embarcar definitivamente con las fuerzas combinadas hacia Pisco.'
      }
    ]
  },

  evt_desembarco_pisco_1820: {
    id: 'evt_desembarco_pisco_1820',
    title: 'Desembarco en Pisco y la Diplomacia Peruana',
    year: 1820,
    age: 42,
    location: 'Pisco / Huaura, Perú',
    mapCoords: { lat: -13.71, lng: -76.20 },
    era: 'Campañas del Perú',
    historicalContext: 'Desembarcas en las costas de Pisco. San Martín busca evitar un derramamiento inútil de sangre. Envías al coronel Arenales a la sierra a sublevar a los pueblos mientras negocias con el Virrey Pezuela.',
    options: [
      {
        id: 'opt_peru_guerra_zapa_diplomacia',
        text: 'Sitiar Lima por hambre y propagar ideas de libertad sin asaltarla a sangre y fuego',
        statsEffect: { estrategia: 3, relaciones: 2, prestigio: 2, salud: -1 },
        nextEventId: 'evt_independencia_peru_1821',
        yearsPassed: 1,
        newLocation: 'Lima, Perú',
        narrativeTransition: 'Tu estrategia rinde frutos brillantes: el Virrey La Serna abandona Lima retirándose a las montañas. La aristocracia limeña te abre las puertas de la Ciudad de los Reyes.'
      },
      {
        id: 'opt_peru_ataque_directo',
        text: 'Lanzar un asalto militar directo sobre las fortalezas del Callao y Lima',
        requires: { liderazgo: 55 },
        statsEffect: { liderazgo: 2, caballeria: 2, salud: -2, recursos: -2 },
        nextEventId: 'evt_independencia_peru_1821',
        yearsPassed: 1,
        newLocation: 'Lima, Perú',
        narrativeTransition: 'Un feroz combate ensangrienta los baluartes del Callao. Logras ocupar la capital pero a costa de severas bajas en tu veterano ejército.'
      }
    ]
  },

  evt_independencia_peru_1821: {
    id: 'evt_independencia_peru_1821',
    title: 'Proclamación de la Independencia del Perú',
    year: 1821,
    age: 43,
    location: 'Plaza Mayor de Lima, Perú',
    mapCoords: { lat: -12.05, lng: -77.04 },
    era: 'La Cúspide de la Gloria',
    historicalContext: 'El 28 de julio de 1821 ante una multitud jubilosa en la Plaza Mayor de Lima, agitas la bandera peruana y proclamas: "El Perú es desde este momento libre e independiente por la voluntad general de los pueblos..."',
    options: [
      {
        id: 'opt_asumir_protectorado',
        text: 'Aceptar el cargo de Protector Supremo del Perú para organizar el nuevo Estado',
        statsEffect: { prestigio: 3, liderazgo: 2, recursos: 2, patriotismo: 2 },
        affinityEffect: [{ characterId: 'guido', delta: 15 }],
        nextEventId: 'evt_protectorado_lima_1821',
        yearsPassed: 1,
        newLocation: 'Lima, Perú',
        narrativeTransition: 'Asumes la jefatura política y militar del Perú. Fundas la Biblioteca Nacional, aboles la mita de los indígenas y declaras la libertad de vientres para los esclavos.'
      },
      {
        id: 'opt_peru_reinar',
        text: 'Establecer una Monarquía Constitucional independiente con un príncipe europeo',
        statsEffect: { prestigio: 2, relaciones: 2, estrategia: 2 },
        nextEventId: 'evt_protectorado_lima_1821',
        yearsPassed: 1,
        newLocation: 'Lima, Perú',
        narrativeTransition: 'Buscas garantizar la estabilidad institucional evitando la anarquía, enviando misiones diplomáticas a Europa.'
      }
    ]
  },

  evt_protectorado_lima_1821: {
    id: 'evt_protectorado_lima_1821',
    title: 'El Gobierno del Protectorado y los Desafíos',
    year: 1822,
    age: 44,
    location: 'Lima, Perú',
    mapCoords: { lat: -12.05, lng: -77.04 },
    era: 'El Gobernante de la Ciudad de los Reyes',
    historicalContext: 'Aunque dominas la capital, el poderoso ejército realista de La Serna sigue fortificado en la sierra del Cusco con 20.000 hombres. Comprendes que tus fuerzas no bastan para la victoria final. Necesitas la alianza con Simón Bolívar.',
    options: [
      {
        id: 'opt_viajar_guayaquil',
        text: 'Viajar personalmente a Guayaquil para entrevistarte con Simón Bolívar',
        statsEffect: { estrategia: 3, patriotismo: 2, relaciones: 2, prestigio: 1 },
        affinityEffect: [{ characterId: 'bolivar', delta: 10 }],
        nextEventId: 'evt_entrevista_guayaquil_1822',
        yearsPassed: 1,
        newLocation: 'Guayaquil, Ecuador',
        narrativeTransition: 'En julio de 1822 te embarcas en la goleta Macedonia rumbo al puerto de Guayaquil. Vas a encontrarte con el otro gran coloso de la independencia sudamericana.'
      },
      {
        id: 'opt_peru_protectorado_absoluto',
        text: 'Declararte Protector Vitalicio y reclutar forzosamente un nuevo ejército',
        statsEffect: { liderazgo: 2, recursos: -2, relaciones: -2 },
        nextEventId: 'evt_entrevista_guayaquil_1822',
        yearsPassed: 1,
        newLocation: 'Guayaquil, Ecuador',
        narrativeTransition: 'Intentas sostener el peso de la guerra solo, comprobando el rápido agotamiento de las arcas limeñas.'
      }
    ]
  },

  evt_entrevista_guayaquil_1822: {
    id: 'evt_entrevista_guayaquil_1822',
    title: 'La Secreta Entrevista de Guayaquil',
    year: 1822,
    age: 44,
    location: 'Guayaquil, Ecuador',
    mapCoords: { lat: -2.17, lng: -79.92 },
    era: 'El Enigma Histórico',
    historicalContext: 'Los días 26 y 27 de julio de 1822 te reúnes a solas con Simón Bolívar. Bolívar desea el mando exclusivo de la guerra y la anexión de Guayaquil a la Gran Colombia. Comprendes que dos soles no pueden brillar en el mismo firmamento.',
    options: [
      {
        id: 'opt_guayaquil_renuncia',
        text: 'Ceder el mando a Bolívar y renunciar al poder para evitar fricciones',
        statsEffect: { patriotismo: 4, prestigio: 4, relaciones: 3, experiencia: 2 },
        affinityEffect: [{ characterId: 'bolivar', delta: 15 }],
        nextEventId: 'evt_renuncia_exilio_1824',
        yearsPassed: 2,
        newLocation: 'Buenos Aires / Europa',
        narrativeTransition: 'Demuestras una grandeza moral inigualable: "Si es necesario para culminar la libertad de América, me retiraré". Dejas al ejército grancolombiano la gloria de las batallas finales de Junín y Ayacucho.'
      },
      {
        id: 'opt_guayaquil_pacto_alianza',
        text: 'Proponer una alianza militar en igualdad de condiciones bajo mando conjunto',
        statsEffect: { liderazgo: 3, estrategia: 2, prestigio: 2 },
        affinityEffect: [{ characterId: 'bolivar', delta: 8 }],
        nextEventId: 'evt_renuncia_exilio_1824',
        yearsPassed: 2,
        newLocation: 'Buenos Aires / Europa',
        narrativeTransition: 'Convences a Bolívar de dividir el teatro de operaciones, combinando las legiones del norte y del sur.'
      }
    ]
  },

  evt_renuncia_exilio_1824: {
    id: 'evt_renuncia_exilio_1824',
    title: 'Renuncia al Poder y la Partida al Exilio',
    year: 1824,
    age: 46,
    location: 'Buenos Aires / Bruselas',
    mapCoords: { lat: 50.85, lng: 4.35 },
    era: 'El Gran Desprendimiento',
    historicalContext: 'Al regresar a Buenos Aires encuentras la trágica noticia del fallecimiento de tu esposa Remedios de Escalada. El gobierno de Bernardino Rivadavia te hostiga con calumnias y amenazas. Decides marcharte a Europa con tu pequeña hija Mercedes.',
    options: [
      {
        id: 'opt_exilio_paris',
        text: 'Zarpar al exilio en Europa para consagrarte a la educación de Mercedes',
        statsEffect: { patriotismo: 5, prestigio: 5, salud: 3, recursos: 2 },
        affinityEffect: [{ characterId: 'guido', delta: 15 }],
        nextEventId: 'evt_guerra_brasil_1828',
        yearsPassed: 4,
        newLocation: 'Bruselas / París',
        narrativeTransition: 'En Bruselas y luego en Grand Bourg redactas las famosas Máximas para mi hija. Tu vida se convierte en un modelo de sobriedad y serenidad republicana.'
      },
      {
        id: 'opt_quedarse_combatiendo_politica',
        text: 'Enfrentar políticamente al partido porteño de Rivadavia en Buenos Aires',
        statsEffect: { liderazgo: 4, relaciones: -4, salud: -3 },
        nextEventId: 'evt_guerra_brasil_1828',
        yearsPassed: 4,
        newLocation: 'Buenos Aires',
        narrativeTransition: 'Soportas acusaciones injustas de la prensa centralista pero defiendes tu honor sin recurrir a las armas.'
      }
    ]
  },

  evt_guerra_brasil_1828: {
    id: 'evt_guerra_brasil_1828',
    title: 'El Intento de Retorno y la Guerra con el Brasil',
    year: 1829,
    age: 51,
    location: 'Río de la Plata (Montevideo)',
    mapCoords: { lat: -34.90, lng: -56.19 },
    era: 'El Retorno Frustrado',
    historicalContext: 'En 1829 viajas incógnito en el buque Countess of Chichester para ofrecer tus servicios en la guerra contra el Imperio del Brasil. Al llegar al puerto de Buenos Aires te encuentras con el fusilamiento de Dorrego por Lavalle y la guerra civil desatada.',
    options: [
      {
        id: 'opt_rehusar_desembarco',
        text: 'Rehusar desembarcar y declarar: "Mi sable jamás se manchará de sangre de hermanos"',
        statsEffect: { prestigio: 6, patriotismo: 6, relaciones: 4, estrategia: 4 },
        nextEventId: 'evt_francia_boulogne_1848',
        yearsPassed: 19,
        newLocation: 'Boulogne-sur-Mer, Francia',
        narrativeTransition: 'Permaneces desembarcado en Montevideo unos días y emprendes el definitivo viaje de regreso a Europa. Nadie logrará jamás arrastrarte a las contiendas fratricidas.'
      },
      {
        id: 'opt_mediar_lavalle_rosas',
        text: 'Desembarcar en Montevideo para redactar un pacto de paz entre caudillos',
        statsEffect: { relaciones: 5, prestigio: 5, patriotismo: 4 },
        nextEventId: 'evt_francia_boulogne_1848',
        yearsPassed: 19,
        newLocation: 'Boulogne-sur-Mer, Francia',
        narrativeTransition: 'Envías misivas cordiales pidiendo cordura y patriotismo antes de retornar a tu retiro europeo.'
      }
    ]
  },

  evt_francia_boulogne_1848: {
    id: 'evt_francia_boulogne_1848',
    title: 'Los Últimos Años en Boulogne-sur-Mer',
    year: 1848,
    age: 70,
    location: 'Boulogne-sur-Mer, Francia',
    mapCoords: { lat: 50.73, lng: 1.60 },
    era: 'El Crepúsculo del Héroe',
    historicalContext: 'Vives tranquilamente a orillas del Canal de la Mancha con tu hija Mercedes, tu yerno Mariano Balcarce y tus nietas. Recibes la visita de jóvenes patriotas como Domingo Faustino Sarmiento y Juan Bautista Alberdi.',
    options: [
      {
        id: 'opt_donar_sable_rosas',
        text: 'Legar en tu testamento el Sable Corvo al Brigadier Juan Manuel de Rosas por la defensa de la soberanía nacional',
        statsEffect: { prestigio: 6, patriotismo: 6, experiencia: 5, liderazgo: 4 },
        nextEventId: 'evt_testamento_final_1850',
        yearsPassed: 2,
        newLocation: 'Boulogne-sur-Mer',
        narrativeTransition: 'El gesto de legar tu sable glorioso por la firmeza en la defensa del río Paraná ante la flota anglo-francesa causa conmoción patriótica en toda América.'
      },
      {
        id: 'opt_legar_sable_nacion',
        text: 'Legar tu sable al Museo Nacional para que pertenezca a todos los argentinos',
        statsEffect: { prestigio: 5, patriotismo: 5, relaciones: 4 },
        nextEventId: 'evt_testamento_final_1850',
        yearsPassed: 2,
        newLocation: 'Boulogne-sur-Mer',
        narrativeTransition: 'Tu reliquia militar queda consagrada como el mayor tesoro histórico de las futuras generaciones.'
      }
    ]
  },

  evt_testamento_final_1850: {
    id: 'evt_testamento_final_1850',
    title: 'Inmortalidad en Boulogne-sur-Mer — 17 de Agosto de 1850',
    year: 1850,
    age: 72,
    location: 'Boulogne-sur-Mer, Francia',
    mapCoords: { lat: 50.73, lng: 1.60 },
    era: 'El Paso a la Inmortalidad (17 de agosto de 1850)',
    historicalContext: 'El 17 de agosto de 1850 a las tres de la tarde, el Padre de la Patria exhala su último suspiro en su hogar de Boulogne-sur-Mer, Francia, rodeado de su hija Mercedes. Tu vida ha sido una epopeya completa.',
    options: [
      {
        id: 'opt_final_cumplir_destino',
        text: 'Descansar en paz sabiendo que diste la libertad a todo un continente',
        statsEffect: { prestigio: 5, patriotismo: 5, estrategia: 5, liderazgo: 5 },
        nextEventId: 'END_CALCULATED',
        yearsPassed: 0,
        narrativeTransition: 'El Sol de Mayo ilumina la eternidad. La historia argentina te corona para siempre como EL LIBERTADOR.'
      }
    ]
  }
};
