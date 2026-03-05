import React from 'react';

export default function StepIntake({ data, onChange, onNext }) {
  const valid = data.clientName.trim() && data.companyName.trim() && data.responsible.trim();

  return (
    <div style={{ maxWidth: 500, margin: '64px auto', padding: '0 24px' }}>
      <div style={{
        background: '#fff', border: '1px solid #e4e9f4',
        borderRadius: 16, padding: '40px',
        boxShadow: '0 8px 40px rgba(21,44,107,0.08)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF8E2A', marginBottom: 10 }}>
          Passo 1 de 2
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 700, color: '#152c6b', marginBottom: 6 }}>
          Identificação do Atendimento
        </h1>
        <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg,#FF8E2A,#285199)', borderRadius: 99, marginBottom: 24 }} />
        <p style={{ fontSize: 14, color: '#6b7a9e', marginBottom: 32, lineHeight: 1.6 }}>
          Preencha os dados abaixo e depois envie o PDF exportado do RD Station para análise automática.
        </p>

        {[
          { id: 'clientName', label: 'Nome do Cliente', placeholder: 'Ex: Brunna da Silva Barbosa' },
          { id: 'companyName', label: 'Nome da Empresa', placeholder: 'Ex: Mussel Business LTDA' },
          { id: 'responsible', label: 'Responsável pelo Preenchimento', placeholder: 'Seu nome completo' },
        ].map(f => (
          <div key={f.id} style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#152c6b', marginBottom: 7 }}>
              {f.label}
            </label>
            <input
              style={{ width: '100%', border: '1.5px solid #dde3f0', borderRadius: 8, padding: '11px 14px', fontSize: 14, fontFamily: "'Barlow',sans-serif", color: '#1a2340', outline: 'none' }}
              placeholder={f.placeholder}
              value={data[f.id]}
              onChange={e => onChange({ ...data, [f.id]: e.target.value })}
              onFocus={e => e.target.style.borderColor = '#285199'}
              onBlur={e => e.target.style.borderColor = '#dde3f0'}
            />
          </div>
        ))}

        <button
          disabled={!valid}
          onClick={onNext}
          style={{
            width: '100%', padding: '14px',
            background: valid ? 'linear-gradient(135deg,#152c6b,#285199)' : '#e4e9f4',
            color: valid ? '#fff' : '#a0aec0', border: 'none', borderRadius: 10,
            fontFamily: "'Barlow',sans-serif", fontSize: 15, fontWeight: 600,
            cursor: valid ? 'pointer' : 'not-allowed', marginTop: 8,
            boxShadow: valid ? '0 4px 16px rgba(21,44,107,0.22)' : 'none',
          }}
        >
          Próximo: Enviar PDF do CRM →
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#aab0c4' }}>
        Outtax · Sistema interno de validação de CRM
      </div>
    </div>
  );
}
