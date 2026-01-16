import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewingJD, setViewingJD] = useState(null);

  // --- 1. POPULATED DATA: STAFF ACCOUNTANT (PRINCETON) ---
  const [jobs] = useState([
    { 
      id: 1, title: "STAFF ACCOUNTANT", location: "Princeton, NJ", dept: "Finance", 
      applicants: 10, clicks: 342, health: 92, posted: "2 days ago",
      description: `MISSION: STAFF ACCOUNTANT\n\nTHE IMPACT\nJoin Staff-IQ. As our Staff Accountant, you will ensure our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit 3 core workflows.\n• Execution: 100% accuracy on mission-critical projects.`
    }
  ]);

  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match. NetSuite expert and Princeton local.", pros: ["5yrs exp", "NetSuite Certified"], cons: ["High salary expectations"], resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\nEXPERIENCE: Senior Accountant at Mercer Capital..." },
    { id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", status: "Technical", source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", aiSummary: "Strong technical skills, slightly junior.", pros: ["Excel Expert", "QuickBooks"], cons: ["2yrs exp"], resume: "SARAH JENKINS\nLawrenceville, NJ\nEXPERIENCE: Bookkeeper at Main St. Bakery..." },
    // ... Additional candidates would be listed here
  ]);

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Staff-IQ Logo" className="w-10 h-10 object-contain" />
           <div>
              <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1 leading-none italic">Elite Sourcing Engine</p>
           </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => {setActiveTab(tab); setViewingJD(null);}} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node: Princeton_NJ</span>
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Intelligence Synchronization Active</p>
        </header>

        {/* JOBS TAB */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all shadow-sm">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-4 text-white">{j.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{j.applicants} Applicants • {j.location}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setViewingJD(j)} className="px-6 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">View JD</button>
                    <button onClick={() => setActiveTab('Candidates')} className="px-6 py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Candidates</button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATES TAB: WITH BULK ACTIONS */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             {candidates.map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     {c.score.replace('%', '')}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                     <div>
                        <p className="font-black text-xl uppercase italic leading-none mb-1 text-white">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role}</p>
                     </div>
                     <div className="text-right">
                        <p className={`text-[10px] font-bold uppercase ${c.sourceColor} mb-1`}>{c.source}</p>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Received {c.time}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* ... (Post a Job and Dashboard logic would continue here) ... */}

      </main>

      {/* CANDIDATE DETAIL MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
           <div className="bg-[#0B0F1A] w-full max-w-6xl h-[85vh] rounded-[48px] border border-slate-700 shadow-2xl flex overflow-hidden animate-in zoom-in-95">
              <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                 <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500">← Close Intel</button>
                 <h2 className="text-3xl font-[900] italic uppercase leading-none mb-6">{selectedCandidate.name}</h2>
                 <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 mb-6">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Summary</p>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                 </div>
                 <button className="w-full py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Schedule Loop</button>
              </div>
              <div className="w-2/3 bg-[#1E293B] p-10 overflow-y-auto">
                 <div className="max-w-3xl mx-auto bg-white text-slate-900 p-12 min-h-full rounded shadow-2xl">
                    <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{selectedCandidate.resume}</pre>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
