import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Deep Midnight Mode) ---
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Recruitment Engine State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

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
      // Expanded JD Content
      const expandedJD = `MISSION: ${title.toUpperCase()}

THE IMPACT
Join Staff-IQ, the platform redefining recruitment. As our ${title}, you will ensure that our high-velocity environment remains organized, efficient, and infinitely scalable. You are not just a worker; you are an architect of our growth.

90-DAY SUCCESS METRICS
• Optimization: Audit and improve at least 3 core workflows within your first quarter.
• Execution: Maintain a 100% accuracy rate on high-priority mission-critical tasks.
• Integration: Establish a seamless communication loop between your department and leadership.

THE ARCHETYPE
• High-Velocity Execution: You anticipate needs before they arise and move with intentional speed.
• Strategic Mindset: You solve problems at the root, not the symptom.
• Elite Communication: You translate complexity into clarity for all stakeholders.
• Technical Literacy: You leverage AI tools and data to multiply your output.

PERKS & LOGISTICS
• Remote-First: Work from anywhere with a high-speed node.
• Equity: Own a piece of the platform you are building.
• Growth: Clear pathway to leadership roles as the node expands.`;
      
      setDescription(expandedJD);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePublish = (platform) => {
    setIsPublished(true);
    alert(`Syncing Node: ${title} is now being indexed on ${platform}.`);
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
              className={`text-left p-3 px-5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
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
        <header className="mb-10 flex justify-between items-center gap-8 text-white">
          <div className="flex-1 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input 
              type="text" 
              placeholder="GLOBAL SEARCH: INTEL, JOBS, CANDIDATES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E293B] border border-slate-700 p-4 pl-12 rounded-2xl text-[10px] font-black tracking-widest uppercase outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-white" 
            />
          </div>
        </header>

        {/* POST A JOB: STRATEGIC ARCHITECT */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
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
                    {isGenerating ? "Analyzing Talent Markets..." : "✨ Generate Strategic JD"}
                  </button>
              </div>

              {/* JD RENDERER */}
              <div className="w-full min-h-[500px] p-12 bg-[#0F172A] rounded-[40px] shadow-inner overflow-y-auto border border-slate-800 mb-10">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-400 mb-8 leading-none' : 'font-bold text-slate-400 leading-relaxed'}`}>{line}</p>
                    ))}
                  </div>
                ) : <div className="h-full flex flex-col items-center justify-center py-20 opacity-20"><span className="text-6xl italic font-black text-white">SIQ</span></div>}
              </div>

              {/* DISTRIBUTION BUTTONS */}
              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-800">
                  <button 
                    onClick={() => handlePublish('Google Jobs')} 
                    className="py-6 bg-white text-[#0F172A] rounded-2xl font-[900] italic uppercase text-sm tracking-widest hover:scale-[1.02] transition-all shadow-xl"
                  >
                      Publish to Google Jobs
                  </button>
                  <button 
                    onClick={() => handlePublish('Universal XML Feed')} 
                    className="py-6 bg-transparent border-2 border-indigo-500 text-indigo-500 rounded-2xl font-[900] italic uppercase text-sm tracking-widest hover:bg-indigo-500/10 transition-all"
                  >
                      Sync Universal XML Feed
                  </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-4 gap-6 animate-in fade-in duration-500">
            {[
              { label: 'Live Roles', value: jobs.length, color: 'text-indigo-400' },
              { label: 'Viral Reach', value: '1.2k', color: 'text-emerald-400' },
              { label: 'Avg Fit', value: '82%', color: 'text-amber-400' },
              { label: 'Net Savings', value: '$14.2k', color: 'text-rose-400' }
            ].map((s, i) => (
              <div key={i} className="bg-[#1E293B] p-6 rounded-[32px] border border-slate-800 shadow-sm">
                <p className="text-[10px] font-black text-slate-500 uppercase italic mb-1 leading-none">{s.label}</p>
                <p className={`text-3xl font-[900] italic leading-none ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
