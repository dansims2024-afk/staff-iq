import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & NAVIGATION ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingJob, setEditingJob] = useState(null); 
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showFeedGuide, setShowFeedGuide] = useState(false);
  
  // Posting / Editor State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // --- 2. SHARED DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active", description: "React and Node expert needed for high-growth team." },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active", description: "Lead our UI/UX initiatives from concept to launch." },
    { id: 103, title: "Office Manager", dept: "Operations", location: "Austin", applicants: 0, status: "Draft", description: "Seeking a catalyst for operational excellence." }
  ]);

  const candidates = [
    { 
      id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", source: "Google Jobs", email: "s.chen@techmail.io",
      aiHits: ["5+ years React/Node.js expert", "Ex-Google Architecture Lead", "Led team of 10+ engineers"],
      analysis: { summary: "Elite candidate. Matches 98% of technical requirements.", pros: ["Top-tier experience", "Architecture focus"], cons: ["High salary range"], rec: "Strong Hire" }
    },
    { 
      id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", source: "LinkedIn", email: "m.wright@design.com",
      aiHits: ["Figma Systems pro", "Accessibility specialist", "B2B SaaS background"],
      analysis: { summary: "Strong visual skills. Lacks deep mobile experience.", pros: ["Accessibility focus", "System design"], cons: ["Limited native mobile"], rec: "Interview" }
    }
  ];

  // --- 3. CORE LOGIC FUNCTIONS ---

  // Strategic JD Generator overhaul
  const generateAI = () => {
    if (!title) return alert("Please enter a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      const proJD = `# ${title.toUpperCase()} MISSION\n\n## THE IMPACT\nWe are looking for a catalyst. As our ${title}, you will ensure that our high-velocity environment remains organized and scalable.\n\n## 90-DAY SUCCESS METRICS\n* **Optimization:** Improve 3 core administrative workflows.\n* **Execution:** Maintain a 100% accuracy rate on high-priority tasks.\n\n## THE ARCHETYPE\n* **High-Velocity Execution:** You anticipate needs before they arise.\n* **Strategic Mindset:** You solve problems at the root.`;
      setDescription(proJD);
      setIsGenerating(false);
    }, 1800);
  };

  const saveJobEdits = () => {
    setJobs(jobs.map(j => j.id === editingJob.id ? editingJob : j));
    setEditingJob(null);
    alert("Project blueprint updated.");
  };

  const handleFinalPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const newJob = { id: Date.now(), title, dept: "General", location: "Remote", applicants: 0, status: "Active", description };
      setJobs([newJob, ...jobs]);
      setIsPublishing(false);
      setIsPublished(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-indigo-100">
      
      {/* SIDEBAR WITH ELITE BRANDING */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-30">
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
              onClick={() => {setActiveTab(tab); setEditingJob(null); setIsPublished(false); setSelectedCandidate(null);}}
              className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end uppercase">
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 tracking-widest italic leading-none">STAFF-IQ-MASTER-NODE</span>
          </div>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 tracking-widest leading-none">Active Requisitions</p>
                <p className="text-4xl font-[900] italic text-indigo-600 leading-none mt-2">{jobs.length}</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 tracking-widest leading-none">Total Candidates</p>
                <p className="text-4xl font-[900] italic text-emerald-500 leading-none mt-2">458</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 tracking-widest leading-none">Recruitment ROI</p>
                <p className="text-4xl font-[900] italic text-amber-500 leading-none mt-2">$14.2k</p>
              </div>
            </div>
            
            <div className="bg-[#0F172A] p-10 rounded-[40px] text-white flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-[900] italic uppercase mb-2 tracking-tighter">Accelerate your hiring loop.</h3>
                    <p className="text-slate-400 text-sm font-bold opacity-80">Use the AI Architect to build a high-performance JD in seconds.</p>
                </div>
                <button onClick={() => setActiveTab('Post a Job')} className="relative z-10 bg-indigo-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-xl transition-all">Start Project</button>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        )}

        {/* 2. JOBS & PROJECT EDITOR */}
        {activeTab === 'Jobs' && (
          <div className="animate-in fade-in">
            {!editingJob ? (
              <div className="space-y-4">
                {jobs.map(j => (
                  <div key={j.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center hover:border-indigo-200 transition-all group">
                    <div className="cursor-pointer" onClick={() => setEditingJob(j)}>
                      <h4 className="text-xl font-[900] italic uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{j.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{j.dept} • {j.location}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                       <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{j.applicants} Applicants</span>
                       <button onClick={() => setEditingJob(j)} className="px-6 py-2 bg-[#0F172A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 animate-in slide-in-from-right-4 duration-300">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-[900] italic uppercase tracking-tighter">Project Blueprint: {editingJob.title}</h3>
                    <button onClick={() => setEditingJob(null)} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-rose-500 transition-colors">✕ Cancel Edits</button>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
                        <input value={editingJob.title} onChange={(e) => setEditingJob({...editingJob, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-[900] italic text-lg uppercase outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Live Content</label>
                        <textarea value={editingJob.description} onChange={(e) => setEditingJob({...editingJob, description: e.target.value})} className="w-full h-80 p-8 bg-slate-50 rounded-[32px] border-none text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    </div>
                    <button onClick={saveJobEdits} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Update Live Project Info</button>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* 3. POST A JOB (STRATEGIC GENERATOR) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
              <div className="mb-10">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner" placeholder="ENTER JOB TITLE (E.G. OFFICE MANAGER)" />
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleFinalPublish} disabled={isPublishing || isPublished} className={`py-6 rounded-2xl font-[900] italic uppercase text-sm tracking-widest shadow-xl transition-all ${isPublished ? 'bg-emerald-500 text-white' : 'bg-[#0F172A] text-white hover:scale-[1.02] active:scale-95'}`}>
                        {isPublished ? "✓ LIVE ON GOOGLE JOBS" : isPublishing ? "INDEXING..." : "PUBLISH TO GOOGLE JOBS"}
                    </button>
                    <button onClick={() => setShowFeedGuide(true)} className="py-6 bg-white border-4 border-indigo-600 text-indigo-600 rounded-2xl font-[900] italic uppercase text-sm tracking-widest hover:bg-indigo-50 transition-all">
                        XML FEED SYNC
                    </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 px-2">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Strategic Content Builder</span>
                 </div>
                 <button onClick={generateAI} disabled={isGenerating} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-[900] italic text-xs uppercase tracking-tighter hover:bg-indigo-700 transition-all shadow-lg">
                    {isGenerating ? "Consulting AI..." : "✨ Generate Strategic JD"}
                 </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-[400px] p-10 bg-slate-50 rounded-[40px] border-none text-sm leading-relaxed font-medium text-slate-700 shadow-inner outline-none focus:ring-2 focus:ring-indigo-100" placeholder="The AI will build your strategic blueprint here..." />
            </div>

            {showFeedGuide && (
              <div className="bg-indigo-600 text-white p-10 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300">
                <h3 className="text-xl font-[900] italic uppercase mb-4 tracking-tighter">Universal Syndication Key</h3>
                <p className="text-sm font-bold text-indigo-100 mb-6 leading-relaxed">Your distribution file is generated. Take your 'staff-iq-feed.xml' and upload it to the Indeed or Jooble employer center for 10x more reach automatically.</p>
                <div className="flex gap-4">
                    <button onClick={() => setShowFeedGuide(false)} className="px-6 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">I've Uploaded It</button>
                    <button onClick={() => setShowFeedGuide(false)} className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Dismiss</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. CANDIDATES (AI INTEL) */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">
                  <th className="p-8">Candidate Profile</th>
                  <th className="p-8 text-center">AI Fit Score</th>
                  <th className="p-8">Referral Source</th>
                  <th className="p-8">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-8">
                        <p className="font-black text-lg group-hover:text-indigo-600 transition-colors">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{c.role}</p>
                    </td>
                    <td className="p-8 text-center">
                        <span className="text-3xl font-[900] italic text-indigo-600 tracking-tighter leading-none">{c.score}</span>
                    </td>
                    <td className="p-8">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{c.source}</span>
                    </td>
                    <td className="p-8">
                      <button onClick={() => setSelectedCandidate(c)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Evaluate Intel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS (ROI CALCULATOR) */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-500">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 italic">Channel ROI Efficiency</h4>
                  <div className="space-y-6">
                      {['Google Jobs Index', 'XML Syndication Feed', 'Direct Referral'].map((s, i) => (
                          <div key={s} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none"><span>{s}</span><span>{95 - (i*12)}%</span></div>
                              <div className="h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-indigo-500 transition-all duration-1000 ease-out shadow-sm" style={{width: `${95-(i*12)}%`}}></div></div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-indigo-600 p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60 italic leading-none">Financial Impact Matrix</p>
                  <p className="text-sm font-bold opacity-80 mb-10 leading-relaxed">By prioritizing high-leverage free syndication nodes, you have avoided significant premium ad spend this period.</p>
                  <p className="text-7xl font-[900] italic tracking-tighter leading-none">$14,250</p>
                  <p className="text-[10px] font-black uppercase mt-4 opacity-60 tracking-widest leading-none">Net Ad Spend Efficiency Savings</p>
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
          </div>
        )}

        {/* MODAL: AI INTEL & AUTOMATED SCHEDULING */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-[#0F172A] p-10 text-white flex justify-between items-center">
                <div>
                    <h3 className="text-3xl font-[900] italic uppercase tracking-tighter leading-none mb-1">{selectedCandidate.name}</h3>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest leading-none">Strategic AI Briefing</p>
                </div>
                <button onClick={() => {setSelectedCandidate(null); setShowEmailPreview(false);}} className="text-slate-500 hover:text-white text-3xl transition-colors">✕</button>
              </div>
              <div className="p-10">
                {!showEmailPreview ? (
                  <>
                    <div className="mb-10 bg-indigo-50/50 p-8 rounded-[32px] border border-indigo-100 shadow-inner">
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 italic leading-none">✨ Elite Redlining Report</p>
                      <ul className="space-y-3">
                        {selectedCandidate.aiHits.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700 leading-tight">
                            <span className="text-indigo-500 font-black">→</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setShowEmailPreview(true)} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Schedule Loop</button>
                        <button className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-100">Reject</button>
                    </div>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-right-4">
                     <div className="bg-slate-50 border border-slate-200 p-8 rounded-[32px] text-sm text-slate-600 leading-relaxed italic mb-8 shadow-inner relative">
                        <span className="absolute -top-3 left-6 bg-[#0F172A] text-white text-[8px] px-2 py-1 rounded font-black uppercase tracking-widest">Branded Email Preview</span>
                        Hi {selectedCandidate.name.split(' ')[0]}, Our AI has flagged your profile as a high-potential match for our <b>{selectedCandidate.role}</b> opening. We'd love to schedule a briefing call regarding next steps...
                     </div>
                     <button onClick={() => {alert('Automation Triggered!'); setSelectedCandidate(null); setShowEmailPreview(false);}} className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl hover:scale-[1.02] transition-all">Execute Automation 🚀</button>
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
