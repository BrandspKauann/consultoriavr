import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { validCnpj, maskCnpj, validCorporateEmail, validPhone, quizQuestions, quizResult, diagnosticQuestions, diagnosticResult, answerLabels } from '../lead-core.mjs';

test('CNPJ masks and check digits support both Receita formats', () => {
  for (const value of ['18.166.550/0001-40', '12.ABC.345/01DE-35', '18166550000140']) assert.equal(validCnpj(value), true, value);
  for (const value of ['', '00.000.000/0000-00', '11111111111111', '18.166.550/0001-41', '12.ABC.345/01DE-AA']) assert.equal(validCnpj(value), false, value);
  assert.equal(maskCnpj('12abc34501de35'), '12.ABC.345/01DE-35');
});

test('corporate email and Brazilian cellphone validation', () => {
  for (const email of ['rh@empresa.example', 'nome.sobrenome@sub.empresa.com.br']) assert.equal(validCorporateEmail(email), true);
  for (const email of ['nome@gmail.com', 'nome@HOTMAIL.COM', 'nome@yahoo.com.br', 'nome@outlook.com', 'nome', '@empresa.com']) assert.equal(validCorporateEmail(email), false);
  assert.equal(validPhone('(11) 99999-1234'), true);
  assert.equal(validPhone('(71) 99999-1234'), true);
  for (const phone of ['(20) 99999-1234', '(11) 3333-1234', '(11) 99999-123', '119999912345']) assert.equal(validPhone(phone), false);
});

test('diagnostic boundaries 0/2, 3/5 and 6/8', () => {
  const baseline = Object.fromEntries(diagnosticQuestions.map(q => [q.id, 0]));
  baseline.renewal = 1;
  const signals = diagnosticQuestions.slice(2).map(q => ({ id: q.id, option: q.options.findIndex(x => x.points === 1) }));
  for (let score = 0; score <= 8; score++) {
    const answers = { ...baseline };
    for (const signal of signals.slice(0, score)) answers[signal.id] = signal.option;
    const result = diagnosticResult(answers);
    assert.equal(result.score, score);
    assert.equal(result.category, score <= 2 ? 'Bem servida' : score <= 5 ? 'Pontos para ajustar' : 'Vale comparar o mercado');
    assert.ok(result.reasons.length);
    assert.equal(Object.keys(answerLabels(diagnosticQuestions, answers)).length, 10);
  }
  assert.equal(diagnosticResult({}), null);
});

test('all quiz combinations follow the weighted three-point threshold', () => {
  let checked = 0;
  let boundaries = new Set();
  function visit(index, answers) {
    if (index === quizQuestions.length) {
      const result = quizResult(answers);
      const expected = quizQuestions.reduce((scores, q) => {
        const option = q.options[answers[q.id]];
        if (option.network) scores[option.network] += option.points;
        return scores;
      }, { open: 0, closed: 0 });
      const difference = expected.open - expected.closed;
      assert.equal(result.category, difference >= 3 ? 'Rede aberta' : difference <= -3 ? 'Rede fechada' : 'Modelo híbrido');
      assert.equal(result.priorities.length, 3);
      boundaries.add(difference);
      checked++;
      return;
    }
    const question = quizQuestions[index];
    question.options.forEach((_, option) => visit(index + 1, { ...answers, [question.id]: option }));
  }
  visit(0, {});
  assert.equal(checked, 432);
  for (const difference of [-3, -2, 2, 3]) assert.ok(boundaries.has(difference));
  assert.equal(quizResult({}), null);
});

test('generated pages retain static SEO, qualified contact and no future articles', async () => {
  const root = new URL('../', import.meta.url);
  const home = await fs.readFile(new URL('index.html', root), 'utf8');
  assert.match(home, /Cartões corporativos com/);
  assert.match(home, /Testar meu perfil de rede/);
  assert.doesNotMatch(home, /Informe seus dados ao final para acessar o resultado/);
  const sitemap = await fs.readFile(new URL('sitemap.xml', root), 'utf8');
  const contact = await fs.readFile(new URL('contato/index.html', root), 'utf8');
  const phonePattern = contact.match(/name="phone"[^>]*pattern="([^"]+)"/)[1];
  const nativePhone = new RegExp(`^(?:${phonePattern})$`, 'v');
  assert.ok(nativePhone.test('(11) 99999-1234'));
  assert.ok(nativePhone.test('11999991234'));
  assert.ok(!nativePhone.test('not-a-phone'));
  for (const route of ['contato', 'ja-tenho-cartao', 'quiz-rede-aberta-ou-fechada', 'politica-de-privacidade']) {
    const html = await fs.readFile(new URL(`${route}/index.html`, root), 'utf8');
    assert.match(html, /<h1>/);
    assert.ok(html.includes(`https://www.consultoriavr.com.br/${route}/`));
    assert.ok(sitemap.includes(`/${route}/`));
    assert.match(html, /lead-flow.js/);
    assert.match(html, /institutional-footer/);
    assert.doesNotMatch(html, /wa\.link\/3gwhbl/);
    assert.equal((html.match(/gtm\.js\?id=/g) || []).length, 1);
  }
  const thanks = await fs.readFile(new URL('obrigado/index.html', root), 'utf8');
  assert.match(thanks, /noindex, follow/);
  assert.match(thanks, /wa\.link\/3gwhbl/);
  assert.ok(!sitemap.includes('/obrigado/'));
  for (const [route, kind] of [['quiz-rede-aberta-ou-fechada', 'quiz'], ['ja-tenho-cartao', 'diagnostic']]) {
    const html = await fs.readFile(new URL(`${route}/index.html`, root), 'utf8');
    assert.doesNotMatch(html, /wizard-capture|data-lead-result|Enviar e ver meu resultado/);
    assert.match(html, /resultado imediato, sem cadastro obrigatório/);
    assert.match(html, /class="wizard-result" hidden/);
    assert.doesNotMatch(html, /sem CNPJ nesta etapa/);
  }
  const operators = JSON.parse(await fs.readFile(new URL('content/operators.json', root)));
  const guides = JSON.parse(await fs.readFile(new URL('content/operator-guides.json', root)));
  for (const operator of operators) {
    const html = await fs.readFile(new URL(`operadoras/${operator.slug}/index.html`, root), 'utf8');
    assert.doesNotMatch(html, /wa\.link\/3gwhbl/);
    assert.match(html, /\/ja-tenho-cartao\/\?operadora=/);
    assert.match(html, /\/contato\/\?operadora=/);
    assert.ok(operator.attention.length >= 3 && operator.sources.length >= 2);
    assert.ok(operator.resources.some(x => x.url.includes('play.google.com')));
    assert.ok(operator.resources.some(x => x.url.includes('apps.apple.com')));
    assert.equal(guides[operator.slug].products.length, 3);
    assert.equal(guides[operator.slug].checks.length, 3);
    const campaign = guides[operator.slug].campaign;
    assert.equal(campaign.highlights.length, 3);
    assert.equal(campaign.paragraphs.length, 2);
    assert.equal(campaign.closing.length, 2);
    assert.ok(JSON.stringify(campaign).split(/\s+/).length > 300);
    assert.ok(html.includes(campaign.headline));
    assert.match(html, /operator-value-grid/);
    for (const check of guides[operator.slug].checks) {
      assert.ok(check.question.length > 20 && check.evidence.length > 60);
      assert.ok(html.includes(check.question));
    }
    assert.match(html, /data-card-flip/);
    assert.match(html, /data-solution-controls hidden/);
    assert.equal((html.match(/data-solution-panel/g) || []).length, 3);
    assert.match(html, /data-checklist-progress/);
    for (const id of ['produtos', 'na-pratica', 'custos', 'implantacao', 'checklist', 'atendimento']) assert.ok(html.includes(`id="${id}"`));
    assert.match(html, /operator-reading-nav/);
    assert.equal((html.match(/class="operator-choice operator-choice--/g) || []).length, operators.length - 1);
    assert.match(html, /<strong>/);
    assert.ok(html.includes(`/assets/operators/${guides[operator.slug].image}.webp`));
    const photos = [...html.matchAll(/src="(\/assets\/operators\/[^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(photos).size, 3);
    for (const photo of photos) await fs.access(new URL(photo.slice(1), root));
    assert.ok(!html.includes(`property="og:image" content="https://www.consultoriavr.com.br${operator.logo}"`));
  }
});
