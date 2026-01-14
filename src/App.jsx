import React, { useState } from 'react';

export default function App() {
  // Tab & Selection State
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showFeedGuide, setShowFeedGuide] = useState(false);
  
  // Posting State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Global State: Jobs & Candidates
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active" },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active" }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", source: "Google Jobs", email: "s.chen@example.com", aiHits: ["React Lead experience", "Cloud Architecture", "Ex-FAANG"] },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", source: "LinkedIn", email: "m.wright@example.com", aiHits: ["Figma Systems expert", "Accessibility focus", "B2B SaaS background"] }
  ];

  // Logic: AI Generation
  const generateAI = () => {
    if (!title) return alert("Enter Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`## ${title} Role\nWe are seeking an elite professional to join Staff-IQ.\n\n### Requirements\n- High-velocity execution\n- Strategic thinking\n- 5+ years experience`);
      setIsGenerating(false);
    }, 1200);
  };

  // Logic: Final Publish
  const handleFinalPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const newJob = { id: Date.now(), title, dept: "New Role", location: "Remote", applicants: 0, status: "Active" };
      setJobs([newJob, ...jobs]);
      setIsPublishing(false);
      setIsPublished(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* SIDEBAR */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ" className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none italic">AI Sourcing & Tracking</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => {setActiveTab(tab); setIsPublished(false);}} className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end uppercase">
          <h2 className="text-4xl font-[900] italic tracking-tight">{activeTab}</h2>
          <span className="text-[10px] font-black text-slate-400 tracking-widest italic">Live Node: STAFF-IQ-01</span>
        </header>

        {/* DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Open Projects</p>
              <p className="text-4xl font-[900] italic text-indigo-600">{jobs.length}</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Candidates</p>
              <p className="text-4xl font-[900] italic text-emerald-500">458</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Money Saved</p>
              <p className="text-4xl font-[900] italic text-amber-500">$14.2k</p>
            </div>
          </div>
        )}

        {/* JOBS LIST */}
        {activeTab === 'Jobs' && (
          <div className="space-y-4 animate-in fade-in">
            {jobs.map(j => (
              <div key={j.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-[900] italic uppercase leading-none mb-2">{j.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{j.dept} • {j.location}</p>
                </div>
                <div className="flex gap-4 items-center">
                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{j.applicants} Applicants</span>
                   <button className="px-6 py-2 bg-[#0F172A] text-white rounded-xl text-[10px] font-black uppercase">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* POST A JOB (WITH SYNDICATION) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl border-none font-[900] italic text-2xl uppercase mb-6 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Job Title..." />
              <div className="grid grid-cols-2 gap-4 mb-8">
                  <button onClick={handleFinalPublish} disabled={isPublishing || isPublished} className={`py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${isPublished ? 'bg-emerald-500 text-white' : 'bg-[#0F172A] text-white'}`}>{isPublished ? "✓ Google Indexed" : isPublishing ? "Indexing..." : "Publish to Google Jobs"}</button>
                  <button onClick={() => {setShowFeedGuide(true);}} className="py-5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-50">XML Feed Download</button>
              </div>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Content Generation</span>
                 <button onClick={generateAI} className="text-indigo-600 font-black text-xs hover:underline italic">✨ Generate JD</button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-64 p-8 bg-slate-50 rounded-[32px] border-none text-sm leading-relaxed" placeholder="Content will appear here..." />
            </div>
            {showFeedGuide && (
              <div className="bg-indigo-600 text-white p-8 rounded-[40px] shadow-2xl animate-in zoom-in-95">
                <h3 className="text-xl font-[900] italic uppercase mb-2">What to do with your XML Feed?</h3>
                <p className="text-xs font-bold text-indigo-100 mb-6">Take your 'staff-iq-feed.xml' and upload it to Indeed or Jooble's employer dashboard for 10x more reach.</p>
                <button onClick={() => setShowFeedGuide(false)} className="px-6 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase">Dismiss Guide</button>
              </div>
            )}
          </div>
        )}

        {/* CANDIDATES (AI INTEL) */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-8">Candidate</th>
                  <th className="p-8 text-center">AI Fit Score</th>
                  <th className="p-8">Referral Source</th>
                  <th className="p-8">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-8 font-black text-lg">{c.name}</td>
                    <td className="p-8 text-center font-[900] italic text-2xl text-indigo-600 tracking-tighter">{c.score}</td>
                    <td className="p-8"><span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">{c.source}</span></td>
                    <td className="p-8"><button onClick={() => setSelectedCandidate(c)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100">Evaluate</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ANALYTICS (ROI CALCULATOR) */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Channel ROI Efficiency</h4>
                  <div className="space-y-6">
                      {['Google Jobs', 'XML Syndication', 'Internal'].map((s, i) => (
                          <div key={s} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase text-slate-500"><span>{s}</span><span>{95 - (i*10)}%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{width: `${95-(i*10)}%`}}></div></div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-indigo-600 p-10 rounded-[40px] shadow-2xl text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60 italic">Elite Sourcing Impact</p>
                  <p className="text-sm font-bold opacity-80 mb-10 leading-relaxed">By using Staff-IQ's automated free boards, you've avoided $14,250 in paid job board fees this period.</p>
                  <p className="text-6xl font-[900] italic tracking-tighter leading-none">$14,250</p>
                  <p className="text-[10px] font-black uppercase mt-2 opacity-60">NET AD SPEND SAVINGS</p>
              </div>
          </div>
        )}
        
        {/* MODAL: INTEL & SCHEDULING */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-10 text-white flex justify-between items-center">
                <h3 className="text-2xl font-[900] italic uppercase tracking-tighter">Candidate Intel</h3>
                <button onClick={() => {setSelectedCandidate(null); setShowEmailPreview(false);}} className="text-slate-500 text-2xl">✕</button>
              </div>
              <div className="p-10">
                {!showEmailPreview ? (
                  <>
                    <div className="mb-8 bg-indigo-50/50 p-6 rounded-[32px] border border-indigo-100">
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 italic">✨ AI Redlining Report</p>
                      <ul className="space-y-2 text-sm font-bold text-slate-700">
                        {selectedCandidate.aiHits.map((h, i) => <li key={i}>• {h}</li>)}
                      </ul>
                    </div>
                    <button onClick={() => setShowEmailPreview(true)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl shadow-indigo-100">Schedule Interview</button>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-right-4">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Branded Email Preview</p>
                     <div className="border border-slate-100 p-6 rounded-2xl text-sm text-slate-600 bg-slate-50 leading-relaxed italic mb-8">
                        Hi {selectedCandidate.name.split(' ')[0]}, Our AI has reviewed your application for the <b>{selectedCandidate.role}</b> role at <b>Staff-IQ</b>. We'd love to schedule a call...
                     </div>
                     <button onClick={() => {alert('Sent!'); setSelectedCandidate(null); setShowEmailPreview(false);}} className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-[900] italic uppercase tracking-tighter">Confirm & Send 🚀</button>
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
