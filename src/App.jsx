import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (High-Clarity Light Mode) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Recruitment Engine State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Elite Data Repository
  const [jobs] = useState([
    { id: 101, title: "Senior Accountant", dept: "Finance", applicants: 42, clicks: 156 },
    { id: 102, title: "Product Designer", dept: "Design", applicants: 18, clicks: 89 },
    { id: 103, title: "Office Manager", dept: "Operations", applicants: 5, clicks: 34 }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", status: "Needs Review", time: "2h ago" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", status: "Interviewing", time: "5h ago" },
    { id: 3, name: "Elena Rossi", role: "Accountant", score: "91%", status: "New", time: "10m ago" }
  ];

  // Logic: Strategic AI Architect
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Improve 3 core administrative workflows.\n• Execution: Maintain a 100% accuracy rate on mission-critical projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-indigo-100">
      
      {/* PROFESSIONAL SIDEBAR */}
      <nav className="w-64 bg-white border-r border-slate-200 p-6 fixed h-full flex flex-col shadow-sm z-30">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-black italic text-sm">IQ</span>
             </div>
             <h1 className="text-xl font-[900] italic uppercase tracking-tighter leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-11 leading-none italic">Sourcing & Tracking</p>
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => {setActiveTab(tab); setSelectedCandidate(null);}}
              className={`text-left p-3 px-5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab}
              {tab === 'Candidates' && <span className="bg-rose-500 text-[10px] px-2 py-0.5 rounded-full text-white">3</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SIQ-Active-Node</span>
        </div>
      </nav>

      {/* COMMAND CENTER */}
      <main className="flex-1 ml-64 p-10">
        
        {/* GLOBAL SEARCH HEADER */}
        <header className="mb-10 flex justify-between items-center gap-8">
          <div className="flex-1 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text"
              placeholder="SEARCH CANDIDATES OR JOBS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-600 transition-all placeholder:text-slate-300 shadow-sm"
            />
          </div>
          <button onClick={() => setActiveTab('Post a Job')} className="px-8 py-4 bg-indigo-600 text-white font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">New Requisition</button>
        </header>

        {/* DASHBOARD: HIGH-DENSITY INTEL */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI MATRIX */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Active Roles', value: jobs.length, sub: 'Live Requisitions', color: 'text-indigo-600' },
                { label: 'Viral Reach', value: '1.2k', sub: '+18% This Week', color: 'text-emerald-500' },
                { label: 'Avg Fit Score', value: '82%', sub: 'Target: 85%', color: 'text-amber-500' },
                { label: 'Net Savings', value: '$14.2k', sub: 'vs Paid Boards', color: 'text-rose-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm hover:border-indigo-200 transition-all">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                  <p className={`text-3xl font-[900] italic leading-none mb-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* ACTION GRID */}
            <div className="grid grid-cols-12 gap-8">
              
              {/* CANDIDATE FEED */}
              <div className="col-span-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic px-2">High-Priority Candidates</h3>
                {candidates.map((c) => (
                  <div key={c.id} className="bg-white border border-slate-100 p-5 rounded-[24px] flex items-center gap-6 group hover:border-indigo-600 transition-all cursor-pointer shadow-sm">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-lg font-[900] italic text-indigo-600 group-hover:scale-110 transition-all">
                      {c.score.replace('%', '')}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-base uppercase italic leading-none mb-1 group-hover:text-indigo-600 transition-colors">{c.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.role} • {c.time}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${c.status === 'Needs Review' ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-600'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* SOURCING INTEL */}
              <div className="col-span-4 space-y-8">
                <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic leading-none">Referral Efficiency</h4>
                   <p className="text-6xl font-[900] italic tracking-tighter leading-none text-indigo-600 mb-2">32%</p>
                   <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">Current traffic via magic links. Sourcing velocity is up 14% this month.</p>
                   <button onClick={() => setActiveTab('Jobs')} className="mt-6 w-full py-3 bg-[#0F172A] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all">Manage Links</button>
                </div>

                <div className="bg-[#0F172A] p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 italic leading-none">Activity Node</h4>
                   <div className="space-y-4 relative z-10">
                      {['XML Feed: Jooble Success', 'AI Architect: Blueprint Live', 'Index: 3 Roles Active'].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5"></div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{log}</p>
                        </div>
                      ))}
                   </div>
                   <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST A JOB: STRATEGIC ARCHITECT */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl">
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-slate-50 p-6 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" 
                placeholder="TARGET ROLE TITLE..." 
              />
              <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl">
                {isGenerating ? "Analyzing..." : "✨ Generate Strategic JD"}
              </button>
              <div className="w-full min-h-[400px] p-10 bg-slate-50 rounded-[32px] shadow-inner overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-2xl font-[900] italic text-indigo-600 mb-8' : 'font-bold text-slate-500 leading-relaxed'}`}>{line}</p>
                    ))}
                  </div>
                ) : <div className="h-full flex flex-col items-center justify-center py-20 opacity-20"><span className="text-6xl italic font-black">SIQ</span><p className="font-black uppercase tracking-[0.4em] text-xs">Architectural Portal Waiting</p></div>}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
