
import React from 'react';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'guide', label: 'Guide', icon: '🌡️' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'history', label: 'Logs', icon: '📋' },
    { id: 'library', label: 'Lib', icon: '📚' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-slate-100 flex justify-around py-5 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] px-2 rounded-t-[3rem]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center transition-all duration-500 min-w-[60px] relative group ${
            activeView === item.id ? 'text-teal-600 scale-105' : 'text-slate-400'
          }`}
        >
          <div className={`text-2xl mb-1 transition-all duration-300 ${activeView === item.id ? '-translate-y-1 drop-shadow-md' : 'group-hover:scale-110'}`}>
            {item.icon}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-tighter transition-opacity duration-300 ${activeView === item.id ? 'opacity-100' : 'opacity-60'}`}>
            {item.label}
          </span>
          {activeView === item.id && (
            <div className="absolute -bottom-2 w-1.5 h-1.5 bg-teal-600 rounded-full shadow-lg shadow-teal-400"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
