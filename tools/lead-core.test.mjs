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
  const operators = JSON.parse(await fs.readFile(new URL('content/operators.json', root)));
  for (const operator of operators) {
    const html = await fs.readFile(new URL(`operadoras/${operator.slug}/index.html`, root), 'utf8');
    assert.doesNotMatch(html, /wa\.link\/3gwhbl/);
    assert.match(html, /\/ja-tenho-cartao\/\?operadora=/);
    assert.match(html, /\/contato\/\?operadora=/);
    assert.ok(operator.attention.length >= 3 && operator.sources.length >= 2);
    assert.ok(operator.resources.some(x => x.url.includes('play.google.com')));
    assert.ok(operator.resources.some(x => x.url.includes('apps.apple.com')));
  }
});
