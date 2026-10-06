import { defineConfig } from 'astro/config';

// BASE permite publicar en una subcarpeta (p. ej. GitHub Pages: BASE=/talento-sin-fronteras).
// SITIO_URL es la dirección pública final (para enlaces absolutos y vista previa al compartir).
export default defineConfig({
  site: process.env.SITIO_URL || 'https://talentosinfronteras.example',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: { responsiveStyles: false },
});
