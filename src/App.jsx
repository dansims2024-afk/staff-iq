import React, { useState, useEffect } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & THEME ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingJob, setEditingJob] = useState(null); 
  
  // Posting State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 2. DATA STORE (Updated with Referral Tracking) ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, referralClicks: 156, status: "Active" },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, referralClicks: 89, status: "Active" }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", source: "Employee Referral", aiHits: ["Ex-Google Architecture Lead", "React Expert"] },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", source: "Google Jobs", aiHits: ["Figma Systems pro", "Accessibility specialist"] }
  ];

  // --- 3. LOGIC FUNCTIONS ---
  const copyReferralLink = (jobId) => {
    const link = `https://staff-iq.app/apply/${jobId}?ref=internal`;
    navigator.clipboard.writeText(link);
    alert("Magic Referral Link Copied! Share this with your team to track internal hires.");
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
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none italic">AI Sourcing & Tracking</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* DARK MODE TOGGLE [UI POLISH] */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`mt-auto p-4 rounded-2xl flex items-center justify-between border transition-all ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-white/10 bg-white/5'}`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{darkMode ? 'Lights On' : 'Go Dark'}</span>
          <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </nav>

      <main className="flex-1 ml-64 p-10">
        <header className={`mb-10 border-b pb-6 flex justify-between items-end uppercase ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <span className="text-[10px] font-black text-slate-400 tracking-widest italic">Node: SIQ-ULTIMATE-V1</span>
        </header>

        {/* 1. DASHBOARD WITH VIRAL STATS */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className={`p-8 rounded-[32px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Active Roles</p>
              <p className="text-4xl font-[900] italic text-indigo-600 leading-none">{jobs.length}</p>
            </div>
            <div className={`p-8 rounded-[32px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Referral Clicks</p>
              <p className="text-4xl font-[900] italic text-emerald-500 leading-none">245</p>
            </div>
            <div className={`p-8 rounded-[32px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Money Saved</p>
              <p className="text-4xl font-[900] italic text-amber-500 leading-none">$14.2k</p>
            </div>
          </div>
        )}

        {/* 2. JOBS WITH REFERRAL ENGINE  */}
        {activeTab === 'Jobs' && (
          <div className="space-y-4 animate-in fade-in">
            {jobs.map(j => (
              <div key={j.id} className={`p-8 rounded-[32px] border shadow-sm flex justify-between items-center group transition-all ${darkMode ? 'bg-[#1E293B] border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-100 hover:border-indigo-200'}`}>
                <div>
                  <h4 className="text-xl font-[900] italic uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{j.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{j.dept} • {j.referralClicks} Viral Clicks</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => copyReferralLink(j.id)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700">Magic Link 🔗</button>
                    <button onClick={() => setEditingJob(j)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase ${darkMode ? 'bg-slate-700 text-white' : 'bg-[#0F172A] text-white'}`}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4">
             <div className={`p-10 rounded-[40px] shadow-2xl border ${darkMode ? 'bg-[#1E293B] border-slate-700 text-white' : 'bg-white border-slate-100 text-[#0F172A]'}`}>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className={`w-full p-6 rounded-2xl border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-slate-800' : 'bg-slate-50 shadow-inner'}`}
                  placeholder="JOB TITLE..." 
                />
                <div className="flex justify-between items-center mb-6">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase hover:bg-indigo-700 shadow-xl">✨ Generate Strategic JD</button>
                </div>
                <div className={`w-full h-80 p-8 rounded-[32px] border-none text-sm leading-relaxed mb-8 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                   {description || "Generation portal ready..."}
                </div>
                <button className={`w-full py-6 rounded-2xl font-[900] italic uppercase text-sm tracking-widest shadow-xl transition-all ${darkMode ? 'bg-indigo-500' : 'bg-[#0F172A] text-white'}`}>Publish Project</button>
             </div>
          </div>
        )}

        {/* 4. ANALYTICS (Referral Leaderboard)  */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <div className={`p-10 rounded-[40px] border shadow-sm ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-100'}`}>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Top Internal Referrers</h4>
                  <div className="space-y-4">
                      {['Alex Rivera', 'Jordan Lee', 'Sam Smith'].map((name, i) => (
                          <div key={name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/50">
                              <span className="text-xs font-bold">{name}</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black">{12 - i} Hires</span>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-indigo-600 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                  <p className="text-6xl font-[900] italic leading-none tracking-tighter">$14,250</p>
                  <p className="text-[10px] font-black uppercase mt-4 opacity-60 italic">Ad Spend Efficiency Savings</p>
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
          </div>
        )}
      </main>
    </div>
  );
}
