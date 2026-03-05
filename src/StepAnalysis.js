import React, { useState, useRef } from 'react';
import CHECKLIST from './checklistData';

const C = {
  navy: '#152c6b', blue: '#285199', orange: '#FF8E2A',
  white: '#ffffff', border: '#dde3f0', muted: '#6b7a9e',
  light: '#f6f8fd', success: '#22c55e', danger: '#ef4444',
};

// Flatten all items with section/group info
const ALL_FIELDS = CHECKLIST.flatMap(section =>
  section.groups.flatMap(group =>
    group.items.map(item => ({
      ...item,
      sectionId: section.id,
      sectionTitle: section.title,
      sectionIcon: section.icon,
      groupLabel: group.label,
    }))
  )
);

export default function StepAnalysis({ intakeData, onBack, onRestart }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfB64, setPdfB64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Por favor, envie apenas arquivos PDF.');
      return;
    }
    setError('');
    setPdfFile(file);
    const reader = new FileReader();
    reader.onload = e => setPdfB64(e.target.result.split(',')[1]);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const buildFieldList = () =>
    ALL_FIELDS.map(f => `- ID: ${f.id} | Campo: ${f.label} | Seção: ${f.sectionTitle} | Grupo: ${f.groupLabel}`).join('\n');

  const analyze = async () => {
    if (!pdfB64) { setError('Envie o PDF do CRM antes de analisar.'); return; }
    setLoading(true); setError(''); setResult(null);

    const systemPrompt = `Você é um auditor interno da Outtax, escritório de contabilidade.
Sua tarefa é analisar o PDF exportado do RD Station CRM e verificar se cada campo da lista abaixo está preenchido corretamente.

REGRAS IMPORTANTES:
1. "Tags RD MKT" — IGNORAR completamente, não precisa de preenchimento.
2. Campos do Sócio 02 em branco — marcar como FALTANDO. O correto é preencher com "Não se aplica" quando não há sócio 02.
3. "Resumo Geral" — deve conter o link do PDF do resumo executivo gerado e anexado no CRM. Se estiver vazio, cortado ou sem link, marcar como FALTANDO com a dica específica.
4. Campos que existem no PDF com conteúdo válido = PREENCHIDO.
5. Campos totalmente ausentes ou visivelmente em branco no PDF = FALTANDO.
6. Campos com conteúdo suspeito, incompleto ou incorreto = ATENÇÃO.

Responda APENAS com JSON válido, sem markdown, sem texto antes ou depois:
{
  "resumo": "frase de 1 linha descrevendo o status geral",
  "totalCampos": número total de campos analisados,
  "totalOk": número de campos preenchidos corretamente,
  "campos": [
    {
      "id": "id_exato_do_campo",
      "status": "ok" | "faltando" | "atencao",
      "encontrado": "o que foi encontrado no PDF (ou vazio)",
      "observacao": "orientação específica para corrigir (apenas para faltando/atencao)"
    }
  ]
}`;

    const userText = `Analise o PDF do CRM abaixo para o cliente:
- Cliente: ${intakeData.clientName}
- Empresa: ${intakeData.companyName}
- Responsável: ${intakeData.responsible}

LISTA DE CAMPOS PARA VERIFICAR:
${buildFieldList()}

Retorne o JSON de validação campo a campo.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{
            role: 'user',
            content: [
              { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfB64 } },
              { type: 'text', text: userText }
            ]
          }]
        })
      });

      const data = await response.json();
      const raw = data.content?.find(b => b.type === 'text')?.text || '';
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError('Erro ao analisar o PDF. Tente novamente.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Group result campos by section
  const getFieldResult = (id) => result?.campos?.find(c => c.id === id);

  const okCount = result?.campos?.filter(c => c.status === 'ok').length || 0;
  const faltandoCount = result?.campos?.filter(c => c.status === 'faltando').length || 0;
  const atencaoCount = result?.campos?.filter(c => c.status === 'atencao').length || 0;
  const total = result?.campos?.length || 0;
  const pct = total > 0 ? Math.round((okCount / total) * 100) : 0;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.orange, marginBottom: 4 }}>
          Passo 2 de 2
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 700, color: C.navy }}>
          Análise Automática do CRM
        </h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.6 }}>
          Exporte o PDF do RD Station (Ctrl+P → Salvar como PDF) e envie abaixo. A IA vai identificar automaticamente todos os campos e apontar o que precisa ser corrigido.
        </p>
      </div>

      {/* How to export tip */}
      <div style={{ background: '#f0f4ff', border: '1px solid #c7d4f0', borderRadius: 10, padding: '12px 18px', marginBottom: 24, display: 'flex', gap: 10 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
        <div style={{ fontSize: 13, color: '#3a4f8c', lineHeight: 1.65 }}>
          <strong>Como exportar o PDF do RD Station:</strong> Abra a negociação do cliente → pressione <strong>Ctrl+P</strong> (ou Cmd+P no Mac) → selecione <strong>"Salvar como PDF"</strong> → salve e envie aqui.
        </div>
      </div>

      {/* Upload */}
      {!result && (
        <>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${pdfFile ? C.success : dragging ? C.blue : C.border}`,
              borderRadius: 14, padding: '40px 24px', textAlign: 'center',
              cursor: 'pointer', background: pdfFile ? '#f0fdf4' : dragging ? '#f0f4ff' : C.light,
              transition: 'all 0.2s', marginBottom: 16,
            }}
          >
            <input ref={fileRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            {pdfFile ? (
              <>
                <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>{pdfFile.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{(pdfFile.size / 1024).toFixed(1)} KB · Clique para trocar o arquivo</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📄</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                  Arraste o PDF aqui ou clique para selecionar
                </div>
                <div style={{ fontSize: 13, color: C.muted }}>PDF exportado do RD Station CRM</div>
              </>
            )}
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            onClick={analyze}
            disabled={!pdfFile || loading}
            style={{
              width: '100%', padding: '15px',
              background: pdfFile ? 'linear-gradient(135deg,#FF8E2A,#e07520)' : '#e4e9f4',
              color: pdfFile ? '#fff' : '#a0aec0',
              border: 'none', borderRadius: 10,
              fontFamily: "'Barlow',sans-serif", fontSize: 15, fontWeight: 700,
              cursor: pdfFile ? 'pointer' : 'not-allowed',
              boxShadow: pdfFile ? '0 4px 18px rgba(255,142,42,0.35)' : 'none',
              transition: 'all 0.2s', marginBottom: 24,
            }}
          >
            {loading ? '🤖 Analisando PDF...' : '🤖 Analisar com Inteligência Artificial'}
          </button>
        </>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: C.muted }}>
          <div style={{ fontSize: 44, marginBottom: 14, display: 'inline-block', animation: 'spin 1.8s linear infinite' }}>⚙️</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 6 }}>Lendo o PDF e verificando os campos...</div>
          <div style={{ fontSize: 13 }}>Isso pode levar até 30 segundos</div>
          <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <>
          {/* Score bar */}
          <div style={{
            background: C.white, border: '1px solid #e4e9f4', borderRadius: 16,
            padding: '24px 28px', marginBottom: 24,
            boxShadow: '0 4px 20px rgba(21,44,107,0.07)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.orange, marginBottom: 6 }}>
                  Resultado da Análise
                </div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                  {intakeData.companyName}
                </div>
                <div style={{ fontSize: 13, color: C.muted }}>{result.resumo}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 46, fontWeight: 700, color: pct >= 80 ? C.success : pct >= 50 ? C.orange : C.danger, lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 12, color: C.muted }}>preenchido</div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ background: '#e4e9f4', borderRadius: 99, height: 8, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? C.success : pct >= 50 ? C.orange : C.danger, borderRadius: 99, transition: 'width 0.6s ease' }} />
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { count: okCount, label: 'Preenchidos', color: C.success, bg: '#f0fdf4', border: '#bbf7d0', icon: '✅' },
                { count: faltandoCount, label: 'Faltando', color: C.danger, bg: '#fef2f2', border: '#fecaca', icon: '❌' },
                { count: atencaoCount, label: 'Atenção', color: C.orange, bg: '#fff8f0', border: '#fed7aa', icon: '⚠️' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, minWidth: 100, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.icon} {s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Field-by-field by section */}
          {CHECKLIST.map(section => {
            const sectionFields = section.groups.flatMap(g => g.items);
            const sectionResults = sectionFields.map(f => getFieldResult(f.id));
            const sectionFaltando = sectionResults.filter(r => r?.status === 'faltando').length;
            const sectionAtencao = sectionResults.filter(r => r?.status === 'atencao').length;
            const sectionOk = sectionResults.filter(r => r?.status === 'ok').length;

            return (
              <div key={section.id} style={{
                background: C.white, border: '1px solid #e4e9f4', borderRadius: 14,
                overflow: 'hidden', marginBottom: 16,
                boxShadow: '0 2px 12px rgba(21,44,107,0.05)',
              }}>
                {/* Section header */}
                <div style={{ background: 'linear-gradient(90deg,#152c6b,#285199)', padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{section.icon}</span>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff' }}>
                      {section.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {sectionOk > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(34,197,94,0.2)', color: '#86efac', borderRadius: 99, padding: '2px 10px' }}>✅ {sectionOk}</span>}
                    {sectionFaltando > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(239,68,68,0.25)', color: '#fca5a5', borderRadius: 99, padding: '2px 10px' }}>❌ {sectionFaltando}</span>}
                    {sectionAtencao > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,142,42,0.25)', color: '#fdba74', borderRadius: 99, padding: '2px 10px' }}>⚠️ {sectionAtencao}</span>}
                  </div>
                </div>

                {/* Fields */}
                <div style={{ padding: '8px 22px 16px' }}>
                  {section.groups.map(group => (
                    <div key={group.label} style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.orange, marginBottom: 6, paddingBottom: 5, borderBottom: `1px solid ${C.border}` }}>
                        {group.label}
                      </div>
                      {group.items.map(item => {
                        const r = getFieldResult(item.id);
                        const status = r?.status || 'pendente';
                        const statusConfig = {
                          ok: { bg: '#f0fdf4', border: '#bbf7d0', icon: '✅', iconColor: C.success, labelColor: '#15803d' },
                          faltando: { bg: '#fef2f2', border: '#fecaca', icon: '❌', iconColor: C.danger, labelColor: '#dc2626' },
                          atencao: { bg: '#fff8f0', border: '#fed7aa', icon: '⚠️', iconColor: C.orange, labelColor: '#c2590a' },
                          pendente: { bg: C.light, border: C.border, icon: '⏳', iconColor: C.muted, labelColor: C.muted },
                        }[status];

                        return (
                          <div key={item.id} style={{
                            background: statusConfig.bg, border: `1px solid ${statusConfig.border}`,
                            borderRadius: 9, padding: '10px 14px', marginBottom: 6,
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                              <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{statusConfig.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: statusConfig.labelColor }}>
                                    {item.label}
                                  </span>
                                  {item.alert && status !== 'ok' && (
                                    <span style={{ fontSize: 10, fontWeight: 700, color: C.orange, background: '#fff8f0', border: '1px solid #fed7aa', borderRadius: 4, padding: '1px 6px' }}>
                                      ATENÇÃO
                                    </span>
                                  )}
                                </div>
                                {r?.encontrado && status === 'ok' && (
                                  <div style={{ fontSize: 12, color: '#16a34a', marginTop: 3 }}>
                                    Encontrado: {r.encontrado}
                                  </div>
                                )}
                                {(status === 'faltando' || status === 'atencao') && (
                                  <div style={{ fontSize: 12, color: statusConfig.labelColor, marginTop: 4, lineHeight: 1.55, background: status === 'faltando' ? '#fee2e2' : '#ffedd5', borderRadius: 5, padding: '5px 9px' }}>
                                    {r?.observacao || (status === 'faltando' ? 'Campo não encontrado no PDF. Verificar e preencher no RD Station.' : 'Verificar se o conteúdo está correto.')}
                                    {/* Special tip for Resumo Geral */}
                                    {item.id === 'neg_resumo' && (
                                      <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #fca5a5' }}>
                                        💡 <strong>Como corrigir:</strong> Acesse o <strong>Gerador de Resumo Executivo</strong>, preencha os dados da empresa, gere o resumo, salve como PDF e anexe no CRM. Copie o link gerado e cole neste campo.
                                      </div>
                                    )}
                                    {/* Special tip for Sócio 02 fields */}
                                    {item.id.startsWith('emp_s2') && (
                                      <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #fca5a5' }}>
                                        💡 <strong>Como corrigir:</strong> Se não houver sócio 02, acesse o RD Station e preencha este campo com <strong>"Não se aplica"</strong>.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button onClick={() => { setResult(null); setPdfFile(null); setPdfB64(null); }} style={{
              flex: 1, padding: '13px',
              background: 'transparent', border: `1.5px solid ${C.border}`,
              borderRadius: 9, color: C.muted, fontSize: 14,
              fontFamily: "'Barlow',sans-serif", cursor: 'pointer', fontWeight: 500,
            }}>
              🔄 Enviar novo PDF
            </button>
            <button onClick={onRestart} style={{
              flex: 1, padding: '13px',
              background: 'linear-gradient(135deg,#152c6b,#285199)',
              color: '#fff', border: 'none', borderRadius: 9, fontSize: 14,
              fontFamily: "'Barlow',sans-serif", cursor: 'pointer', fontWeight: 600,
              boxShadow: '0 4px 14px rgba(21,44,107,0.22)',
            }}>
              ✨ Novo atendimento
            </button>
          </div>
        </>
      )}

      {/* Back */}
      <div style={{ marginTop: 20 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer', fontFamily: "'Barlow',sans-serif" }}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}
