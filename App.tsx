
import React, { useState, useEffect } from 'react';
import { User, SeverityLevel } from './types';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import SymptomGuide from './components/SymptomGuide';
import ChatInterface from './components/ChatInterface';
import HistoryView from './components/HistoryView';
import HealthLibrary from './components/HealthLibrary';
import BottomNav from './components/BottomNav';

type ViewType = 'home' | 'guide' | 'chat' | 'history' | 'library';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  useEffect(() => {
    // Initial system heartbeat
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (studentId: string, name: string) => {
    setUser({
      studentId,
      name,
      department: 'Faculty of Information Technology',
      points: 150,
      level: 2,
      badges: ['Verified User', 'Health Conscious'],
    });
    setShowWelcome(true);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('home');
    setSelectedSymptoms([]);
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAssessmentComplete = (severity: SeverityLevel) => {
    if (severity === 'high') {
      setActiveView('chat');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D9488] text-white max-w-md mx-auto relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8">
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-[#0D9488] fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 italic">Care4U</h1>
          <p className="text-teal-100 text-[9px] font-black uppercase tracking-[0.4em] opacity-70">Initializing Health Sync</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-x-hidden border-x border-slate-100">
      <Header onLogout={handleLogout} />
      
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[3.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-500 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#0D9488]"></div>
            <div className="w-20 h-20 bg-teal-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-teal-100">
              <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Access Verified</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-8 font-bold opacity-70">
              Welcome back to the Care4U Portal. Your institutional health ecosystem is now synchronized.
            </p>
            <button 
              onClick={() => setShowWelcome(false)}
              className="w-full bg-[#0D9488] text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-600/20 active:scale-95 transition-all text-xs"
            >
              Enter Hub
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 pb-32 overflow-y-auto pt-24 px-6 custom-scrollbar animate-in fade-in duration-700">
        {activeView === 'home' && (
          <Home
            onNavigate={(view: any) => setActiveView(view)}
            hasSymptoms={selectedSymptoms.length > 0}
            user={user}
          />
        )}
        {activeView === 'guide' && (
          <SymptomGuide
            selectedIds={selectedSymptoms}
            onToggleSymptom={toggleSymptom}
            onAssessmentComplete={handleAssessmentComplete}
          />
        )}
        {activeView === 'chat' && (
          <ChatInterface initialSymptoms={selectedSymptoms} user={user} />
        )}
        {activeView === 'history' && <HistoryView user={user} />}
        {activeView === 'library' && <HealthLibrary />}
      </main>
      
      <BottomNav activeView={activeView} onNavigate={(view: any) => setActiveView(view)} />
      
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/10 pointer-events-none backdrop-blur-sm z-40"></div>
    </div>
  );
};

export default App;
