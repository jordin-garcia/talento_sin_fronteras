// Capturas de revisión visual (G2). Uso: node scripts/capturas.mjs <ruta> <ancho> <alto> [completa] [scrollY]
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
const [ruta = '/', ancho = '390', alto = '844', completa = '0', scroll = '0'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +ancho, height: +alto }, deviceScaleFactor: 1 });
const errores = [];
p.on('pageerror', (e) => errores.push(e.message));
p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
await p.goto('http://localhost:4321' + ruta, { waitUntil: 'networkidle' });
if (completa === '1') {
  // recorre la página para disparar las animaciones de scroll
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 300) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(800);
}
if (+scroll) { await p.evaluate((y) => scrollTo(0, y), +scroll); await p.waitForTimeout(1500); }
else await p.waitForTimeout(1500);
const nombre = `../capturas/${ruta.replace(/\W+/g, '_') || 'inicio'}_${ancho}${completa === '1' ? '_completa' : ''}${+scroll ? '_' + scroll : ''}.png`;
await p.screenshot({ path: fileURLToPath(new URL(nombre, import.meta.url)), fullPage: completa === '1' });
const ancho_doc = await p.evaluate(() => document.documentElement.scrollWidth);
console.log(nombre, 'scrollWidth=', ancho_doc, errores.length ? 'ERRORES: ' + errores.join(' | ') : 'sin errores');
await b.close();
