const CHECKLIST = [
  {
    id: 'negociacao',
    title: 'Negociação',
    icon: '🤝',
    groups: [
      {
        label: 'Dados básicos da negociação',
        items: [
          {
            id: 'neg_nome',
            label: 'Nome do lead / cliente',
            tip: 'Usar o nome completo conforme consta no CPF ou cartão de visita. Evite apelidos.',
          },
          {
            id: 'neg_qualif',
            label: 'Qualificação do lead',
            tip: 'Classificar como: Frio / Morno / Esquentando / Quente. Isso define a urgência do follow-up.',
          },
          {
            id: 'neg_data',
            label: 'Data de criação da negociação',
            tip: 'O CRM preenche automaticamente, mas confirme se está correto.',
          },
          {
            id: 'neg_valor',
            label: 'Valor total da proposta (R$)',
            tip: '⚠️ Inserir o valor MENSAL da mensalidade, não anual. Ex: R$ 457,00 e não R$ 5.484,00.',
            alert: true,
          },
          {
            id: 'neg_fechamento',
            label: 'Previsão de fechamento',
            tip: 'Data estimada para assinar o contrato. Use o prazo combinado na última reunião.',
          },
          {
            id: 'neg_fonte',
            label: 'Fonte de origem do lead',
            tip: '📌 Preenchido automaticamente pelo Marketing. Apenas OBSERVE se está correto (ex: Busca Paga | Facebook Ads, Instagram, Indicação). Se estiver errado, acione o time de marketing para corrigir.',
            alert: true,
          },
          {
            id: 'neg_campanha',
            label: 'Campanha de origem',
            tip: '📌 Preenchido automaticamente pelo Marketing. Apenas OBSERVE se está correto (ex: Busca Paga | Contabilidade META). Se estiver errado, acione o time de marketing para corrigir.',
            alert: true,
          },
          {
            id: 'neg_tipo',
            label: 'Tipo de negociação',
            tip: '⚠️ Selecionar obrigatoriamente uma das opções do CRM:\n\n• Abertura de Empresa\n• Migração de contabilidade\n• BPO Financeiro\n• Consultoria Financeira\n• Recuperação de Créditos\n• Abertura Médicos\n• Transformação Societária\n\nA escolha correta define o fluxo de atendimento interno.',
            alert: true,
          },
          {
            id: 'neg_competencia',
            label: 'Competência inicial do serviço',
            tip: 'Mês e ano a partir do qual a Outtax assume a contabilidade. Ex: 01/03/2026.',
          },
        ],
      },
      {
        label: 'Plano e faturamento',
        items: [
          {
            id: 'neg_plano',
            label: 'Tratamento Contábil (plano)',
            tip: 'Selecionar: Bronze / Prata / Ouro / Diamante. Cada plano tem escopo de serviços diferente.',
          },
          {
            id: 'neg_vencimento',
            label: 'Dia do vencimento da mensalidade',
            tip: '⚠️ SEMPRE sugerir o dia 5 como primeira opção. Caso o cliente não aceite, oferecer até o dia 10 no máximo. Não aceitar vencimentos após o dia 10.',
            alert: true,
          },
          {
            id: 'neg_resumo',
            label: 'Resumo executivo da empresa/negócio',
            tip: `📋 COMO PREENCHER — Siga o passo a passo:

1. Acesse claude.ai

2. Cole este prompt (substituindo os dados do cliente):

──────────────────────────────
"Sou de um escritório de contabilidade e preciso de um resumo executivo interno sobre o seguinte cliente:

• Empresa: [RAZÃO SOCIAL]
• Atividade: [descreva o que a empresa faz]
• Regime tributário atual: [Simples Nacional / Lucro Presumido / Lucro Real]
• Faturamento médio mensal estimado: [valor]
• Número de funcionários: [quantidade]
• Sócios: [quantidade e perfil]
• Observações relevantes: [outras informações]

Links dos documentos no RD Station:
• Proposta comercial: [cole o link]
• Cartão CNPJ: [cole o link]
• Contrato Social: [cole o link]
• Documentos dos sócios: [cole o link]

Por favor:
1. Crie um resumo executivo objetivo para nossa equipe interna
2. Aponte oportunidades de redução de carga tributária para este perfil
3. Sugira estratégias contábeis e fiscais adequadas
4. Liste pontos de atenção e riscos fiscais
5. Gere o resumo em formato estruturado para colar no CRM"
──────────────────────────────

3. Cole a resposta completa do Claude neste campo do CRM.`,
            alert: true,
          },
        ],
      },
      {
        label: 'Folha de pagamento e pró-labore',
        items: [
          {
            id: 'neg_prolabore',
            label: 'Terá pró-labore? (Sim / Não)',
            tip: 'Se sim, registrar o valor acordado. Impacta o cálculo do INSS do sócio.',
          },
          {
            id: 'neg_socios_prolabore',
            label: 'Quantos sócios participarão do pró-labore?',
            tip: 'Mesmo que seja 0, registrar explicitamente.',
          },
          {
            id: 'neg_funcionarios',
            label: 'Quantidade de funcionários CLT',
            tip: 'Número atual de colaboradores registrados. Zero também deve ser preenchido.',
          },
          {
            id: 'neg_folha',
            label: 'Terá folha de pagamento?',
            tip: '⚠️ Distinguir: "Somente pró-labore", "Folha completa" ou "Não terá folha". Define o escopo do DP.',
            alert: true,
          },
        ],
      },
      {
        label: 'Certificado digital e contratante',
        items: [
          {
            id: 'neg_cert',
            label: 'Solicitar Certificado Digital eCNPJ?',
            tip: '⚠️ Se o cliente optou por fazer em outro lugar, registrar e orientar sobre o prazo. O e-CNPJ é obrigatório para muitos processos fiscais.',
            alert: true,
          },
          {
            id: 'neg_cpf_contratante',
            label: 'CPF do contratante',
            tip: 'CPF do responsável legal que irá assinar o contrato. Deve ser validado na Receita Federal.',
          },
          {
            id: 'neg_nome_contratante',
            label: 'Nome completo do contratante',
            tip: 'Exatamente como consta no CPF. Verificar acentuação e grafia correta.',
          },
        ],
      },
    ],
  },

  {
    id: 'contato',
    title: 'Contatos',
    icon: '👤',
    groups: [
      {
        label: 'Contato principal',
        items: [
          {
            id: 'con_nome',
            label: 'Nome do contato principal',
            tip: 'Geralmente o próprio sócio ou responsável financeiro. Confirmar quem é o ponto de contato do dia a dia.',
          },
          {
            id: 'con_whatsapp',
            label: 'Telefone / WhatsApp',
            tip: '⚠️ Inserir com código do país e DDD. Formato: +5521999999999. Testar o número antes de finalizar o cadastro.',
            alert: true,
          },
          {
            id: 'con_email',
            label: 'E-mail do contato principal',
            tip: 'Confirmar o e-mail por escrito — erros de digitação são comuns. Enviar e-mail de boas-vindas de teste após cadastro.',
          },
          {
            id: 'con_obs',
            label: 'Informações adicionais do contato',
            tip: 'Horário preferido para contato, preferência por WhatsApp ou e-mail, observações relevantes de atendimento.',
          },
        ],
      },
      {
        label: 'Contatos secundários',
        items: [
          {
            id: 'con_secundario',
            label: 'Adicionar contato secundário (sócio 2, financeiro, etc.)',
            tip: 'Se houver mais de um responsável, cadastrar todos. Ex: contador interno, secretária, gerente financeiro.',
          },
        ],
      },
    ],
  },

  {
    id: 'empresa',
    title: 'Empresa',
    icon: '🏢',
    groups: [
      {
        label: 'Identificação da empresa',
        items: [
          {
            id: 'emp_razao',
            label: 'Razão Social',
            tip: 'Conforme consta no cartão CNPJ da Receita Federal. Copiar exatamente, sem abreviações.',
          },
          {
            id: 'emp_fantasia',
            label: 'Nome Fantasia',
            tip: 'Nome comercial da empresa. Pode ser diferente da razão social.',
          },
          {
            id: 'emp_cnpj',
            label: 'CNPJ',
            tip: '⚠️ Validar o CNPJ no site da Receita Federal antes de inserir. Confirmar situação cadastral (ativa/inativa).',
            alert: true,
          },
          {
            id: 'emp_proposta',
            label: 'Link da Proposta Comercial',
            tip: 'Anexar o link do PDF da proposta já upado no RD Station / S3. Verificar se o link está abrindo corretamente.',
          },
          {
            id: 'emp_cartao_cnpj',
            label: 'Link do cartão CNPJ',
            tip: 'Anexar o link do cartão CNPJ já upado no RD Station / S3. Verificar se o link está abrindo corretamente.',
          },
          {
            id: 'emp_contrato_social',
            label: 'Link do Contrato Social',
            tip: 'Anexar o link da última versão do contrato social já upado no RD Station / S3. Verificar se é a versão mais recente registrada na Junta.',
          },
        ],
      },
      {
        label: 'Endereço',
        items: [
          {
            id: 'emp_endereco',
            label: 'Endereço completo (logradouro + número)',
            tip: 'Conferir com o CNPJ da Receita. Se endereço for diferente, verificar se há necessidade de alteração contratual.',
          },
          {
            id: 'emp_complemento',
            label: 'Complemento (sala, bloco, loja, apt)',
            tip: 'Detalhar ao máximo para correspondências e certidões.',
          },
          {
            id: 'emp_cep',
            label: 'Bairro / Cidade / Estado / CEP',
            tip: '⚠️ Consultar o CEP no site dos Correios para garantir dados corretos. CEP errado afeta guias e correspondências fiscais.',
            alert: true,
          },
          {
            id: 'emp_iptu',
            label: 'IPTU (se aplicável)',
            tip: 'Preencher número do IPTU apenas se necessário para abertura de empresa ou ISS municipal.',
          },
        ],
      },
      {
        label: 'Natureza jurídica e tributação',
        items: [
          {
            id: 'emp_tipo',
            label: 'Tipo da empresa',
            tip: '⚠️ Selecionar obrigatoriamente uma das opções do CRM:\n\n• LTDA\n• Empresário Individual\n• S.A\n• Eireli\n• Sociedade Unipessoal de Advocacia\n\nVerificar no contrato social. Impacta responsabilidade dos sócios e obrigações acessórias.',
            alert: true,
          },
          {
            id: 'emp_porte',
            label: 'Porte da empresa',
            tip: 'ME / EPP / DEMAIS / Grande. Definido pelo faturamento anual.',
          },
          {
            id: 'emp_regime',
            label: 'Regime tributário',
            tip: '⚠️ Simples Nacional / Lucro Presumido / Lucro Real. Confirmar com a documentação — um erro aqui impacta todo o planejamento tributário.',
            alert: true,
          },
          {
            id: 'emp_segmento',
            label: 'Segmento da empresa',
            tip: 'Ex: Comércio / Serviço / Indústria / Comércio e Serviço. Define CNAEs e obrigações fiscais.',
          },
          {
            id: 'emp_cnae_principal',
            label: 'Atividade principal — CNAE (código + descrição)',
            tip: 'Copiar o código e a descrição exata do CNAE principal conforme o cartão CNPJ da Receita Federal.',
          },
          {
            id: 'emp_cnae_sec',
            label: 'Atividades secundárias — CNAEs adicionais',
            tip: 'Listar todas as atividades secundárias registradas no cartão CNPJ.',
          },
          {
            id: 'emp_capital',
            label: 'Valor do capital social',
            tip: 'Conforme contrato social. Ex: R$ 20.000,00.',
          },
          {
            id: 'emp_junta',
            label: 'Padrão Junta Comercial',
            tip: 'Verificar se o registro segue o padrão da Junta do estado. Impacta documentos como atas e alterações contratuais.',
          },
        ],
      },
      {
        label: 'Sócio 01',
        items: [
          {
            id: 'emp_qtd_socios',
            label: 'Quantidade de sócios',
            tip: 'Total de sócios no contrato social, incluindo sócios sem participação ativa.',
          },
          {
            id: 'emp_s1_cpf',
            label: 'Sócio 01 — CPF',
            tip: '⚠️ Validar o CPF na Receita Federal. CPF irregular bloqueia serviços como emissão de certidões e abertura de contas.',
            alert: true,
          },
          {
            id: 'emp_s1_rg',
            label: 'Sócio 01 — RG ou CNH',
            tip: 'Número do documento de identidade. Preferir CNH se disponível (mais aceita em cartórios).',
          },
          {
            id: 'emp_s1_nome',
            label: 'Sócio 01 — Nome completo',
            tip: 'Exatamente como consta no CPF.',
          },
          {
            id: 'emp_s1_contato',
            label: 'Sócio 01 — WhatsApp e E-mail',
            tip: 'Contato direto do sócio, independente do contato comercial da empresa.',
          },
          {
            id: 'emp_s1_dados',
            label: 'Sócio 01 — Profissão / Estado Civil / Cargo',
            tip: 'Necessário para o contrato social. Cargo mais comum: Sócio Administrador.',
          },
          {
            id: 'emp_s1_rfb',
            label: 'Sócio 01 — Responsável perante a RFB',
            tip: 'Quem responde pela empresa na Receita Federal. Normalmente o sócio administrador.',
          },
          {
            id: 'emp_s1_govbr',
            label: 'Sócio 01 — Acesso GOV.BR (login + senha)',
            tip: '⚠️ Dado sensível: registrar de forma segura. Necessário para procurações eletrônicas e assinaturas digitais.',
            alert: true,
          },
          {
            id: 'emp_s1_docs',
            label: 'Sócio 01 — Link documentos de identificação',
            tip: 'Anexar link do RG/CNH frente e verso + CPF já upado no RD Station. Nomear o arquivo: CNPJ_NomeSocio_RG.pdf',
          },
          {
            id: 'emp_s1_cert',
            label: 'Sócio 01 — Certificado Digital eCPF (se aplicável)',
            tip: 'Verificar se o sócio já possui eCPF válido. Prazo de validade deve ser conferido.',
          },
        ],
      },
      {
        label: 'Sócio 02 — Se não houver, preencher cada campo com "Não se aplica"',
        items: [
          {
            id: 'emp_s2_cpf',
            label: 'Sócio 02 — CPF',
            tip: '⚠️ Se não houver sócio 02: escreva "Não se aplica" no campo do CRM.\nSe houver: validar o CPF na Receita Federal antes de inserir.',
            alert: true,
          },
          {
            id: 'emp_s2_rg',
            label: 'Sócio 02 — RG ou CNH',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: preferir CNH se disponível (mais aceita em cartórios).',
          },
          {
            id: 'emp_s2_nome',
            label: 'Sócio 02 — Nome completo',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: exatamente como consta no CPF.',
          },
          {
            id: 'emp_s2_contato',
            label: 'Sócio 02 — WhatsApp e E-mail',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: contato direto do sócio.',
          },
          {
            id: 'emp_s2_dados',
            label: 'Sócio 02 — Profissão / Estado Civil / Cargo',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: necessário para o contrato social.',
          },
          {
            id: 'emp_s2_rfb',
            label: 'Sócio 02 — Responsável perante a RFB',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: verificar se este sócio também responde perante a Receita Federal.',
          },
          {
            id: 'emp_s2_govbr',
            label: 'Sócio 02 — Acesso GOV.BR (login + senha)',
            tip: '⚠️ Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: dado sensível — registrar de forma segura. Necessário para procurações eletrônicas.',
            alert: true,
          },
          {
            id: 'emp_s2_docs',
            label: 'Sócio 02 — Link documentos de identificação',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: anexar link do RG/CNH frente e verso + CPF upado no RD Station.',
          },
          {
            id: 'emp_s2_cert',
            label: 'Sócio 02 — Certificado Digital eCPF (se aplicável)',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: verificar se o eCPF é válido e verificar o prazo de validade.',
          },
          {
            id: 'emp_s2_procuracao',
            label: 'Sócio 02 — Procuração realizada para o escritório',
            tip: 'Se não houver sócio 02: escreva "Não se aplica" no campo.\nSe houver: verificar se a procuração foi emitida, assinada e enviada ao escritório.',
          },
        ],
      },
    ],
  },
];

export default CHECKLIST;
