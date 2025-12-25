
import React, { useState } from 'react';
import { User, HealthTask } from '../types';

interface HomeProps {
  onNavigate: (view: 'guide' | 'chat' | 'library' | 'history') => void;
  hasSymptoms?: boolean;
  user: User;
}

const Home: React.FC<HomeProps> = ({ onNavigate, hasSymptoms = false, user }) => {
  const [tasks, setTasks] = useState<HealthTask[]>([
    { id: '1', title: 'Daily Health Check', completed: hasSymptoms, points: 10 },
    { id: '2', title: 'Hydration Goal (2L)', completed: false, points: 15 },
    { id: '3', title: '8h Sleep Schedule', completed: false, points: 20 },
  ]);

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const journeyStage = hasSymptoms ? 'Monitoring' : 'Wellness';

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Card */}
      <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 bg-teal-50 rounded-[1.75rem] flex items-center justify-center text-3xl border border-teal-100 shadow-inner group-hover:rotate-6 transition-transform duration-500">
                👤
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0065B3] rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
                 <span className="text-[6px] font-black text-white">HT</span>
              </div>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg leading-tight">{getGreeting()}, {user.name.split(' ')[0]}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                Student ID: {user.studentId} 
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              </p>
            </div>
          </div>
          <div className="text-right">
             <div className={`w-3.5 h-3.5 rounded-full mb-1 ml-auto ${hasSymptoms ? 'bg-teal-600' : 'bg-green-500'} shadow-lg animate-pulse`}></div>
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">{journeyStage} Mode</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/20 rounded-bl-full pointer-events-none"></div>
      </div>

      {/* Habits Progress */}
      <div className="bg-slate-900 rounded-[3.5rem] p-9 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex items-center justify-between mb-8">
           <div>
              <h3 className="text-xl font-black italic tracking-tight mb-1 text-[#0D9488]">Daily Score</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wellness trajectory</p>
           </div>
           <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                 <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={`${progress * 1.76} 176`} className="text-[#0D9488] transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{progress}%</div>
           </div>
        </div>
        
        <div className="space-y-3 relative z-10">
          {tasks.map(task => (
            <button 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between group transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-[#0D9488] border-[#0D9488]' : 'border-white/20'}`}>
                   {task.completed && <span className="text-[10px]">✓</span>}
                </div>
                <span className={`text-[11px] font-bold ${task.completed ? 'text-white/40 line-through' : 'text-white'}`}>{task.title}</span>
              </div>
              <span className="text-[9px] font-black text-[#0D9488]">+{task.points} pts</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main CTA */}
      <section 
        onClick={() => onNavigate('guide')}
        className="bg-gradient-to-br from-[#0D9488] to-[#0065B3] rounded-[3.5rem] p-10 text-white shadow-2xl shadow-teal-500/20 relative overflow-hidden text-left cursor-pointer active:scale-[0.98] transition-all"
      >
        <div className="relative z-10">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6 border border-white/20">
            <span className="text-[10px] font-black uppercase tracking-widest">AI Mapping Tool</span>
          </div>
          <h2 className="text-4xl font-black mb-4 leading-none tracking-tight">Symptom<br/>Analyzer</h2>
          <p className="text-teal-50 opacity-90 text-sm leading-relaxed mb-8 max-w-[220px] font-medium">
            Analyze your indicators and receive a simple recovery plan.
          </p>
          <div className="flex items-center gap-3 bg-white text-[#0D9488] w-fit px-8 py-4 rounded-[1.75rem] font-black shadow-lg">
             <span>Start Assessment</span>
             <span className="text-xl">➔</span>
          </div>
        </div>
      </section>

      {/* Grid Actions */}
      <div className="grid grid-cols-2 gap-5 px-1">
        <button 
          onClick={() => onNavigate('chat')}
          className="bg-white rounded-[2.75rem] p-8 text-slate-800 shadow-xl border border-slate-100 text-left active:scale-[0.98] transition-all h-52 group flex flex-col justify-between"
        >
          <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20 text-white transition-transform group-hover:scale-110">💬</div>
          <div>
            <h4 className="text-xl font-black leading-tight mb-1">Medical<br/>Chat</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Clinic Access</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('history')}
          className="bg-white rounded-[2.75rem] p-8 text-slate-800 shadow-xl border border-slate-100 text-left active:scale-[0.98] transition-all h-52 group flex flex-col justify-between"
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-lg text-white transition-transform group-hover:scale-110">📋</div>
          <div>
            <h4 className="text-xl font-black leading-tight mb-1">Health<br/>Logs</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Case History</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
