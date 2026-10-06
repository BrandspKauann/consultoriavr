import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { quizQuestions, diagnosticQuestions, quizResult, diagnosticResult } from '../lead-core.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = spawn(process.execPath, ['tools/test-leads-server.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
let browser;
const base = 'http://127.0.0.1:4175';
try {
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`QA server exited: ${code}`)));
  });
  browser = await chromium.launch({ headless: true, ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}) });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    const layer = window.dataLayer = [];
    const push = layer.push.bind(layer);
    layer.push = (...items) => {
      const events = JSON.parse(sessionStorage.getItem('qa:events') || '[]');
      events.push(...items.map(item => item.event).filter(Boolean));
      sessionStorage.setItem('qa:events', JSON.stringify(events));
      return push(...items);
    };
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // All submissions go to the isolated server, never Formspree or Analytics.
  await page.route('https://**/*', route => route.abort());
  let submissions = 0;
  page.on('request', request => { if (request.method() === 'POST') submissions++; });
  const artifacts = '../.codex-tmp/consultoriavr-ticket-gate';
  await fs.mkdir(artifacts, { recursive: true });
  for (const [route, kind, questions] of [
    ['quiz-rede-aberta-ou-fechada', 'quiz', quizQuestions],
    ['ja-tenho-cartao', 'diagnostic', diagnosticQuestions]
  ]) {
    await page.goto(`${base}/${route}/?operadora=Ticket&utm_source=qa&utm_medium=test&utm_campaign=gate`);
    const beforeTest = submissions;
    const answers = {};
    for (const question of questions) {
      const inputs = page.locator('.wizard-form input[name=answer]');
      assert.equal(await inputs.count(), question.options.length);
      if (!(await page.locator('.wizard-form input:checked').count())) await inputs.first().check();
      answers[question.id] = Number(await page.locator('.wizard-form input:checked').inputValue());
      await page.locator('.wizard-form button[type=submit]').click();
    }
    const expectedResult = (kind === 'quiz' ? quizResult : diagnosticResult)(answers).category;
    await page.locator('.wizard-result').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.wizard-result h2').textContent(), expectedResult);
    assert.equal(await page.locator('[data-lead-form]').count(), 0);
    assert.equal(submissions, beforeTest, 'The result must not require a submission');
    assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'generate_lead').length), 0);
    if (kind === 'quiz') assert.equal(await page.locator('.wizard-result > ul > li').count(), 3);
    await page.locator('.wizard-result > .review-answers').click();
    for (const question of questions) {
      assert.equal(Number(await page.locator('.wizard-form input:checked').inputValue()), answers[question.id]);
      await page.locator('.wizard-form button[type=submit]').click();
    }
    assert.equal(await page.evaluate(kind => window.dataLayer.filter(x => x.event === `${kind}_completed`).length, kind), 1);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${artifacts}/${kind}-result-mobile.png`, fullPage: true });
    await page.locator('.wizard-next-step > a').click();
    await page.waitForURL('**/contato/**');
    const form = page.locator('[data-lead-form]');
    assert.equal(await form.locator('[name=operator]').inputValue(), 'Ticket');
    const leadsBefore = await page.evaluate(() => JSON.parse(sessionStorage.getItem('qa:events')).filter(x => x === 'generate_lead').length);
    await form.locator('[name=name]').fill('Teste local');
    await form.locator('[name=role]').selectOption({ index: 1 });
    await form.locator('[name=company]').fill('Empresa ficticia QA');
    await form.locator('[name=cnpj]').fill('18166550000141');
    await form.locator('[name=email]').fill('qa@empresa.example');
    await form.locator('[name=phone]').fill('11999991234');
    await form.locator('[name=employees]').selectOption({ index: 2 });
    await form.locator('[name=priority]').selectOption({ index: 1 });
    await form.locator('[name=interests]').first().check();
    await form.locator('[name=consent]').check();
    const previous = submissions;
    await form.locator('[type=submit]').click();
    assert.equal(submissions, previous, 'Invalid CNPJ must not send');
    await form.locator('[name=cnpj]').fill('18166550000140');
    await context.request.get(`${base}/__test__/fail-next`);
    await form.locator('[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('.form-note').textContent.includes('Não foi possível'));
    assert.equal(await page.evaluate(kind => JSON.parse(sessionStorage.getItem(`vr:${kind}`)).result.category, kind), expectedResult);
    assert.equal(await form.locator('[name=email]').inputValue(), 'qa@empresa.example');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await form.screenshot({ path: `${artifacts}/${kind}-capture-mobile.png` });
    await form.locator('[type=submit]').click();
    await page.waitForURL('**/obrigado/');
    assert.equal(await page.evaluate(() => JSON.parse(sessionStorage.getItem('qa:events')).filter(x => x === 'generate_lead').length), leadsBefore + 1);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'thank_you_view').length), 1);
    const payload = await (await context.request.get(`${base}/__test__/last`)).json();
    assert.ok(payload.body.includes(`name="${kind}_answers"`));
    assert.ok(payload.body.includes(expectedResult));
    assert.ok(payload.body.includes(`/${route}/`));
    assert.ok(payload.body.includes('gate'));
    const storage = await page.evaluate(() => Object.entries(sessionStorage).filter(([key]) => key.startsWith('vr:')).map(([,value]) => value).join(' '));
    assert.ok(!storage.includes('qa@empresa.example') && !storage.includes('Teste local'));
    console.log(`${kind}: immediate result without contact/POST, review, optional consultation, validation, retry and analytics passed`);
  }
  for (const [network, expected] of [['open', 'Rede aberta'], ['closed', 'Rede fechada']]) {
    await page.goto(`${base}/quiz-rede-aberta-ou-fechada/`);
    const before = submissions;
    for (const question of quizQuestions) {
      let index = question.options.findIndex(option => option.network === network);
      if (index < 0) index = question.options.findIndex(option => !option.network);
      await page.locator('.wizard-form input[name=answer]').nth(index).check();
      await page.locator('.wizard-form [type=submit]').click();
    }
    assert.equal(await page.locator('.wizard-result h2').textContent(), expected);
    assert.equal(submissions, before);
    assert.equal(await page.locator('[data-lead-form]').count(), 0);
    console.log(`${expected}: instant explanation and three priorities, no form submission`);
  }
  await page.goto(`${base}/contato/`);
  const contact = page.locator('[data-lead-form]');
  await contact.locator('[name=name]').fill('Teste local');
  await contact.locator('[name=role]').selectOption({ index: 1 });
  await contact.locator('[name=company]').fill('Empresa ficticia QA');
  await contact.locator('[name=cnpj]').fill('18166550000140');
  await contact.locator('[name=email]').fill('qa@empresa.example');
  await contact.locator('[name=phone]').fill('11999991234');
  await contact.locator('[name=priority]').selectOption({ index: 1 });
  await contact.locator('[name=interests]').first().check();
  await contact.locator('[name=consent]').check();
  await contact.locator('[type=submit]').click();
  await page.waitForURL('**/obrigado/');
  assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'thank_you_view').length), 1);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/operadoras/ticket-beneficios/']) {
      await page.goto(base + route);
      await page.locator('img').first().waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const logo = page.locator('img[src="/ticket-logo-official.svg"]').first();
      assert.ok(await logo.evaluate(img => img.complete && img.naturalWidth > 0));
      await (route === '/' ? page.locator('#operadoras') : page.locator('.operator-page__hero')).screenshot({ path: `${artifacts}/ticket-${width}-${route === '/' ? 'home' : 'page'}.png` });
      if (route === '/') {
        assert.ok((await page.locator('#hero-title').textContent()).includes('Cartões corporativos'));
        await page.locator('.hero').screenshot({ path: `${artifacts}/home-cards-${width}.png` });
      }
    }
  }
  assert.deepEqual(errors, []);
  console.log('Contact redirect, Ticket images and desktop/mobile overflow passed. No real leads sent.');
} finally {
  await browser?.close();
  server.kill();
}
