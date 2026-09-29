(function () {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const track = (event, params) => dataLayer.push(Object.assign({ event }, params || {}));
  document.querySelectorAll('[data-track]').forEach((node) => node.addEventListener('click', () => track(node.dataset.track, { placement: node.dataset.placement || 'unknown' })));
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.slide-dots button'));
  let selected = 0;
  function show(index) { selected = index; slides.forEach((slide, i) => slide.classList.toggle('active', i === index)); dots.forEach((dot, i) => dot.classList.toggle('active', i === index)); }
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  if (slides.length > 1) setInterval(() => show((selected + 1) % slides.length), 6500);
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }));
  document.querySelector('#diagnostic-form')?.addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; const priority = form.querySelector('[name=priority]').value; track('cta_click', { placement: 'diagnostico_enviado', priority }); track('whatsapp_click', { placement: 'diagnostico_enviado' }); const message = encodeURIComponent('Olá, concluí o diagnóstico inicial da Consultoria VR. Minha prioridade é: ' + priority + '. Gostaria de solicitar uma análise.'); window.location.assign('https://wa.link/3gwhbl?text=' + message); });
  document.querySelector('#diagnostico')?.addEventListener('focusin', () => track('diagnostico_start', { form_id: 'consultoria_vr_diagnostico' }), { once: true });
})();
