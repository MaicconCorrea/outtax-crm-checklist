import React, { useState, useRef } from 'react';
import CHECKLIST from './checklistData';

const C = {
  navy: '#152c6b',
  blue: '#285199',
  orange: '#FF8E2A',
  white: '#ffffff',
  border: '#dde3f0',
  muted: '#6b7a9e',
  light: '#f6f8fd',
};

const ALL_ITEMS = CHECKLIST.flatMap(s =>
  s.groups.flatMap(g => g.items.map(i => ({ ...i, section: s.title })))
);

export default function StepValidation({ intakeData, checked, onBack, onRestart }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFiles = (files) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imgs.length === 0) return;
    const readers = imgs.map(f => new Promise(res => {
      const r = new FileReader();
      r.onload = e => res({ name: f.name, data: e.target.result.split(',')[1], type: f.type });
      r.readAsDataURL(f);
    }));
    Promise.all(readers).then(newImgs => setImages(prev => [...prev, ...newImgs].slice(0, 5)));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const buildCheckedSummary = () => {
    const lines = [];
    CHECKLIST.forEach(section => {
      lines.push(`\n## ${section.title}`);
      section.groups.forEach(group => {
        lines.push(`### ${group.label}`);
        group.items.forEach(item => {
          lines.push(`- [${checked[item.id] ? 'X' : ' '}] ${item.label}`);
        });
      });
    });
    return lines.join('\n');
  };

  const validateWithAI = async () => {
    if (images.length === 0) { setError('Por favor, envie pelo menos um print das telas do CRM.'); return; }
    setLoading(true);
    setError('');
    setResult(null);

    const checkedSummary = buildCheckedSummary();

    const systemPrompt = `Você é um auditor interno da Outtax, escritório de contabilidade. 
Sua função é analisar prints de tela do CRM (Plug CRM) enviados pelo colaborador e verificar se os campos estão realmente preenchidos corretamente, conforme o checklist interno.

O colaborador marcou os itens como feitos, mas você precisa confirmar visualmente nas screenshots se o preenchimento está correto e completo.

Responda APENAS em JSON válido, sem markdown, sem texto antes ou depois, com esta estrutura exata:
{
  "score": número de 0 a 100,
  "status": "aprovado" | "atenção" | "reprovado",
  "resumo": "frase curta de 1-2 linhas",
  "aprovados": ["campo1", "campo2"],
  "alertas": [
    {"campo": "nome do campo", "problema": "descrição do problema encontrado", "urgencia": "alta" | "media" | "baixa"}
  ],
  "naoVisiveis": ["campo que não aparece em nenhuma screenshot"]
}

Critérios:
- "aprovado": score >= 80, poucos ou nenhum alerta
- "atenção": score 50-79, alguns problemas
- "reprovado": score < 50, muitos campos faltando ou incorretos

Seja rigoroso. Se um campo não aparece claramente nas screenshots, adicione em "naoVisiveis".
Se um campo aparece vazio ou incorreto, adicione em "alertas".`;

    const userContent = [
      {
        type: 'text',
        text: `Analise as screenshots do CRM abaixo e verifique o preenchimento dos campos.

**Dados do atendimento:**
- Cliente: ${intakeData.clientName}
- Empresa: ${intakeData.companyName}
- Responsável: ${intakeData.responsible}

**Checklist marcado pelo colaborador:**
${checkedSummary}

Por favor, compare o que está visível nas screenshots com os campos marcados e retorne o JSON de validação.`
      },
      ...images.map(img => ({
        type: 'image',
        source: { type: 'base64', media_type: img.type, data: img.data }
      }))
    ];

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userContent }],
        })
      });

      const data = await response.json();
      const raw = data.content?.find(b => b.type === 'text')?.text || '';
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError('Erro ao processar a validação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = result?.status === 'aprovado' ? '#22c55e' : result?.status === 'atenção' ? C.orange : '#ef4444';
  const statusEmoji = result?.status === 'aprovado' ? '✅' : result?.status === 'atenção' ? '⚠️' : '❌';

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: C.orange, marginBottom: 4 }}>
          Passo 3 de 3
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 700, color: C.navy }}>
          Validação com Inteligência Artificial
        </h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.6 }}>
          Envie prints das telas do CRM preenchido. A IA irá comparar visualmente com o checklist e apontar divergências.
        </p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? C.blue : C.border}`,
          borderRadius: 14, padding: '36px 24px',
          textAlign: 'center', cursor: 'pointer',
          background: dragging ? '#f0f4ff' : C.light,
          transition: 'all 0.2s', marginBottom: 20,
        }}
      >
        <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        <div style={{ fontSize: 36, marginBottom: 10 }}>🖼️</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
          Arraste os prints ou clique para selecionar
        </div>
        <div style={{ fontSize: 13, color: C.muted }}>
          Envie até 5 screenshots das telas do CRM (Negociação, Contatos, Empresa)
        </div>
      </div>

      {/* Image previews */}
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
                src={`data:${img.type};base64,${img.data}`}
                alt={img.name}
                style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, border: `1px solid ${C.border}` }}
              />
              <button
                onClick={e => { e.stopPropagation(); removeImage(i); }}
                style={{
                  position: 'absolute', top: -6, right: -6,
                  background: '#ef4444', color: '#fff', border: 'none',
                  borderRadius: '50%', width: 20, height: 20, fontSize: 11,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700,
                }}
              >✕</button>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {img.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Validate button */}
      {!result && (
        <button
          onClick={validateWithAI}
          disabled={loading || images.length === 0}
          style={{
            width: '100%', padding: '14px',
            background: images.length > 0 ? 'linear-gradient(135deg, #FF8E2A, #e6781a)' : '#e4e9f4',
            color: images.length > 0 ? '#fff' : '#a0aec0',
            border: 'none', borderRadius: 10,
            fontFamily: "'Barlow', sans-serif",
            fontSize: 15, fontWeight: 600, cursor: images.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: images.length > 0 ? '0 4px 16px rgba(255,142,42,0.3)' : 'none',
            transition: 'all 0.2s', marginBottom: 24,
          }}
        >
          {loading ? '🤖 Analisando prints com IA...' : '🤖 Validar com Inteligência Artificial'}
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: C.muted }}>
          <div style={{ fontSize: 40, marginBottom: 12, animation: 'spin 1.5s linear infinite', display: 'inline-block' }}>⚙️</div>
          <div style={{ fontSize: 14 }}>A IA está comparando os prints com o checklist...</div>
          <div style={{ fontSize: 12, marginTop: 6, color: '#aab0c4' }}>Isso pode levar até 30 segundos</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 8 }}>
          {/* Score card */}
          <div style={{
            border: `2px solid ${statusColor}`,
            borderRadius: 14, overflow: 'hidden',
            marginBottom: 20,
          }}>
            <div style={{
              background: statusColor, padding: '18px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                  {statusEmoji} Resultado da Validação
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 2 }}>
                  {result.resumo}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {result.score}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>/ 100</div>
              </div>
            </div>
          </div>

          {/* Approved fields */}
          {result.aprovados?.length > 0 && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                ✅ Campos validados ({result.aprovados.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {result.aprovados.map((f, i) => (
                  <span key={i} style={{
                    fontSize: 12, color: '#15803d', background: '#dcfce7',
                    borderRadius: 6, padding: '3px 10px',
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Alerts */}
          {result.alertas?.length > 0 && (
            <div style={{ background: '#fff8f0', border: '1px solid #fed7aa', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
                ⚠️ Pontos de Atenção ({result.alertas.length})
              </div>
              {result.alertas.map((a, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${a.urgencia === 'alta' ? '#ef4444' : a.urgencia === 'media' ? C.orange : '#facc15'}`,
                  paddingLeft: 12, marginBottom: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{a.campo}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 7px',
                      background: a.urgencia === 'alta' ? '#fef2f2' : a.urgencia === 'media' ? '#fff8f0' : '#fefce8',
                      color: a.urgencia === 'alta' ? '#dc2626' : a.urgencia === 'media' ? C.orange : '#ca8a04',
                    }}>
                      {a.urgencia?.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{a.problema}</div>
                </div>
              ))}
            </div>
          )}

          {/* Not visible */}
          {result.naoVisiveis?.length > 0 && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                👁️ Não visível nos prints ({result.naoVisiveis.length})
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
                Os campos abaixo não apareceram claramente nas screenshots. Envie mais prints para validá-los.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {result.naoVisiveis.map((f, i) => (
                  <span key={i} style={{
                    fontSize: 12, color: C.muted, background: '#e4e9f4',
                    borderRadius: 6, padding: '3px 10px',
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <button onClick={() => { setResult(null); setImages([]); }} style={{
              flex: 1, padding: '12px', background: 'transparent',
              border: `1.5px solid ${C.border}`, borderRadius: 8,
              color: C.muted, fontSize: 14, fontFamily: "'Barlow', sans-serif",
              cursor: 'pointer', fontWeight: 500,
            }}>
              🔄 Enviar novos prints
            </button>
            <button onClick={onRestart} style={{
              flex: 1, padding: '12px',
              background: 'linear-gradient(135deg, #152c6b, #285199)',
              color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 14, fontFamily: "'Barlow', sans-serif",
              cursor: 'pointer', fontWeight: 600,
              boxShadow: '0 4px 14px rgba(21,44,107,0.22)',
            }}>
              ✨ Novo atendimento
            </button>
          </div>
        </div>
      )}

      {/* Back button */}
      <div style={{ marginTop: 20 }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none',
          color: C.muted, fontSize: 13, cursor: 'pointer',
          fontFamily: "'Barlow', sans-serif",
        }}>
          ← Voltar ao checklist
        </button>
      </div>
    </div>
  );
}
