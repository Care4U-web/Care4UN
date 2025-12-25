
import React, { useState } from 'react';
import { HEALTH_ARTICLES } from '../constants';
import { Article } from '../types';

const HealthLibrary: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-teal-600 font-black text-xs uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity"
        >
          <span>←</span> Back to Knowledge Hub
        </button>
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
          <img 
            src={selectedArticle.imageUrl} 
            alt={selectedArticle.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-teal-50 text-teal-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-teal-100">
                {selectedArticle.category}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-lg">🕒</span> {selectedArticle.readTime}
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              {selectedArticle.title}
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-6 font-medium">
              {selectedArticle.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-12 p-8 bg-teal-50 rounded-[2.5rem] border border-teal-100 relative overflow-hidden group">
              <h4 className="font-black text-teal-900 mb-3 text-sm uppercase tracking-widest relative z-10">Quick Takeaway</h4>
              <p className="text-teal-800 text-sm opacity-80 font-medium relative z-10">
                Recovery is as much about patience as it is about medicine. Listen to your body and prioritize the suggested rest cycles.
              </p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full blur-2xl -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div className="text-center px-4">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Knowledge Hub</h2>
        <p className="text-slate-500 text-sm font-medium">Curated wellness pathways for the HUTECH student body.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {HEALTH_ARTICLES.map((article) => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white p-6 rounded-[2.75rem] border border-slate-100 hover:border-teal-200 shadow-sm transition-all text-left flex gap-5 items-center group active:scale-[0.98]"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-[1.75rem] flex items-center justify-center text-4xl shrink-0 group-hover:bg-teal-50 transition-colors shadow-inner border border-slate-50">
              {article.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{article.category}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{article.readTime}</span>
              </div>
              <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-teal-700 transition-colors tracking-tight">
                {article.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">{article.preview}</p>
            </div>
            <div className="text-slate-200 group-hover:text-teal-200 transition-colors text-2xl pr-2">➔</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthLibrary;
