import React, { useState } from 'react';

// --- MAIN APPLICATION NODE ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Recruitment Engine State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Elite Data Repository
  const [jobs] = useState([
    { id: 101, title: "SENIOR ACCOUNTANT", dept: "Finance", health: 85, applicants: 42, clicks: 156 },
    { id: 102, title: "PRODUCT DESIGNER", dept: "Design", health: 45, applicants: 18, clicks: 89 },
    { id: 103, title: "OFFICE MANAGER", dept: "Operations", health: 92, applicants: 5, clicks: 34 }
  ]);

  const candidates = [
    { id: 1, name: "SARAH CHEN", role: "Senior Dev", score: "94%", status: "NEEDS REVIEW", time: "2h ago" },
    { id: 2, name: "MARCUS WRIGHT", role: "UX Designer", score: "88%", status: "INTERVIEWING", time: "5h ago" },
    { id: 3, name: "ELENA ROSSI", role: "Accountant", score: "91%", status: "NEW", time: "10m ago" }
  ];

  // Logic: Strategic AI Architect
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Target Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Improve 3 core administrative workflows.\n• Execution: Maintain a 100% accuracy rate on mission-critical projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F1A] text-white font-sans selection:bg-indigo-500/30">
      
      {/* ELITE SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-black italic text-xl">SIQ</span>
             </div>
             <h1 className="text-2xl font-[900] italic uppercase tracking-tighter leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-1 leading-none italic">Elite Sourcing Engine</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => {setActiveTab(tab); setSelectedCandidate(null);}}
              className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}
            >
              {tab}
              {tab === 'Candidates' && <span className="bg-rose-500 text-[10px] px-2 py-0.5 rounded-full text-white">3</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Node: SIQ-ULTIMATE-V1</span>
        </div>
      </nav>

      {/* COMMAND CENTER */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        
        {/* GLOBAL SEARCH HEADER */}
        <header className="mb-12 flex justify-between items-center gap-10">
          <div className="flex-1 relative group">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input 
              type="text"
              placeholder="GLOBAL SEARCH: CANDIDATES, JOBS, OR INTEL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] border border-slate-800 p-5 pl-14 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-4">
             <button onClick={() => setActiveTab('Post a Job')} className="px-8 py-5 bg-white text-black font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-all">New Requisition</button>
          </div>
        </header>

        {/* DASHBOARD: HIGH-DENSITY INTEL */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-700">
            {/* KPI MATRIX */}
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'Active Reqs', value: jobs.length, sub: 'All Nodes', color: 'text-indigo-400' },
                { label: 'Viral Reach', value: '1.2k', sub: '+18% Weekly', color: 'text-emerald-400' },
                { label: 'Avg Match', value: '82%', sub: 'Target: 85%', color: 'text-amber-400' },
                { label: 'Net Savings', value: '$14.2k', sub: 'vs Paid Ads', color: 'text-rose-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-sm hover:border-indigo-500/50 transition-all group">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic group-hover:text-white transition-colors">{stat.label}</p>
                  <p className={`text-4xl font-[900] italic leading-none mb-2 ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter leading-none">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* DATA GRID */}
            <div className="grid grid-cols-12 gap-10">
              
              {/* LIVE FEED */}
              <div className="col-span-7 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic px-2">Action Required</h3>
                {candidates.map((c) => (
                  <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-6 group hover:bg-[#1C2533] transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 group-hover:scale-110 transition-all shadow-inner">
                      {c.score.replace('%', '')}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-lg uppercase italic leading-none mb-1 group-hover:text-indigo-400 transition-colors">{c.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{c.role} • {c.time}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${c.status === 'NEEDS REVIEW' ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* REFERRAL ENGINE */}
              <div className="col-span-5 flex flex-col gap-10">
                <div className="bg-indigo-600 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 flex-1">
                   <div className="relative z-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-60 italic">Referral Multiplier</h4>
                    <p className="text-7xl font-[900] italic tracking-tighter leading-none mb-4">32%</p>
                    <p className="text-xs font-bold leading-relaxed opacity-90 mb-8 max-w-[240px]">of traffic is generated via magic links. Sourcing velocity is up 14% this month.</p>
                    <button onClick={() => setActiveTab('Jobs')} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all italic leading-none">Manage Links</button>
                   </div>
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-[40px] p-10">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic leading-none">Node Activity</h4>
                   <div className="space-y-4">
                      {['XML Feed Sync: Success', 'AI Generation: Strategic Blueprint Live', 'Google Index: 3 Roles Active'].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                          <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-tight italic">{log}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
             <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-slate-800/50 p-8 rounded-[32px] border-none font-[900] italic text-4xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner" 
                  placeholder="TARGET ROLE TITLE..." 
                />
                <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
                  {isGenerating ? "Architecting Talent Strategy..." : "✨ Generate Strategic JD"}
                </button>
                <div className="w-full min-h-[500px] p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto">
                  {description ? (
                    <div className="max-w-none">
                      {description.split('\n').map((line, i) => (
                        <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-400 mb-10 leading-none' : 'font-bold text-slate-500 leading-relaxed'}`}>{line}</p>
                      ))}
                    </div>
                  ) : <div className="h-full flex flex-col items-center justify-center space-y-4 py-20 opacity-20"><span className="text-6xl italic font-black">SIQ</span><p className="font-black uppercase tracking-[0.4em] text-xs">Architectural Portal Waiting</p></div>}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
