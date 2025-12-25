
import React, { useState } from 'react';
import { SYMPTOMS_DATA, CONDITION_MAP, CARE_TIMELINE, GUIDANCE_DATA } from '../constants';
import { SeverityLevel, DurationLevel } from '../types';

interface SymptomGuideProps {
  selectedIds: string[];
  onToggleSymptom: (id: string) => void;
  onAssessmentComplete?: (severity: SeverityLevel, summary: string) => void;
}

type NavStep = 'icons' | 'severity' | 'duration' | 'result';

const SymptomGuide: React.FC<SymptomGuideProps> = ({ selectedIds, onToggleSymptom, onAssessmentComplete }) => {
  const [navStep, setNavStep] = useState<NavStep>('icons');
  const [severity, setSeverity] = useState<SeverityLevel>('mild');
  const [duration, setDuration] = useState<DurationLevel>('short');
  const [showBadge, setShowBadge] = useState(false);

  const getCondition = () => {
    if (selectedIds.includes('breath')) return CONDITION_MAP['breath'];
    for (const [k, v] of Object.entries(CONDITION_MAP)) {
      const matchKeys = k.split(',');
      if (matchKeys.every(mk => selectedIds.includes(mk))) return v;
    }
    return { 
      type: 'Personal Viral Profile', 
      severity: severity, 
      advice: 'The identified symptoms suggest a common viral pattern. Proactive rest and consistent hydration are advised.' 
    };
  };

  const condition = getCondition();
  const timeline = CARE_TIMELINE[duration];
  const guidance = GUIDANCE_DATA[condition.severity];

  const handleFinish = () => {
    if (onAssessmentComplete) {
      onAssessmentComplete(condition.severity, `Assessed: ${condition.type}. Severity: ${condition.severity}.`);
    }
    setNavStep('result');
    setShowBadge(true);
    setTimeout(() => setShowBadge(false), 5000);
  };

  if (navStep === 'result') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-16">
        {showBadge && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[85%] max-w-sm animate-in slide-in-from-top-12 duration-700">
            <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl border border-teal-500/40 flex items-center gap-4">
               <div className="w-14 h-14 bg-gradient-to-br from-[#0D9488] to-[#FACC15] rounded-2xl flex items-center justify-center text-2xl shadow-lg">🏆</div>
               <div>
                  <h4 className="font-black text-sm text-teal-400 uppercase tracking-tight">Milestone Unlocked!</h4>
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Health Discovery Completed</p>
               </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className={`w-fit px-5 py-2 rounded-full mb-8 flex items-center gap-3 ${
              condition.severity === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-teal-50 text-teal-600 border border-teal-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${condition.severity === 'high' ? 'bg-red-600 animate-ping' : 'bg-teal-600'}`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{condition.severity} Severity Profile</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">{condition.type}</h2>
            <div className="p-6 bg-slate-50 rounded-[2.25rem] border border-slate-100 mb-8 shadow-inner">
               <p className="text-slate-600 text-sm leading-relaxed font-bold italic opacity-80">"{condition.advice}"</p>
            </div>
            <button onClick={() => setNavStep('icons')} className="text-[10px] font-black text-[#0D9488] uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-70 transition-opacity">← UPDATE SYMPTOMS</button>
          </div>
          <div className="absolute top-0 right-0 w-56 h-56 bg-teal-50/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>

        {/* Action Blocks */}
        <div className="grid grid-cols-1 gap-6">
          <section className="bg-white p-9 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-2xl border border-teal-100 shadow-sm">✔</div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Immediate Support</h3>
            </div>
            <div className="space-y-5 relative z-10 px-2">
              {guidance.now.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-sm text-slate-600 font-bold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 p-9 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white text-slate-400 rounded-2xl flex items-center justify-center text-2xl border border-slate-200 shadow-sm">✕</div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Avoidance Guide</h3>
            </div>
            <div className="space-y-5 px-2">
              {guidance.avoid.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-2 h-2 bg-slate-400 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-sm text-slate-900 font-bold leading-relaxed opacity-70">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-teal-50 p-9 rounded-[3rem] border border-teal-100 shadow-sm">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white text-teal-600 rounded-2xl flex items-center justify-center text-2xl border border-teal-100 shadow-sm">💊</div>
              <h3 className="text-xs font-black text-teal-800 uppercase tracking-widest">Safe Practices</h3>
            </div>
            <div className="space-y-4">
              {guidance.meds.map((item, i) => (
                <div key={i} className="bg-white/60 p-5 rounded-[1.75rem] border border-white flex gap-5 items-center hover:bg-white transition-all">
                  <span className="text-xl text-teal-400">➔</span>
                  <p className="text-xs text-teal-900 font-black tracking-tight">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-16 px-1">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight underline decoration-[#0D9488] underline-offset-8 decoration-4">Symptom Map</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-6">University Health Analysis</p>
      </div>

      {navStep === 'icons' && (
        <div className="space-y-10">
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mx-4 shadow-inner">
            <div className="h-full w-1/3 bg-[#0D9488] transition-all duration-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {SYMPTOMS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => onToggleSymptom(item.id)}
                className={`flex flex-col items-center gap-6 p-10 rounded-[3.5rem] border-2 transition-all duration-300 ${
                  selectedIds.includes(item.id)
                    ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-2xl scale-[1.05]'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-teal-200 shadow-sm'
                }`}
              >
                <span className="text-6xl mb-3">{item.icon}</span>
                <span className="text-xs font-black uppercase tracking-tighter text-center leading-none">{item.title}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setNavStep('severity')}
            disabled={selectedIds.length === 0}
            className="w-full bg-[#0D9488] text-white py-7 rounded-[2.5rem] font-black uppercase tracking-[0.25em] shadow-2xl active:scale-95 disabled:opacity-30 transition-all mt-8"
          >
            Assess Severity ➔
          </button>
        </div>
      )}

      {navStep === 'severity' && (
        <div className="space-y-12 text-center">
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mx-4 shadow-inner">
            <div className="h-full w-2/3 bg-[#0D9488] transition-all duration-700"></div>
          </div>
          <div className="flex flex-col gap-6 px-4">
            {(['mild', 'moderate', 'high'] as SeverityLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setSeverity(level)}
                className={`py-9 px-10 rounded-[3rem] border-2 font-black uppercase tracking-[0.35em] transition-all text-xs flex items-center justify-between ${
                  severity === level 
                    ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-2xl scale-[1.03]'
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                <span>{level} Impact</span>
                <span className="text-3xl">{level === 'mild' ? '🙂' : level === 'moderate' ? '🤒' : '🆘'}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-5 px-4 pt-6">
            <button onClick={() => setNavStep('icons')} className="flex-1 py-7 rounded-[2.25rem] border-2 border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest">Back</button>
            <button onClick={() => setNavStep('duration')} className="flex-[2] bg-slate-900 text-white py-7 rounded-[2.25rem] font-black uppercase tracking-widest shadow-2xl">Continue ➔</button>
          </div>
        </div>
      )}

      {navStep === 'duration' && (
        <div className="space-y-12 text-center">
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mx-4 shadow-inner">
            <div className="h-full w-full bg-[#0D9488] transition-all duration-700"></div>
          </div>
          <div className="flex flex-col gap-6 px-4">
            {(['short', 'medium', 'long'] as DurationLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setDuration(level)}
                className={`py-9 px-10 rounded-[3rem] border-2 font-black uppercase tracking-[0.2em] transition-all text-xs shadow-sm ${
                  duration === level 
                    ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-2xl'
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                {level === 'short' ? 'Within 24 Hours' : level === 'medium' ? '1-3 Days' : '3+ Days'}
              </button>
            ))}
          </div>
          <div className="flex gap-5 px-4 pt-6">
            <button onClick={() => setNavStep('severity')} className="flex-1 py-7 rounded-[2.25rem] border-2 border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest">Back</button>
            <button onClick={handleFinish} className="flex-[2] bg-[#0065B3] text-white py-7 rounded-[2.25rem] font-black uppercase tracking-widest shadow-2xl">Finalize ➔</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomGuide;
