import React from 'react';

const s = {
  page: {
    maxWidth: 520,
    margin: '60px auto',
    padding: '0 24px',
  },
  card: {
    background: '#fff',
    border: '1px solid #e4e9f4',
    borderRadius: 16,
    padding: '40px 40px 36px',
    boxShadow: '0 8px 40px rgba(21,44,107,0.08)',
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#FF8E2A',
    marginBottom: 10,
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 30,
    fontWeight: 700,
    color: '#152c6b',
    marginBottom: 6,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7a9e',
    marginBottom: 36,
    lineHeight: 1.6,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#152c6b',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    border: '1.5px solid #dde3f0',
    borderRadius: 8,
    padding: '12px 16px',
    fontSize: 15,
    fontFamily: "'Barlow', sans-serif",
    color: '#1a2340',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: 24,
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #152c6b, #285199)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontFamily: "'Barlow', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.5,
    cursor: 'pointer',
    marginTop: 8,
    transition: 'opacity 0.2s, transform 0.15s',
    boxShadow: '0 4px 16px rgba(21,44,107,0.22)',
  },
  divider: {
    width: 40, height: 3,
    background: 'linear-gradient(90deg, #FF8E2A, #285199)',
    borderRadius: 99, marginBottom: 28,
  },
};

export default function StepIntake({ data, onChange, onNext }) {
  const valid = data.clientName.trim() && data.companyName.trim() && data.responsible.trim();

  const handleFocus = e => { e.target.style.borderColor = '#285199'; };
  const handleBlur = e => { e.target.style.borderColor = '#dde3f0'; };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.eyebrow}>Passo 1 de 3</div>
        <h1 style={s.title}>Identificação do Atendimento</h1>
        <div style={s.divider} />
        <p style={s.subtitle}>
          Preencha as informações abaixo antes de iniciar o checklist de validação do CRM.
        </p>

        <label style={s.label}>Nome do Cliente</label>
        <input
          style={s.input}
          placeholder="Ex: Brunna da Silva Barbosa"
          value={data.clientName}
          onChange={e => onChange({ ...data, clientName: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <label style={s.label}>Nome da Empresa</label>
        <input
          style={s.input}
          placeholder="Ex: Mussel Business LTDA"
          value={data.companyName}
          onChange={e => onChange({ ...data, companyName: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <label style={s.label}>Responsável pelo Preenchimento</label>
        <input
          style={s.input}
          placeholder="Seu nome completo"
          value={data.responsible}
          onChange={e => onChange({ ...data, responsible: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <button
          style={{ ...s.btn, opacity: valid ? 1 : 0.45, cursor: valid ? 'pointer' : 'not-allowed' }}
          disabled={!valid}
          onClick={onNext}
          onMouseEnter={e => { if (valid) e.target.style.opacity = 0.88; }}
          onMouseLeave={e => { if (valid) e.target.style.opacity = 1; }}
        >
          Iniciar Checklist →
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#aab0c4' }}>
        Outtax · Sistema interno de validação de CRM
      </div>
    </div>
  );
}
