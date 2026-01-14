import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & NAVIGATION ---
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

  const [candidates, setCandidates] = useState([
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", stage: "Screening", time: "2h ago" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", stage: "Technical", time: "5h ago" },
    { id: 3, name: "Elena Rossi", role: "Accountant", score: "91%", stage: "Sourced", time: "10m ago" },
    { id: 4, name: "David Park", role: "DevOps", score: "85%", stage: "Final Loop", time: "1d ago" }
  ]);

  const stages = ["Sourced", "Screening", "Technical", "Final Loop"];

  // --- 3. CORE LOGIC ---
  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Improve 3 core workflows.\n• Execution: 100% accuracy on mission-critical projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  const moveCandidate = (id, direction) => {
    setCandidates(candidates.map(c => {
      if (c.id === id) {
        const currentIndex = stages.indexOf(c.stage);
        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < stages.length) {
          return { ...c, stage: stages[nextIndex] };
        }
      }
      return c;
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* PROFESSIONAL SIDEBAR */}
      <nav className="w-64 bg-white border-r border-slate-200 p-6 fixed h-full flex flex-col shadow-sm z-30">
        <div className="mb-10">
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
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>{tab}</button>
          ))}
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
              placeholder="GLOBAL SEARCH: INTEL, JOBS, CANDIDATES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-600 transition-all placeholder:text-slate-300" 
            />
          </div>
          <button onClick={() => setActiveTab('Post a Job')} className="px-8 py-4 bg-[#0F172A] text-white font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">New Requisition</button>
        </header>

        {/* DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-4 gap-6 animate-in fade-in duration-500">
             {[
               { label: 'Active Roles', value: jobs.length, color: 'text-indigo-600' },
               { label: 'Viral Reach', value: '1.2k', color: 'text-emerald-500' },
               { label: 'Avg Fit', value: '82%', color: 'text-amber-500' },
               { label: 'Net Savings', value: '$14k', color: 'text-rose-500' }
             ].map((s, i) => (
               <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                 <p className="text-[10px] font-black text-slate-400 uppercase italic mb-1">{s.label}</p>
                 <p className={`text-3xl font-[900] italic ${s.color}`}>{s.value}</p>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATE PIPELINE: DRAG-AND-DROP FLOW  */}
        {activeTab === 'Candidates' && (
          <div className="grid grid-cols-4 gap-4 h-[70vh] animate-in fade-in">
            {stages.map(stage => (
              <div key={stage} className="flex flex-col gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic px-2">{stage}</h3>
                <div className="bg-slate-100/50 rounded-[32px] p-3 flex-1 border-2 border-dashed border-slate-200 overflow-y-auto">
                  {candidates.filter(c => c.stage === stage).map(c => (
                    <div key={c.id} className="bg-white p-5 rounded-[24px] shadow-sm mb-3 border border-slate-100 group hover:border-indigo-600 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xl font-[900] italic text-indigo-600 leading-none">{c.score.replace('%', '')}</span>
                        <div className="flex gap-1">
                          <button onClick={() => moveCandidate(c.id, -1)} className="p-1 text-slate-300 hover:text-indigo-600">←</button>
                          <button onClick={() => moveCandidate(c.id, 1)} className="p-1 text-slate-300 hover:text-indigo-600">→</button>
                        </div>
                      </div>
                      <p className="font-black text-sm uppercase italic leading-none mb-1">{c.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 p-6 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-600" placeholder="TARGET ROLE..." />
              <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl">
                {isGenerating ? "Analyzing..." : "✨ Generate Strategic JD"}
              </button>
              <div className="w-full min-h-[400px] p-10 bg-slate-50 rounded-[32px] shadow-inner overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-2xl font-[900] italic text-indigo-600 mb-8' : 'font-bold text-slate-500'}`}>{line}</p>
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
