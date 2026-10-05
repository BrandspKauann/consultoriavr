export const OPERATORS = ['VR', 'Pluxee', 'Flash', 'Caju', 'iFood Benefícios', 'ValeCard', 'Alelo', 'Ticket', 'Outra', 'Não temos'];
export const VOLUMES = ['Até 50', '51 a 200', '201 a 1.000', 'Mais de 1.000'];
export const PRIORITIES = ['Rede e aceitação', 'Rotina do RH', 'Custos e condições', 'Implantação ou troca'];
export const INTERESTS = ['VR e VA', 'Multibenefícios', 'Despesas', 'Frota', 'Outros'];
export const ROLES = ['RH', 'Financeiro', 'Diretoria ou sócio', 'Outro'];

const personalDomains = new Set(['gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.com.br', 'outlook.com', 'outlook.com.br', 'live.com', 'live.com.br', 'msn.com', 'yahoo.com', 'yahoo.com.br', 'ymail.com', 'icloud.com', 'me.com', 'aol.com', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'proton.me', 'protonmail.com', 'mail.com']);

export function validCorporateEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !personalDomains.has(email.split('@')[1]);
}

export function validCnpj(value) {
  const cnpj = String(value || '').toUpperCase().replace(/[.\/\-\s]/g, '');
  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj) || /^(.)\1{13}$/.test(cnpj)) return false;
  // Receita's alphanumeric format retains ASCII-48 values and the two numeric check digits.
  const digit = (base) => {
    let weight = 2;
    let sum = 0;
    for (let i = base.length - 1; i >= 0; i--) {
      sum += (base.charCodeAt(i) - 48) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    const remainder = sum % 11;
    return String(remainder < 2 ? 0 : 11 - remainder);
  };
  return digit(cnpj.slice(0, 12)) === cnpj[12] && digit(cnpj.slice(0, 13)) === cnpj[13];
}

export function maskCnpj(value) {
  const raw = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 14);
  return raw.replace(/^(.{2})(.)/, '$1.$2').replace(/^(.{2})\.(.{3})(.)/, '$1.$2.$3').replace(/^(.{2})\.(.{3})\.(.{3})(.)/, '$1.$2.$3/$4').replace(/^(.*\/.{4})(.)/, '$1-$2');
}

export function validPhone(value) {
  const phone = String(value || '').replace(/\D/g, '');
  const codes = ['11','12','13','14','15','16','17','18','19','21','22','24','27','28','31','32','33','34','35','37','38','41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','63','64','65','66','67','68','69','71','73','74','75','77','79','81','82','83','84','85','86','87','88','89','91','92','93','94','95','96','97','98','99'];
  return /^\d{2}9\d{8}$/.test(phone) && codes.includes(phone.slice(0, 2));
}

const question = (id, title, options, hint = '') => ({ id, title, options: options.map(([label, points = 0, network = '']) => ({ label, points, network })), hint });

export const diagnosticQuestions = [
  question('operator', 'Qual operadora sua empresa utiliza hoje?', OPERATORS.filter(x => x !== 'Não temos').map(x => [x])),
  question('employees', 'Quantas pessoas trabalham na empresa?', VOLUMES.map(x => [x])),
  question('pat', 'A empresa está inscrita no PAT?', [['Sim'], ['Não', 1], ['Não sei', 1]], 'O resultado não substitui a análise da política de alimentação ou orientação jurídica e tributária.'),
  question('extras', 'Você sabe quais serviços adicionais estão incluídos no contrato?', [['Sim, conhecemos e usamos'], ['Não há serviços adicionais', 1], ['Não sei o que está incluído', 1]], 'Serviços adicionais podem ter custo e condições de elegibilidade. Não são uma vantagem garantida.'),
  question('expenses', 'A gestão de despesas está resolvida?', [['Sim, com solução e controles próprios'], ['Temos apenas VA e VR', 1], ['Não sei ou ainda usamos processos manuais', 1]], 'Ter só VA e VR não significa que o contrato esteja errado. A revisão verifica se existe uma necessidade não atendida.'),
  question('acceptance', 'Com que frequência há reclamações de aceitação?', [['Nunca ou quase nunca'], ['Às vezes', 1], ['Com frequência', 1]]),
  question('geography', 'Onde os colaboradores estão concentrados?', [['Região metropolitana'], ['Interior', 1], ['Várias cidades ou regiões', 1]], 'A dispersão geográfica é um sinal para conferir a rede local, não uma falha da operadora.'),
  question('support', 'Como costuma funcionar o suporte?', [['Rápido e resolutivo'], ['Demora para resolver', 1], ['É difícil conseguir ajuda', 1]]),
  question('effort', 'Quanto trabalho manual o benefício gera para o RH?', [['Pouco'], ['Moderado', 1], ['Muito', 1]]),
  question('renewal', 'Quando o contrato precisa ser revisto ou renovado?', [['Em menos de 3 meses', 1], ['Entre 3 e 12 meses'], ['Não sei a data', 1]])
];

export const quizQuestions = [
  question('geography', 'Onde seu time está?', [['Região metropolitana', 2, 'closed'], ['Interior', 2, 'open'], ['Várias cidades ou regiões', 2, 'open']]),
  question('stores', 'Onde as pessoas costumam usar o benefício?', [['Grandes redes', 1, 'closed'], ['Comércio de bairro', 1, 'open'], ['Nos dois tipos de estabelecimento']]),
  question('policy', 'O que pesa mais na política da empresa?', [['Uma rede de estabelecimentos credenciados', 1, 'closed'], ['Mais possibilidades de escolha para o colaborador', 1, 'open']]),
  question('pat', 'Qual cenário se aproxima da sua empresa?', [['Inscrita no PAT e quer conferir o enquadramento', 1, 'closed'], ['Não inscrita e quer comparar o pacote comercial', 1, 'open'], ['Precisa esclarecer esse ponto']], 'A inscrição no PAT não determina o tipo de rede. Os critérios regulatórios precisam ser validados à parte.'),
  question('budget', 'Como está o orçamento para serviços adicionais?', [['Enxuto: queremos entender o que já está incluído', 1, 'open'], ['Há orçamento para avaliar serviços separadamente']]),
  question('acceptance', 'Há dificuldade para usar o cartão nos locais da rotina?', [['Sim, com frequência', 1, 'open'], ['Raramente ou nunca', 1, 'closed']]),
  question('categories', 'A empresa precisa de outras categorias além de alimentação e refeição?', [['Sim, queremos avaliar outras categorias', 1, 'open'], ['Não, o foco é alimentação e refeição', 1, 'closed']], 'Categorias e saldos devem respeitar as regras de cada benefício. Rede aberta não significa uso irrestrito.')
];

function selected(questions, answers) {
  return questions.map(q => q.options[answers[q.id]]);
}

export function diagnosticResult(answers) {
  const options = selected(diagnosticQuestions, answers);
  if (options.some(x => !x)) return null;
  const score = options.reduce((sum, x) => sum + x.points, 0);
  const category = score <= 2 ? 'Bem servida' : score <= 5 ? 'Pontos para ajustar' : 'Vale comparar o mercado';
  const reasons = [];
  if (answers.acceptance > 0 || answers.geography > 0) reasons.push('Confira os estabelecimentos usados pelo time, por cidade e turno. O tamanho anunciado da rede não substitui a validação local.');
  if (answers.support > 0 || answers.effort > 0) reasons.push('Meça chamados e horas do RH. Atendimento e tarefas manuais podem pesar tanto quanto o preço da proposta.');
  if (answers.pat > 0 || answers.extras > 0) reasons.push('Revise a política de alimentação, os serviços incluídos e a elegibilidade. Não presuma incentivos ou serviços gratuitos sem documentação.');
  if (answers.expenses > 0) reasons.push('Se houver despesas corporativas, verifique controles, prestação de contas e conciliação. Se não houver essa demanda, manter somente VA e VR pode ser adequado.');
  if (answers.renewal === 0 || answers.renewal === 2) reasons.push('Localize o contrato e a data de renovação antes de iniciar qualquer negociação. Antecedência ajuda a evitar decisões de última hora.');
  if (!reasons.length) reasons.push('Seu relato indica uma operação organizada. Manter a solução atual pode ser o melhor caminho, com revisão periódica de rede, suporte e contrato.');
  return { score, category, reasons, operator: options[0].label, employees: options[1].label };
}

export function quizResult(answers) {
  const options = selected(quizQuestions, answers);
  if (options.some(x => !x)) return null;
  const open = options.filter(x => x.network === 'open').reduce((s, x) => s + x.points, 0);
  const closed = options.filter(x => x.network === 'closed').reduce((s, x) => s + x.points, 0);
  const difference = open - closed;
  const category = difference >= 3 ? 'Rede aberta' : difference <= -3 ? 'Rede fechada' : 'Modelo híbrido';
  const explanations = {
    'Rede aberta': 'Seu perfil dá mais peso à dispersão geográfica e à variedade de estabelecimentos. Vale investigar cartões com aceitação por bandeira, sempre testando a categoria do saldo e os locais de uso.',
    'Rede fechada': 'Seu perfil dá mais peso a uma rede credenciada e a uma rotina já previsível. Vale conferir cobertura local, suporte e condições do produto, sem presumir que toda rede credenciada atende ao seu time.',
    'Modelo híbrido': 'As respostas equilibram prioridades diferentes. Compare soluções credenciadas e por bandeira com a mesma amostra de estabelecimentos, regras de uso e necessidades do RH.'
  };
  return { open, closed, category, explanation: explanations[category] };
}

export function answerLabels(questions, answers) {
  return Object.fromEntries(questions.map(q => [q.title, q.options[answers[q.id]]?.label || '']));
}
