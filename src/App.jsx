import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Deep Midnight Mode) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Recruitment Engine State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 2. MASTER DATA REPOSITORY ---
  const [jobs] = useState([
    { id: 101, title: "Senior Accountant", dept: "Finance", applicants: 42, clicks: 156 },
    { id: 102, title: "Product Designer", dept: "Design", applicants: 18, clicks: 89 },
    { id: 103, title: "Office Manager", dept: "Operations", applicants: 5, clicks: 34 }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", status: "Needs Review", time: "2h ago", stage: "Screening" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", status: "Interviewing", time: "5h ago", stage: "Technical" },
    { id: 3, name: "Elena Rossi", role: "Accountant", score: "91%", status: "New", time: "10m ago", stage: "Sourced" }
  ];

  const stages = ["Sourced", "Screening", "Technical", "Final Loop"];

  // --- 3. CORE LOGIC ---
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Improve 3 core workflows.\n• Execution: Maintain a 100% accuracy rate on projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* PROFESSIONAL DARK SIDEBAR */}
      <nav className="w-64 bg-[#1E293B] border-r border-slate-800 p-6 fixed h-full flex flex-col shadow-2xl z-30">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-black italic text-sm">IQ</span>
             </div>
             <h1 className="text-xl font-[900] italic uppercase tracking-tighter leading-none text-white">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-11 leading-none italic">Sourcing & Tracking</p>
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-left p-3 px-5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
              {tab === 'Candidates' && <span className="bg-rose-500 text-[9px] px-2 py-0.5 rounded-full text-white font-black">3</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">SIQ-ACTIVE-NODE</span>
        </div>
      </nav>

      {/* COMMAND CENTER */}
      <main className="flex-1 ml-64 p-10 bg-[#0F172A]">
        
        {/* GLOBAL SEARCH HEADER */}
        <header className="mb-10 flex justify-between items-center gap-8">
          <div className="flex-1 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input 
              type="text" 
              placeholder="GLOBAL SEARCH: INTEL, JOBS, CANDIDATES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E293B] border border-slate-700 p-4 pl-12 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-white shadow-inner" 
            />
          </div>
          <button onClick={() => setActiveTab('Post a Job')} className="px-8 py-4 bg-white text-[#0F172A] font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">New Requisition</button>
        </header>

        {/* DASHBOARD: HIGH-DENSITY INTEL */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI MATRIX */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Live Roles', value: jobs.length, color: 'text-indigo-400' },
                { label: 'Viral Reach', value: '1.2k', color: 'text-emerald-400' },
                { label: 'Avg Fit', value: '82%', color: 'text-amber-400' },
                { label: 'Net Savings', value: '$14.2k', color: 'text-rose-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#1E293B] p-6 rounded-[32px] border border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all">
                  <p className="text-[10px] font-black text-slate-500 uppercase italic mb-1 leading-none">{s.label}</p>
                  <p className={`text-3xl font-[900] italic leading-none ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* PRIORITY FEED  */}
              <div className="col-span-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic px-2">Pipeline Priority</h3>
                {candidates.map((c) => (
                  <div key={c.id} className="bg-[#1E293B] border border-slate-800 p-5 rounded-[24px] flex items-center gap-6 group hover:border-indigo-500 transition-all cursor-pointer shadow-lg">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center text-lg font-[900] italic text-indigo-400 group-hover:scale-110 transition-all shadow-inner">
                      {c.score.replace('%', '')}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-base uppercase italic leading-none mb-1 group-hover:text-indigo-400 transition-colors text-white">{c.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.stage}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${c.status === 'Needs Review' ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* SOURCING MODULES */}
              <div className="col-span-4 space-y-6">
                <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-[40px] shadow-sm">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 italic leading-none">Referral Yield</h4>
                   <p className="text-6xl font-[900] italic tracking-tighter leading-none text-indigo-400 mb-2">32%</p>
                   <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase">Sourcing velocity up 14% via internal links.</p>
                   <button onClick={() => setActiveTab('Jobs')} className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all shadow-lg">Magic Links</button>
                </div>

                <div className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-inner">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6 italic leading-none">Activity Node</h4>
                   <div className="space-y-4">
                      {['XML Feed Sync: Success', 'AI Architect: Blueprint Live', 'Schema: 3 Roles Active'].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5"></div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{log}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST A JOB: STRATEGIC ARCHITECT */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-[#1E293B] p-10 rounded-[40px] border border-slate-800 shadow-2xl">
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-[#0F172A] p-6 rounded-[24px] border border-slate-700 font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white shadow-inner" 
                placeholder="TARGET ROLE TITLE..." 
              />
              <div className="flex justify-between items-center mb-10 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic leading-none">Strategic AI Architect</span>
                  </div>
                  <button onClick={generateStrategicAI} disabled={isGenerating} className="bg-indigo-600 text-white px-10 py-3 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
                    {isGenerating ? "Analyzing..." : "✨ Generate Strategic JD"}
                  </button>
              </div>
              <div className="w-full min-h-[400px] p-10 bg-[#0F172A] rounded-[32px] shadow-inner overflow-y-auto border border-slate-800">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-2xl font-[900] italic text-indigo-400 mb-8 leading-none' : 'font-bold text-slate-400 leading-relaxed'}`}>{line}</p>
                    ))}
                  </div>
                ) : <div className="h-full flex flex-col items-center justify-center py-20 opacity-20"><span className="text-6xl italic font-black text-white">SIQ</span></div>}
              </div>
            </div>
          </div>
        )}

        {/* PIPELINE VIEW  */}
        {activeTab === 'Candidates' && (
          <div className="grid grid-cols-4 gap-4 h-[70vh] animate-in fade-in">
            {stages.map(stage => (
              <div key={stage} className="flex flex-col gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic px-2">{stage}</h3>
                <div className="bg-[#111827] rounded-[32px] p-3 flex-1 border-2 border-dashed border-slate-800 overflow-y-auto shadow-inner">
                  {candidates.filter(c => c.stage === stage).map(c => (
                    <div key={c.id} className="bg-[#1E293B] p-5 rounded-[24px] shadow-lg mb-3 border border-slate-800 group hover:border-indigo-600 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xl font-[900] italic text-indigo-400 leading-none">{c.score.replace('%', '')}</span>
                      </div>
                      <p className="font-black text-sm uppercase italic leading-none mb-1 text-white">{c.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
