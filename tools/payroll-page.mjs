import { contactForm, siteFooter } from './lead-pages.mjs';

const route = '/pagamento-de-folha/';
const title = 'Pagamento de folha para empresas';
const description = 'Avalie pagamento de salários, conta digital, comprovantes e integração com ERP para simplificar a rotina do RH, DP e financeiro.';
const faq = [
  ['Essa solução calcula a folha de pagamento?', 'O foco é avaliar o pagamento dos salários e a organização dos registros. Cálculos trabalhistas, encargos e obrigações continuam com os responsáveis da empresa. Integrações e funcionalidades devem ser confirmadas na proposta.'],
  ['É preciso trocar de sistema ou abrir contas para todos?', 'Não existe uma resposta única. Antes de uma mudança, analisamos o ERP utilizado, o processo de pagamento e as condições de abertura de conta. O plano precisa prever comunicação, suporte e continuidade da operação.'],
  ['A empresa pode receber cashback sobre a folha?', 'Essa possibilidade pode entrar na avaliação comercial, mas não é automática nem garantida. Percentual, base de cálculo, elegibilidade, prazo de pagamento e eventuais custos precisam estar documentados na proposta vigente.'],
  ['A integração funciona com qualquer ERP?', 'A compatibilidade precisa ser validada com o sistema e a versão utilizados pela empresa. Layout de arquivos, APIs, permissões e testes fazem parte dessa verificação; não presumimos integração universal.'],
  ['Preciso enviar a folha ou os dados dos colaboradores?', 'Não nesta etapa. O formulário pede apenas contato e contexto da empresa. Não envie arquivos de folha, salários individuais, dados bancários, documentos dos colaboradores ou credenciais.'],
  ['O contato já significa contratação?', 'Não. A conversa serve para mapear o cenário e avaliar a solução e suas condições. A contratação depende de proposta, documentação, aprovação e definição das responsabilidades. A Consultoria VR atua na orientação e não executa pagamentos nem oferece serviços bancários em nome próprio.']
];

const features = [
  ['Pagamento de salários', 'Organize o fluxo de valores recorrentes em uma operação digital. Na análise, validamos calendário, responsáveis, aprovação e retorno das transações para que o fechamento não dependa de transferências avulsas e conferências dispersas.'],
  ['Conta digital para o time', 'A abertura de contas pode fazer parte da solução. Antes de comunicar ao colaborador, confira documentação, condições de uso, canais de atendimento e o suporte disponível durante a implantação.'],
  ['Comprovantes organizados', 'Avalie a geração e a consulta de comprovantes individuais, em lote ou por centro de custo. O objetivo é facilitar a localização dos registros e a conferência do que foi pago, sem transformar cada consulta em uma busca manual.'],
  ['Contracheque online', 'A disponibilização digital do contracheque pode reduzir a circulação de arquivos e simplificar a consulta pelo colaborador. Confirme como o documento chega à plataforma, quem pode acessá-lo e quais controles protegem as informações.'],
  ['Relatórios para o fechamento', 'Leve à demonstração os relatórios que o financeiro realmente utiliza. A leitura deve permitir acompanhar pagamentos, conciliar retornos e identificar pendências sem perder a visão das unidades e dos centros de custo.'],
  ['Integração com seu ERP', 'Uma integração precisa encaixar no processo atual. Confira compatibilidade, formato de troca de dados, autorização, retorno e suporte técnico antes de considerar que uma etapa manual será eliminada.']
];

export function renderPayrollPage({ head, nav, bodyTag, siteUrl }) {
  const canonical = `${siteUrl}${route}`;
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Consultoria VR', url: siteUrl } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: title, item: canonical }
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }
  ];
  return `<!doctype html><html lang="pt-BR">${head({ title: `${title} | Consultoria VR`, description, canonical, image: '/assets/operators/gestao-rh.webp', keywords: ['pagamento de folha', 'pagamento de salários', 'conta digital para colaboradores', 'comprovantes de pagamento', 'integração ERP', 'RH e departamento pessoal'], structuredData, stylesheets: ['/payroll-page.css'] })}<body>${bodyTag()}${nav('payroll')}
    <main class="lead-page payroll-page">
      <header class="payroll-hero">
        <img src="/assets/operators/gestao-rh.webp" alt="Profissionais de RH revisando a operação da empresa" width="1440" height="810" fetchpriority="high">
        <div class="payroll-wrap" data-viewport-reveal>
          <p class="kicker">Consultoria VR by Hirayama · soluções para empresas</p>
          <h1>Pagamento de folha.<br><span>Mais eficiência para sua empresa.</span></h1>
          <p>Do pagamento dos salários aos comprovantes: conheça uma solução digital e avalie como <strong>simplificar a rotina do RH, do DP e do financeiro.</strong></p>
          <a class="button" href="#analise-folha">Quero avaliar a folha da minha empresa <span aria-hidden="true">→</span></a>
          <p class="payroll-hero-note">Primeiro entendemos sua operação. Depois, discutimos a solução.</p>
        </div>
      </header>
      <div class="payroll-audience"><div class="payroll-wrap"><span>RH e departamento pessoal</span><span>Financeiro e tesouraria</span><span>Empresas com equipes em crescimento</span></div></div>
      <section class="payroll-section payroll-wrap" aria-labelledby="payroll-pain-title">
        <div class="payroll-heading" data-viewport-reveal><p class="kicker">Menos etapas soltas. Mais clareza.</p><h2 id="payroll-pain-title">Sua folha não precisa terminar em retrabalho.</h2><p>O salário foi pago. Mas a rotina continua com comprovantes, conciliação, dúvidas e pendências. Quando tudo fica espalhado entre planilhas, arquivos e portais, o fechamento exige mais esforço do que deveria.</p></div>
        <div class="payroll-pains">
          <article data-viewport-reveal><span>01</span><h3>Pagamento fragmentado</h3><p>Transferências individuais e etapas repetidas dificultam a conferência. Vale mapear quais tarefas podem ser organizadas em um fluxo único, com responsáveis e aprovações definidos.</p></article>
          <article data-viewport-reveal><span>02</span><h3>Comprovantes difíceis de encontrar</h3><p>Se cada solicitação exige procurar um arquivo, o RH perde tempo. A análise considera acesso aos registros, organização por centro de custo e consulta das informações.</p></article>
          <article data-viewport-reveal><span>03</span><h3>Fechamento sem visão completa</h3><p>Dados dispersos podem esconder pendências. Relatórios e retornos precisam ajudar o financeiro a distinguir <strong>pagamento enviado, confirmado e ainda não concluído.</strong></p></article>
        </div>
      </section>
      <section class="payroll-solutions" aria-labelledby="payroll-solutions-title"><div class="payroll-wrap payroll-section">
        <div class="payroll-heading" data-viewport-reveal><p class="kicker">Da conta ao acompanhamento</p><h2 id="payroll-solutions-title">Uma operação digital que começa no seu processo.</h2><p>Pagamento de salários, conta digital, comprovantes e integração devem funcionar como partes da mesma rotina. Conheça o que pode entrar no escopo e confira cada recurso na demonstração e na proposta.</p></div>
        <div class="payroll-features">${features.map(([heading, text]) => `<article data-viewport-reveal><h3>${heading}</h3><p>${text}</p></article>`).join('')}</div>
        <a class="button" href="#analise-folha">Conversar sobre minha operação <span aria-hidden="true">→</span></a>
      </div></section>
      <section class="payroll-section payroll-wrap payroll-return" aria-labelledby="payroll-return-title">
        <div data-viewport-reveal><p class="kicker">Condições comerciais com transparência</p><h2 id="payroll-return-title">Existe oportunidade de retorno sobre a folha?</h2><p>Além da eficiência operacional, <strong>a possibilidade de cashback sobre a folha paga</strong> pode entrar na avaliação. Para decidir, a empresa precisa conhecer a regra completa, não apenas uma promessa comercial.</p></div>
        <div data-viewport-reveal><h3>Coloque as condições na mesma conta.</h3><p>Confira elegibilidade, percentual, base de cálculo, periodicidade e custos associados. Compare o retorno previsto com o esforço de implantação e a aderência à sua operação.</p><p class="payroll-note"><strong>Não há retorno garantido.</strong> Cashback, serviços adicionais, tarifas e funcionalidades dependem do produto, da contratação e das condições vigentes.</p></div>
      </section>
      <section class="payroll-process" aria-labelledby="payroll-process-title"><div class="payroll-wrap payroll-section">
        <div class="payroll-heading" data-viewport-reveal><p class="kicker">Uma mudança com responsáveis e calendário</p><h2 id="payroll-process-title">Antes de mudar, desenhe o próximo fechamento.</h2><p>Não basta apresentar uma plataforma. É preciso entender o sistema atual, validar a solução e preparar o time para que o primeiro pagamento aconteça com acompanhamento.</p></div>
        <ol>
          <li data-viewport-reveal><span>01</span><div><h3>Mapear o cenário</h3><p>Porte da equipe, unidades, processo atual, ERP e prioridades. Nesta conversa inicial, não precisamos de arquivos de folha nem dados bancários dos colaboradores.</p></div></li>
          <li data-viewport-reveal><span>02</span><div><h3>Validar a solução</h3><p>Compare fluxo de pagamento, relatórios, comprovantes e integração. Peça demonstração, condições comerciais e documentação dos serviços efetivamente oferecidos.</p></div></li>
          <li data-viewport-reveal><span>03</span><div><h3>Planejar a implantação</h3><p>Defina cronograma, acessos, testes e responsáveis. Se houver contas digitais, a comunicação precisa explicar condições, suporte e a experiência do colaborador.</p></div></li>
          <li data-viewport-reveal><span>04</span><div><h3>Acompanhar o primeiro ciclo</h3><p>Confira os retornos, trate pendências e valide a conciliação. A mudança precisa entregar uma rotina utilizável para quem paga e para quem recebe.</p></div></li>
        </ol>
      </div></section>
      <section class="payroll-section payroll-wrap payroll-faq" aria-labelledby="payroll-faq-title"><p class="kicker">Antes da conversa</p><h2 id="payroll-faq-title">Perguntas sobre pagamento de folha</h2>${faq.map(([question, answer]) => `<details data-viewport-reveal><summary>${question}</summary><p>${answer}</p></details>`).join('')}</section>
      <section class="payroll-contact" id="analise-folha" aria-labelledby="payroll-contact-title"><div class="payroll-wrap payroll-section">
        <div data-viewport-reveal><p class="kicker">Vamos olhar para sua empresa</p><h2 id="payroll-contact-title">Seu próximo fechamento pode começar com uma conversa melhor.</h2><p>Conte como a folha é paga hoje e o que precisa melhorar. <strong>O Ewerton ou alguém do time retorna em até 1 dia útil</strong> para entender o cenário e discutir os próximos passos.</p><p>Sem contratação automática e sem envio de documentos de colaboradores nesta etapa. A solução, o fornecedor e as responsabilidades serão esclarecidos durante a análise e antes de qualquer contratação.</p><p class="payroll-note">A Consultoria VR by Hirayama atua na orientação consultiva. Não calcula encargos, não movimenta salários e não oferece serviços bancários em nome próprio.</p></div>
        ${contactForm('payroll-form', { payroll: true })}
      </div></section>
    </main>${siteFooter}</body></html>`;
}
