// Progreso de la ruta (P1, R-2.6). Lo ÚNICO que se guarda en el teléfono: qué niveles se completaron.
const CLAVE = 'tsf:progreso';
export const TOTAL = 5;

type Progreso = Record<string, boolean>;

function leer(): Progreso {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) || '{}') || {};
  } catch {
    return {};
  }
}

function escribir(p: Progreso) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p));
  } catch {
    /* almacenamiento bloqueado: el avance solo dura esta visita */
  }
}

export function completado(n: number) {
  return !!leer()[n];
}

export function completar(n: number) {
  const p = leer();
  p[n] = true;
  escribir(p);
  pintar();
}

export function cuantos() {
  const p = leer();
  let c = 0;
  for (let i = 1; i <= TOTAL; i++) if (p[i]) c++;
  return c;
}

/** Primer nivel sin completar (6 = ruta terminada → Morral). */
export function siguiente() {
  const p = leer();
  for (let i = 1; i <= TOTAL; i++) if (!p[i]) return i;
  return TOTAL + 1;
}

/** Actualiza en pantalla todo lo que depende del progreso. */
export function pintar() {
  const n = cuantos();
  const sig = siguiente();
  document.querySelectorAll<HTMLElement>('[data-progreso-cuenta]').forEach((el) => (el.textContent = String(n)));
  document.querySelectorAll<HTMLElement>('[data-progreso-barra]').forEach((el) => el.style.setProperty('--avance', String(n / TOTAL)));
  document.querySelectorAll<HTMLElement>('[data-nivel]').forEach((el) => {
    const k = Number(el.dataset.nivel);
    el.classList.toggle('hecho', completado(k));
    el.classList.toggle('actual', k === sig);
  });
}
