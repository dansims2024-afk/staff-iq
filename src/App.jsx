import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & NAVIGATION ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingJob, setEditingJob] = useState(null); 
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showFeedGuide, setShowFeedGuide] = useState(false);
  
  // Posting / Project Architect State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [socialSnippet, setSocialSnippet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // --- 2. MASTER DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active", description: "React expert needed." },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active", description: "UI/UX lead." },
    { id: 103, title: "Office Manager", dept: "Operations", location: "Austin", applicants: 5, status: "Active", description: "Strategic ops catalyst." }
  ]);

  const [candidates, setCandidates] = useState([
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
  ]);

  // --- 3. CORE LOGIC FUNCTIONS ---

  const generateStrategicAI = () => {
    if (!title) return alert("Please enter a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      const eliteJD = `MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ, the platform redefining recruitment. As our ${title}, you will ensure our high-velocity environment remains organized, efficient, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain a 100% accuracy rate on mission-critical tasks.\n\nTHE ARCHETYPE\n• High-Velocity Execution: You anticipate needs before they arise.\n• Strategic Mindset: You solve problems at the root.\n\nPERKS & LOGISTICS\n• Remote-First: Work from anywhere.\n• Equity: Own a piece of the platform.`;
      
      const snippet = `🚀 WE ARE HIRING: ${title.toUpperCase()} @ Staff-IQ\n\nWe're looking for an elite catalyst to join our remote-first team. If you thrive on high-velocity execution and strategic problem solving, we want to talk.\n\nApply here: https://staff-iq.app/careers`;
      
      setDescription(eliteJD);
      setSocialSnippet(snippet);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-indigo-100">
      
      {/* SIDEBAR */}
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
            <button key={tab} onClick={() => {setActiveTab(tab); setEditingJob(null); setIsPublished(false);}} className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end uppercase">
          <h2 className="text-4xl font-[900] italic tracking-tight leading-none">{activeTab}</h2>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 italic">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            STAFF-IQ-MASTER-BUILD
          </div>
        </header>

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Active Requisitions</p>
                <p className="text-4xl font-[900] italic text-indigo-600 leading-none">{jobs.length}</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Total Applicants</p>
                <p className="text-4xl font-[900] italic text-emerald-500 leading-none">458</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic">Money Saved</p>
                <p className="text-4xl font-[900] italic text-amber-500 leading-none">$14.2k</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. JOBS */}
        {activeTab === 'Jobs' && (
          <div className="space-y-4 animate-in fade-in">
            {jobs.map(j => (
              <div key={j.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center group transition-all hover:border-indigo-200">
                <div onClick={() => setEditingJob(j)} className="cursor-pointer">
                  <h4 className="text-xl font-[900] italic uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{j.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{j.dept} • {j.location}</p>
                </div>
                <button onClick={() => setEditingJob(j)} className="px-6 py-2 bg-[#0F172A] text-white rounded-xl text-[10px] font-black uppercase">Edit</button>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB (WITH SOCIAL SNIPPET) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-6 bg-slate-50 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner" placeholder="JOB TITLE..." />
              
              <div className="flex justify-between items-center mb-6">
                 <button onClick={generateStrategicAI} disabled={isGenerating} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase hover:bg-indigo-700">
                    {isGenerating ? "AI Architecting..." : "✨ Generate Strategic JD"}
                 </button>
              </div>

              {/* RENDERED DOCUMENT */}
              <div className="w-full p-12 bg-slate-50 rounded-[40px] border-none shadow-inner mb-8">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-2 ${line.startsWith('MISSION:') ? 'text-3xl font-[900] italic text-indigo-600 mb-8' : 'font-bold text-slate-600'}`}>{line}</p>
                    ))}
                  </div>
                ) : <p className="text-slate-300 font-bold uppercase italic text-center py-20">Waiting for generation...</p>}
              </div>

              {/* SOCIAL SNIPPET */}
              {socialSnippet && (
                <div className="mb-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 border-dashed">
                    <p className="text-[10px] font-black text-indigo-600 uppercase mb-3">Social Media Post Preview</p>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed italic">{socialSnippet}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <button onClick={() => setIsPublished(true)} className={`py-6 rounded-2xl font-[900] italic uppercase text-sm shadow-xl transition-all ${isPublished ? 'bg-emerald-500 text-white' : 'bg-[#0F172A] text-white'}`}>
                      {isPublished ? "✓ PUBLISHED TO GOOGLE" : "PUBLISH TO GOOGLE JOBS"}
                  </button>
                  <button onClick={() => setShowFeedGuide(true)} className="py-6 bg-white border-4 border-indigo-600 text-indigo-600 rounded-2xl font-[900] italic uppercase text-sm">XML FEED SYNC</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-8 italic">Candidate Profile</th>
                  <th className="p-8 text-center italic">AI Score</th>
                  <th className="p-8 italic">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-8">
                        <p className="font-black text-lg leading-none mb-1">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{c.role}</p>
                    </td>
                    <td className="p-8 text-center"><span className="text-3xl font-[900] italic text-indigo-600">{c.score}</span></td>
                    <td className="p-8"><button onClick={() => setSelectedCandidate(c)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Evaluate</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Source Efficiency</h4>
                  <div className="space-y-6">
                      {['Google Jobs', 'XML Sync', 'LinkedIn'].map((s, i) => (
                          <div key={s} className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-500">{s}</p>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: `${90 - (i*10)}%`}}></div></div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-indigo-600 p-10 rounded-[40px] text-white relative overflow-hidden">
                  <p className="text-7xl font-[900] italic leading-none">$14,250</p>
                  <p className="text-[10px] font-black uppercase mt-4 opacity-60">Net Savings This Month</p>
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
          </div>
        )}

        {/* MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-10 text-white flex justify-between items-center">
                <h3 className="text-2xl font-[900] italic uppercase">Candidate Intel</h3>
                <button onClick={() => {setSelectedCandidate(null); setShowEmailPreview(false);}} className="text-slate-500 text-3xl transition-colors hover:text-white">✕</button>
              </div>
              <div className="p-10">
                {!showEmailPreview ? (
                  <>
                    <div className="mb-10 bg-indigo-50/50 p-8 rounded-[32px] border border-indigo-100 shadow-inner">
                      <p className="text-[10px] font-black text-indigo-600 uppercase mb-4 italic leading-none">✨ Elite Redlining Report</p>
                      <ul className="space-y-3">
                        {selectedCandidate.aiHits.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700 leading-tight">
                            <span className="text-indigo-500 font-black">→</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => setShowEmailPreview(true)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase shadow-xl">Schedule Loop</button>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-right-4">
                     <div className="bg-slate-50 border border-slate-200 p-8 rounded-[32px] text-sm text-slate-600 italic mb-8 shadow-inner">
                        Hi {selectedCandidate.name.split(' ')[0]}, Our AI has flagged your profile as a high-potential match...
                     </div>
                     <button onClick={() => {alert('Invite Sent!'); setSelectedCandidate(null); setShowEmailPreview(false);}} className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl">Confirm & Send Invite 🚀</button>
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
