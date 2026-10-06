// Datos editables de la plataforma (R-10.6). Cambie aquí nombres, IDs de YouTube y textos breves.

export const SITIO = {
  nombre: 'Talento Sin Fronteras',
  lema: 'Su experiencia vale',
  descripcion:
    'Ruta de aprendizaje gratuita para usar la inteligencia artificial desde su teléfono y presentar su experiencia de trabajo. Sin registro y sin guardar sus datos.',
  // Herramienta de IA que se abre desde los botones "Abrir la herramienta de IA" (P6: excepción acordada).
  herramientaIA: { nombre: 'ChatGPT', url: 'https://chatgpt.com/' },
  herramientaAlterna: { nombre: 'Gemini', url: 'https://gemini.google.com/' },
};

export const GUIAS = {
  nina: { nombre: 'Ixchel' },
  nino: { nombre: 'Balam' },
};

export type Nivel = {
  n: number;
  slug: string;
  titulo: string;
  tituloVideo: string;
  modulo: string;
  minutos: number;
  apoyo: 'Total' | 'Parcial' | 'Mínimo' | 'Nulo';
  apoyoTexto: string;
  resumen: string;
  hito: string; // nombre corto para el mapa del camino
  brillo: string; // color del diorama
  video: number; // número de guion
  youtubeId: string; // ← pegue aquí el ID del video oculto de YouTube cuando esté grabado
  guia: 'nina' | 'nino';
};

export const NIVELES: Nivel[] = [
  {
    n: 1,
    slug: '/nivel/1',
    titulo: 'Su asistente de IA',
    tituloVideo: 'Su asistente de IA: qué es y cómo pedirle bien',
    modulo: 'Módulo 1',
    minutos: 10,
    apoyo: 'Total',
    apoyoTexto: 'Le damos la fórmula completa',
    resumen: 'Conozca a su nuevo ayudante, la fórmula Quién · Qué · Cómo y las dos reglas para usarlo con seguridad.',
    hito: 'La fórmula',
    brillo: '#a66bff',
    video: 1,
    youtubeId: '',
    guia: 'nina',
  },
  {
    n: 2,
    slug: '/nivel/2',
    titulo: 'Su experiencia vale',
    tituloVideo: 'Lo que usted sabe hacer, en el idioma del currículum',
    modulo: 'Módulo 2',
    minutos: 15,
    apoyo: 'Parcial',
    apoyoTexto: 'Le damos una plantilla con espacios',
    resumen: 'Todo lo que usted ha hecho es experiencia. Aprenda a traducirlo al idioma de un currículum.',
    hito: 'Su experiencia',
    brillo: '#22c3d0',
    video: 2,
    youtubeId: '',
    guia: 'nino',
  },
  {
    n: 3,
    slug: '/nivel/3',
    titulo: 'El generador de currículum',
    tituloVideo: 'Demostración: el generador guiado paso a paso',
    modulo: 'Módulo 2',
    minutos: 15,
    apoyo: 'Parcial',
    apoyoTexto: 'El generador le arma la instrucción',
    resumen: 'Responda tres preguntas sencillas y obtenga la instrucción lista para crear su currículum.',
    hito: 'Su currículum',
    brillo: '#ff9a3c',
    video: 3,
    youtubeId: '',
    guia: 'nina',
  },
  {
    n: 4,
    slug: '/nivel/4',
    titulo: 'La misma fórmula sirve para más',
    tituloVideo: 'La misma fórmula sirve para más cosas',
    modulo: 'Módulo 3',
    minutos: 10,
    apoyo: 'Mínimo',
    apoyoTexto: 'Solo le recordamos la fórmula',
    resumen: 'Prepárese para una entrevista, entienda un documento o escriba un mensaje formal.',
    hito: 'Más usos',
    brillo: '#ff4fa3',
    video: 4,
    youtubeId: '',
    guia: 'nino',
  },
  {
    n: 5,
    slug: '/nivel/5',
    titulo: 'Ahora le toca a usted',
    tituloVideo: 'Ahora le toca a usted',
    modulo: 'Módulo 4',
    minutos: 8,
    apoyo: 'Nulo',
    apoyoTexto: 'Usted arma su propia instrucción',
    resumen: 'Elija algo que usted necesite y resuélvalo con la fórmula, por su cuenta.',
    hito: 'Su turno',
    brillo: '#3ad08a',
    video: 5,
    youtubeId: '',
    guia: 'nina',
  },
];

export const TOTAL_NIVELES = NIVELES.length;

export const OFRECE = [
  'Aprender a usar una herramienta de inteligencia artificial gratuita, por su cuenta',
  'Acompañamiento para hacer su currículum',
  'Materiales para guardar en su teléfono',
  'Un reconocimiento de participación',
];
export const NO_OFRECE = [
  'No consigue empleo ni contacta empleadores',
  'No hace trámites migratorios',
  'No da asesoría legal',
  'El reconocimiento no es una certificación oficial',
];

export const NUNCA_COMPARTA = [
  'Número de DPI o pasaporte',
  'Dirección exacta',
  'Situación migratoria',
  'Contraseñas',
  'Datos del banco',
  'Fotos de documentos',
];
