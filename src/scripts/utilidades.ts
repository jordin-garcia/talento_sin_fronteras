// Utilidades de interfaz: aviso, copiar, confeti y detector de datos personales.

export function aviso(texto: string) {
  let el = document.getElementById('aviso');
  if (!el) {
    el = document.createElement('div');
    el.id = 'aviso';
    el.className = 'aviso';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = texto;
  el.classList.add('visible');
  clearTimeout((el as any)._t);
  (el as any)._t = setTimeout(() => el!.classList.remove('visible'), 2600);
}

/** Copia texto al portapapeles (R-5.4). Si falla, selecciona el elemento para copia manual. */
export async function copiar(texto: string, respaldo?: HTMLElement, mensaje = '✔ ¡Copiado! Ahora péguelo en la herramienta de IA') {
  try {
    await navigator.clipboard.writeText(texto);
    aviso(mensaje);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      if (ok) {
        aviso(mensaje);
        return true;
      }
    } catch {}
    if (respaldo) {
      const r = document.createRange();
      r.selectNodeContents(respaldo);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
    }
    aviso('Mantenga el dedo sobre el texto y elija «Copiar»');
    return false;
  }
}

/** Detector de posibles datos personales (R-5.3, P2). No envía nada: solo revisa el texto en el teléfono. */
export function datoPersonal(texto: string): string | null {
  const t = texto.toLowerCase();
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(texto)) return 'un correo electrónico';
  if (/(\d[\s-]?){8,}/.test(texto)) return 'un número largo (teléfono, DPI o pasaporte)';
  const palabras: [RegExp, string][] = [
    [/\bdpi\b/, 'su DPI'],
    [/pasaporte/, 'su pasaporte'],
    [/contrase[ñn]a/, 'una contraseña'],
    [/cuenta (bancaria|del banco|de banco)|tarjeta de cr[eé]dito/, 'datos del banco'],
    [/deportad[oa]|migratori|indocumentad|sin papeles/, 'su situación migratoria'],
    [/\bdirecci[oó]n\b|\bvivo en la (calle|avenida|zona)|\bcasa n[uú]mero/, 'su dirección'],
  ];
  for (const [re, que] of palabras) if (re.test(t)) return que;
  return null;
}

/** Confeti con los colores de la fórmula y del tejido. */
export function confeti(duracion = 2200) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:80';
  document.body.appendChild(c);
  const ctx = c.getContext('2d')!;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);
  const colores = ['#b06bff', '#22c3d0', '#ffbf3c', '#ff5d73', '#3ad08a', '#ffffff'];
  const piezas = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 80,
    y: innerHeight * 0.55,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 16 - 6,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    w: 6 + Math.random() * 7,
    h: 4 + Math.random() * 5,
    c: colores[(Math.random() * colores.length) | 0],
  }));
  const t0 = performance.now();
  (function cuadro(t: number) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of piezas) {
      p.vy += 0.38;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t - t0 < duracion) requestAnimationFrame(cuadro);
    else c.remove();
  })(t0);
}
