const profiles = {
  pat: [
    { heading: 'Da política escrita à operação mensal', paragraphs: [
      'Compare a política interna com os registros de concessão e fechamento. Confirme se todas as unidades aplicam os mesmos critérios e identifique regras que ainda dependem de interpretação individual.',
      'Teste situações de admissão, afastamento, transferência e desligamento. Registre quem informa, aprova e executa cada ajuste, além da evidência necessária. Assim, a empresa verifica se a política funciona na prática.',
      'Mantenha a documentação acessível na implantação ou migração. Confirme enquadramento e obrigações com a assessoria da empresa; depois, compare segregação de saldos, relatórios, permissões e rastreabilidade.'
    ] },
    { heading: 'Como tratar exceções sem perder o controle', paragraphs: [
      'Toda exceção deve ter motivo, responsável e validade. A aprovação precisa acompanhar o lançamento e aparecer no fechamento, permitindo reconstruir a decisão sem depender de mensagens espalhadas.',
      'Peça uma demonstração dos registros de ajustes. Verifique se o financeiro consegue conciliá-los e se o RH encontra as respostas sem recorrer a várias planilhas. Inclua esse fluxo na avaliação da plataforma.'
    ] }
  ],
  comparison: [
    { heading: 'Como testar operadoras com o mesmo cenário', paragraphs: [
      'Entregue a VR, Flash, Caju, iFood Benefícios, ValeCard e Pluxee o mesmo cenário: localidades, colaboradores, calendário, categorias e ocorrências do RH. Compare as respostas sobre essa base comum.',
      'Valide a aceitação do produto nos estabelecimentos usados pelo time. Registre data, região e condições informadas. Uma rede anunciada nacionalmente não substitui a verificação nas localidades relevantes para a empresa.',
      'Na demonstração, teste cadastro, ajuste de valores, conferência de cargas, relatórios e atendimento. Observe etapas, permissões e qualidade das informações para o fechamento financeiro, não apenas a aparência do portal.'
    ] },
    { heading: 'Como montar uma matriz que ajude a decidir', paragraphs: [
      'Defina os pesos antes da proposta final. Empresas descentralizadas podem priorizar aceitação regional; um RH enxuto, gestão em lote e suporte. Os critérios devem refletir as dificuldades que motivaram a análise.',
      'Separe requisitos obrigatórios de preferências. Guarde a evidência de cada avaliação: demonstração, resposta formal ou condição contratual. Não transforme uma pendência em aprovação apenas para concluir a comparação.'
    ] }
  ],
  implementation: [
    { heading: 'O que precisa estar pronto antes do primeiro crédito', paragraphs: [
      'Confira cadastros, unidades, valores e elegibilidade antes de enviar a base. Aprove o calendário e distribua responsabilidades. Erros nessa etapa reaparecem como cartões pendentes, cargas incorretas e dúvidas no primeiro uso.',
      'Planeje entrega, ativação, acesso ao aplicativo e atendimento. Informe quando a mudança acontece, o que o colaborador precisa fazer e a quem recorrer. Teste as instruções com um grupo representativo.',
      'Documente o tratamento dos cartões e saldos anteriores. Confirme condições com os fornecedores antes de comunicar a transição, sem prometer prazos ou procedimentos ainda não validados pelas partes envolvidas.'
    ] },
    { heading: 'Como acompanhar a implantação nas primeiras semanas', paragraphs: [
      'Classifique ocorrências por cadastro, acesso, crédito, aceitação e orientação. Diferencie falha de implantação de dúvida de comunicação e encaminhe cada problema ao responsável correto, evitando intermediações desnecessárias do RH.',
      'Após o primeiro ciclo, reúna RH, financeiro e atendimento. Revise diferenças, atualize o fechamento e registre pendências. Considere a implantação concluída quando a rotina estiver estável e as responsabilidades claras.'
    ] }
  ],
  flexible: [
    { heading: 'Flexibilidade precisa acompanhar a política da empresa', paragraphs: [
      'Compare VA, VR e benefícios flexíveis pelas necessidades e regras de concessão. Identifique públicos, localidades e dificuldades. A conveniência de cada categoria pode variar entre unidades, turnos e perfis de trabalho.',
      'Antes de ampliar categorias, defina limites, elegibilidade e aprovações. Peça uma demonstração dos controles do produto e confira como saldos, categorias e relatórios aparecem para colaboradores e gestores da empresa.',
      'Inclua o financeiro e os responsáveis pela política na decisão. Alinhe a experiência oferecida à capacidade de administrar valores e conferir registros. Confirme condições e enquadramento de cada categoria.'
    ] },
    { heading: 'Como validar a experiência antes de ampliar o benefício', paragraphs: [
      'Revise comunicação, acesso e locais de uso com pessoas de diferentes unidades e rotinas. Registre dúvidas e dificuldades para corrigir o desenho antes da expansão, sem depender apenas de impressões iniciais.',
      'Compare os relatos com os chamados do RH. Uma boa percepção inicial não dispensa ajustes de gestão. Use essa revisão para decidir quais categorias manter, orientações reforçar e controles acompanhar.'
    ] }
  ],
  management: [
    { heading: 'Como dimensionar o trabalho que fica com o RH', paragraphs: [
      'Mapeie cadastro, ajustes, pedidos, segunda via, conferência de créditos e atendimento. Registre informações necessárias e intervenções manuais. Esse mapa revela o esforço mensal que não aparece na proposta comercial do fornecedor.',
      'Avalie a capacidade de absorver novas admissões e unidades. Conforme o volume cresce, gestão em lote, permissões por unidade e relatórios de diferenças evitam que a equipe confira cada pessoa individualmente.',
      'Peça uma demonstração com exemplos da empresa. O RH verifica a execução; o financeiro, os dados resultantes. Confirme se a facilidade no portal também sustenta o fechamento e a prestação de contas.'
    ] },
    { heading: 'Como usar reclamações para melhorar a gestão', paragraphs: [
      'Agrupe chamados por causa e recorrência. Aceitação, saldo e acesso exigem respostas diferentes. Registre encaminhamento e desfecho para identificar problemas que persistem após a primeira orientação e evitar respostas repetidas.',
      'Revise as ocorrências periodicamente com a operadora. Leve exemplos e peça responsável e prazo para as pendências. Avalie a qualidade pelo histórico real, além das condições apresentadas na contratação.'
    ] }
  ]
};

export function articleDepthFor(post) {
  const subject = `${post.slug} ${post.category}`.toLowerCase();
  const key = /pat|compliance|documentacao/.test(subject) ? 'pat'
    : /implantacao|migracao|piloto/.test(subject) ? 'implementation'
    : /flexiv|flexive|vale-refeicao-ou/.test(subject) ? 'flexible'
    : /compar|escolher|fornecedor|rede-credenciada|rfp/.test(subject) ? 'comparison'
    : 'management';
  return profiles[key];
}
