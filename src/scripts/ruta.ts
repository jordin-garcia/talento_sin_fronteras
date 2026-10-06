// Antepone la ruta base del sitio (para hosting en subcarpeta).
export function url(ruta: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (ruta.startsWith('/') ? ruta : '/' + ruta);
}
