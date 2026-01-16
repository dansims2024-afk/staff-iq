import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewingJD, setViewingJD] = useState(null);

  // --- 2. SAMPLE DATA (Staff Accountant Scenario) ---
  const [jobs] = useState([
    { 
      id: 1, 
      title: "STAFF ACCOUNTANT", 
      location: "Princeton, NJ", 
      dept: "Finance", 
      applicants: 10, 
      clicks: 342, 
      health: 92,
      posted: "2 days ago",
      description: `MISSION: STAFF ACCOUNTANT\n\nTHE IMPACT\nJoin Staff-IQ, the platform redefining recruitment. As our Staff Accountant, you will ensure that our high-velocity environment remains organized, efficient, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain 100% accuracy on mission-critical projects.\n\nTHE ARCHETYPE\n• High-Velocity Execution: Anticipate needs before they arise.\n• Strategic Mindset: Solve problems at the root.`
    }
  ]);

  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match for NetSuite/GAAP.", pros: ["5yrs exp", "Princeton local"], cons: ["Salary high"], resume: "MICHAEL VANHOUTEN Resume..." },
    { id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", status: "Technical", source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", aiSummary: "Strong technical skills, slightly junior.", pros: ["Excel Expert"], cons: ["2yrs exp"], resume: "SARAH JENKINS Resume..." }
  ]);

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12">
           <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-2 leading-none italic">Elite Sourcing Engine</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => {setActiveTab(tab); setViewingJD(null);}} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Node: Princeton_NJ</span>
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        {/* HEADER: LOGO TOP RIGHT */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic leading-none tracking-tight">Intelligence Synchronization Active</p>
          </div>
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
        </header>

        {/* DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Active Reqs', val: '1', color: 'text-indigo-400' },
                { label: 'Total Applicants', val: '10', color: 'text-white' },
                { label: 'Sourcing ROI', val: '$4.2k', color: 'text-emerald-400' },
                { label: 'Avg Match', val: '81%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none`}>{s.val}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 bg-[#111827] border border-slate-800 p-10 rounded-[40px]">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic mb-6 leading-none">Sourcing Performance</h3>
                 <div className="space-y-4">
                    {['LinkedIn', 'Indeed', 'Employee Referral'].map((source, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-32 text-[10px] font-bold text-slate-400 uppercase leading-none">{source}</div>
                        <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[33%]"></div></div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB: VIEW JD */}
        {activeTab === 'Jobs' && !viewingJD && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all shadow-sm">
                  <div>
                    <div className="flex gap-3 mb-6 font-black uppercase text-[10px] tracking-widest text-slate-500">
                      <span className="bg-slate-800 px-3 py-1 rounded-lg">{j.dept}</span>
                      <span className="bg-slate-800 px-3 py-1 rounded-lg">{j.location}</span>
                    </div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-2 text-white">{j.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">10 Applicants • {j.posted}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setViewingJD(j)} className="px-6 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20">View Job Description</button>
                    <button onClick={() => setActiveTab('Candidates')} className="px-6 py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Candidates</button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* JOB DESCRIPTION VIEW */}
        {viewingJD && (
          <div className="animate-in slide-in-from-bottom-4 max-w-4xl">
             <button onClick={() => setViewingJD(null)} className="mb-8 text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none tracking-tight">← Back to Jobs</button>
             <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
                <div className="w-full p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto min-h-[500px]">
                   {viewingJD.description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-4xl font-[900] italic text-indigo-400 mb-10 leading-none' : 'font-bold text-slate-400 leading-relaxed'}`}>{line}</p>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* CANDIDATES */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             {candidates.map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400">{c.score.replace('%', '')}</div>
                  <div className="flex-1">
                    <p className="font-black text-xl uppercase italic leading-none mb-1 text-white">{c.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.source}</p>
                  </div>
               </div>
             ))}
        </div>)}

        {/* POST A JOB (EDITOR RESTORED) */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4 bg-[#111827] p-12 rounded-[48px] border border-slate-800 shadow-2xl">
             <input className="w-full bg-slate-800/50 p-8 rounded-[32px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white shadow-inner" placeholder="TARGET ROLE TITLE..." />
             <div className="h-[400px] flex items-center justify-center bg-slate-900/50 rounded-[40px] opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>
          </div>
        )}
      </main>
    </div>
  );
}
