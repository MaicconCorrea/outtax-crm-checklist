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
            tip: '📋 Acesse o Gerador de Resumo Executivo da Outtax, preencha os dados da empresa e gere o resumo. Salve o PDF gerado, anexe no CRM e cole o link do arquivo aqui.',
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
