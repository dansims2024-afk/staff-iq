import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [copyStatus, setCopyStatus] = useState("Copy XML Link");

  // --- 2. SAMPLE DATA ---
  const [jobs] = useState([{ 
    id: 1, title: "Staff Accountant", location: "Princeton, NJ", applicants: 10, clicks: 342, 
    xmlUrl: "https://staff-iq.com/feeds/princeton-acc-1042.xml" 
  }]);

  // --- 3. CORE LOGIC ---
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied! ✓");
    setTimeout(() => setCopyStatus("Copy XML Link"), 2000);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
           <div>
              <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1 leading-none italic">Elite Sourcing Engine</p>
           </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
        </header>

        {/* DASHBOARD: INTEL TOOLTIP */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-4 gap-6">
               {[
                { label: 'Net Savings', val: '$14.2k', color: 'text-rose-400', tip: 'Calculated by multiplying total viral clicks by the average market Cost-Per-Click ($1.50) for this region and role.' },
                { label: 'Click ROI', val: '32%', color: 'text-amber-400', tip: 'The percentage of viral clicks that converted into high-scoring (80%+) candidate profiles.' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px] group relative">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
                    {/* INFO BUTTON WITH HOVER MESSAGE */}
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[8px] font-black text-slate-500 cursor-help hover:border-indigo-500 hover:text-indigo-400">i</div>
                  </div>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                  
                  {/* TOOLTIP MESSAGE */}
                  <div className="absolute top-0 left-0 w-full p-6 bg-indigo-600 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 italic">Intelligence Insight</p>
                    <p className="text-[11px] font-bold leading-relaxed">{s.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOBS: CLICK-TO-COPY XML */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-4 text-white">{j.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{j.location}</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => copyToClipboard(j.xmlUrl)} 
                      className="px-8 py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-600 transition-all shadow-lg"
                    >
                      {copyStatus}
                    </button>
                    <button className="px-8 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Manage Pipeline</button>
                  </div>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}
