// Animaciones de desplazamiento (R-1.4, R-1.7).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siguiente } from './progreso';

gsap.registerPlugin(ScrollTrigger);
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Revela los elementos [data-revelar] al entrar en pantalla. */
export function revelar() {
  const els = gsap.utils.toArray<HTMLElement>('[data-revelar]');
  if (reducido()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (lote) => gsap.to(lote, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
  });
}

/** Cielo: de la madrugada (arriba) al amanecer (abajo). */
function cielo() {
  const raiz = document.documentElement;
  const paradas = [
    ['#0a0c2a', '#161a55', '#2a2470'],
    ['#10134a', '#2c2678', '#5a3394'],
    ['#2a2270', '#7a3f9e', '#d0607e'],
    ['#4b2c86', '#d16a86', '#ffb36b'],
  ];
  const mezclas = [0, 1, 2].map((k) => gsap.utils.interpolate(paradas.map((p) => p[k])));
  const pintar = (p: number) => {
    raiz.style.setProperty('--cielo-a', mezclas[0](p));
    raiz.style.setProperty('--cielo-b', mezclas[1](p));
    raiz.style.setProperty('--cielo-c', mezclas[2](p));
    raiz.style.setProperty('--estrellas', String(Math.max(0, 0.85 - p * 1.1)));
  };
  pintar(0);
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => pintar(s.progress) });
}

/** Traza el sendero de piedras uniendo los dioramas y lo "enciende" al bajar. */
function sendero() {
  const cont = document.querySelector<HTMLElement>('.camino-contenedor');
  const svg = cont?.querySelector<SVGSVGElement>('.sendero');
  if (!cont || !svg) return;
  const piedras = svg.querySelector<SVGPathElement>('.sendero-piedras')!;
  const brillo = svg.querySelector<SVGPathElement>('.sendero-brillo')!;
  const mascara = svg.querySelector<SVGPathElement>('.sendero-mascara')!;

  const trazar = () => {
    const base = cont.getBoundingClientRect();
    const pts = [...cont.querySelectorAll<HTMLElement>('.diorama')].map((d) => {
      const r = d.getBoundingClientRect();
      return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height * 0.62 };
    });
    if (!pts.length) return;
    const ini = { x: base.width / 2, y: -40 };
    const todos = [ini, ...pts];
    let d = `M${ini.x},${ini.y}`;
    for (let i = 1; i < todos.length; i++) {
      const a = todos[i - 1], b = todos[i];
      const dy = (b.y - a.y) * 0.55;
      d += ` C${a.x},${a.y + dy} ${b.x},${b.y - dy} ${b.x},${b.y}`;
    }
    svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    [piedras, brillo, mascara].forEach((p) => p.setAttribute('d', d));
  };
  trazar();
  new ResizeObserver(() => { trazar(); ScrollTrigger.refresh(); }).observe(cont);

  mascara.style.strokeDasharray = '1';
  if (reducido()) { mascara.style.strokeDashoffset = '0'; return; }
  mascara.style.strokeDashoffset = '1';
  gsap.to(mascara, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: { trigger: cont, start: 'top 65%', end: 'bottom 70%', scrub: 0.6 },
  });
}

function estaciones() {
  if (reducido()) return;
  gsap.utils.toArray<HTMLElement>('[data-estacion]').forEach((e) => {
    const der = e.classList.contains('der');
    const tl = gsap.timeline({ scrollTrigger: { trigger: e, start: 'top 82%', once: true } });
    tl.from(e.querySelector('.diorama'), { scale: 0.55, opacity: 0, rotate: der ? 8 : -8, duration: 0.9, ease: 'back.out(1.7)' })
      .from(e.querySelector('.info'), { x: der ? -40 : 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
      .from(e.querySelector('.letrero'), { y: -30, opacity: 0, duration: 0.5, ease: 'bounce.out' }, '-=0.4');
  });
  const quetzal = document.querySelector('.quetzal');
  if (quetzal) {
    gsap.fromTo(quetzal, { xPercent: 0, y: 0 }, {
      xPercent: 420, y: -120, ease: 'none',
      scrollTrigger: { trigger: '.camino-contenedor', start: 'top 40%', end: 'center top', scrub: 1 },
    });
  }
  gsap.utils.toArray<HTMLElement>('.deco').forEach((d, i) => {
    gsap.to(d, { y: i % 2 ? -50 : -90, ease: 'none', scrollTrigger: { trigger: d, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function hero() {
  if (reducido()) return;
  gsap.from('[data-hero-anim]', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 });
  gsap.from('[data-guia]', { y: 80, opacity: 0, duration: 1.1, ease: 'back.out(1.4)', stagger: 0.2, delay: 0.5 });
  gsap.to('.hero-fondo img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-texto', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '20% top', end: 'bottom top', scrub: true } });
}

/** "Comenzar el camino" lleva a la siguiente estación pendiente (R-1.2). */
function comenzar() {
  document.querySelectorAll<HTMLAnchorElement>('[data-comenzar]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      const n = siguiente();
      const destino = document.querySelector<HTMLElement>(`[data-estacion][data-nivel="${n}"]`);
      if (!destino) return;
      ev.preventDefault();
      destino.scrollIntoView({ behavior: reducido() ? 'auto' : 'smooth', block: 'center' });
    })
  );
}

export function iniciarInicio() {
  cielo();
  hero();
  sendero();
  estaciones();
  revelar();
  comenzar();
}
