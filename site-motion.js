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

for (const list of document.querySelectorAll('[data-comparison-checklist]')) {
  const inputs = [...list.querySelectorAll('input[type=checkbox]')];
  const status = list.querySelector('[data-checklist-status]');
  const refresh = () => { status.textContent = `${inputs.filter(input => input.checked).length} de ${inputs.length} critérios revisados`; };
  inputs.forEach(input => input.addEventListener('change', refresh));
  refresh();
}
