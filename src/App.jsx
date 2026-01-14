import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & NAVIGATION ---
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingJob, setEditingJob] = useState(null); 
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showFeedGuide, setShowFeedGuide] = useState(false);
  
  // Posting / Project Architect State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // --- 2. SHARED DATA REPOSITORY ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active", description: "React and Node expert needed for high-growth team." },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active", description: "Lead our UI/UX initiatives from concept to launch." }
  ]);

  const candidates = [
    { 
      id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", source: "Google Jobs", email: "s.chen@techmail.io",
      aiHits: ["5+ years React/Node.js expert", "Ex-Google Architecture Lead"],
      analysis: { summary: "Elite candidate. Matches 98% of technical requirements.", pros: ["Top-tier experience", "Architecture focus"], cons: ["High salary range"], rec: "Strong Hire" }
    }
  ];

  // --- 3. SANITIZED LOGIC FUNCTIONS ---

  const generateStrategicAI = () => {
    if (!title) return alert("Please enter a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      // Generated with clean symbols and no markdown markers
      const cleanJD = `MISSION: ${title.toUpperCase()}

THE IMPACT
Join Staff-IQ, the platform redefining recruitment. As our ${title}, you will ensure our high-velocity environment remains organized, efficient, and infinitely scalable.

90-DAY SUCCESS METRICS
• Optimization: Audit and improve at least 3 core workflows within your first quarter.
• Execution: Maintain a 100% accuracy rate on mission-critical projects.

THE ARCHETYPE
• High-Velocity Execution: You anticipate needs before they arise.
• Strategic Mindset: You solve problems at the root, not the symptom.
• Elite Communication: You translate complexity into clarity for all stakeholders.

PERKS & LOGISTICS
• Remote-First: Work from anywhere with a high-speed node.
• Equity: Own a piece of the platform you are building.`;
      
      setDescription(cleanJD);
      setIsGenerating(false);
    }, 1500);
  };

  const handleFinalPublish = () => {
    if (!description) return alert("Generate content before publishing.");
    setIsPublishing(true);
    setTimeout(() => {
      const newJob = { id: Date.now(), title, dept: "New Role", location: "Remote", applicants: 0, status: "Active", description };
      setJobs([newJob, ...jobs]);
      setIsPublishing(false);
      setIsPublished(true);
    }, 2000);
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
            <button 
              key={tab} 
              onClick={() => {setActiveTab(tab); setEditingJob(null); setIsPublished(false); setSelectedCandidate(null);}}
              className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
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
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 italic">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            STAFF-IQ-SANITY-NODE
          </div>
        </header>

        {/* POST A JOB (CLEAN WORKFLOW) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-6 bg-slate-50 rounded-[24px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner" 
                placeholder="JOB TITLE (E.G. FRONT DESK ASSOCIATE)" 
              />
              
              <div className="flex justify-between items-center px-2 mb-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Strategic Content Builder</span>
                 </div>
                 <button onClick={generateStrategicAI} disabled={isGenerating} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-[900] italic text-xs uppercase tracking-tighter hover:bg-indigo-700 shadow-lg">
                    {isGenerating ? "Processing Strategy..." : "✨ Generate Strategic JD"}
                 </button>
              </div>

              {/* CLEAN RENDERER (NO TEXTAREA) */}
              <div className="w-full min-h-[500px] p-12 bg-slate-50 rounded-[40px] border-none shadow-inner mb-10 overflow-y-auto">
                {description ? (
                  <div className="max-w-none">
                    {description.split('\n').map((line, index) => {
                      if (line.startsWith('MISSION:')) {
                        return <h3 key={index} className="text-3xl font-[900] italic uppercase tracking-tighter text-indigo-600 mb-8 leading-none">{line}</h3>;
                      }
                      if (line === line.toUpperCase() && line.length > 3 && !line.includes('•')) {
                        return <h4 key={index} className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mt-12 mb-4 leading-none">{line}</h4>;
                      }
                      return <p key={index} className="text-sm font-bold text-slate-600 leading-relaxed mb-3">{line}</p>;
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest italic">
                    Strategic blueprint waiting for generation...
                  </div>
                )}
              </div>

              {/* DISTRIBUTION */}
              <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-10">
                  <button 
                    onClick={handleFinalPublish} 
                    disabled={isPublishing || isPublished} 
                    className={`py-6 rounded-2xl font-[900] italic uppercase text-sm tracking-widest shadow-xl transition-all ${isPublished ? 'bg-emerald-500 text-white' : 'bg-[#0F172A] text-white hover:scale-[1.01]'}`}
                  >
                      {isPublished ? "✓ LIVE ON GOOGLE JOBS" : isPublishing ? "INDEXING..." : "PUBLISH TO GOOGLE JOBS"}
                  </button>
                  <button onClick={() => setShowFeedGuide(true)} className="py-6 bg-white border-4 border-indigo-600 text-indigo-600 rounded-2xl font-[900] italic uppercase text-sm tracking-widest hover:bg-indigo-50 transition-all">
                      XML FEED SYNC
                  </button>
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS (DASHBOARD, JOBS, CANDIDATES, ANALYTICS) RENDER NORMALLY */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-2 gap-6 animate-in fade-in">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Active Roles</p>
                  <p className="text-4xl font-[900] italic text-indigo-600 leading-none">{jobs.length}</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Hiring ROI</p>
                  <p className="text-4xl font-[900] italic text-emerald-500 leading-none">$14.2k</p>
              </div>
          </div>
        )}
      </main>
    </div>
  );
}
