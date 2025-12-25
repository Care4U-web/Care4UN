
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';
import { geminiService } from '../services/gemini';
import { SYMPTOMS_DATA, QUICK_REPLIES } from '../constants';

interface ChatInterfaceProps {
  initialSymptoms?: string[];
  user: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialSymptoms = [], user }) => {
  const symptomNames = initialSymptoms.map(id => SYMPTOMS_DATA.find(s => s.id === id)?.title).filter(Boolean);
  const isPriority = initialSymptoms.includes('breath');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'staff',
      staffName: 'Dr. Advisor',
      text: symptomNames.length > 0 
        ? `I have your personalized health map (${symptomNames.join(', ')}). I'm currently reviewing your data. How are you feeling right now?`
        : `Hello! I'm here to support your recovery journey. This is a verified university consultation link. How can I assist you today?`,
      timestamp: new Date(),
      status: 'read'
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => scrollToBottom(), [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const finalInput = textToSend || input;
    if (!finalInput.trim() || isTyping) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: finalInput, 
      timestamp: new Date(), 
      status: 'sent' 
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    
    // Simulating Delivery Status Cycle
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'delivered' } : m));
    }, 800);

    // AI/Staff starts "typing" response
    setTimeout(() => setIsTyping(true), 1500);

    const contextPrompt = `[Patient: ${user.studentId}] [Personalized Map: ${symptomNames.join(', ')}] Student Inquiry: ${finalInput}`;
    const response = await geminiService.sendMessage(contextPrompt);
    
    // Mark user message as "Read" when staff responds
    setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'read' } : m));

    const botMsg: ChatMessage = { 
      id: (Date.now() + 1).toString(), 
      role: 'assistant', 
      text: response, 
      timestamp: new Date(), 
      status: 'read' 
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header - Conversational Personalization */}
      <div className="bg-white p-5 rounded-[2.5rem] mb-6 border border-slate-100 flex items-center justify-between shadow-xl shadow-slate-200/20 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-50 rounded-[1.75rem] flex items-center justify-center text-3xl shadow-inner border border-blue-100 transition-transform hover:scale-105">👨‍⚕️</div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg leading-tight">Campus Support</h3>
            {isPriority && <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter animate-bounce inline-block mt-1">Priority Alert</span>}
          </div>
        </div>
        <div className="text-right opacity-30 pr-2">🔒</div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl"></div>
      </div>

      {/* Message List - Human Centered Design */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 px-1 custom-scrollbar pb-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-[15px] leading-relaxed shadow-sm relative transition-all ${
                msg.role === 'user' 
                  ? 'bg-[#0D9488] text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}
            >
              {(msg.role === 'staff' || msg.role === 'assistant') && (
                <div className="text-[9px] font-black text-blue-600 mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Official Medical Guidance
                </div>
              )}
              <div className="font-medium whitespace-pre-line">{msg.text}</div>
              
              <div className={`flex items-center gap-2 mt-4 opacity-40 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.role === 'user' && (
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    {msg.status === 'read' ? 'Read' : msg.status === 'delivered' ? 'Delivered' : 'Sent'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-6 rounded-[2.25rem] rounded-tl-none shadow-sm flex flex-col gap-3">
              <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest animate-pulse">Staff typing guidance...</div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Contextual Quick Replies */}
      <div className="mb-6 overflow-x-auto whitespace-nowrap px-1 no-scrollbar flex gap-3">
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => handleSend(reply)}
            className="px-6 py-4 bg-white text-slate-700 text-[10px] font-black uppercase rounded-[1.5rem] border border-slate-200 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm active:scale-95"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input Group - Responsive & Engaging */}
      <div className="relative mb-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
          placeholder="Describe how you're feeling..." 
          className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] py-7 pl-9 pr-24 focus:outline-none focus:border-[#0D9488] shadow-2xl shadow-slate-200/40 text-black font-black placeholder:text-slate-300" 
        />
        <button 
          onClick={() => handleSend()} 
          disabled={isTyping || !input.trim()} 
          className="absolute right-3 top-3 w-16 h-16 bg-[#0D9488] text-white rounded-[1.75rem] flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-30 transition-all hover:bg-teal-700"
        >
          <svg className="w-8 h-8 fill-current transform rotate-45" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
      <p className="text-center text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">HUTECH Health Privacy Sync v2.2</p>
    </div>
  );
};

export default ChatInterface;
