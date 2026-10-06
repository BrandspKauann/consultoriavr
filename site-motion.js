const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const selectors = [
  '[data-viewport-reveal]', '.hero-content', '.intro>div', '.intro>p',
  '.operators-copy', '.operator-deck', '.decision-copy', '.decision-image',
  '.section-heading', '.method-list>article', '.support-intro', '.support-cards>article',
  '.content-heading', '.content-grid>a', '.advisor>img', '.advisor>div',
  '.seo-fallback__article-card', '.seo-fallback__hero>.seo-fallback__wrap',
  '.review-banner>div', '.network-home>div', '.faq>details',
  '.article-landing__hero-inner', '.article-landing__signal',
  '.article-landing__opening-inner>div', '.article-landing__chapter-heading',
  '.article-landing__chapter-copy>p', '.article-landing__application-intro',
  '.article-landing__application-steps>article', '.article-landing__metrics-heading',
  '.article-landing__metrics-grid>article', '.article-landing__consulting>div',
  '.article-landing__faq>details', '.article-landing__related-heading'
];
const nodes = [...new Set(document.querySelectorAll(selectors.join(',')))];
const active = new Set(nodes);
const progress = document.querySelector('[data-reading-progress]');
const navigation = [...document.querySelectorAll('.operator-reading-nav a[href^="#"]')];
const sections = navigation.map(link => document.querySelector(link.getAttribute('href')));
const photos = [...document.querySelectorAll('[data-scroll-photo]')];
const tiltNodes = [...document.querySelectorAll('[data-card-tilt]')];
let queued = false;
let motionEnabled = false;

function update() {
  queued = false;
  if (motionEnabled === reduced.matches) configure();
  const height = innerHeight;
  if (!reduced.matches) {
    const edge = Math.min(140, height * .16);
    // Only the entering/exiting edges fade; the central reading area stays fully opaque.
    for (const node of active) {
      const rect = node.getBoundingClientRect();
      const visibility = Math.max(0, Math.min(1, rect.bottom / edge, (height - rect.top) / edge));
      node.style.setProperty('--viewport-opacity', visibility.toFixed(3));
      node.style.setProperty('--viewport-shift', `${((1 - visibility) * (rect.top > height / 2 ? 18 : -12)).toFixed(1)}px`);
    }
    for (const photo of photos) {
      const rect = photo.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > height) continue;
      const drift = Math.max(-7, Math.min(7, (height / 2 - rect.top - rect.height / 2) * .035));
      photo.style.setProperty('--photo-drift', `${drift.toFixed(2)}px`);
    }
  }
  if (progress) {
    const main = document.querySelector('.operator-page');
    const distance = Math.max(1, main.offsetHeight - height);
    const value = Math.max(0, Math.min(1, (scrollY - main.offsetTop) / distance));
    progress.style.transform = `scaleX(${value.toFixed(3)})`;
    const index = sections.reduce((selected, section, i) => section?.getBoundingClientRect().top < height * .42 ? i : selected, 0);
    navigation.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}
const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
function configure() {
  motionEnabled = !reduced.matches;
  for (const node of nodes) {
    node.classList.toggle('viewport-reveal', motionEnabled);
    if (reduced.matches) {
      node.style.removeProperty('--viewport-opacity');
      node.style.removeProperty('--viewport-shift');
    }
  }
  if (reduced.matches) {
    photos.forEach(photo => photo.style.removeProperty('--photo-drift'));
    tiltNodes.forEach(resetTilt);
  }
  schedule();
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) active.add(entry.target);
      else {
        active.delete(entry.target);
        if (!reduced.matches) entry.target.style.setProperty('--viewport-opacity', '0');
      }
    }
    schedule();
  }, { rootMargin: '160px 0px' });
  nodes.forEach(node => observer.observe(node));
}
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule, { passive: true });
addEventListener('pageshow', schedule);
document.addEventListener('toggle', schedule, true);
reduced.addEventListener('change', configure);
configure();

// Pause continuous decorative movement when it is outside the viewport.
if ('IntersectionObserver' in window) {
  const loops = new IntersectionObserver(entries => {
    entries.forEach(entry => { entry.target.dataset.motionActive = String(entry.isIntersecting); });
  });
  document.querySelectorAll('[data-motion-loop], .operator-page__hero').forEach(node => loops.observe(node));
}

function resetTilt(node) {
  for (const name of ['--tilt-x', '--tilt-y', '--shine-x', '--shine-y']) node.style.removeProperty(name);
}
for (const node of tiltNodes) {
  const surface = node.closest('.operator-choice') || node;
  let frame;
  surface.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (reduced.matches) return;
      const rect = surface.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      node.style.setProperty('--tilt-x', `${((.5 - y) * 16).toFixed(2)}deg`);
      node.style.setProperty('--tilt-y', `${((x - .5) * 20).toFixed(2)}deg`);
      node.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
      node.style.setProperty('--shine-y', `${(y * 100).toFixed(1)}%`);
    });
  }, { passive: true });
  const reset = () => { cancelAnimationFrame(frame); resetTilt(node); };
  surface.addEventListener('pointerleave', reset);
  surface.addEventListener('pointercancel', reset);
  surface.addEventListener('blur', reset);
}

for (const card of document.querySelectorAll('[data-card-flip]')) {
  card.disabled = false;
  const name = document.querySelector('.operator-page h1').textContent;
  card.addEventListener('click', () => {
    const flipped = card.getAttribute('aria-pressed') !== 'true';
    card.setAttribute('aria-pressed', String(flipped));
    card.setAttribute('aria-label', `${flipped ? 'Ver frente do cartão' : 'Ver foco da análise'} de ${name}`);
    card.title = flipped ? 'Ver frente do cartão' : 'Ver foco da análise';
    card.querySelector('.operator-card-front').setAttribute('aria-hidden', String(flipped));
    card.querySelector('.operator-card-back').setAttribute('aria-hidden', String(!flipped));
  });
}

for (const root of document.querySelectorAll('.operator-products')) {
  const controls = root.querySelector('[data-solution-controls]');
  const tabs = [...root.querySelectorAll('[role=tab]')];
  const panels = [...root.querySelectorAll('[data-solution-panel]')];
  const tablist = controls.querySelector('[role=tablist]');
  const compare = controls.querySelector('[data-compare-solutions]');
  let selected = 0;
  let all = false;
  let measuredWidth = 0;
  const select = (index, focus = false) => {
    selected = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === selected));
      tab.tabIndex = i === selected ? 0 : -1;
      panels[i].hidden = !all && i !== selected;
      panels[i].classList.toggle('operator-solution-enter', !all && i === selected);
    });
    if (focus) tabs[selected].focus({ preventScroll: true });
    schedule();
  };
  const measure = () => {
    if (all) return;
    // Overlapping grid tracks let us measure every solution without a visible jump.
    panels.forEach(panel => { panel.hidden = false; });
    const height = Math.max(280, ...panels.map(panel => panel.getBoundingClientRect().height));
    root.style.setProperty('--solution-height', `${Math.ceil(height)}px`);
    select(selected);
  };
  controls.hidden = false;
  root.dataset.solutionMode = 'focus';
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.tabIndex = 0;
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (selected + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(next, true);
    });
  });
  compare.addEventListener('click', () => {
    all = !all;
    root.dataset.solutionMode = all ? 'all' : 'focus';
    tablist.hidden = all;
    compare.setAttribute('aria-pressed', String(all));
    compare.firstChild.textContent = all ? 'Focar em uma solução ' : 'Comparar lado a lado ';
    panels.forEach((panel, index) => {
      panel.classList.remove('operator-solution-enter');
      if (all) {
        panel.hidden = false;
        panel.removeAttribute('role');
        panel.setAttribute('aria-labelledby', `solucao-titulo-${index}`);
        panel.removeAttribute('tabindex');
      } else {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabs[index].id);
        panel.tabIndex = 0;
      }
    });
    if (!all) measure();
    schedule();
  });
  measure();
  if ('ResizeObserver' in window) {
    new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      if (Math.abs(width - measuredWidth) > 1) { measuredWidth = width; measure(); }
    }).observe(root);
  }
  document.fonts?.ready.then(measure);
}

let scrollFrame;
const cancelScroll = () => cancelAnimationFrame(scrollFrame);
addEventListener('wheel', cancelScroll, { passive: true });
addEventListener('touchstart', cancelScroll, { passive: true });
addEventListener('keydown', cancelScroll);
for (const link of document.querySelectorAll('.operator-reading-nav a, .operator-hero-explore')) {
  link.addEventListener('click', event => {
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    cancelScroll();
    const start = scrollY;
    const destination = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight,
      start + target.getBoundingClientRect().top - 88));
    const startedAt = performance.now();
    const complete = () => {
      history.pushState(null, '', link.getAttribute('href'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    };
    if (reduced.matches) { scrollTo({ top: destination, behavior: 'instant' }); complete(); return; }
    const animate = now => {
      const t = Math.min(1, (now - startedAt) / 320);
      scrollTo({ top: start + (destination - start) * (1 - Math.pow(1 - t, 3)), behavior: 'instant' });
      if (t < 1) scrollFrame = requestAnimationFrame(animate);
      else complete();
    };
    scrollFrame = requestAnimationFrame(animate);
  });
}

for (const list of document.querySelectorAll('[data-comparison-checklist]')) {
  const inputs = [...list.querySelectorAll('input[type=checkbox]')];
  const status = list.querySelector('[data-checklist-status]');
  const bar = list.querySelector('[data-checklist-progress]');
  const next = list.querySelector('[data-checklist-next]');
  const refresh = () => {
    const count = inputs.filter(input => input.checked).length;
    status.textContent = `${count} de ${inputs.length} critérios revisados`;
    if (bar) bar.value = count;
    if (next) next.hidden = count !== inputs.length;
    list.classList.toggle('operator-checklist-complete', count === inputs.length);
  };
  inputs.forEach(input => input.addEventListener('change', refresh));
  refresh();
}
