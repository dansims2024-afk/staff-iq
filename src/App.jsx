import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Elite Mock Data
  const jobs = [
    { id: 101, title: "SENIOR ACCOUNTANT", dept: "Finance", health: 85, applicants: 42, clicks: 156 },
    { id: 102, title: "PRODUCT DESIGNER", dept: "Design", health: 45, applicants: 18, clicks: 89 }
  ];

  const candidates = [
    { id: 1, name: "SARAH CHEN", role: "Senior Dev", score: "94%", status: "NEEDS REVIEW", time: "2h ago" },
    { id: 2, name: "MARCUS WRIGHT", role: "UX Designer", score: "88%", status: "INTERVIEWING", time: "5h ago" }
  ];

  const generateStrategicAI = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ... [Generated Content]`);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-black italic text-xl text-white">SIQ</span>
             </div>
             <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white">Staff-IQ</h1>
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-1 leading-none italic">Elite Sourcing Engine</p>
        </div>
        
        <div className="flex flex-col gap-2">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Node: SIQ-ULTIMATE-V2</span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        
        {/* TOP METRIC STRIP */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Viral Reach', val: '1.2k', sub: '↑ 18%', color: 'text-emerald-400' },
                { label: 'Net Savings', val: '$14.2k', sub: 'vs Paid', color: 'text-rose-400' },
                { label: 'Speed to Hire', val: '58m', sub: 'Publish-to-Eval', color: 'text-indigo-400' },
                { label: 'Click ROI', val: '32%', sub: 'Magic Links', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] relative overflow-hidden">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
                  <p className={`text-3xl font-[900] italic ${s.color} leading-none`}>{s.val}</p>
                  <p className="text-[9px] font-black text-slate-600 uppercase mt-3">{s.sub}</p>
                  <div className={`absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-10 ${s.color.replace('text', 'bg')}`}></div>
                </div>
              ))}
            </div>

            {/* MAIN COMMAND GRID */}
            <div className="grid grid-cols-12 gap-10">
              {/* Intelligence Hub: Wider for focus */}
              <div className="col-span-8 space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic">Priority: Intelligence Feed</h3>
                  <button className="text-[10px] font-black uppercase text-indigo-400 hover:underline">Full Pipeline</button>
                </div>
                {candidates.map((c) => (
                  <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-6 group hover:border-indigo-500 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 shadow-inner">{c.score.replace('%', '')}</div>
                    <div className="flex-1">
                      <p className="font-black text-lg uppercase italic leading-none mb-1 text-white group-hover:text-indigo-400 transition-colors">{c.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.time}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${c.status === 'NEEDS REVIEW' ? 'bg-rose-500/10 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'}`}>{c.status}</span>
                  </div>
                ))}
              </div>

              {/* Distribution Column: Narrow for status */}
              <div className="col-span-4 space-y-8">
                <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic leading-none">Syndication Map</h4>
                   <div className="space-y-4 text-[10px] font-black uppercase relative z-10">
                      <div className="flex justify-between items-center"><span>Google Index</span><span className="text-emerald-300 italic animate-pulse">Live</span></div>
                      <div className="flex justify-between items-center"><span>XML Sync</span><span className="text-emerald-300 italic">Syncing</span></div>
                      <div className="flex justify-between items-center"><span>Jooble Hub</span><span className="opacity-40">Ready</span></div>
                   </div>
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-[40px] p-8">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic leading-none">Node Activity</h4>
                   <div className="space-y-4">
                      {['Feed Sync Successful', 'AI Blueprint Active', 'Google Index Verified'].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight italic">{log}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST A JOB */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
             <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800/50 p-8 rounded-[32px] border-none font-[900] italic text-4xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white" placeholder="TARGET ROLE TITLE..." />
                <button onClick={generateStrategicAI} disabled={isGenerating} className="mb-10 bg-indigo-600 text-white px-10 py-4 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">{isGenerating ? "Architecting..." : "✨ Generate Strategic JD"}</button>
                <div className="w-full min-h-[500px] p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto">
                   {description ? <p className="text-sm font-bold text-slate-400 leading-relaxed whitespace-pre-wrap">{description}</p> : <div className="h-full flex items-center justify-center opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
