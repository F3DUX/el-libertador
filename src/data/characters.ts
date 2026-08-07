import { CharacterAffinity } from '@/types/game';

export const HISTORICAL_CHARACTERS: Record<string, CharacterAffinity> = {
  belgrano: {
    id: 'belgrano',
    name: 'Manuel Belgrano',
    role: 'General del Ejército del Norte',
    affinity: 85,
    status: 'Respeto',
    bio: 'Abogado, economista y patriota. Creador de la bandera argentina y comandante heroico del Ejército del Norte. Mantiene una admiración mutua inquebrantable con San Martín.',
    unlocked: true,
    avatarIcon: 'Scroll'
  },
  ohiggins: {
    id: 'ohiggins',
    name: "Bernardo O'Higgins",
    role: 'Director Supremo de Chile',
    affinity: 80,
    status: 'Confianza',
    bio: 'Líder de la independencia chilena y compañero clave en el Plan Continental. Su lealtad permitió financiar la Expedición Libertadora al Perú.',
    unlocked: true,
    avatarIcon: 'Shield'
  },
  bolivar: {
    id: 'bolivar',
    name: 'Simón Bolívar',
    role: 'El Libertador del Norte',
    affinity: 50,
    status: 'Respeto',
    bio: 'Genio militar de Venezuela, Colombia y Ecuador. Posee un carisma arrollador y visiones grandiosas para América, aunque sus ambiciones suelen chocar con la modestia republicana de San Martín.',
    unlocked: false,
    avatarIcon: 'Crown'
  },
  remedios: {
    id: 'remedios',
    name: 'Remedios de Escalada',
    role: 'Esposa de San Martín',
    affinity: 90,
    status: 'Amistad',
    bio: 'Joven de la aristocracia porteña que entregó su juventud y joyas para la causa patriota. Esposa devota y madre de Mercedes San Martín.',
    unlocked: true,
    avatarIcon: 'Heart'
  },
  las_heras: {
    id: 'las_heras',
    name: 'Juan Gregorio de Las Heras',
    role: 'General de División del Ejército de los Andes',
    affinity: 75,
    status: 'Confianza',
    bio: 'Valiente oficial que lideró la columna del Paso de Uspallata. Brazo derecho de San Martín en las gloriosas batallas de Chacabuco y Maipú.',
    unlocked: true,
    avatarIcon: 'Swords'
  },
  pueyrredon: {
    id: 'pueyrredon',
    name: 'Juan Martín de Pueyrredón',
    role: 'Director Supremo de las Provincias Unidas',
    affinity: 70,
    status: 'Confianza',
    bio: 'Gobernante patriota que apoyó con todos los recursos disponibles a Cuyo para concretar el heroico Cruce de los Andes.',
    unlocked: true,
    avatarIcon: 'Briefcase'
  },
  guido: {
    id: 'guido',
    name: 'Tomás Guido',
    role: 'Oficial, Diplomático y Confidente',
    affinity: 88,
    status: 'Amistad',
    bio: 'Redactor de la famosa Memoria sobre el Plan Continental y confidente íntimo de San Martín a lo largo de toda su trayectoria política y exilio.',
    unlocked: true,
    avatarIcon: 'Feather'
  }
};