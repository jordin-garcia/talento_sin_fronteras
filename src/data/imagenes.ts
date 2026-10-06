import type { ImageMetadata } from 'astro';

const archivos = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.webp', { eager: true });

/** Devuelve la imagen generada por nombre (sin extensión), p. ej. img('diorama-1'). */
export function img(nombre: string): ImageMetadata {
  const m = archivos[`../assets/img/${nombre}.webp`];
  if (!m) throw new Error(`Imagen no encontrada: ${nombre}`);
  return m.default;
}

export const ICONO_NIVEL: Record<number, string> = {
  1: 'ico-asistente',
  2: 'ico-herramientas',
  3: 'ico-generador',
  4: 'ico-caminos',
  5: 'ico-estrella',
  6: 'ico-curriculum',
};
export const DIORAMA_NIVEL: Record<number, string> = {
  1: 'diorama-1',
  2: 'diorama-2',
  3: 'diorama-3',
  4: 'diorama-4',
  5: 'diorama-5',
  6: 'diorama-morral',
};
