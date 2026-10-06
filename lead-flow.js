import { validCnpj, maskCnpj, validCorporateEmail, validPhone, diagnosticQuestions, quizQuestions, diagnosticResult, quizResult, answerLabels, OPERATORS, VOLUMES } from './lead-core.mjs';

const track = (event, parameters = {}) => (window.dataLayer = window.dataLayer || []).push({ event, ...parameters });
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const read = key => { try { return JSON.parse(sessionStorage.getItem(`vr:${key}`) || 'null'); } catch { return null; } };
const write = (key, value) => { try { sessionStorage.setItem(`vr:${key}`, JSON.stringify(value)); } catch { /* The form must work when browser storage is disabled. */ } };
const fresh = key => { const value = read(key); return value?.expires > Date.now() ? value : null; };
const remember = (key, value) => write(key, { ...value, expires: Date.now() + 30 * 60 * 1000 });

const search = new URLSearchParams(location.search);
const campaign = {};
for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
  const value = search.get(key);
  if (value && /^[a-zA-Z0-9_ .-]{1,120}$/.test(value)) campaign[key] = value;
}
if (Object.keys(campaign).length) remember('campaign', campaign);

document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.origin === location.origin && (url.pathname === '/contato/' || url.hash === '#diagnostico')) {
    remember('origin', { path: location.pathname });
    track('contact_cta_click', { placement: link.dataset.placement || 'page' });
  }
});

for (const form of document.querySelectorAll('[data-lead-form]')) {
  const field = name => form.elements.namedItem(name);
  const status = form.querySelector('.form-note');
  const cnpj = field('cnpj');
  const email = field('email');
  const phone = field('phone');
  const interests = [...form.querySelectorAll('[name=interests]')];
  const validate = () => {
    cnpj.setCustomValidity(cnpj.value && !validCnpj(cnpj.value) ? 'Informe um CNPJ válido, com os dígitos verificadores corretos.' : '');
    email.setCustomValidity(email.value && !validCorporateEmail(email.value) ? 'Informe seu e-mail corporativo, com o domínio da empresa.' : '');
    phone.setCustomValidity(phone.value && !validPhone(phone.value) ? 'Informe um celular brasileiro com DDD e nove dígitos.' : '');
    interests[0].setCustomValidity(interests.some(x => x.checked) ? '' : 'Selecione pelo menos uma solução.');
  };
  cnpj.addEventListener('input', () => { cnpj.value = maskCnpj(cnpj.value); cnpj.setCustomValidity(''); });
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    phone.value = digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/^(\(\d{2}\) \d{5})(\d)/, '$1-$2');
    phone.setCustomValidity('');
  });
  email.addEventListener('input', () => email.setCustomValidity(''));
  for (const input of [cnpj, email, phone]) input.addEventListener('blur', validate);
  interests.forEach(input => input.addEventListener('change', () => { validate(); form.querySelector('#interests-error').textContent = ''; }));

  const diagnostic = fresh('diagnostic');
  const requestedOperator = search.get('operadora');
  const operator = OPERATORS.includes(requestedOperator) ? requestedOperator : diagnostic?.result.operator;
  if (operator) field('operator').value = operator;
  if (VOLUMES.includes(diagnostic?.result.employees)) field('employees').value = diagnostic.result.employees;
  form.addEventListener('focusin', () => track('contact_form_start', { form_id: form.id }), { once: true });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('[type=submit]');
    if (button.disabled) return;
    validate();
    if (!interests.some(x => x.checked)) form.querySelector('#interests-error').textContent = 'Selecione pelo menos uma solução.';
    if (!form.reportValidity()) return;
    const campaigns = fresh('campaign') || {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) field(key).value = campaigns[key] || '';
    field('origin_page').value = form.dataset.leadResult ? location.pathname : fresh('origin')?.path || location.pathname;
    for (const kind of ['quiz', 'diagnostic']) {
      if (kind === form.dataset.leadResult) continue;
      const evaluation = fresh(kind);
      field(`${kind}_result`).value = evaluation?.result.category || '';
      field(`${kind}_answers`).value = evaluation ? JSON.stringify(evaluation.labels) : '';
    }
    field('_subject').value = `Lead ConsultoriaVR | ${field('employees').value} | ${field('operator').value} | ${field('priority').value}`;
    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Enviando…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Enviando sua solicitação…';
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error('Submission rejected');
      // Only enumerated business categories enter measurement, never personal or free-text fields.
      const metadata = { form_id: form.id, employee_range: field('employees').value, operator: field('operator').value, priority: field('priority').value };
      track('contact_submit', metadata);
      track('generate_lead', metadata);
      write('submitted', { at: Date.now(), metadata });
      form.reset();
      if (form.dataset.leadResult) {
        form.dispatchEvent(new CustomEvent('lead:success'));
      } else {
        location.assign('/obrigado/');
      }
    } catch {
      status.textContent = 'Não foi possível confirmar o envio. Seus dados foram mantidos nesta página. Tente novamente em instantes.';
      track('contact_submit_error', { form_id: form.id });
    } finally {
      button.disabled = false;
      button.textContent = label;
      form.removeAttribute('aria-busy');
    }
  });
}

for (const element of document.querySelectorAll('[data-wizard]')) {
  const kind = element.dataset.wizard;
  const questions = kind === 'quiz' ? quizQuestions : diagnosticQuestions;
  const calculate = kind === 'quiz' ? quizResult : diagnosticResult;
  const answers = {};
  const requestedOperator = search.get('operadora');
  if (kind === 'diagnostic') {
    const index = questions[0].options.findIndex(x => x.label === requestedOperator);
    if (index >= 0) answers.operator = index;
  }
  let step = 0;
  const form = element.querySelector('.wizard-form');
  const question = element.querySelector('.wizard-question');
  const back = element.querySelector('.wizard-back');
  const next = form.querySelector('[type=submit]');
  const resultBox = element.querySelector('.wizard-result');
  const capture = element.querySelector('.wizard-capture');
  const leadForm = capture.querySelector('[data-lead-form]');
  let pending = null;
  const error = element.querySelector('.wizard-error');
  const progress = element.querySelector('progress');
  const status = element.querySelector('.wizard-progress');
  const render = (focus = true) => {
    const current = questions[step];
    form.hidden = false;
    resultBox.hidden = true;
    capture.hidden = true;
    progress.value = step + 1;
    status.textContent = `Pergunta ${step + 1} de ${questions.length}`;
    question.innerHTML = `<fieldset><legend tabindex="-1">${escape(current.title)}</legend>${current.hint ? `<p class="wizard-hint">${escape(current.hint)}</p>` : ''}<div class="wizard-options">${current.options.map((x, index) => `<label><input type="radio" name="answer" value="${index}" required${answers[current.id] === index ? ' checked' : ''}><span>${escape(x.label)}</span></label>`).join('')}</div></fieldset>`;
    back.disabled = step === 0;
    next.textContent = step === questions.length - 1 ? 'Continuar para meus dados →' : 'Continuar →';
    error.textContent = '';
    if (focus) question.querySelector('legend').focus({ preventScroll: true });
  };
  back.addEventListener('click', () => { if (step > 0) { const checked = form.querySelector('[name=answer]:checked'); if (checked) answers[questions[step].id] = Number(checked.value); step--; render(); } });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const checked = form.querySelector('[name=answer]:checked');
    if (!checked) { error.textContent = 'Selecione uma resposta para continuar.'; return; }
    answers[questions[step].id] = Number(checked.value);
    if (step < questions.length - 1) { step++; render(); return; }
    const result = calculate(answers);
    if (!result) return;
    pending = { result, labels: answerLabels(questions, answers) };
    const fingerprint = JSON.stringify(answers);
    if (read(`${kind}:measured`) !== fingerprint) {
      track(`${kind}_completed`, { result_category: result.category });
      write(`${kind}:measured`, fingerprint);
    }
    form.hidden = true;
    progress.value = questions.length;
    status.textContent = 'Perguntas concluídas · falta enviar seus dados';
    leadForm.elements.namedItem(`${kind}_result`).value = result.category;
    leadForm.elements.namedItem(`${kind}_answers`).value = JSON.stringify(pending.labels);
    if (result.operator) leadForm.elements.namedItem('operator').value = result.operator;
    if (result.employees) leadForm.elements.namedItem('employees').value = result.employees;
    capture.hidden = false;
    capture.querySelector('h2').focus({ preventScroll: true });
  });
  capture.querySelector('.review-answers').addEventListener('click', () => {
    if (leadForm.hasAttribute('aria-busy')) return;
    step = 0;
    render();
  });
  leadForm.addEventListener('lead:success', () => {
    if (!pending) return;
    const { result } = pending;
    remember(kind, pending);
    capture.hidden = true;
    status.textContent = 'Solicitação enviada · resultado disponível';
    resultBox.innerHTML = `<p class="kicker">Seu ponto de partida</p><h2 tabindex="-1">${escape(result.category)}</h2>${kind === 'quiz' ? `<p>${escape(result.explanation)}</p>` : `<p>${result.score} de 8 sinais de revisão. Uma leitura das suas respostas, não um parecer sobre a operadora.</p><ul>${result.reasons.map(x => `<li>${escape(x)}</li>`).join('')}</ul>`}<p class="result-note">Confirme aceitação nos locais de uso, regras dos saldos, enquadramento no PAT, serviços incluídos e condições do contrato antes de decidir.</p><p>Sua solicitação e suas respostas foram enviadas. O Ewerton ou alguém do time entra em contato em até 1 dia útil.</p><a class="button" href="/obrigado/">Continuar com a equipe →</a>${kind === 'quiz' ? '<a class="result-secondary" href="/ja-tenho-cartao/">Já tenho cartão e quero revisar →</a>' : ''}`;
    resultBox.hidden = false;
    resultBox.querySelector('h2').focus({ preventScroll: true });
  });
  render(false);
}

if (document.querySelector('[data-thank-you]')) {
  const submission = read('submitted');
  if (submission?.at > Date.now() - 10 * 60 * 1000 && !submission.measured) {
    track('thank_you_view', { form_id: submission.metadata.form_id });
    write('submitted', { ...submission, measured: true });
  }
  document.querySelector('[data-whatsapp-after-submit]')?.addEventListener('click', () => track('whatsapp_after_submit'));
}
