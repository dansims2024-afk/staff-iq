import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Defaulted to Dark Mode) ---
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Posting / Generator State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [socialSnippet, setSocialSnippet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 2. MASTER DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, referralClicks: 156, status: "Active" },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, referralClicks: 89, status: "Active" }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", source: "Employee Referral", aiHits: ["Ex-Google Architecture Lead", "React Expert"] },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", source: "Google Jobs", aiHits: ["Figma Systems pro", "Accessibility specialist"] }
  ];

  // --- 3. CORE LOGIC FUNCTIONS ---
  const generateStrategicAI = () => {
    if (!title) return alert("Please enter a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      const eliteJD = `MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ, the platform redefining recruitment. As our ${title}, you will ensure our high-velocity environment remains organized, efficient, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain a 100% accuracy rate on mission-critical tasks.\n\nTHE ARCHETYPE\n• High-Velocity Execution: You anticipate needs before they arise.\n• Strategic Mindset: You solve problems at the root.`;
      
      const snippet = `🚀 WE ARE HIRING: ${title.toUpperCase()} @ Staff-IQ\n\nWe're looking for an elite catalyst to join our remote-first team. Apply here: https://staff-iq.app/careers`;
      
      setDescription(eliteJD);
      setSocialSnippet(snippet);
      setIsGenerating(false);
    }, 1500);
  };

  const deleteProject = (id) => {
    if(window.confirm("Delete this project?")) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  return (
    // Hardcoded Dark Mode Container
    <div className="flex min-h-screen font-sans bg-[#0F172A] text-white">
      
      {/* SIDEBAR (Dark Mode Fixed) */}
      <nav className="w-64 p-6 fixed h-full flex flex-col shadow-2xl z-30 bg-[#1E293B] border-r border-slate-700">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ" className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none italic">AI Sourcing & Tracking</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        {/* Toggle button removed as requested */}
      </nav>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end uppercase">
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <span className="text-[10px] font-black text-slate-400 tracking-widest italic leading-none">Node: SIQ-DARK-MASTER</span>
        </header>

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Active Roles</p>
              <p className="text-4xl font-[900] italic text-indigo-400 leading-none">{jobs.length}</p>
            </div>
            <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Viral Reach</p>
              <p className="text-4xl font-[900] italic text-emerald-400 leading-none">1.2k</p>
            </div>
          </div>
        )}

        {/* 2. JOBS */}
        {activeTab === 'Jobs' && (
          <div className="space-y-4 animate-in fade-in">
            {jobs.map(j => (
              <div key={j.id} className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] flex justify-between items-center group transition-all hover:border-indigo-500">
                <div>
                  <h4 className="text-xl font-[900] italic uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{j.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{j.dept} • {j.referralClicks} Viral Clicks</p>
                </div>
                <button onClick={() => deleteProject(j.id)} className="px-4 py-2 border border-slate-700 text-slate-500 rounded-xl text-[10px] font-black uppercase hover:text-rose-500 transition-all">✕</button>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="p-10 rounded-[40px] shadow-xl border border-slate-700 bg-[#1E293B]">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-6 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800" placeholder="JOB TITLE..." />
              
              <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-8 bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase hover:bg-indigo-700 shadow-lg">
                {isGenerating ? "Architecting..." : "✨ Generate Strategic JD"}
              </button>

              <div className="w-full min-h-[400px] p-12 rounded-[40px] bg-slate-800 shadow-inner mb-8 overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-2 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-400 mb-8' : 'font-bold text-slate-400'}`}>{line}</p>
                    ))}
                  </div>
                ) : <p className="text-slate-600 font-bold uppercase italic text-center py-20">System ready for generation...</p>}
              </div>

              {socialSnippet && (
                <div className="mb-8 p-6 rounded-3xl border border-dashed bg-indigo-900/20 border-indigo-500 animate-in fade-in">
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-3 italic">Social Snippet Preview</p>
                    <p className="text-xs font-bold italic text-indigo-200 leading-relaxed">{socialSnippet}</p>
                </div>
              )}

              <button className="w-full py-6 rounded-2xl font-[900] italic uppercase text-sm shadow-xl bg-indigo-500 hover:bg-indigo-600 transition-all">Publish Project</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
