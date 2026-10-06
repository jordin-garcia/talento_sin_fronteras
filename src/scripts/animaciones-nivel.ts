// Animaciones ligeras para las páginas internas (sin GSAP): revelado al entrar en pantalla.
export function revelar() {
  const els = document.querySelectorAll<HTMLElement>('[data-revelar]');
  const listo = (el: HTMLElement) => {
    el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.9,.3,1.2)';
    el.style.opacity = '1';
    el.style.transform = 'none';
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(listo);
    return;
  }
  const io = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => { if (e.isIntersecting) { listo(e.target as HTMLElement); io.unobserve(e.target); } }),
    { rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
}
