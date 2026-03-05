import React, { useState } from 'react';
import CHECKLIST from './checklistData';

const C = {
  navy: '#152c6b',
  blue: '#285199',
  orange: '#FF8E2A',
  white: '#ffffff',
  light: '#f6f8fd',
  border: '#dde3f0',
  text: '#1a2340',
  muted: '#6b7a9e',
  success: '#22c55e',
  alertBg: '#fff8f0',
};

// Collect all item IDs
const ALL_IDS = CHECKLIST.flatMap(s => s.groups.flatMap(g => g.items.map(i => i.id)));
const TOTAL = ALL_IDS.length;

export default function StepChecklist({ intakeData, checked, setChecked, onNext, onBack }) {
  const [openSections, setOpenSections] = useState({ negociacao: true, contato: true, empresa: true });
  const doneCount = Object.values(checked).filter(Boolean).length;
  const allDone = doneCount === TOTAL;

  const toggleItem = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const pct = Math.round((doneCount / TOTAL) * 100);

  const handleGeneratePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const now = new Date().toLocaleDateString('pt-BR');

    // Colors
    const navy = [21, 44, 107];
    const blue = [40, 81, 153];
    const orange = [255, 142, 42];
    const gray = [107, 122, 158];
    const lightGray = [240, 244, 252];

    // Header background
    doc.setFillColor(...navy);
    doc.rect(0, 0, 210, 38, 'F');

    // Header gradient overlay
    doc.setFillColor(...blue);
    doc.rect(105, 0, 105, 38, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('OUTTAX', 14, 16);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 240);
    doc.text('Checklist de Validação CRM', 14, 24);
    doc.text(`Emitido em ${now}`, 14, 31);

    // Client info box
    doc.setFillColor(...lightGray);
    doc.roundedRect(14, 44, 182, 30, 3, 3, 'F');

    doc.setTextColor(...navy);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENTE', 20, 52);
    doc.text('EMPRESA', 80, 52);
    doc.text('RESPONSÁVEL', 140, 52);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...navy);
    doc.text(intakeData.clientName || '—', 20, 60);
    doc.text(intakeData.companyName || '—', 80, 60);
    doc.text(intakeData.responsible || '—', 140, 60);

    // Progress bar
    doc.setFillColor(225, 230, 245);
    doc.roundedRect(14, 80, 182, 6, 3, 3, 'F');
    doc.setFillColor(...orange);
    doc.roundedRect(14, 80, 182 * (doneCount / TOTAL), 6, 3, 3, 'F');

    doc.setTextColor(...navy);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Progresso: ${doneCount}/${TOTAL} itens (${pct}%)`, 14, 96);

    let y = 106;

    CHECKLIST.forEach(section => {
      // Check page space
      if (y > 260) { doc.addPage(); y = 20; }

      // Section header
      doc.setFillColor(...navy);
      doc.roundedRect(14, y, 182, 10, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${section.icon}  ${section.title.toUpperCase()}`, 20, y + 7);

      // Section count
      const secIds = section.groups.flatMap(g => g.items.map(i => i.id));
      const secDone = secIds.filter(id => checked[id]).length;
      doc.text(`${secDone}/${secIds.length}`, 185, y + 7, { align: 'right' });

      y += 14;

      section.groups.forEach(group => {
        if (y > 265) { doc.addPage(); y = 20; }

        // Group label
        doc.setTextColor(...orange);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.text(group.label.toUpperCase(), 20, y);
        y += 1;

        // Underline
        doc.setDrawColor(...orange);
        doc.setLineWidth(0.3);
        doc.line(20, y, 192, y);
        y += 5;

        group.items.forEach(item => {
          if (y > 272) { doc.addPage(); y = 20; }

          const done = checked[item.id];

          // Row background
          if (done) {
            doc.setFillColor(240, 253, 244);
            doc.roundedRect(18, y - 4, 176, 8, 1, 1, 'F');
          }

          // Checkbox
          doc.setDrawColor(done ? 34 : 180, done ? 197 : 185, done ? 94 : 210);
          doc.setLineWidth(0.5);
          doc.roundedRect(20, y - 3, 5, 5, 0.8, 0.8, 'S');

          if (done) {
            doc.setFillColor(34, 197, 94);
            doc.roundedRect(20, y - 3, 5, 5, 0.8, 0.8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(6);
            doc.text('✓', 22.2, y + 0.8);
          }

          // Label
          doc.setTextColor(done ? 100 : 26, done ? 120 : 35, done ? 100 : 64);
          doc.setFontSize(9);
          doc.setFont('helvetica', done ? 'normal' : 'normal');
          doc.text(item.label, 28, y + 0.5);

          // Alert tag
          if (item.alert && !done) {
            doc.setFillColor(255, 240, 220);
            doc.setTextColor(...orange);
            doc.setFontSize(6.5);
            doc.roundedRect(164, y - 3, 18, 5, 1, 1, 'F');
            doc.text('ATENÇÃO', 173, y + 0.5, { align: 'center' });
          }

          y += 9;
        });

        y += 3;
      });

      y += 4;
    });

    // Footer on last page
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFillColor(...lightGray);
    doc.rect(0, 280, 210, 17, 'F');
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Outtax Contabilidade · Sistema interno de validação de CRM', 14, 290);
    doc.text(`${doneCount}/${TOTAL} campos verificados`, 196, 290, { align: 'right' });

    const safeCompany = intakeData.companyName.replace(/[^a-zA-Z0-9]/g, '_') || 'cliente';
    doc.save(`Outtax_Checklist_CRM_${safeCompany}_${now.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: C.orange, marginBottom: 4 }}>
            Passo 2 de 3
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 700, color: C.navy }}>
            Checklist de Validação CRM
          </h2>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
            {intakeData.companyName} · {intakeData.clientName}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.navy }}>{doneCount}<span style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/{TOTAL}</span></div>
          <div style={{ fontSize: 11, color: C.muted }}>campos preenchidos</div>
          <div style={{
            marginTop: 6, width: 140, height: 5,
            background: '#e4e9f4', borderRadius: 99, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'linear-gradient(90deg, #285199, #FF8E2A)',
              borderRadius: 99, transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Instruction tip */}
      <div style={{
        background: '#f6f8fd', borderLeft: `4px solid ${C.blue}`,
        borderRadius: 10, padding: '12px 16px', marginBottom: 24,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 18 }}>💡</span>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
          Marque cada campo conforme for preenchendo no CRM. Passe o mouse sobre o item para ver dicas de preenchimento.
          <strong style={{ color: C.navy }}> Todos os campos devem estar marcados para liberar a geração do PDF.</strong>
        </p>
      </div>

      {/* Sections */}
      {CHECKLIST.map(section => {
        const open = openSections[section.id];
        const secIds = section.groups.flatMap(g => g.items.map(i => i.id));
        const secDone = secIds.filter(id => checked[id]).length;
        const secTotal = secIds.length;
        const secPct = Math.round((secDone / secTotal) * 100);

        return (
          <div key={section.id} style={{
            background: C.white, borderRadius: 14,
            border: `1px solid ${C.border}`,
            marginBottom: 16,
            boxShadow: '0 2px 16px rgba(21,44,107,0.06)',
            overflow: 'hidden',
          }}>
            {/* Section header */}
            <div
              onClick={() => toggleSection(section.id)}
              style={{
                background: 'linear-gradient(90deg, #152c6b, #285199)',
                padding: '14px 22px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer', userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: 1.5, textTransform: 'uppercase', color: C.white }}>
                  {section.title}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: secDone === secTotal ? '#86efac' : C.white,
                    background: secDone === secTotal ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.12)',
                    borderRadius: 99, padding: '3px 10px',
                  }}>
                    {secDone}/{secTotal}
                  </div>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, transition: 'transform 0.3s', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>▼</span>
              </div>
            </div>

            {/* Section progress line */}
            <div style={{ height: 3, background: '#e4e9f4' }}>
              <div style={{ height: '100%', width: `${secPct}%`, background: C.orange, transition: 'width 0.4s' }} />
            </div>

            {/* Body */}
            {open && (
              <div style={{ padding: '8px 22px 18px' }}>
                {section.groups.map(group => (
                  <div key={group.label} style={{ marginTop: 18 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 2,
                      textTransform: 'uppercase', color: C.orange,
                      marginBottom: 6, paddingBottom: 6,
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      {group.label}
                    </div>
                    {group.items.map(item => (
                      <CheckItem key={item.id} item={item} checked={!!checked[item.id]} onToggle={() => toggleItem(item.id)} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom actions */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: `1px solid ${C.border}`,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, zIndex: 50,
        boxShadow: '0 -4px 20px rgba(21,44,107,0.08)',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: `1.5px solid ${C.border}`,
          borderRadius: 8, padding: '10px 20px',
          color: C.muted, fontSize: 14, fontFamily: "'Barlow', sans-serif",
          cursor: 'pointer', fontWeight: 500,
        }}>
          ← Voltar
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 13, color: C.muted }}>
            {allDone
              ? '✅ Todos os campos marcados!'
              : `Faltam ${TOTAL - doneCount} campo(s)`}
          </div>
          <button
            onClick={handleGeneratePDF}
            disabled={!allDone}
            style={{
              background: allDone ? 'linear-gradient(135deg, #152c6b, #285199)' : '#e4e9f4',
              color: allDone ? C.white : '#a0aec0',
              border: 'none', borderRadius: 8,
              padding: '10px 22px',
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14, fontWeight: 600,
              cursor: allDone ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: allDone ? '0 4px 14px rgba(21,44,107,0.22)' : 'none',
            }}
          >
            📄 Baixar PDF
          </button>
          <button
            onClick={onNext}
            disabled={!allDone}
            style={{
              background: allDone ? 'linear-gradient(135deg, #FF8E2A, #e6781a)' : '#e4e9f4',
              color: allDone ? C.white : '#a0aec0',
              border: 'none', borderRadius: 8,
              padding: '10px 22px',
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14, fontWeight: 600,
              cursor: allDone ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: allDone ? '0 4px 14px rgba(255,142,42,0.3)' : 'none',
            }}
          >
            Validar com IA →
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ item, checked, onToggle }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '9px 10px', borderRadius: 8, marginBottom: 3,
        background: checked ? '#f0fdf4' : hover ? '#f6f8fd' : 'transparent',
        cursor: 'pointer', transition: 'background 0.15s',
      }}
    >
      {/* Checkbox */}
      <div style={{
        width: 20, height: 20, flexShrink: 0, marginTop: 1,
        border: `2px solid ${checked ? '#22c55e' : '#dde3f0'}`,
        borderRadius: 5, background: checked ? '#22c55e' : C.white,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        {checked && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 14, fontWeight: 500, lineHeight: 1.4,
          color: checked ? '#6b7a9e' : '#1a2340',
          textDecoration: checked ? 'line-through' : 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {item.label}
          {item.alert && !checked && (
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#FF8E2A',
              background: '#fff8f0', borderRadius: 4, padding: '2px 6px',
            }}>⚠️ ATENÇÃO</span>
          )}
        </div>

        {/* Tip — show on hover or checked */}
        {(hover || checked) && (
          <div style={{
            marginTop: 5, fontSize: 12, color: '#6b7a9e', lineHeight: 1.55,
            background: item.alert ? '#fff8f0' : '#f6f8fd',
            borderLeft: `3px solid ${item.alert ? '#FF8E2A' : '#285199'}`,
            borderRadius: 5, padding: '6px 10px',
          }}>
            {item.tip}
          </div>
        )}
      </div>
    </div>
  );
}
