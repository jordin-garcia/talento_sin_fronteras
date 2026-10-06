// Recorta los bordes transparentes, limita tamaños y convierte a WebP (B3, R-10.4).
// También genera los íconos de la PWA a partir de public/logo.svg (B4).
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const crudo = join(raiz, 'assets-raw');
const salida = join(raiz, 'src', 'assets', 'img');
mkdirSync(salida, { recursive: true });

const maximo = (n) =>
  n.startsWith('hero') || n === 'amanecer' || n === 'marco-reconocimiento' ? 1600
  : n.startsWith('ico-') ? 320
  : n.startsWith('ixchel') || n.startsWith('balam') ? 1100
  : 900;

for (const f of readdirSync(crudo).filter((f) => f.endsWith('.png') && !f.startsWith('_'))) {
  const n = f.replace('.png', '');
  const destino = join(salida, n + '.webp');
  let img = sharp(join(crudo, f));
  const { hasAlpha } = await img.metadata();
  if (hasAlpha && !n.startsWith('hero') && n !== 'amanecer' && n !== 'marco-reconocimiento') img = img.trim({ threshold: 2 });
  const m = maximo(n);
  await img
    .resize({ width: m, height: m, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 95, effort: 5 })
    .toFile(destino);
  console.log('✓', n);
}

// Íconos PWA
const logo = join(raiz, 'public', 'logo.svg');
if (existsSync(logo)) {
  for (const s of [192, 512]) {
    await sharp(logo, { density: 400 }).resize(s, s).png().toFile(join(raiz, 'public', `icono-${s}.png`));
  }
  // Ícono "maskable": logo con margen sobre fondo noche
  const centro = await sharp(logo, { density: 400 }).resize(380, 380).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#0a0c2a' } })
    .composite([{ input: centro, gravity: 'center' }])
    .png()
    .toFile(join(raiz, 'public', 'icono-maskable-512.png'));
  await sharp(logo, { density: 400 }).resize(180, 180).flatten({ background: '#0a0c2a' }).png().toFile(join(raiz, 'public', 'apple-touch-icon.png'));
  console.log('✓ íconos PWA');
}
