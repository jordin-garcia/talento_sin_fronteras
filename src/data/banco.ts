// Banco de ejemplos (R-8.2). Todos los casos son ficticios.
// Cada caso muestra la fórmula desglosada para reconocer el patrón, no para copiarlo tal cual.

export type Caso = {
  id: string;
  tipo: 'curriculum' | 'entrevista' | 'documento' | 'mensaje' | 'otro';
  titulo: string;
  situacion: string;
  quien: string;
  que: string;
  como: string;
  consejo: string;
};

export const TIPOS: Record<Caso['tipo'], { nombre: string; emoji: string }> = {
  curriculum: { nombre: 'Currículum', emoji: '📄' },
  entrevista: { nombre: 'Entrevista', emoji: '🎤' },
  documento: { nombre: 'Entender un documento', emoji: '📑' },
  mensaje: { nombre: 'Mensaje formal', emoji: '💬' },
  otro: { nombre: 'Otras necesidades', emoji: '✨' },
};

export const CASOS: Caso[] = [
  {
    id: 'cv-construccion',
    tipo: 'curriculum',
    titulo: 'Experiencia en construcción',
    situacion: 'Una persona trabajó cuatro años como ayudante en obras de construcción y quiere aplicar a un puesto de ayudante de albañilería.',
    quien: 'Actúa como un asesor que ayuda a redactar currículums para personas que buscan trabajo en Guatemala.',
    que: 'Necesito presentar mi experiencia para un puesto de ayudante de albañilería. Trabajé cuatro años en construcción: preparaba materiales, cortaba, usaba herramientas eléctricas y ayudaba a levantar paredes. Hablaba inglés básico con mi jefe. Usa solo lo que te conté.',
    como: 'Escríbelo como la sección de experiencia de un currículum, con cuatro frases cortas y palabras sencillas.',
    consejo: 'Contar las herramientas que usaba y el idioma que hablaba hace que la experiencia se vea completa.',
  },
  {
    id: 'cv-cocina',
    tipo: 'curriculum',
    titulo: 'Experiencia en cocina',
    situacion: 'Una persona trabajó en la cocina de un restaurante y quiere aplicar a un puesto de auxiliar de cocina.',
    quien: 'Actúa como un asesor que ayuda a redactar currículums.',
    que: 'Necesito un perfil para aplicar a auxiliar de cocina. Trabajé tres años en un restaurante: preparaba alimentos, mantenía todo limpio y ordenado y trabajaba rápido en las horas de más clientes. Usa solo lo que te conté.',
    como: 'Escribe un perfil de tres líneas, con palabras sencillas.',
    consejo: '"Trabajar rápido en horas de muchos clientes" se traduce como "trabajo bajo presión": vale mucho.',
  },
  {
    id: 'cv-mercado',
    tipo: 'curriculum',
    titulo: 'Experiencia en ventas',
    situacion: 'Una persona vendía en un puesto del mercado y quiere aplicar a un puesto de atención al cliente en una tienda.',
    quien: 'Actúa como un asesor de empleo que conoce el trabajo en tiendas.',
    que: 'Necesito convertir mi experiencia en habilidades para un currículum. Vendí cinco años en un puesto del mercado: atendía clientes, manejaba dinero y sabía qué producto se estaba acabando. Usa solo lo que te conté.',
    como: 'Hazme una lista de cinco habilidades, cada una con una frase corta que la explique.',
    consejo: 'Lo que hacía todos los días ya tiene nombre: atención al cliente, manejo de efectivo y control de inventario.',
  },
  {
    id: 'ent-bodega',
    tipo: 'entrevista',
    titulo: 'Practicar una entrevista',
    situacion: 'Una persona tiene una entrevista para trabajar en una bodega y quiere practicar sus respuestas.',
    quien: 'Actúa como una persona que entrevista para puestos de auxiliar de bodega.',
    que: 'Voy a practicar mis respuestas. Hazme una pregunta a la vez y espera mi respuesta.',
    como: 'Después de cada respuesta, dime cómo mejorarla en dos frases cortas.',
    consejo: 'Pedir "una pregunta a la vez" convierte la conversación en una práctica real.',
  },
  {
    id: 'ent-preguntas',
    tipo: 'entrevista',
    titulo: 'Preguntas para hacerle al empleador',
    situacion: 'Una persona quiere llegar a la entrevista con preguntas propias para el empleador.',
    quien: 'Actúa como un orientador laboral amable.',
    que: 'Tengo una entrevista para un puesto de limpieza en un hotel. Quiero hacerle buenas preguntas al empleador sobre el horario y las tareas.',
    como: 'Dame cinco preguntas cortas y respetuosas.',
    consejo: 'Hacer preguntas también muestra interés y seguridad.',
  },
  {
    id: 'doc-oferta',
    tipo: 'documento',
    titulo: 'Entender una oferta de trabajo',
    situacion: 'Una persona encontró una oferta de trabajo con palabras que no conoce. Antes de pegarla, borró nombres, teléfonos y direcciones.',
    quien: 'Actúa como alguien que explica textos difíciles con palabras sencillas.',
    que: 'Explícame qué piden en esta oferta de trabajo y qué significa cada palabra difícil. Este es el texto: (aquí pega la oferta, sin datos personales).',
    como: 'Explícalo en una lista corta y al final sugiéreme dos preguntas para el empleador.',
    consejo: 'Si el documento habla de contratos, plazos o derechos laborales, confírmelo en la institución que corresponde.',
  },
  {
    id: 'doc-palabras',
    tipo: 'documento',
    titulo: 'Palabras que no conozco',
    situacion: 'Una persona leyó en un anuncio las palabras "proactivo", "disponibilidad inmediata" y "prestaciones de ley".',
    quien: 'Actúa como un maestro paciente.',
    que: 'Explícame qué significan estas palabras de un anuncio de trabajo: proactivo, disponibilidad inmediata, prestaciones de ley.',
    como: 'Usa una frase sencilla y un ejemplo para cada una.',
    consejo: 'El asistente explica palabras. Lo que a usted le corresponde por ley se confirma en el Ministerio de Trabajo.',
  },
  {
    id: 'msg-vacante',
    tipo: 'mensaje',
    titulo: 'Preguntar por una vacante',
    situacion: 'Una persona vio un anuncio de una panadería y quiere escribir por WhatsApp para preguntar por el puesto.',
    quien: 'Actúa como alguien que redacta mensajes respetuosos.',
    que: 'Necesito preguntar si todavía tienen la vacante de ayudante de panadería y cómo puedo aplicar.',
    como: 'Escríbelo para WhatsApp, en cinco líneas y con tono cordial. Deja [NOMBRE] entre corchetes.',
    consejo: 'Antes de enviarlo, léalo: ¿suena como usted? Su nombre lo escribe usted al final.',
  },
  {
    id: 'msg-agradecer',
    tipo: 'mensaje',
    titulo: 'Agradecer una entrevista',
    situacion: 'Una persona tuvo una entrevista y quiere enviar un mensaje corto de agradecimiento.',
    quien: 'Actúa como alguien que escribe mensajes amables y formales.',
    que: 'Ayer tuve una entrevista para un puesto de guardia de seguridad y quiero agradecer la oportunidad.',
    como: 'Escribe un mensaje de tres líneas, formal pero sencillo.',
    consejo: 'Un mensaje corto de agradecimiento deja una buena impresión.',
  },
  {
    id: 'otro-negocio',
    tipo: 'otro',
    titulo: 'Ideas para un pequeño negocio',
    situacion: 'Una persona quiere vender tamales los fines de semana y necesita ordenar sus ideas.',
    quien: 'Actúa como un asesor de pequeños negocios.',
    que: 'Quiero vender tamales los sábados en mi colonia. Necesito una lista de lo que debo preparar y cómo dar a conocer mi venta.',
    como: 'Dame una lista de pasos sencillos, máximo ocho.',
    consejo: 'La misma fórmula sirve para cualquier necesidad: solo cambia lo que usted pide.',
  },
];
