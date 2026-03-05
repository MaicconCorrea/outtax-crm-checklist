const CHECKLIST = [
  {
    id: 'negociacao',
    title: 'Negociacao',
    icon: '🤝',
    groups: [
      {
        label: 'Dados basicos da negociacao',
        items: [
          { id: 'neg_nome', label: 'Nome do lead / cliente', tip: 'Usar o nome completo conforme consta no CPF ou cartao de visita. Evite apelidos.' },
          { id: 'neg_qualif', label: 'Qualificacao do lead', tip: 'Classificar como: Frio / Morno / Esquentando / Quente. Isso define a urgencia do follow-up.' },
          { id: 'neg_data', label: 'Data de criacao da negociacao', tip: 'O CRM preenche automaticamente, mas confirme se esta correto.' },
          { id: 'neg_valor', label: 'Valor total da proposta (R$)', tip: 'Inserir o valor MENSAL da mensalidade, nao anual. Ex: R$ 457,00 e nao R$ 5.484,00.', alert: true },
          { id: 'neg_fechamento', label: 'Previsao de fechamento', tip: 'Data estimada para assinar o contrato. Use o prazo combinado na ultima reuniao.' },
          { id: 'neg_fonte', label: 'Fonte de origem do lead', tip: 'Preenchido automaticamente pelo Marketing. Apenas OBSERVE se esta correto (ex: Busca Paga | Facebook Ads). Se estiver errado, acione o time de marketing.', alert: true },
          { id: 'neg_campanha', label: 'Campanha de origem', tip: 'Preenchido automaticamente pelo Marketing. Apenas OBSERVE se esta correto (ex: Busca Paga | Contabilidade META). Se estiver errado, acione o time de marketing.', alert: true },
          { id: 'neg_tipo', label: 'Tipo de negociacao', tip: 'Selecionar: Abertura de Empresa / Migracao de contabilidade / BPO Financeiro / Consultoria Financeira / Recuperacao de Creditos / Abertura Medicos / Transformacao Societaria. A escolha correta define o fluxo interno.', alert: true },
          { id: 'neg_competencia', label: 'Competencia inicial do servico', tip: 'Mes e ano a partir do qual a Outtax assume a contabilidade. Ex: 01/03/2026.' },
        ],
      },
      {
        label: 'Plano e faturamento',
        items: [
          { id: 'neg_plano', label: 'Tratamento Contabil (plano)', tip: 'Selecionar: Bronze / Prata / Ouro / Diamante. Cada plano tem escopo de servicos diferente.' },
          { id: 'neg_vencimento', label: 'Dia do vencimento da mensalidade', tip: 'SEMPRE sugerir o dia 5 como primeira opcao. Caso o cliente nao aceite, oferecer ate o dia 10 no maximo. Nao aceitar vencimentos apos o dia 10.', alert: true },
          { id: 'neg_resumo', label: 'Resumo executivo da empresa/negocio', tip: 'Acesse o Gerador de Resumo Executivo da Outtax, preencha os dados da empresa e gere o resumo. Salve o PDF, anexe no CRM e cole o link do arquivo aqui.', alert: true },
        ],
      },
      {
        label: 'Folha de pagamento e pro-labore',
        items: [
          { id: 'neg_prolabore', label: 'Tera pro-labore? (Sim / Nao)', tip: 'Se sim, registrar o valor acordado. Impacta o calculo do INSS do socio.' },
          { id: 'neg_socios_prolabore', label: 'Quantos socios participarao do pro-labore?', tip: 'Mesmo que seja 0, registrar explicitamente.' },
          { id: 'neg_funcionarios', label: 'Quantidade de funcionarios CLT', tip: 'Numero atual de colaboradores registrados. Zero tambem deve ser preenchido.' },
          { id: 'neg_folha', label: 'Tera folha de pagamento?', tip: 'Distinguir: Somente pro-labore / Folha completa / Nao tera folha. Define o escopo do DP.', alert: true },
        ],
      },
      {
        label: 'Certificado digital e contratante',
        items: [
          { id: 'neg_cert', label: 'Solicitar Certificado Digital eCNPJ?', tip: 'Se o cliente optou por fazer em outro lugar, registrar e orientar sobre o prazo. O e-CNPJ e obrigatorio para muitos processos fiscais.', alert: true },
          { id: 'neg_cpf_contratante', label: 'CPF do contratante', tip: 'CPF do responsavel legal que ira assinar o contrato. Deve ser validado na Receita Federal.' },
          { id: 'neg_nome_contratante', label: 'Nome completo do contratante', tip: 'Exatamente como consta no CPF. Verificar acentuacao e grafia correta.' },
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
          { id: 'con_nome', label: 'Nome do contato principal', tip: 'Geralmente o proprio socio ou responsavel financeiro. Confirmar quem e o ponto de contato do dia a dia.' },
          { id: 'con_whatsapp', label: 'Telefone / WhatsApp', tip: 'Inserir com codigo do pais e DDD. Formato: +5521999999999. Testar o numero antes de finalizar o cadastro.', alert: true },
          { id: 'con_email', label: 'E-mail do contato principal', tip: 'Confirmar o e-mail por escrito. Enviar e-mail de boas-vindas de teste apos cadastro.' },
          { id: 'con_obs', label: 'Informacoes adicionais do contato', tip: 'Horario preferido para contato, preferencia por WhatsApp ou e-mail, observacoes relevantes.' },
        ],
      },
      {
        label: 'Contatos secundarios',
        items: [
          { id: 'con_secundario', label: 'Adicionar contato secundario (socio 2, financeiro, etc.)', tip: 'Se houver mais de um responsavel, cadastrar todos. Ex: secretaria, gerente financeiro.' },
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
        label: 'Identificacao da empresa',
        items: [
          { id: 'emp_razao', label: 'Razao Social', tip: 'Conforme consta no cartao CNPJ da Receita Federal. Copiar exatamente, sem abreviacoes.' },
          { id: 'emp_fantasia', label: 'Nome Fantasia', tip: 'Nome comercial da empresa. Pode ser diferente da razao social.' },
          { id: 'emp_cnpj', label: 'CNPJ', tip: 'Validar o CNPJ no site da Receita Federal antes de inserir. Confirmar situacao cadastral (ativa/inativa).', alert: true },
          { id: 'emp_proposta', label: 'Link da Proposta Comercial', tip: 'Anexar o link do PDF da proposta ja upado no RD Station / S3.' },
          { id: 'emp_cartao_cnpj', label: 'Link do cartao CNPJ', tip: 'Anexar o link do cartao CNPJ ja upado no RD Station / S3.' },
          { id: 'emp_contrato_social', label: 'Link do Contrato Social', tip: 'Anexar o link da ultima versao do contrato social ja upado no RD Station / S3.' },
        ],
      },
      {
        label: 'Endereco',
        items: [
          { id: 'emp_endereco', label: 'Endereco completo (logradouro + numero)', tip: 'Conferir com o CNPJ da Receita. Se endereco for diferente, verificar necessidade de alteracao contratual.' },
          { id: 'emp_complemento', label: 'Complemento (sala, bloco, loja, apt)', tip: 'Detalhar ao maximo para correspondencias e certidoes.' },
          { id: 'emp_cep', label: 'Bairro / Cidade / Estado / CEP', tip: 'Consultar o CEP no site dos Correios. CEP errado afeta guias e correspondencias fiscais.', alert: true },
          { id: 'emp_iptu', label: 'IPTU (se aplicavel)', tip: 'Preencher numero do IPTU apenas se necessario para abertura de empresa ou ISS municipal.' },
        ],
      },
      {
        label: 'Natureza juridica e tributacao',
        items: [
          { id: 'emp_tipo', label: 'Tipo da empresa', tip: 'Selecionar: LTDA / Empresario Individual / S.A / Eireli / Sociedade Unipessoal de Advocacia. Verificar no contrato social.', alert: true },
          { id: 'emp_porte', label: 'Porte da empresa', tip: 'ME / EPP / DEMAIS / Grande. Definido pelo faturamento anual.' },
          { id: 'emp_regime', label: 'Regime tributario', tip: 'Simples Nacional / Lucro Presumido / Lucro Real. Confirmar com a documentacao.', alert: true },
          { id: 'emp_segmento', label: 'Segmento da empresa', tip: 'Ex: Comercio / Servico / Industria / Comercio e Servico.' },
          { id: 'emp_cnae_principal', label: 'Atividade principal - CNAE (codigo + descricao)', tip: 'Copiar o codigo e a descricao exata do CNAE principal conforme o cartao CNPJ.' },
          { id: 'emp_cnae_sec', label: 'Atividades secundarias - CNAEs adicionais', tip: 'Listar todas as atividades secundarias registradas no cartao CNPJ.' },
          { id: 'emp_capital', label: 'Valor do capital social', tip: 'Conforme contrato social. Ex: R$ 20.000,00.' },
          { id: 'emp_junta', label: 'Padrao Junta Comercial', tip: 'Verificar se o registro segue o padrao da Junta do estado.' },
        ],
      },
      {
        label: 'Socio 01',
        items: [
          { id: 'emp_qtd_socios', label: 'Quantidade de socios', tip: 'Total de socios no contrato social.' },
          { id: 'emp_s1_cpf', label: 'Socio 01 - CPF', tip: 'Validar o CPF na Receita Federal. CPF irregular bloqueia servicos.', alert: true },
          { id: 'emp_s1_rg', label: 'Socio 01 - RG ou CNH', tip: 'Preferir CNH se disponivel (mais aceita em cartorios).' },
          { id: 'emp_s1_nome', label: 'Socio 01 - Nome completo', tip: 'Exatamente como consta no CPF.' },
          { id: 'emp_s1_contato', label: 'Socio 01 - WhatsApp e E-mail', tip: 'Contato direto do socio.' },
          { id: 'emp_s1_dados', label: 'Socio 01 - Profissao / Estado Civil / Cargo', tip: 'Necessario para o contrato social. Cargo mais comum: Socio Administrador.' },
          { id: 'emp_s1_rfb', label: 'Socio 01 - Responsavel perante a RFB', tip: 'Quem responde pela empresa na Receita Federal.' },
          { id: 'emp_s1_govbr', label: 'Socio 01 - Acesso GOV.BR (login + senha)', tip: 'Dado sensivel: registrar de forma segura. Necessario para procuracoes eletronicas.', alert: true },
          { id: 'emp_s1_docs', label: 'Socio 01 - Link documentos de identificacao', tip: 'Anexar link do RG/CNH frente e verso + CPF ja upado no RD Station.' },
          { id: 'emp_s1_cert', label: 'Socio 01 - Certificado Digital eCPF (se aplicavel)', tip: 'Verificar se o socio ja possui eCPF valido e conferir prazo de validade.' },
        ],
      },
      {
        label: 'Socio 02 - Se nao houver, preencher cada campo com Nao se aplica',
        items: [
          { id: 'emp_s2_cpf', label: 'Socio 02 - CPF', tip: 'Se nao houver socio 02: escreva Nao se aplica. Se houver: validar na Receita Federal.', alert: true },
          { id: 'emp_s2_rg', label: 'Socio 02 - RG ou CNH', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_nome', label: 'Socio 02 - Nome completo', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_contato', label: 'Socio 02 - WhatsApp e E-mail', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_dados', label: 'Socio 02 - Profissao / Estado Civil / Cargo', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_rfb', label: 'Socio 02 - Responsavel perante a RFB', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_govbr', label: 'Socio 02 - Acesso GOV.BR (login + senha)', tip: 'Se nao houver socio 02: escreva Nao se aplica.', alert: true },
          { id: 'emp_s2_docs', label: 'Socio 02 - Link documentos de identificacao', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_cert', label: 'Socio 02 - Certificado Digital eCPF', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
          { id: 'emp_s2_procuracao', label: 'Socio 02 - Procuracao realizada para o escritorio', tip: 'Se nao houver socio 02: escreva Nao se aplica.' },
        ],
      },
    ],
  },
];

export default CHECKLIST;
