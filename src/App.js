import React, { useState } from 'react';
import StepIntake from './StepIntake';
import StepAnalysis from './StepAnalysis';

export default function App() {
  const [step, setStep] = useState(1);
  const [intakeData, setIntakeData] = useState({ clientName: '', companyName: '', responsible: '' });

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header step={step} />
      {step === 1 && (
        <StepIntake
          data={intakeData}
          onChange={setIntakeData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepAnalysis
          intakeData={intakeData}
          onBack={() => setStep(1)}
          onRestart={() => { setStep(1); setIntakeData({ clientName: '', companyName: '', responsible: '' }); }}
        />
      )}
    </div>
  );
}

function Header({ step }) {
  const steps = ['Identificação', 'Análise do CRM'];
  return (
    <header style={{
      background: 'linear-gradient(135deg, #152c6b 0%, #285199 100%)',
      padding: '0 40px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 72, position: 'sticky',
      top: 0, zIndex: 100, boxShadow: '0 4px 24px rgba(21,44,107,0.25)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src="/logo.png" alt="Outtax" style={{ height: 34, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          Validação de CRM
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {steps.map((label, i) => {
          const num = i + 1;
          const active = step === num;
          const done = step > num;
          return (
            <React.Fragment key={num}>
              {i > 0 && <div style={{ width: 28, height: 1, background: done ? '#FF8E2A' : 'rgba(255,255,255,0.2)' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: done ? '#FF8E2A' : active ? '#fff' : 'rgba(255,255,255,0.12)',
                  color: done ? '#fff' : active ? '#152c6b' : 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0, transition: 'all 0.3s',
                }}>{done ? '✓' : num}</div>
                <span style={{
                  fontSize: 12, fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : done ? '#FF8E2A' : 'rgba(255,255,255,0.35)',
                  display: window.innerWidth < 500 ? 'none' : 'block',
                }}>{label}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </header>
  );
}
