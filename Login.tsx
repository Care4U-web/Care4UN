
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (studentId: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Institution Demo Credentials
  const DEMO_ID = "25081800202";
  const DEMO_PWD = "17102006";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentId.trim() || !password.trim()) {
      setError('Official university credentials are required.');
      return;
    }

    setIsLoading(true);

    // University Auth Simulation
    setTimeout(() => {
      if (studentId === DEMO_ID && password === DEMO_PWD) {
        onLogin(studentId, "HUTECH Student");
      } else {
        setError('Verification failed. Use official student credentials.');
        setIsLoading(false);
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 max-w-md mx-auto relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl -mr-60 -mt-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -ml-60 -mb-60"></div>

      <div className="w-full relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-800">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center gap-8 mb-10">
            <div className="bg-white p-6 rounded-[3rem] shadow-2xl border border-slate-100 flex items-center justify-center overflow-hidden transition-all hover:scale-105 duration-500">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Hutech_logo.svg/1024px-Hutech_logo.svg.png" 
                alt="University Logo" 
                className="h-20 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="h-20 flex flex-col justify-center items-center text-[#0D9488] font-black text-sm uppercase tracking-tight">HUTECH Portal</div>';
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0D9488] rounded-2xl flex items-center justify-center shadow-xl shadow-teal-600/20">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">Care4U</span>
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Health Access</h2>
          <p className="text-slate-500 text-sm mt-4 max-w-[280px] mx-auto font-bold opacity-70">Log in with your HUTECH credentials to synchronize your health ecosystem.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-100 space-y-8">
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-6">Student ID</label>
            <div className="relative">
              <span className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 text-xl">👤</span>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="2508..."
                className={`w-full bg-slate-50 border-2 ${error && !studentId ? 'border-red-100' : 'border-transparent'} focus:border-[#0D9488] focus:bg-white rounded-3xl py-6 pl-16 pr-8 outline-none transition-all text-sm font-black text-black placeholder:text-slate-300 shadow-inner`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-6">Password</label>
            <div className="relative">
              <span className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-slate-50 border-2 ${error && !password ? 'border-red-100' : 'border-transparent'} focus:border-[#0D9488] focus:bg-white rounded-3xl py-6 pl-16 pr-20 outline-none transition-all text-sm font-black text-black placeholder:text-slate-300 shadow-inner`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-[11px] font-black text-[#0D9488] hover:text-teal-700 uppercase tracking-widest px-2"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-5 rounded-3xl border border-red-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-xs font-bold text-red-600 leading-tight">{error}</p>
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0D9488] text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-teal-600/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>VERIFYING...</span>
                </div>
              ) : (
                <>Authorize Access ➔</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
