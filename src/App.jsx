import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Command Center) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 2. SAMPLE DATA REPOSITORY ---
  const [jobs] = useState([
    { id: 101, title: "SENIOR ACCOUNTANT", dept: "Finance", health: 85, applicants: 42, clicks: 156, velocity: "High" },
    { id: 102, title: "PRODUCT DESIGNER", dept: "Design", health: 45, applicants: 18, clicks: 89, velocity: "Steady" },
    { id: 103, title: "OFFICE MANAGER", dept: "Operations", health: 92, applicants: 12, clicks: 210, velocity: "High" },
    { id: 104, title: "FRONT DESK ASSOCIATE", dept: "Operations", health: 70, applicants: 55, clicks: 402, velocity: "High" }
  ]);

  const [candidates] = useState([
    { id: 1, name: "SARAH CHEN", role: "Senior Dev", score: "94%", status: "NEEDS REVIEW", time: "2h ago", stage: "Screening", hit: "Ex-Google Architecture" },
    { id: 2, name: "MARCUS WRIGHT", role: "UX Designer", score: "88%", status: "INTERVIEWING", time: "5h ago", stage: "Technical", hit: "Figma Systems Pro" },
    { id: 3, name: "ELENA ROSSI", role: "Accountant", score: "91%", status: "NEW", time: "10m ago", stage: "Sourced", hit: "CPA / Audit Lead" },
    { id: 4, name: "DAVID PARK", role: "DevOps", score: "85%", status: "FINAL LOOP", time: "1d ago", stage: "Final Loop", hit: "Kubernetes Expert" },
    { id: 5, name: "JULIA VANCE", role: "Front Desk", score: "96%", status: "NEW", time: "4h ago", stage: "Sourced", hit: "Hospitality Veteran" }
  ]);

  const stages = ["Sourced", "Screening", "Technical", "Final Loop"];

  // --- 3. CORE LOGIC ---
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure that our high-velocity environment remains organized, efficient, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain 100% accuracy on mission-critical projects.`);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12">
          <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-2 leading-none italic">Elite Sourcing Engine</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none tracking-tight">SIQ Master Node: Active</span>
        </div>
      </nav>

      {/* MAIN COMMAND AREA */}
      <main className="flex-1 ml-72 p-12">
        
        {/* TOP HEADER: BRAND LOGO RESTORED TO TOP RIGHT */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest italic">Intelligence Synchronization Active</p>
          </div>
          <div className="bg-[#111827] p-2 rounded-xl border border-slate-800 shadow-lg">
            <img src="/logo.png" alt="Staff-IQ Logo" className="w-10 h-10 object-contain" />
          </div>
        </header>

        {/* DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* KPI Metrics */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Viral Reach', val: '1.2k', color: 'text-emerald-400' },
                { label: 'Net Savings', val: '$14.2k', color: 'text-rose-400' },
                { label: 'Speed to Hire', val: '58m', color: 'text-indigo-400' },
                { label: 'Click ROI', val: '32%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px] relative overflow-hidden group">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                  <div className={`absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-5 group-hover:opacity-10 transition-all ${s.color.replace('text', 'bg')}`}></div>
                </div>
              ))}
            </div>

            {/* Intelligence Grid */}
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic px-2">Priority: Intelligence Feed</h3>
                {candidates.slice(0, 3).map((c) => (
                  <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-6 group hover:border-indigo-500 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 shadow-inner">{c.score.replace('%', '')}</div>
                    <div className="flex-1">
                      <p className="font-black text-lg uppercase italic leading-none mb-1 text-white group-hover:text-indigo-400 transition-colors">{c.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.hit}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${c.status === 'NEEDS REVIEW' ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'}`}>{c.status}</span>
                  </div>
                ))}
              </div>

              {/* Automation Side Column */}
              <div className="col-span-4 space-y-8">
                <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic leading-none">Syndication Status</h4>
                   <div className="space-y-4 text-[10px] font-black uppercase relative z-10">
                      <div className="flex justify-between items-center"><span>Google Jobs</span><span className="text-emerald-300 italic animate-pulse">Indexed</span></div>
                      <div className="flex justify-between items-center"><span>XML Global Sync</span><span className="text-emerald-300 italic">Live</span></div>
                      <div className="flex justify-between items-center"><span>LinkedIn Hub</span><span className="opacity-40">Ready</span></div>
                   </div>
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATES VIEW (PIPELINE) */}
        {activeTab === 'Candidates' && (
          <div className="grid grid-cols-4 gap-6 animate-in fade-in h-[75vh]">
            {stages.map(stage => (
              <div key={stage} className="flex flex-col gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic px-4 leading-none">{stage}</h3>
                <div className="bg-[#111827] rounded-[40px] p-4 flex-1 border border-slate-800 shadow-inner overflow-y-auto space-y-4">
                  {candidates.filter(c => c.stage === stage).map(c => (
                    <div key={c.id} className="bg-[#1C2533] p-6 rounded-[32px] border border-slate-700 shadow-lg group hover:border-indigo-500 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-2xl font-[900] italic text-indigo-400">{c.score.replace('%', '')}</span>
                      </div>
                      <p className="font-black text-sm uppercase italic leading-none mb-1">{c.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4">
             <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-slate-800/50 p-8 rounded-[32px] border-none font-[900] italic text-4xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white shadow-inner" 
                  placeholder="TARGET ROLE TITLE..." 
                />
                <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">{isGenerating ? "Analyzing..." : "✨ Generate Strategic JD"}</button>
                <div className="w-full min-h-[500px] p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto">
                   {description ? <p className="text-sm font-bold text-slate-400 leading-relaxed whitespace-pre-wrap">{description}</p> : <div className="h-full flex items-center justify-center opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
