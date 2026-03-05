const CHECKLIST = [
  {
    id: 'negociacao',
    title: 'Negociação',
    icon: '🤝',
    groups: [
      {
        label: 'Dados básicos da negociação',
        items: [
          { id: 'neg_nome', label: 'Nome do lead / cliente', tip: 'Usar o nome completo conforme consta no CPF ou cartão de visita. Evite apelidos.' },
          { id: 'neg_qualif', label: 'Qualificação do lead', tip: 'Classificar como: Frio / Morno / Esquentando / Quente. Isso define a urgência do follow-up.' },
          { id: 'neg_data', label: 'Data de criação da negociação', tip: 'O CRM preenche automaticamente, mas confirme se está correto.' },
          { id: 'neg_valor', label: 'Valor total da proposta (R$)', tip: '⚠️ Inserir o valor MENSAL da mensalidade, não anual. Ex: R$ 457,00 e não R$ 5.484,00.', alert: true },
          { id: 'neg_fechamento', label: 'Previsão de fechamento', tip: 'Data estimada para assinar o contrato. Use o prazo combinado na última reunião.' },
          { id: 'neg_fonte', label: 'Fonte de origem do lead', tip: 'Ex: Busca Paga | Facebook Ads / Instagram / Indicação / Google. Essencial para medir ROI.' },
          { id: 'neg_campanha', label: 'Campanha de origem', tip: 'Ex: Busca Paga | Contabilidade META. Preencher conforme o nome exato da campanha ativa.' },
          { id: 'neg_tipo', label: 'Tipo de negociação', tip: '⚠️ Escolher corretamente: Abertura de Empresa / Migração / Regularização / MEI para LTDA. Impacta o fluxo.', alert: true },
          { id: 'neg_competencia', label: 'Competência inicial do serviço', tip: 'Mês e ano a partir do qual a Outtax assume a contabilidade. Ex: 01/03/2026.' },
        ]
      },
      {
        label: 'Plano e faturamento',
        items: [
          { id: 'neg_plano', label: 'Tratamento Contábil (plano)', tip: 'Selecionar: Bronze / Prata / Ouro / Diamante. Cada plano tem escopo de serviços diferente.' },
          { id: 'neg_vencimento', label: 'Dia do vencimento da mensalidade', tip: 'Combinar com o cliente. Padrão: dia 5, 10 ou 15. Confirmar antes de fechar o contrato.' },
          { id: 'neg_resumo', label: 'Resumo geral da empresa/negócio', tip: 'Breve descrição da atividade. Essencial para contextualizar o time. Ex: "Empresa de licitações com serviços de TI."' },
        ]
      },
      {
        label: 'Folha de pagamento e pró-labore',
        items: [
          { id: 'neg_prolabore', label: 'Terá pró-labore? (Sim / Não)', tip: 'Se sim, registrar o valor acordado. Impacta o cálculo do INSS do sócio.' },
          { id: 'neg_socios_prolabore', label: 'Quantos sócios participarão do pró-labore?', tip: 'Mesmo que seja 0, registrar explicitamente.' },
          { id: 'neg_funcionarios', label: 'Quantidade de funcionários CLT', tip: 'Número atual de colaboradores registrados. Zero também deve ser preenchido.' },
          { id: 'neg_folha', label: 'Terá folha de pagamento?', tip: '⚠️ Distinguir: "Somente pró-labore", "Folha completa" ou "Não terá folha". Define o escopo do DP.', alert: true },
        ]
      },
      {
        label: 'Certificado digital e contratante',
        items: [
          { id: 'neg_cert', label: 'Solicitar Certificado Digital eCNPJ?', tip: '⚠️ Se o cliente optou por fazer em outro lugar, registrar e orientar sobre o prazo. O e-CNPJ é obrigatório para muitos processos fiscais.', alert: true },
          { id: 'neg_cpf_contratante', label: 'CPF do contratante', tip: 'CPF do responsável legal que irá assinar o contrato. Deve ser validado na Receita Federal.' },
          { id: 'neg_nome_contratante', label: 'Nome completo do contratante', tip: 'Exatamente como consta no CPF. Verificar acentuação e grafia correta.' },
        ]
      },
    ]
  },
  {
    id: 'contato',
    title: 'Contatos',
    icon: '👤',
    groups: [
      {
        label: 'Contato principal',
        items: [
          { id: 'con_nome', label: 'Nome do contato principal', tip: 'Geralmente o próprio sócio ou responsável financeiro. Confirmar quem é o ponto de contato do dia a dia.' },
          { id: 'con_whatsapp', label: 'Telefone / WhatsApp', tip: '⚠️ Inserir com código do país e DDD. Formato: +5521999999999. Testar o número antes de finalizar o cadastro.', alert: true },
          { id: 'con_email', label: 'E-mail do contato principal', tip: 'Confirmar o e-mail por escrito — erros de digitação são comuns. Enviar e-mail de boas-vindas de teste após cadastro.' },
          { id: 'con_obs', label: 'Informações adicionais do contato', tip: 'Horário preferido para contato, preferência por WhatsApp ou e-mail, observações relevantes de atendimento.' },
        ]
      },
      {
        label: 'Contatos secundários',
        items: [
          { id: 'con_secundario', label: 'Adicionar contato secundário (sócio 2, financeiro, etc.)', tip: 'Se houver mais de um responsável, cadastrar todos. Ex: contador interno, secretária, gerente financeiro.' },
        ]
      },
    ]
  },
  {
    id: 'empresa',
    title: 'Empresa',
    icon: '🏢',
    groups: [
      {
        label: 'Identificação da empresa',
        items: [
          { id: 'emp_razao', label: 'Razão Social', tip: 'Conforme consta no cartão CNPJ da Receita Federal. Copiar exatamente, sem abreviações.' },
          { id: 'emp_fantasia', label: 'Nome Fantasia', tip: 'Nome comercial da empresa. Pode ser diferente da razão social.' },
          { id: 'emp_cnpj', label: 'CNPJ', tip: '⚠️ Validar o CNPJ no site da Receita Federal antes de inserir. Confirmar situação cadastral (ativa/inativa).', alert: true },
          { id: 'emp_proposta', label: 'Link da Proposta Comercial', tip: 'Anexar o link do PDF da proposta enviada ao cliente (S3, Google Drive, etc.).' },
          { id: 'emp_cartao_cnpj', label: 'Link do cartão CNPJ', tip: 'Anexar o comprovante de inscrição do CNPJ na Receita Federal.' },
          { id: 'emp_contrato_social', label: 'Link do Contrato Social', tip: 'Última versão do contrato/estatuto social registrado na Junta Comercial.' },
        ]
      },
      {
        label: 'Endereço',
        items: [
          { id: 'emp_endereco', label: 'Endereço completo (logradouro + número)', tip: 'Conferir com o CNPJ da Receita. Se endereço for diferente, verificar se há necessidade de alteração contratual.' },
          { id: 'emp_complemento', label: 'Complemento (sala, bloco, loja, apt)', tip: 'Detalhar ao máximo para correspondências e certidões.' },
          { id: 'emp_cep', label: 'Bairro / Cidade / Estado / CEP', tip: '⚠️ Consultar o CEP no site dos Correios para garantir dados corretos. CEP errado afeta guias e correspondências fiscais.', alert: true },
          { id: 'emp_iptu', label: 'IPTU (se aplicável)', tip: 'Preencher número do IPTU apenas se necessário para abertura de empresa ou ISS municipal.' },
        ]
      },
      {
        label: 'Natureza jurídica e tributação',
        items: [
          { id: 'emp_tipo', label: 'Tipo da empresa (LTDA / MEI / SLU / SA)', tip: 'Verificar no contrato social. Impacta responsabilidade dos sócios e obrigações acessórias.' },
          { id: 'emp_porte', label: 'Porte da empresa', tip: 'ME / EPP / DEMAIS / Grande. Definido pelo faturamento anual.' },
          { id: 'emp_regime', label: 'Regime tributário', tip: '⚠️ Simples Nacional / Lucro Presumido / Lucro Real. Confirmar com a documentação — um erro aqui impacta todo o planejamento tributário.', alert: true },
          { id: 'emp_segmento', label: 'Segmento da empresa', tip: 'Ex: Comércio / Serviço / Indústria. Define CNAEs e obrigações fiscais.' },
          { id: 'emp_cnae_principal', label: 'Atividade principal — CNAE (código + descrição)', tip: 'Copiar o código e a descrição exata do CNAE principal. Verificar no site do IBGE se necessário.' },
          { id: 'emp_cnae_sec', label: 'Atividades secundárias — CNAEs adicionais', tip: 'Listar todas as atividades secundárias registradas no cartão CNPJ.' },
          { id: 'emp_capital', label: 'Valor do capital social', tip: 'Conforme contrato social. Ex: R$ 20.000,00.' },
          { id: 'emp_junta', label: 'Padrão Junta Comercial', tip: 'Verificar se o registro segue o padrão da Junta do estado. Impacta documentos como atas e alterações contratuais.' },
        ]
      },
      {
        label: 'Sócios',
        items: [
          { id: 'emp_qtd_socios', label: 'Quantidade de sócios', tip: 'Total de sócios no contrato social, incluindo sócios sem participação ativa.' },
          { id: 'emp_s1_cpf', label: 'Sócio 01 — CPF', tip: '⚠️ Validar o CPF na Receita Federal. CPF irregular bloqueia serviços como emissão de certidões e abertura de contas.', alert: true },
          { id: 'emp_s1_rg', label: 'Sócio 01 — RG ou CNH', tip: 'Número do documento de identidade. Preferir CNH se disponível (mais aceita em cartórios).' },
          { id: 'emp_s1_nome', label: 'Sócio 01 — Nome completo', tip: 'Exatamente como consta no CPF.' },
          { id: 'emp_s1_contato', label: 'Sócio 01 — WhatsApp e E-mail', tip: 'Contato direto do sócio, independente do contato comercial da empresa.' },
          { id: 'emp_s1_dados', label: 'Sócio 01 — Profissão / Estado Civil / Cargo', tip: 'Necessário para o contrato social. Cargo mais comum: Sócio Administrador.' },
          { id: 'emp_s1_rfb', label: 'Sócio 01 — Responsável perante a RFB', tip: 'Quem responde pela empresa na Receita Federal. Normalmente o sócio administrador.' },
          { id: 'emp_s1_govbr', label: 'Sócio 01 — Acesso GOV.BR (login + senha)', tip: '⚠️ Dado sensível: registrar de forma segura. Necessário para procurações eletrônicas e assinaturas digitais.', alert: true },
          { id: 'emp_s1_docs', label: 'Sócio 01 — Link documentos de identificação', tip: 'Upload do RG/CNH frente e verso + CPF. Nomear o arquivo: CNPJ_NomeSocio_RG.pdf' },
          { id: 'emp_s1_cert', label: 'Sócio 01 — Certificado Digital eCPF (se aplicável)', tip: 'Verificar se o sócio já possui eCPF válido. Prazo de validade deve ser conferido.' },
          { id: 'emp_s2', label: 'Sócio 02 — Dados completos (se houver)', tip: 'Repetir todos os campos do Sócio 01 para cada sócio adicional. Registrar "Não tem sócio 02" se for sócio único.' },
        ]
      },
    ]
  }
];

export default CHECKLIST;
