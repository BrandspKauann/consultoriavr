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
  document.querySelector('#diagnostic-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector('[type=submit]');
    const status = form.querySelector('.form-note');
    if (button.disabled || !form.reportValidity()) return;
    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Enviando...';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Enviando seu diagnóstico...';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      status.textContent = 'Diagnóstico enviado com sucesso. Nossa equipe entrará em contato pelo e-mail informado.';
      track('generate_lead', { form_id: 'consultoria_vr_diagnostico', placement: 'diagnostico' });
    } catch {
      status.textContent = 'Não foi possível enviar seu diagnóstico. Seus dados foram mantidos; tente novamente ou fale com a equipe pelo WhatsApp.';
    } finally {
      button.disabled = false;
      button.textContent = label;
      form.removeAttribute('aria-busy');
    }
  });
  document.querySelector('#diagnostico')?.addEventListener('focusin', () => track('diagnostico_start', { form_id: 'consultoria_vr_diagnostico' }), { once: true });
})();
