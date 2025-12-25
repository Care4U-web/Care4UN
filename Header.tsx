
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [showQRInfo, setShowQRInfo] = useState(false);
  const [serverStatus, setServerStatus] = useState<'online' | 'syncing'>('online');

  useEffect(() => {
    // Randomly show "syncing" to simulate API layer interaction
    const interval = setInterval(() => {
      setServerStatus('syncing');
      setTimeout(() => setServerStatus('online'), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl z-50 border-b border-slate-100 px-5 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center border-r border-slate-200 pr-3 mr-1">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Hutech_logo.svg/1024px-Hutech_logo.svg.png" 
              alt="HT" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0D9488] rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-teal-900 leading-none">Care4U</h1>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Campus Sync</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
            <div className={`w-1.5 h-1.5 rounded-full ${serverStatus === 'online' ? 'bg-green-500' : 'bg-teal-500 animate-pulse'}`}></div>
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">
              {serverStatus === 'online' ? 'Srv-Online' : 'Syncing'}
            </span>
          </div>
          <button 
            onClick={() => setShowQRInfo(true)}
            className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xs hover:bg-teal-50 transition-colors"
          >
            🔑
          </button>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="group flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-all border border-red-100"
            >
              <span className="text-[9px] font-black text-red-600 uppercase tracking-wider">Exit</span>
            </button>
          )}
        </div>
      </header>

      {showQRInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowQRInfo(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-teal-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-teal-100">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-3 uppercase tracking-tight underline decoration-[#0D9488] underline-offset-4">Security Integrity</h3>
            <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed">
              Care4U leverages <span className="text-[#0D9488] font-bold">HUTECH Health Cloud</span> infrastructure to ensure your data is secure and synchronized across all sessions.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Infrastructure</span>
                <span className="text-[#0D9488]">Secure Cluster v2.4</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Database</span>
                <span className="text-[#0D9488]">Encrypted H-DB</span>
              </div>
            </div>
            <button 
              onClick={() => setShowQRInfo(false)}
              className="w-full bg-[#0D9488] text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-600/20 active:scale-95 transition-all"
            >
              Return to Portal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
