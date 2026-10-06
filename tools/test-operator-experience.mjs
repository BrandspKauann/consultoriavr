import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = spawn(process.execPath, ['tools/test-leads-server.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
const operators = JSON.parse(await fs.readFile('content/operators.json', 'utf8'));
const output = '../.codex-tmp/consultoriavr-operator-experience';
let browser;
try {
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Server exited: ${code}`)));
  });
  await fs.mkdir(output, { recursive: true });
  browser = await chromium.launch({ headless: true, ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}) });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('https://**/*', route => route.abort());
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const operator of operators) {
      await page.goto(`http://127.0.0.1:4175/operadoras/${operator.slug}/`);
      assert.equal(await page.locator('h1').textContent(), operator.name);
      assert.equal(await page.locator('.operator-value-grid article').count(), 3);
      assert.ok((await page.locator('.operator-value').textContent()).length > 1000);
      assert.equal(await page.locator('.operator-choice').count(), 6);
      await page.locator('.operator-page__others').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.operator-choice img')].every(img => img.complete && img.naturalWidth > 0));
      await page.locator('.operator-rollout-grid').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.operator-rollout img')].every(img => img.complete && img.naturalWidth > 0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${operator.name} overflows at ${width}`);
      assert.equal(await page.locator('.operator-page__card').evaluate(node => getComputedStyle(node).animationName), 'none');
      assert.equal(await page.locator('.operator-card-float').evaluate(node => getComputedStyle(node).animationName), 'none');
      const tabs = page.getByRole('tab');
      const panels = page.locator('[data-solution-panel]');
      assert.equal(await page.locator('[data-solution-panel]:visible').count(), 1);
      const stageHeight = await page.locator('.operator-products-list').evaluate(node => node.getBoundingClientRect().height);
      for (let index = 0; index < 3; index++) {
        await tabs.nth(index).click();
        assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
        assert.equal(await panels.nth(index).isVisible(), true);
        assert.ok(Math.abs(await page.locator('.operator-products-list').evaluate(node => node.getBoundingClientRect().height) - stageHeight) < 1);
      }
      await tabs.nth(2).press('ArrowRight');
      assert.equal(await tabs.first().getAttribute('aria-selected'), 'true');
      await tabs.first().press('End');
      assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
      await page.locator('[data-compare-solutions]').click();
      assert.equal(await page.locator('[data-solution-panel]:visible').count(), 3);
      assert.equal(await tabs.first().isVisible(), false);
      await page.locator('[data-compare-solutions]').click();
      assert.equal(await page.locator('[data-solution-panel]:visible').count(), 1);
      const card = page.locator('[data-card-flip]');
      await card.click();
      assert.equal(await card.getAttribute('aria-pressed'), 'true');
      assert.equal(await card.locator('.operator-card-back').getAttribute('aria-hidden'), 'false');
      await card.press('Space');
      assert.equal(await card.getAttribute('aria-pressed'), 'false');
      assert.ok(await card.evaluate(node => node.querySelector('.operator-card-front small').getBoundingClientRect().right < node.querySelector('.operator-card-turn').getBoundingClientRect().left));
      const checkboxes = page.locator('#checklist input[type=checkbox]');
      await checkboxes.first().check();
      await checkboxes.nth(1).check();
      await page.waitForFunction(() => document.querySelector('[data-checklist-status]').textContent.startsWith('2 de'));
      assert.equal(await page.locator('[data-checklist-progress]').evaluate(node => node.value), 2);
      for (let index = 2; index < await checkboxes.count(); index++) await checkboxes.nth(index).check();
      assert.equal(await page.locator('[data-checklist-next]').isVisible(), true);
      await checkboxes.first().uncheck();
      assert.equal(await page.locator('[data-checklist-next]').isVisible(), false);
      await page.locator('#duvidas details').first().locator('summary').click();
      assert.equal(await page.locator('#duvidas details').first().getAttribute('open'), '');
      if (['ticket-beneficios', 'flash-beneficios', 'valecard'].includes(operator.slug)) {
        await page.locator('.operator-value').screenshot({ path: `${output}/${operator.slug}-campaign-${width}.png` });
        await page.locator('.operator-page__others').screenshot({ path: `${output}/${operator.slug}-logos-${width}.png` });
        await page.locator('.operator-page__hero').screenshot({ path: `${output}/${operator.slug}-hero-${width}.png` });
      }
      console.log(`${operator.slug}: ${width}px, logos, stable tabs, comparison, keyboard, flip, checklist and FAQ passed`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4175/operadoras/flash-beneficios/');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => dispatchEvent(new Event('resize')));
  await page.waitForFunction(() => !matchMedia('(prefers-reduced-motion: reduce)').matches && document.querySelector('#custos > div').classList.contains('viewport-reveal'));
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.mouse.move(10, 10);
  const float = page.locator('.operator-card-float');
  const originalTransform = await float.evaluate(node => getComputedStyle(node).transform);
  await page.waitForFunction(previous => getComputedStyle(document.querySelector('.operator-card-float')).transform !== previous, originalTransform);
  assert.equal(await float.evaluate(node => getComputedStyle(node).animationDuration), '3.2s');
  const cardBounds = await page.locator('[data-card-flip]').boundingBox();
  await page.mouse.move(cardBounds.x + cardBounds.width * .8, cardBounds.y + cardBounds.height * .2);
  await page.waitForFunction(() => parseFloat(document.querySelector('[data-card-flip]').style.getPropertyValue('--tilt-y')) > 1);
  await page.locator('[data-card-flip]').click();
  await page.waitForFunction(() => document.querySelector('[data-card-flip]').getAttribute('aria-pressed') === 'true');
  await page.locator('.operator-page__hero').screenshot({ path: `${output}/flash-interactive-back-desktop.png` });
  await page.mouse.move(10, 10);
  assert.equal(await page.locator('[data-card-flip]').evaluate(node => node.style.getPropertyValue('--tilt-y')), '');
  await page.locator('[data-compare-solutions]').scrollIntoViewIfNeeded();
  await page.getByRole('tab').nth(1).click();
  await page.evaluate(() => scrollTo({ top: scrollY + document.querySelector('#produtos').getBoundingClientRect().top - 88, behavior: 'instant' }));
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#solucao-1')).opacity) > .99 && getComputedStyle(document.querySelector('#solucao-tab-1')).backgroundColor === 'rgb(16, 63, 59)' && Number(getComputedStyle(document.querySelector('#produtos .operator-section-heading')).opacity) > .99);
  await page.locator('#produtos').screenshot({ path: `${output}/flash-solutions-desktop.png` });
  await page.locator('[data-compare-solutions]').click();
  await page.locator('#produtos').screenshot({ path: `${output}/flash-comparison-desktop.png` });
  await page.locator('[data-compare-solutions]').click();
  const subject = page.locator('#custos > div');
  await page.evaluate(() => {
    const target = document.querySelector('#custos > div');
    scrollTo({ top: scrollY + target.getBoundingClientRect().top - 160, behavior: 'instant' });
  });
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#custos > div')).opacity) > .98);
  console.log('Center-of-screen text is fully opaque');
  await page.screenshot({ path: `${output}/scroll-focus-desktop.png` });
  await page.evaluate(() => {
    const target = document.querySelector('#custos > div');
    scrollTo({ top: scrollY + target.getBoundingClientRect().bottom - 40, behavior: 'instant' });
  });
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#custos > div')).opacity) < .5);
  console.log('Text fades at the top edge');
  await page.evaluate(() => {
    const target = document.querySelector('#custos > div');
    scrollTo({ top: scrollY + target.getBoundingClientRect().top - innerHeight + 40, behavior: 'instant' });
  });
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#custos > div')).opacity) < .5);
  await page.evaluate(() => {
    const target = document.querySelector('#custos > div');
    scrollTo({ top: scrollY + target.getBoundingClientRect().top - 160, behavior: 'instant' });
  });
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#custos > div')).opacity) > .98);
  assert.ok(await subject.isVisible());
  await page.waitForFunction(() => document.querySelector('.operator-card-float').dataset.motionActive === 'false');
  assert.equal(await float.evaluate(node => getComputedStyle(node).animationPlayState), 'paused');
  assert.ok(await page.locator('[data-reading-progress]').evaluate(node => getComputedStyle(node).transform !== 'matrix(0, 0, 0, 1, 0, 0)'));
  await page.locator('.operator-reading-nav a[href="#produtos"]').click();
  await page.waitForFunction(() => document.querySelector('.operator-reading-nav a[href="#produtos"]').getAttribute('aria-current') === 'location');
  await page.emulateMedia({ media: 'print' });
  assert.equal(await subject.evaluate(node => getComputedStyle(node).opacity), '1');
  assert.equal(await page.locator('[data-solution-panel]:visible').count(), 3);
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  assert.equal(await subject.evaluate(node => getComputedStyle(node).opacity), '1');
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.route('https://**/*', route => route.abort());
  await staticPage.goto('http://127.0.0.1:4175/operadoras/flash-beneficios/');
  assert.equal(await staticPage.locator('#custos > div').evaluate(node => getComputedStyle(node).opacity), '1');
  assert.ok((await staticPage.locator('main').textContent()).includes('prestação de contas'));
  assert.equal(await staticPage.locator('[data-solution-panel]:visible').count(), 3);
  assert.equal(await staticPage.locator('[data-solution-controls]').isVisible(), false);
  const touchContext = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
  const touchPage = await touchContext.newPage();
  touchPage.setDefaultTimeout(10000);
  touchPage.on('pageerror', error => errors.push(error.message));
  await touchPage.route('https://**/*', route => route.abort());
  await touchPage.goto('http://127.0.0.1:4175/operadoras/flash-beneficios/');
  // An actual touch hits the moving card immediately, without waiting for it to stop floating.
  await touchPage.locator('[data-card-flip]').tap({ force: true });
  assert.equal(await touchPage.locator('[data-card-flip]').getAttribute('aria-pressed'), 'true');
  assert.equal(await touchPage.locator('[data-card-flip]').evaluate(node => node.style.getPropertyValue('--tilt-x')), '');
  await touchPage.getByRole('tab').nth(1).tap();
  assert.equal(await touchPage.getByRole('tab').nth(1).getAttribute('aria-selected'), 'true');
  await touchPage.evaluate(() => scrollTo({ top: scrollY + document.querySelector('#produtos').getBoundingClientRect().top - 88, behavior: 'instant' }));
  await touchPage.waitForFunction(() => Number(getComputedStyle(document.querySelector('#solucao-1')).opacity) > .99 && getComputedStyle(document.querySelector('#solucao-tab-1')).backgroundColor === 'rgb(16, 63, 59)');
  await touchPage.locator('#produtos').screenshot({ path: `${output}/flash-solutions-touch.png` });
  await touchPage.locator('.operator-choice').first().tap();
  await touchPage.waitForURL(`**/operadoras/${operators.find(operator => operator.slug !== 'flash-beneficios').slug}/`);
  assert.deepEqual(errors, []);
  console.log('Visible movement, mouse tilt, offscreen pause, touch, scroll fades, navigation, reduced motion, print and no-JS content passed.');
} finally {
  await browser?.close();
  server.kill();
}
