// Texto de la instrucción del generador guiado (specs/02-diseno.md · "Generador").
export const FORMA_PREDETERMINADA = 'Escríbelo como un currículum de una página, con frases cortas';

const limpiar = (s: string) => s.trim().replace(/\s+/g, ' ').replace(/[.。]+$/, '');
const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export function armarCurriculum(puesto: string, experiencia: string, forma: string) {
  return {
    quien: 'Actúa como un asesor que ayuda a redactar currículums para personas que buscan trabajo en Guatemala.',
    que:
      `Necesito un currículum para aplicar a un puesto de ${minuscula(limpiar(puesto))}. ` +
      `Esta es mi experiencia, contada con mis palabras: ${limpiar(experiencia)}. ` +
      'Convierte lo que hice en habilidades claras que un empleador entienda. ' +
      'Usa solo lo que yo te conté: no inventes puestos, fechas, estudios ni idiomas.',
    como:
      `${limpiar(forma || FORMA_PREDETERMINADA)}. ` +
      'Usa palabras sencillas y ordénalo en: datos de contacto, perfil, experiencia, habilidades e idiomas, y formación. ' +
      'Deja [NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO] entre corchetes para que yo los complete.',
  };
}

export const unir = (p: { quien: string; que: string; como: string }) => `${p.quien}\n${p.que}\n${p.como}`;
