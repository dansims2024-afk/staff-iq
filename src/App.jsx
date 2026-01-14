import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Permanent Dark Mode) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  
  // Posting / Generator State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [socialSnippet, setSocialSnippet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // --- 2. MASTER DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "SENIOR SOFTWARE ENGINEER", dept: "Engineering", location: "Remote", applicants: 42, referralClicks: 156, status: "Active" },
    { id: 102, title: "PRODUCT DESIGNER", dept: "Design", location: "New York", applicants: 18, referralClicks: 89, status: "Active" },
    { id: 103, title: "OFFICE MANAGER", dept: "Operations", location: "Austin", applicants: 5, referralClicks: 34, status: "Active" }
  ]);

  const [candidates, setCandidates] = useState([
    { 
      id: 1, name: "SARAH CHEN", role: "Senior Dev", score: "94%", source: "Employee Referral",
      aiHits: ["5+ years React/Node.js expert", "Ex-Google Architecture Lead", "Led team of 10+ engineers"],
      analysis: { summary: "Elite candidate. Matches 98% of technical requirements.", pros: ["Top-tier experience", "Architecture focus"], cons: ["High salary range"], rec: "Strong Hire" }
    },
    { 
      id: 2, name: "MARCUS WRIGHT", role: "UX Designer", score: "88%", source: "Google Jobs",
      aiHits: ["Figma Systems pro", "Accessibility specialist", "B2B SaaS background"],
      analysis: { summary: "Strong visual skills. Lacks deep mobile experience.", pros: ["Accessibility focus", "System design"], cons: ["Limited native mobile"], rec: "Interview" }
    }
  ]);

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

  const copyReferralLink = (jobId) => {
    navigator.clipboard.writeText(`https://staff-iq.app/apply/${jobId}?ref=internal`);
    alert("Magic Referral Link Copied!");
  };

  const deleteProject = (id) => {
    if(window.confirm("Delete this project from all nodes?")) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0F172A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-64 p-6 fixed h-full flex flex-col shadow-2xl z-30 bg-[#1E293B] border-r border-slate-800">
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
              onClick={() => {setActiveTab(tab); setSelectedCandidate(null);}}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end uppercase">
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 italic">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            NODE: SIQ-DARK-MASTER
          </div>
        </header>

        {/* 1. DASHBOARD: SOURCING COMMAND CENTER */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Metric Row */}
            <div className="grid grid-cols-4 gap-6">
              <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Active Roles</p>
                <p className="text-4xl font-[900] italic text-indigo-400 leading-none">{jobs.length}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Viral Reach</p>
                <p className="text-4xl font-[900] italic text-emerald-400 leading-none">1.2k</p>
              </div>
              <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Avg Fit Score</p>
                <p className="text-4xl font-[900] italic text-amber-400 leading-none">82%</p>
              </div>
              <div className="p-8 rounded-[32px] border border-slate-700 bg-[#1E293B] shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Money Saved</p>
                <p className="text-4xl font-[900] italic text-rose-400 leading-none">$14k</p>
              </div>
            </div>

            {/* Action Row */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#1E293B] border border-slate-700 rounded-[40px] p-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-500 italic leading-none">Top Candidate Leads</h4>
                <div className="space-y-4">
                  {candidates.map(c => (
                    <div key={c.id} onClick={() => {setActiveTab('Candidates'); setSelectedCandidate(c);}} className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer">
                      <div>
                        <p className="font-black text-sm uppercase italic">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">{c.role}</p>
                      </div>
                      <span className="text-xl font-[900] italic text-indigo-400">{c.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-60 italic leading-none">Internal Viral Reach</h4>
                <div className="space-y-4 relative z-10">
                  <p className="text-5xl font-[900] italic tracking-tighter leading-none">32%</p>
                  <p className="text-xs font-bold opacity-80 leading-relaxed">of current traffic is generated via employee Magic Links. This reduces dependency on paid boards by 40%.</p>
                  <button onClick={() => setActiveTab('Jobs')} className="mt-4 px-6 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Manage Referral Links</button>
                </div>
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
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
                <div className="flex gap-4">
                    <button onClick={() => copyReferralLink(j.id)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700">Magic Link 🔗</button>
                    <button onClick={() => deleteProject(j.id)} className="px-4 py-2 border border-slate-700 text-slate-500 rounded-xl text-[10px] font-black uppercase hover:text-rose-500 transition-all">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="p-10 rounded-[40px] shadow-xl border border-slate-700 bg-[#1E293B]">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-6 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 shadow-inner" placeholder="JOB TITLE (E.G. OFFICE MANAGER)" />
              
              <div className="flex justify-between items-center px-2 mb-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Strategic AI Architect</span>
                 </div>
                 <button onClick={generateStrategicAI} disabled={isGenerating} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase hover:bg-indigo-700 shadow-lg">
                    {isGenerating ? "Architecting..." : "✨ Generate Strategic JD"}
                 </button>
              </div>

              <div className="w-full min-h-[400px] p-12 rounded-[40px] bg-slate-800 shadow-inner mb-8 overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-2 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-400 mb-8 leading-none' : 'font-bold text-slate-400'}`}>{line}</p>
                    ))}
                  </div>
                ) : <p className="text-slate-600 font-bold uppercase italic text-center py-20">System ready for generation...</p>}
              </div>

              {socialSnippet && (
                <div className="mb-8 p-6 rounded-3xl border border-dashed bg-indigo-900/20 border-indigo-500 animate-in fade-in">
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-3 italic leading-none">Viral Social Snippet</p>
                    <p className="text-xs font-bold italic text-indigo-200 leading-relaxed">{socialSnippet}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                  <button onClick={() => setIsPublished(true)} className={`py-6 rounded-2xl font-[900] italic uppercase text-sm shadow-xl transition-all ${isPublished ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                      {isPublished ? "✓ LIVE ON GOOGLE JOBS" : "PUBLISH TO GOOGLE JOBS"}
                  </button>
                  <button onClick={() => alert('Download Started')} className="py-6 bg-slate-800 border-2 border-slate-700 text-white rounded-2xl font-[900] italic uppercase text-sm">XML FEED SYNC</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES */}
        {activeTab === 'Candidates' && (
          <div className="bg-[#1E293B] rounded-[32px] shadow-sm border border-slate-700 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700 italic">
                  <th className="p-8">Candidate Profile</th>
                  <th className="p-8 text-center">AI Fit Score</th>
                  <th className="p-8">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800 transition-colors">
                    <td className="p-8">
                        <p className="font-black text-lg leading-none mb-1">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">{c.role}</p>
                    </td>
                    <td className="p-8 text-center">
                        <span className="text-3xl font-[900] italic text-indigo-400 tracking-tighter leading-none">{c.score}</span>
                    </td>
                    <td className="p-8">
                      <button onClick={() => setSelectedCandidate(c)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100 hover:bg-indigo-700">Evaluate Intel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <div className="bg-[#1E293B] p-10 rounded-[40px] border border-slate-700 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Channel ROI Efficiency</h4>
                  <div className="space-y-6">
                      {['Google Jobs Index', 'XML Feed Sync', 'Direct Referral'].map((s, i) => (
                          <div key={s} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase text-slate-500"><span>{s}</span><span>{95 - (i*15)}%</span></div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{width: `${95-(i*15)}%`}}></div></div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-indigo-600 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                  <p className="text-7xl font-[900] italic tracking-tighter leading-none">$14,250</p>
                  <p className="text-[10px] font-black uppercase mt-4 opacity-60 italic">Net Ad Spend Efficiency Savings</p>
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
          </div>
        )}

        {/* MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E293B] w-full max-w-lg rounded-[48px] shadow-2xl border border-slate-700 overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-10 text-white flex justify-between items-center border-b border-slate-800">
                <h3 className="text-2xl font-[900] italic uppercase leading-none">Candidate Intel</h3>
                <button onClick={() => {setSelectedCandidate(null); setShowEmailPreview(false);}} className="text-slate-500 text-3xl hover:text-white transition-colors">✕</button>
              </div>
              <div className="p-10">
                {!showEmailPreview ? (
                  <>
                    <div className="mb-10 bg-slate-800 p-8 rounded-[32px] border border-slate-700 shadow-inner">
                      <p className="text-[10px] font-black text-indigo-400 uppercase mb-4 italic leading-none">✨ Elite Redlining Report</p>
                      <ul className="space-y-3">
                        {selectedCandidate.aiHits.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-400 leading-tight">
                            <span className="text-indigo-500 font-black">→</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => setShowEmailPreview(true)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase shadow-xl hover:bg-indigo-700">Schedule Interview Loop</button>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-right-4">
                     <div className="bg-slate-800 border border-slate-700 p-8 rounded-[32px] text-sm text-slate-400 italic mb-8 shadow-inner">
                        Hi {selectedCandidate.name.split(' ')[0]}, Our AI has flagged your profile for the <b>{selectedCandidate.role}</b> position at <b>Staff-IQ</b>. We'd love to schedule a briefing call...
                     </div>
                     <button onClick={() => {alert('Invite Sent!'); setSelectedCandidate(null);}} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase shadow-xl">Confirm & Send Invite 🚀</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
