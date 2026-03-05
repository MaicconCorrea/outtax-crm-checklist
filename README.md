# Outtax · Checklist CRM

Sistema interno de validação de preenchimento do CRM com geração de PDF e validação por IA.

## 🚀 Como publicar no GitHub + Vercel

### Passo 1 — Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Nome do repositório: `outtax-crm-checklist`
4. Deixe como **Privado** (Private)
5. **NÃO** marque "Add a README file"
6. Clique em **"Create repository"**

### Passo 2 — Enviar os arquivos para o GitHub

Após criar o repositório, o GitHub vai mostrar instruções. Siga os comandos abaixo no terminal:

```bash
# Instalar Git se não tiver (Windows: baixar em git-scm.com)

# Na pasta do projeto:
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/outtax-crm-checklist.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### Passo 3 — Publicar no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `outtax-crm-checklist`
4. Clique em **"Deploy"** (as configurações já estão no vercel.json)
5. Aguarde ~2 minutos — seu site estará no ar!

### Passo 4 — Adicionar a chave da API Anthropic

Para a validação por IA funcionar, você precisa configurar a chave da API:

1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Vá em **"API Keys"** e crie uma nova chave
3. No Vercel, vá nas configurações do projeto → **"Environment Variables"**
4. Adicione: `REACT_APP_ANTHROPIC_KEY` = `sk-ant-...` (sua chave)
5. Clique em **"Redeploy"** para aplicar

> ⚠️ **Importante:** A chave da API fica exposta no frontend. Para produção, recomendamos criar um backend simples (ex: Vercel Serverless Function) que faça a chamada à API de forma segura.

---

## 📁 Estrutura do projeto

```
outtax-crm/
├── public/
│   ├── index.html
│   └── logo.png          ← Logo da Outtax
├── src/
│   ├── App.js            ← Componente principal (3 passos)
│   ├── StepIntake.js     ← Passo 1: Identificação
│   ├── StepChecklist.js  ← Passo 2: Checklist + PDF
│   ├── StepValidation.js ← Passo 3: Validação com IA
│   ├── checklistData.js  ← Dados de todos os campos
│   └── index.js
├── vercel.json
└── package.json
```

## 🔧 Como rodar localmente

```bash
npm install
npm start
```

Acesse em: http://localhost:3000

## ✏️ Como adicionar novos campos ao checklist

Edite o arquivo `src/checklistData.js` e adicione itens na estrutura:

```js
{
  id: 'id_unico',          // identificador único
  label: 'Nome do campo',  // texto exibido
  tip: 'Dica de preenchimento',
  alert: true,             // opcional: exibe tag ⚠️ ATENÇÃO
}
```

---

**Outtax Contabilidade** · Sistema interno de validação de CRM
