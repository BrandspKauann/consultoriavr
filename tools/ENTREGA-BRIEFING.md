# Consultoria VR: entrega do briefing de melhorias

Implementação em 5 de outubro de 2026. Projeto correto: Consultoria VR,
domínio https://www.consultoriavr.com.br/.

## Complemento aprovado em 6 de outubro de 2026

### Leitura e movimento das páginas de operadoras

- Logos das outras operadoras em cartões com fundos de marca, sem letras
  brancas sobre branco. Proporções e links individuais preservados.
- Guias específicos em `content/operator-guides.json`: soluções, cenário de uso,
  custos, implantação, destaques semânticos em negrito e checklist interativo.
- Índice fixo por assunto, seção atual indicada e progresso da leitura.
- Três imagens ilustrativas criadas por IA, otimizadas em WebP e armazenadas
  em `assets/operators/`. Fotografias de uso, compra de alimentos e gestão do RH;
  não são retratos de clientes nem reprodução de produtos oficiais.
- Hero com marca em destaque, imagem contextual e cartão ilustrativo flutuante.
- Movimento compartilhado em `site-motion.js`: opacidade nas bordas da tela,
  conteúdo central nítido, retorno ao rolar e foco de teclado sempre visível.
- HTML permanece legível sem JavaScript; impressão e preferência por movimento
  reduzido desativam animações. Formulários e navegação não somem na rolagem.
- QA adicional: `node tools/test-operator-experience.mjs`, usando as mesmas
  variáveis de runtime Playwright e navegador do teste de captura de leads.

### Interação e velocidade nas sete operadoras

- Flutuação mais perceptível em 3,2 segundos (antes: 7 segundos), movimento
  contextual na fotografia e transições de entrada em 140-200 milissegundos.
- Cartão principal reage ao mouse e vira por clique, toque, Enter ou Espaço,
  mostrando o foco consultivo da operadora. Ilustração, não cartão oficial.
- Soluções em abas acessíveis, com setas, Home/End e altura estável. Opção de
  comparação lado a lado e perguntas específicas para levar à demonstração.
- Checklist com barra de progresso e acesso à análise ao revisar todos os
  critérios. Nenhum dado de formulário é enviado ao marcar esses itens.
- Navegação por assunto com deslocamento de 320 ms, cancelável por roda,
  toque ou teclado. Imagens de uso acompanham discretamente a rolagem.
- Movimento contínuo pausa fora da tela; preferência por movimento reduzido
  desliga flutuação, inclinação e transições sem desativar as funcionalidades.
- Sem JavaScript e na impressão, as três soluções continuam disponíveis.
- Testes cobrem 1440/390/320 px, troca de abas sem salto, comparação, virar
  cartão, foco de teclado, toque, inclinação e preservação dos fluxos de leads.

- Ticket incluída na home, em página própria `/operadoras/ticket-beneficios/`,
  nos links entre operadoras e no sitemap. Logo e referências oficiais preservados.
- Quiz e diagnóstico solicitam contato antes de mostrar o resultado. O envio
  confirmado pelo Formspree libera o resultado na mesma página; uma falha mantém
  os campos preenchidos e permite nova tentativa sem liberar o resultado.
- As respostas e a classificação seguem no formulário. A etapa é uma barreira
  de fluxo na interface, não um controle de acesso no servidor: o cálculo segue
  no navegador e não envolve informações restritas.
- Formulários comuns continuam direcionando para `/obrigado/`. Nas avaliações,
  a página de confirmação fica disponível após consultar o resultado.
- Cliente autorizou manter a entrega atual ao e-mail de Kauann via Formspree.
  HubSpot/Make ficam para uma próxima etapa; não bloqueiam esta entrega.
- LinkedIn oficial do Ewerton confirmado pelo cliente. Dados institucionais e
  inclusão da Ticket foram aprovados na conversa.
- GTM e os três eventos GA4 foram publicados pelo usuário e testados no Tag
  Assistant. A marcação de `generate_lead` como evento principal é feita no GA4.
- QA: `npm run build`, `npm test` e `node tools/test-lead-gate.mjs` com Playwright
  disponível. O teste de navegador usa o servidor local isolado, sem enviar leads
  reais. Aceita `PLAYWRIGHT_MODULE` e `QA_BROWSER_PATH` para runtimes externos.

## Entregue no código

- Formulário qualificado na home e em `/contato/`: nome, cargo, empresa,
  CNPJ, e-mail corporativo, WhatsApp com DDD, porte, cartões opcionais,
  operadora, interesses múltiplos, prioridade, contexto e consentimento.
- Máscara e verificação de CNPJ numérico e alfanumérico, validação de celular
  brasileiro, bloqueio de principais domínios de e-mail pessoal e seleção
  obrigatória de ao menos um interesse.
- Página de origem, UTMs e respostas/resultados de quiz e diagnóstico junto
  ao envio. Os campos pessoais NÃO ficam em sessionStorage nem em eventos.
- `/ja-tenho-cartao/`: dez perguntas, voltar/revisar, progresso e três
  categorias por 0-2, 3-5 e 6-8 sinais. Operadora e porte chegam ao formulário.
- `/quiz-rede-aberta-ou-fechada/`: sete perguntas, peso dois na localização,
  peso um nos demais critérios, diferença de três pontos para perfil aberto
  ou fechado, e perfil híbrido para diferença menor. Sem indicação de marca.
- `/obrigado/`: redirecionamento após resposta de sucesso no envio,
  WhatsApp opcional nesta etapa, noindex e fora do sitemap.
- `/politica-de-privacidade/`, com responsável identificado, contato de
  privacidade, finalidades, prestadores e direitos do titular.
- CTAs comerciais da home, biblioteca, artigos e páginas das operadoras
  passam pelo formulário. Canais de suporte das operadoras continuam externos.
- Assinatura Hirayama no topo/rodapé; seção Ewerton com foto e LinkedIn;
  dados jurídicos e links institucionais em todos os rodapés.
- Operadoras com diferenças por produto, cuidados, aplicativos Android/iOS,
  canais oficiais, fontes/data de consulta e revisão com operadora selecionada.
- Remoção da seção duplicada sobre critérios; banner de revisão de contrato;
  bloco de perfis substituído pela entrada do quiz; hero com contraste integral;
  proporção estável da imagem de decisão e tratamento de impressão.
- HTML estático, title/description/canonical, GTM existente preservado,
  novas páginas no sitemap. Conteúdos futuros continuam indisponíveis.

## O que não está ativado

O endpoint existente `https://formspree.io/f/mbdppnkr` foi preservado para não
interromper os pedidos. O cliente autorizou manter o destinatário atual.
Qualquer troca futura NÃO pode ser feita pelo HTML: é uma configuração da conta Formspree.
Não foi configurada entrega no HubSpot, nem notificação interna por e-mail,
nem confirmação automática assinada por Ewerton, pois faltam os acessos/dados.
Não confundir a confirmação visual `/obrigado/` com um e-mail automático.

As validações do navegador melhoram a qualidade do preenchimento, mas NÃO
são uma barreira contra requisições manuais. Replicar validação e proteção
anti-spam no fluxo de integração antes de criar/atualizar registros no CRM.

## Mensagem pronta para pedir ao cliente

"Para concluir o recebimento dos leads da Consultoria VR, preciso de:
1. Formulário público do HubSpot (link ou portal ID, form ID e região),
   ou webhook do Make para receber as submissões.
2. E-mail institucional do Ewerton e destinatários das notificações de leads.
3. Pessoa responsável com acesso ao Formspree para revisar a entrega atual
   e conectar o fluxo da Hirayama quando a migração for solicitada.
4. Confirmação da razão social, CNPJ, contato de privacidade, foto e LinkedIn
   oficiais utilizados; registro SUSEP verificável se deve constar no rodapé.
5. Acesso delegado ao GTM/GA4 e aprovação dos textos sobre PAT e vantagens.
Não é necessário enviar senhas ou tokens privados pelo chat."

## Fluxo recomendado: Formspree -> Make -> HubSpot

1. Na conta da Hirayama, conectar um webhook autorizado de submissões do
   Formspree a um cenário Make. Verificar disponibilidade no plano contratado.
2. Mapear os campos do formulário, incluindo `origin_page`, `utm_source`,
   `utm_medium`, `utm_campaign`, `quiz_result`, `quiz_answers`,
   `diagnostic_result` e `diagnostic_answers`.
3. Validar consentimento, e-mail, CNPJ e campos obrigatórios; rejeitar `_gotcha`
   preenchido. Não colocar os dados pessoais em URLs ou logs públicos.
4. Buscar/criar/atualizar contato por e-mail e empresa por CNPJ no HubSpot,
   usando as propriedades definidas pela Hirayama, e associar os registros.
5. Deduplicar por ID da submissão do Formspree: retries não podem gerar
   contatos, empresas ou notificações duplicadas.
6. Enviar notificação interna aos destinatários aprovados, com o assunto:
   `Lead ConsultoriaVR | {{employees}} | {{operator}} | {{priority}}`.
7. Enviar confirmação ao solicitante por remetente institucional aprovado.
8. Configurar alerta de falhas e testar entrega no CRM, associação de empresa,
   notificação, confirmação e retirada do destinatário antigo.
9. Atualizar a política de privacidade para descrever Make/HubSpot e eventuais
   transferências internacionais depois de ativar esses prestadores.

Alternativa: integração por formulário nativo HubSpot. Requer ID do formulário,
propriedades correspondentes, regras de consentimento e confirmação. Não basta
trocar a URL `action`: é necessário adaptar a submissão ao contrato do HubSpot.

## E-mail de confirmação proposto para aprovação

Assunto: Recebemos sua solicitação | Consultoria VR

"Olá, {{name}}. Recebemos o cenário da {{company}} para analisar os benefícios
corporativos. Eu ou alguém do time entra em contato em até 1 dia útil pelos
dados informados. Vamos entender suas prioridades antes de discutir manter,
renegociar ou comparar opções. Obrigado, Ewerton Hirayama,
Hirayama Corretora & Consultoria."

## Medição e relatório mensal

Eventos implementados na dataLayer, sem informações pessoais:
`quiz_completed`, `diagnostic_completed`, `contact_cta_click`,
`contact_form_start`, `contact_submit`, `generate_lead`,
`contact_submit_error`, `thank_you_view`, `whatsapp_after_submit`.

Publicar gatilhos de evento personalizado e tags GA4 no GTM `GTM-T636X4P7`.
Selecionar apenas UM evento como conversão de envio: `generate_lead` é o
recomendado. Não marcar também `contact_submit` e `thank_you_view` como a mesma
conversão, evitando triplicar os leads. `thank_you_view` dispara uma vez após
um envio recente; visita direta e reload não geram novo evento.
Eventos na dataLayer não significam tags GA4 publicadas: depende da conta GTM.

Registrar dimensões: `result_category`, `employee_range`, `operator`,
`priority`, `form_id`, `placement`. UTM chega ao formulário/CRM; não inclui
texto livre nos eventos. Respeitar consentimento e configurações existentes.

Relatório mensal a configurar em GA4/Looker Studio/HubSpot:
- Visitas/sessões por origem, mídia e campanha.
- Conclusões do quiz e do diagnóstico por perfil.
- Envios confirmados por porte, operadora e prioridade.
- Conversão de visita para formulário e formulário para CRM.
- Leads efetivamente recebidos no CRM versus envios confirmados pelo Formspree.
O relatório e seu envio automático NÃO foram configurados sem acesso à conta.

Links prontos para perfil/site no LinkedIn:
https://www.consultoriavr.com.br/?utm_source=linkedin&utm_medium=social&utm_campaign=perfil_ewerton
https://www.consultoriavr.com.br/ja-tenho-cartao/?utm_source=linkedin&utm_medium=social&utm_campaign=revisao_cartao
https://www.consultoriavr.com.br/quiz-rede-aberta-ou-fechada/?utm_source=linkedin&utm_medium=social&utm_campaign=perfil_rede
Alterações de perfil e publicações semanais no LinkedIn dependem do responsável
pela conta. Nenhuma publicação ou alteração de perfil foi feita.

## Fontes e ressalvas

Dados jurídicos e privacidade: https://www.hirayamacorretora.com.br/politica-de-privacidade/
Foto: ativo oficial já existente no projeto Hirayama Corretora.
LinkedIn: https://www.linkedin.com/in/ewertonhirayama/
As fontes das seis operadoras estão em `content/operators.json` e nas páginas.
CNPJ alfanumérico: documentação técnica da Receita Federal; cálculo ASCII-48
e dois dígitos verificadores preservados, incluindo exemplo 12.ABC.345/01DE-35.

Não publicamos rankings de suporte, exclusividade de TotalPass, serviços de
despesas ausentes ou gratuidade permanente sem confirmação oficial. O briefing
é uma pauta, não substitui as condições atuais da operadora. Registro SUSEP
`S7CC5J` ficou pendente de confirmação verificável; não foi exibido como registro.

## Verificação

`npm run build` e `npm test`.
Testes: CNPJ/celular/e-mail, nove limites de pontuação do diagnóstico,
432 combinações do quiz, SEO das novas rotas, canais das operadoras e fila futura.
`node tools/test-leads-server.mjs` oferece uma simulação local na porta 4175:
submissões não saem da máquina, a resposta pode falhar uma vez em
`/__test__/fail-next`, e o último payload está em `/__test__/last`.
Esse servidor é somente para testes; a Vercel bloqueia `/tools/`.
