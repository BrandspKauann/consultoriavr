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
      assert.equal(await page.locator('.operator-choice').count(), 6);
      await page.locator('.operator-page__others').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.operator-choice img')].every(img => img.complete && img.naturalWidth > 0));
      await page.locator('.operator-rollout-grid').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.operator-rollout img')].every(img => img.complete && img.naturalWidth > 0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${operator.name} overflows at ${width}`);
      assert.equal(await page.locator('.operator-page__card').evaluate(node => getComputedStyle(node).animationName), 'none');
      const checkboxes = page.locator('#checklist input[type=checkbox]');
      await checkboxes.first().check();
      await checkboxes.nth(1).check();
      await page.waitForFunction(() => document.querySelector('[data-checklist-status]').textContent.startsWith('2 de'));
      await page.locator('#duvidas details').first().locator('summary').click();
      assert.equal(await page.locator('#duvidas details').first().getAttribute('open'), '');
      if (['ticket-beneficios', 'flash-beneficios', 'valecard'].includes(operator.slug)) {
        await page.locator('.operator-page__others').screenshot({ path: `${output}/${operator.slug}-logos-${width}.png` });
        await page.locator('.operator-page__hero').screenshot({ path: `${output}/${operator.slug}-hero-${width}.png` });
      }
      console.log(`${operator.slug}: ${width}px, six visible logos, checklist and FAQ passed`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4175/operadoras/flash-beneficios/');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => dispatchEvent(new Event('resize')));
  await page.waitForFunction(() => !matchMedia('(prefers-reduced-motion: reduce)').matches && document.querySelector('#custos > div').classList.contains('viewport-reveal'));
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
  assert.ok(await page.locator('[data-reading-progress]').evaluate(node => getComputedStyle(node).transform !== 'matrix(0, 0, 0, 1, 0, 0)'));
  await page.locator('.operator-reading-nav a[href="#produtos"]').click();
  await page.waitForFunction(() => document.querySelector('.operator-reading-nav a[href="#produtos"]').getAttribute('aria-current') === 'location');
  await page.emulateMedia({ media: 'print' });
  assert.equal(await subject.evaluate(node => getComputedStyle(node).opacity), '1');
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  assert.equal(await subject.evaluate(node => getComputedStyle(node).opacity), '1');
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.route('https://**/*', route => route.abort());
  await staticPage.goto('http://127.0.0.1:4175/operadoras/flash-beneficios/');
  assert.equal(await staticPage.locator('#custos > div').evaluate(node => getComputedStyle(node).opacity), '1');
  assert.ok((await staticPage.locator('main').textContent()).includes('prestação de contas'));
  assert.deepEqual(errors, []);
  console.log('Scroll fades out and returns, reading navigation, reduced motion, print and no-JS content passed.');
} finally {
  await browser?.close();
  server.kill();
}
