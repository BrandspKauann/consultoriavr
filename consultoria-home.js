(function () {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const track = (event, params) => dataLayer.push(Object.assign({ event }, params || {}));
  document.querySelectorAll('[data-track]:not([data-track="contact_cta_click"])').forEach((node) => node.addEventListener('click', () => track(node.dataset.track, { placement: node.dataset.placement || 'unknown' })));
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.slide-dots button'));
  let selected = 0;
  function show(index) { selected = index; slides.forEach((slide, i) => slide.classList.toggle('active', i === index)); dots.forEach((dot, i) => dot.classList.toggle('active', i === index)); }
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  if (slides.length > 1) setInterval(() => show((selected + 1) % slides.length), 6500);
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }));
})();
