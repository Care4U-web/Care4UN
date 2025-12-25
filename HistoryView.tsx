
import React from 'react';
import { MOCK_HISTORY, SYMPTOMS_DATA } from '../constants';
import { User } from '../types';

interface HistoryViewProps { user: User; }

const HistoryView: React.FC<HistoryViewProps> = ({ user }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-1">
      <div className="flex items-end justify-between">
        <div><h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight">Patient Logs</h2><p className="text-slate-500 text-sm">Active Identity: <span className="text-teal-600 font-bold">{user.studentId}</span></p></div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-transform hover:scale-105"><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">v2.2-Secure</span></div>
      </div>

      <div className="space-y-5">
        {MOCK_HISTORY.map((record) => (
          <div key={record.id} className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-teal-100 transition-all active:scale-[0.99]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-600 rounded-full"></div><span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{record.date.toLocaleDateString()}</span></div>
                {record.syncStatus === 'synced' && <div className="text-[8px] font-bold text-green-600 uppercase tracking-tighter bg-green-50 px-2 py-1 rounded-lg">✓ Redundant Sync</div>}
              </div>
              <div className="flex -space-x-2">{record.symptoms.map(sid => (<div key={sid} className="w-9 h-9 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">{SYMPTOMS_DATA.find(s => s.id === sid)?.icon}</div>))}</div>
            </div>
            <div className="space-y-3 mb-6"><h3 className="font-black text-slate-300 text-[10px] uppercase tracking-widest">Interaction Metadata</h3><p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{record.summary}"</p></div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50"><div className="flex flex-col"><span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Database ID</span><code className="text-[10px] text-slate-500 font-mono font-bold bg-slate-50 px-2 py-0.5 rounded mt-0.5 tracking-tight">{record.serverId}</code></div><button className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:bg-teal-50 px-4 py-2 rounded-xl transition-all active:scale-95">Export Case</button></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50/20 to-transparent rounded-bl-full pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Governance Disclaimer */}
      <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] shadow-xl relative overflow-hidden">
        <h4 className="font-black text-base mb-2 tracking-tight italic text-orange-400 underline decoration-teal-500 underline-offset-4 decoration-2">Governance & Privacy</h4>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Session telemetry is anonymized and archived in the HUTECH Medical Cluster. Your interaction logs are protected by strict institutional healthcare guidelines and encrypted at rest.</p>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default HistoryView;
