import React, { useState } from 'react';

// --- STAFF-IQ COMMAND CENTER NODE ---
export default function App() {
  // --- 1. GLOBAL STATE (Permanent Dark Mode) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Recruitment Engine State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // --- 2. ELITE DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "SENIOR ACCOUNTANT", dept: "Finance", health: 85, applicants: 42, clicks: 156 },
    { id: 102, title: "PRODUCT DESIGNER", dept: "Design", health: 45, applicants: 18, clicks: 89 },
    { id: 103, title: "OFFICE MANAGER", dept: "Operations", health: 92, applicants: 5, clicks: 34 }
  ]);

  const candidates = [
    { id: 1, name: "SARAH CHEN", role: "Senior Dev", score: "94%", status: "Needs Review", time: "2h ago", pipeline: "Screening" },
    { id: 2, name: "MARCUS WRIGHT", role: "UX Designer", score: "88%", status: "Interviewing", time: "5h ago", pipeline: "Technical" },
    { id: 3, name: "ELENA ROSSI", role: "Accountant", score: "91%", status: "New", time: "10m ago", pipeline: "Sourced" }
  ];

  // --- 3. CORE LOGIC FUNCTIONS ---
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Target Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain a 100% accuracy rate on mission-critical projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* PROFESSIONAL SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col shadow-2xl z-30 bg-[#111827] border-r border-slate-800">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-black italic text-xl text-white">SIQ</span>
             </div>
             <h1 className="text-2xl font-[900] italic uppercase tracking-tighter leading-none text-white">Staff-IQ</h1>
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-1 leading-none italic">Elite Sourcing Engine</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node: SIQ-ULTIMATE-V1</span>
        </div>
      </nav>

      {/* COMMAND CENTER */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        
        {/* GLOBAL SEARCH HEADER */}
        <header className="mb-12 flex justify-between items-center gap-10">
          <div className="flex-1 relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input type="text" placeholder="GLOBAL SEARCH: INTEL, JOBS, CANDIDATES..." className="w-full bg-[#111827] border border-slate-800 p-5 pl-14 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-white" />
          </div>
          <button onClick={() => setActiveTab('Post a Job')} className="px-8 py-5 bg-white text-black font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-all">New Requisition</button>
        </header>

        {/* 1. DASHBOARD: THE LIVE COMMAND CENTER */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* KPI Matrix */}
            <div className="grid grid-cols-4 gap-8">
              <div className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-sm">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">Viral Reach</p>
                <p className="text-4xl font-[900] italic text-emerald-400 leading-none">1.2k</p>
                <p className="text-[9px] font-black text-emerald-500/50 uppercase mt-4">↑ 18% Weekly</p>
              </div>
              <div className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-sm">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">Net Ad Savings</p>
                <p className="text-4xl font-[900] italic text-rose-400 leading-none">$14.2k</p>
                <p className="text-[9px] font-black text-rose-400/50 uppercase mt-4">vs Paid Search</p>
              </div>
              <div className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-sm">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">Speed to Hire</p>
                <p className="text-4xl font-[900] italic text-indigo-400 leading-none">58m</p>
                <p className="text-[9px] font-black text-indigo-400/50 uppercase mt-4">Avg. Publish to Eval</p>
              </div>
              <div className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-sm">
                <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">Magic Click ROI</p>
                <p className="text-4xl font-[900] italic text-amber-400 leading-none">32%</p>
                <p className="text-[9px] font-black text-amber-400/50 uppercase mt-4">Referral Multiplier</p>
              </div>
            </div>

            {/* Sourcing Intel Grid */}
            <div className="grid grid-cols-12 gap-10">
              {/* Left: Actionable Candidate Feed */}
              <div className="col-span-8 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic px-2">Action Required: Pipeline Intel</h3>
                {candidates.map((c) => (
                  <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-6 group hover:bg-[#1C2533] transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 group-hover:scale-110 transition-all shadow-inner">{c.score.replace('%', '')}</div>
                    <div className="flex-1">
                      <p className="font-black text-lg uppercase italic leading-none mb-1 group-hover:text-indigo-400 transition-colors">{c.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">AI Redline: Match</p>
                      <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${c.status === 'NEEDS REVIEW' ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'}`}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Syndication & Activity */}
              <div className="col-span-4 space-y-8">
                <div className="bg-indigo-600 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                   <div className="relative z-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-60 italic">Active Syndication</h4>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>Google Jobs</span><span className="text-emerald-300 animate-pulse italic">Indexed</span></div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>XML Feed Sync</span><span className="text-emerald-300 italic">Live</span></div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase"><span>LinkedIn Loop</span><span className="opacity-40">Ready</span></div>
                    </div>
                    <button onClick={() => setActiveTab('Jobs')} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-[900] uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Manage Nodes</button>
                   </div>
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-[40px] p-10">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic leading-none">System Activity Log</h4>
                   <div className="space-y-4">
                      {['XML Feed Sync with Jooble Successful', 'AI Generated Strategic Blueprint Live', 'Google Indexing Verified for 3 Roles'].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                          <p className="text-[10px] font-bold text-slate-400 leading-tight tracking-tight italic uppercase">{log}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. POST A JOB: STRATEGIC ARCHITECT */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800/50 p-8 rounded-[32px] border-none font-[900] italic text-4xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white" placeholder="TARGET ROLE TITLE..." />
              <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
                {isGenerating ? "Analyzing Talent Markets..." : "✨ Generate Strategic JD"}
              </button>
              <div className="w-full min-h-[500px] p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-400 mb-10 leading-none' : 'font-bold text-slate-500 leading-relaxed'}`}>{line}</p>
                    ))}
                  </div>
                ) : <div className="h-full flex flex-col items-center justify-center py-20 opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
