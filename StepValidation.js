import React, { useState } from 'react';
import StepIntake from './StepIntake';
import StepChecklist from './StepChecklist';
import StepValidation from './StepValidation';

const LOGO_B64 = '/logo.png';

export default function App() {
  const [step, setStep] = useState(1); // 1 = intake, 2 = checklist, 3 = validation
  const [intakeData, setIntakeData] = useState({ clientName: '', companyName: '', responsible: '' });
  const [checkedItems, setCheckedItems] = useState({});

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header logo={LOGO_B64} step={step} />
      {step === 1 && (
        <StepIntake
          data={intakeData}
          onChange={setIntakeData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepChecklist
          intakeData={intakeData}
          checked={checkedItems}
          setChecked={setCheckedItems}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepValidation
          intakeData={intakeData}
          checked={checkedItems}
          onBack={() => setStep(2)}
          onRestart={() => { setStep(1); setIntakeData({ clientName: '', companyName: '', responsible: '' }); setCheckedItems({}); }}
        />
      )}
    </div>
  );
}

function Header({ logo, step }) {
  const steps = ['Identificação', 'Checklist CRM', 'Validação IA'];
  return (
    <header style={{
      background: 'linear-gradient(135deg, #152c6b 0%, #285199 100%)',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 72,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 24px rgba(21,44,107,0.25)',
    }}>
      <img src={logo} alt="Outtax" style={{ height: 36, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {steps.map((label, i) => {
          const num = i + 1;
          const active = step === num;
          const done = step > num;
          return (
            <React.Fragment key={num}>
              {i > 0 && <div style={{ width: 32, height: 1, background: done ? '#FF8E2A' : 'rgba(255,255,255,0.25)' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: done ? '#FF8E2A' : active ? '#fff' : 'rgba(255,255,255,0.15)',
                  color: done ? '#fff' : active ? '#152c6b' : 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0,
                  transition: 'all 0.3s',
                }}>
                  {done ? '✓' : num}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: active ? 600 : 400, letterSpacing: '0.5px',
                  color: active ? '#fff' : done ? '#FF8E2A' : 'rgba(255,255,255,0.4)',
                  display: window.innerWidth < 600 ? 'none' : 'block',
                  transition: 'all 0.3s',
                }}>{label}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </header>
  );
}
