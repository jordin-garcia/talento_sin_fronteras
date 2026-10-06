// Pruebas de aceptación: cada prueba cita los requisitos de specs/01-requisitos.md que verifica.
import { test, expect, type Page } from '@playwright/test';

const RUTAS = ['/', '/nivel/1', '/nivel/2', '/nivel/3', '/nivel/4', '/nivel/5', '/morral', '/banco', '/reconocimiento'];

/** Registra toda petición a otro dominio (R-10.3, P1). */
function terceros(page: Page) {
  const lista: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (!['localhost', '127.0.0.1'].includes(u.hostname) && !u.protocol.startsWith('data')) lista.push(r.url());
  });
  return lista;
}

test.describe('Transversales', () => {
  for (const ruta of RUTAS) {
    test(`R-10.1 / R-10.3 · ${ruta} sin desborde, sin errores y sin terceros`, async ({ page }) => {
      const errores: string[] = [];
      page.on('pageerror', (e) => errores.push(e.message));
      const fuera = terceros(page);
      await page.goto(ruta, { waitUntil: 'networkidle' });
      const ancho = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(ancho).toBeLessThanOrEqual(0);
      expect(errores).toEqual([]);
      expect(fuera).toEqual([]);
      if (ruta !== '/reconocimiento') await expect(page.getByText('Nunca comparta').first()).toBeVisible(); // P2
    });
  }

  test('R-10.2 · manifest y service worker publicados', async ({ request }) => {
    const m = await request.get('/manifest.webmanifest');
    expect(m.ok()).toBeTruthy();
    expect((await m.json()).icons.length).toBeGreaterThanOrEqual(3);
    expect((await request.get('/sw.js')).ok()).toBeTruthy();
  });

  test('R-8.1 · los cuatro materiales descargables existen', async ({ request }) => {
    for (const f of ['tarjeta-de-la-formula.png', 'guia-de-bolsillo.pdf', 'plantilla-curriculum.txt', 'guia-del-facilitador.pdf']) {
      expect((await request.get('/materiales/' + f)).ok(), f).toBeTruthy();
    }
  });
});

test.describe('Inicio', () => {
  test('R-1.1 / R-1.3 / R-1.5 · portada, 6 estaciones y mapa', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Talento');
    await expect(page.locator('[data-estacion]')).toHaveCount(6);
    await expect(page.locator('#mapa [data-nivel]')).toHaveCount(5);
    await expect(page.locator('#mapa [data-nivel="1"]')).toHaveClass(/actual/);
  });

  test('R-1.2 / R-2.6 · el progreso persiste y mueve "Usted está aquí"', async ({ page }) => {
    await page.goto('/nivel/1');
    await page.getByRole('button', { name: /Completé este nivel/ }).click();
    await expect(page.getByRole('link', { name: /Ir al nivel 2/ })).toBeVisible();
    await page.goto('/nivel/2');
    await page.getByRole('button', { name: /Completé este nivel/ }).click();
    await page.goto('/');
    await expect(page.locator('#mapa [data-nivel="3"]')).toHaveClass(/actual/);
    await expect(page.locator('#mapa [data-nivel="1"]')).toHaveClass(/hecho/);
    await expect(page.locator('[data-progreso-cuenta]').first()).toHaveText('2');
    const guardado = await page.evaluate(() => Object.keys(localStorage));
    expect(guardado).toEqual(['tsf:progreso']); // P1: nada más se guarda
  });

  test('R-1.7 · con movimiento reducido todo el contenido es visible', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4321/');
    await page.locator('#mapa').scrollIntoViewIfNeeded();
    await expect(page.locator('#mapa .mapa')).toHaveCSS('opacity', '1');
    await ctx.close();
  });
});

test.describe('Niveles', () => {
  test('R-2.2 / R-2.3 / R-2.4 · video pendiente y versión en texto del guion', async ({ page }) => {
    await page.goto('/nivel/1');
    await expect(page.getByText('Video en preparación')).toBeVisible();
    await expect(page.locator('#version-texto details')).toHaveCount(6);
    await expect(page.locator('#version-texto')).toContainText('Nunca comparta, siempre verifique.');
  });

  test('R-3.3 · juego "¿Lo compartiría?" da retroalimentación', async ({ page }) => {
    await page.goto('/nivel/1');
    const carta = page.locator('.carta').first();
    await expect(carta.locator('.siguiente')).toBeHidden();
    await carta.getByRole('button', { name: /No, nunca/ }).click();
    await expect(carta.locator('.fb')).toContainText('Correcto');
    await expect(carta.locator('.siguiente')).toBeVisible();
  });

  test('R-4.2 · tarjetas antes/después se voltean', async ({ page }) => {
    await page.goto('/nivel/2');
    const t = page.locator('.voltear').first();
    await t.click();
    await expect(t).toHaveAttribute('aria-pressed', 'true');
  });

  test('R-5.x · generador guiado completo con corchetes y advertencia de datos', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/nivel/3');
    await expect(page.locator('[data-resultado]')).toBeHidden();
    await expect(page.locator('[data-atras]')).toBeHidden();
    await page.getByRole('button', { name: 'Ayudante de cocina' }).click();
    await page.getByRole('button', { name: /Siguiente/ }).click();
    await page.locator('#g-exp').fill('Trabajé cuatro años en un restaurante, mi DPI es 1234567890101');
    await page.getByRole('button', { name: /Siguiente/ }).click();
    await expect(page.locator('[data-alerta-pii]')).toBeVisible(); // R-5.3
    await page.locator('#g-exp').fill('Trabajé cuatro años en un restaurante. Preparaba alimentos y mantenía la cocina limpia.');
    await page.getByRole('button', { name: /Siguiente/ }).click();
    await page.getByRole('button', { name: /Armar mi instrucción/ }).click();
    const r = page.locator('[data-resultado]');
    await expect(r).toBeVisible();
    await expect(r.locator('[data-que]')).toContainText('puesto de ayudante de cocina');
    await expect(r.locator('[data-como]')).toContainText('[NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO]'); // R-5.2
    await r.getByRole('button', { name: /Copiar/ }).click();
    const copiado = await page.evaluate(() => navigator.clipboard.readText());
    expect(copiado).toContain('Actúa como un asesor'); // R-5.4
    await expect(r.getByRole('link', { name: /Abrir la herramienta de IA/ })).toHaveAttribute('target', '_blank'); // R-5.5
    expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => k !== 'tsf:progreso'))).toEqual([]); // R-5.7
  });

  test('R-6.2 / R-6.3 · advertencia visible y armador sin ejemplos', async ({ page }) => {
    await page.goto('/nivel/4');
    await expect(page.locator('.advertencia').getByText('El asistente no sustituye a un abogado')).toBeVisible();
    for (const id of ['#a-quien', '#a-que', '#a-como']) await expect(page.locator(id)).toHaveValue('');
    await page.fill('#a-quien', 'Actúa como alguien que redacta mensajes');
    await page.fill('#a-que', 'Quiero preguntar por una vacante');
    await page.fill('#a-como', 'En cinco líneas');
    await page.getByRole('button', { name: /Unir mi instrucción/ }).click();
    await expect(page.locator('[data-unida]')).toBeVisible();
  });

  test('R-7.1 · el Nivel 5 no muestra instrucciones armadas', async ({ page }) => {
    await page.goto('/nivel/5');
    const practica = await page.locator('.actividad').innerText();
    expect(practica).not.toMatch(/Actúa como/i);
    const casillas = page.locator('[data-pasos] input[type="checkbox"]');
    for (let i = 0; i < 4; i++) await casillas.nth(i).check({ force: true });
    await expect(page.locator('[data-logro]')).toBeVisible();
  });
});

test.describe('Morral, banco y reconocimiento', () => {
  test('R-8.2 · banco con 10 casos y filtros', async ({ page }) => {
    await page.goto('/banco');
    await expect(page.locator('.caso')).toHaveCount(10);
    await page.getByRole('button', { name: /Entrevista/ }).click();
    await expect(page.locator('.caso:visible')).toHaveCount(2);
  });

  test('R-9.x · reconocimiento se genera y descarga sin red', async ({ page }) => {
    const fuera = terceros(page);
    await page.goto('/reconocimiento');
    await expect(page.locator('[data-aviso-progreso]')).toBeVisible(); // R-9.4
    await page.fill('#nombre', 'María Ejemplo Ficticio');
    await page.getByRole('button', { name: /Crear mi reconocimiento/ }).click();
    await expect(page.getByLabel('Vista previa del reconocimiento')).toBeVisible();
    const [descarga] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Descargar imagen/ }).click()]);
    expect(descarga.suggestedFilename()).toBe('reconocimiento-talento-sin-fronteras.png');
    expect(fuera).toEqual([]); // R-9.3
    expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain('María');
  });
});
