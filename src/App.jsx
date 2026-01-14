import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & THEME ---
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [darkMode, setDarkMode] = useState(false);
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

  // Restoration of the Strategic Generator
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

  const copyReferralLink = (jobId) => {
    navigator.clipboard.writeText(`https://staff-iq.app/apply/${jobId}?ref=internal`);
    alert("Magic Referral Link Copied!");
  };

  const deleteProject = (id) => {
    if(window.confirm("Delete this project?")) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      
      {/* SIDEBAR */}
      <nav className={`w-64 p-6 fixed h-full flex flex-col shadow-2xl z-30 transition-colors ${darkMode ? 'bg-[#1E293B] border-r border-slate-700' : 'bg-[#0F172A] text-white'}`}>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ" className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none italic leading-none">AI Sourcing & Tracking</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className={`mt-auto p-4 rounded-2xl flex items-center justify-between border transition-all ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-white/10 bg-white/5'}`}>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{darkMode ? 'Lights On' : 'Go Dark'}</span>
          <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </nav>

      <main className="flex-1 ml-64 p-10">
        <header className={`mb-10 border-b pb-6 flex justify-between items-end uppercase ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <span className="text-[10px] font-black text-slate-400 tracking-widest italic">Node: SIQ-MASTER-V1</span>
        </header>

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className={`p-8 rounded-[32px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Active Roles</p>
              <p className="text-4xl font-[900] italic text-indigo-600 leading-none">{jobs.length}</p>
            </div>
            <div className={`p-8 rounded-[32px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Total Hires</p>
              <p className="text-4xl font-[900] italic text-emerald-500 leading-none">24</p>
            </div>
          </div>
        )}

        {/* 2. JOBS (RESTORATION) */}
        {activeTab === 'Jobs' && (
          <div className="space-y-4 animate-in fade-in">
            {jobs.map(j => (
              <div key={j.id} className={`p-8 rounded-[32px] border shadow-sm flex justify-between items-center group transition-all ${darkMode ? 'bg-[#1E293B] border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-100 hover:border-indigo-200'}`}>
                <div>
                  <h4 className="text-xl font-[900] italic uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{j.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{j.dept} • {j.referralClicks} Viral Clicks</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => copyReferralLink(j.id)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700">Magic Link 🔗</button>
                    <button onClick={() => deleteProject(j.id)} className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase ${darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-100 text-slate-300'}`}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB (RESTORATION) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className={`p-10 rounded-[40px] shadow-xl border ${darkMode ? 'bg-[#1E293B] border-slate-700 text-white' : 'bg-white border-slate-100'}`}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={`w-full p-6 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-slate-800' : 'bg-slate-50 shadow-inner'}`} placeholder="JOB TITLE..." />
              
              <div className="flex justify-between items-center px-2 mb-6">
                 <button onClick={generateStrategicAI} disabled={isGenerating} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase hover:bg-indigo-700 shadow-lg">
                    {isGenerating ? "Architecting..." : "✨ Generate Strategic JD"}
                 </button>
              </div>

              <div className={`w-full min-h-[400px] p-12 rounded-[40px] border-none shadow-inner mb-8 overflow-y-auto ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-2 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-600 mb-8' : 'font-bold text-slate-500'}`}>{line}</p>
                    ))}
                  </div>
                ) : <p className="text-slate-300 font-bold uppercase italic text-center py-20">Waiting for AI Blueprint...</p>}
              </div>

              {socialSnippet && (
                <div className={`mb-8 p-6 rounded-3xl border border-dashed animate-in fade-in ${darkMode ? 'bg-indigo-900/20 border-indigo-500' : 'bg-indigo-50 border-indigo-100'}`}>
                    <p className="text-[10px] font-black text-indigo-600 uppercase mb-3 italic leading-none">Social Snippet Preview</p>
                    <p className={`text-xs font-bold italic leading-relaxed ${darkMode ? 'text-indigo-200' : 'text-slate-600'}`}>{socialSnippet}</p>
                </div>
              )}

              <button className={`w-full py-6 rounded-2xl font-[900] italic uppercase text-sm shadow-xl transition-all ${darkMode ? 'bg-indigo-500' : 'bg-[#0F172A] text-white'}`}>Publish Project</button>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES & 5. ANALYTICS (RESTORATION) */}
        {activeTab === 'Candidates' && (
            <div className={`rounded-[32px] shadow-sm border overflow-hidden animate-in fade-in ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
                <table className="w-full text-left">
                    <thead><tr className={`text-[10px] font-black uppercase tracking-widest border-b italic ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><th className="p-8">Candidate Profile</th><th className="p-8 text-center">AI Score</th><th className="p-8">Action</th></tr></thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-slate-700' : 'divide-slate-100'}`}>
                        {candidates.map(c => (
                            <tr key={c.id}><td className="p-8"><p className="font-black text-lg leading-none mb-1">{c.name}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{c.role}</p></td><td className="p-8 text-center"><span className="text-3xl font-[900] italic text-indigo-600 leading-none">{c.score}</span></td><td className="p-8"><button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Evaluate</button></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </main>
    </div>
  );
}
