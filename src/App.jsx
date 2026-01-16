import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Main Controller) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeJobView, setActiveJobView] = useState(null); // The "Drill-Down" state

  // --- 2. THE PRODUCTION DATASET: JOBS WITH NESTED CANDIDATES ---
  const [jobs] = useState([
    { 
      id: 1, title: "Staff Accountant", location: "Princeton, NJ", dept: "Finance", health: 92,
      candidates: [
        { id: 1, name: "Michael Vanhouten", score: "96%", status: "Final Loop", source: "Referral", aiSummary: "Elite match. NetSuite expert.", resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\nSenior Accountant..." },
        { id: 2, name: "Sarah Jenkins", score: "91%", status: "Technical", source: "LinkedIn", aiSummary: "Strong technical skills.", resume: "SARAH JENKINS\nLawrenceville, NJ..." },
        { id: 3, name: "David Ross", score: "88%", status: "Screening", source: "Indeed", aiSummary: "Overqualified but strong.", resume: "DAVID ROSS..." },
        { id: 4, name: "Emily Chen", score: "74%", status: "Needs Review", source: "Manual", aiSummary: "AP Specialist.", resume: "EMILY CHEN..." },
        { id: 5, name: "James Peterson", score: "82%", status: "Sourced", source: "ZipRecruiter", aiSummary: "Job-hopper risk.", resume: "JAMES PETERSON..." },
        { id: 6, name: "Linda Gomez", score: "65%", status: "Rejected", source: "Indeed", aiSummary: "No ERP experience.", resume: "LINDA GOMEZ..." },
        { id: 7, name: "Raj Patel", score: "93%", status: "Needs Review", source: "Manual", aiSummary: "Elite auditor.", resume: "RAJ PATEL..." },
        { id: 8, name: "Marcus Thorne", score: "55%", status: "Rejected", source: "LinkedIn", aiSummary: "Retention risk.", resume: "MARCUS THORNE..." },
        { id: 9, name: "Anita Roy", score: "78%", status: "Sourced", source: "Jooble", aiSummary: "Recent grad.", resume: "ANITA ROY..." },
        { id: 10, name: "Tom Baines", score: "80%", status: "Screening", source: "Referral", aiSummary: "Tax pro.", resume: "TOM BAINES..." }
      ]
    },
    { 
      id: 2, title: "Office Manager", location: "East Windsor, NJ", dept: "Operations", health: 85,
      candidates: [
        { id: 11, name: "Karen Miller", score: "89%", status: "Technical", source: "LinkedIn", aiSummary: "Excellent operations exp.", resume: "KAREN MILLER..." },
        { id: 12, name: "Steve Zhao", score: "94%", status: "Final Loop", source: "Referral", aiSummary: "Perfect for Princeton branch.", resume: "STEVE ZHAO..." },
        { id: 13, name: "Becca Smith", score: "72%", status: "Needs Review", source: "Indeed", aiSummary: "Lacks manager depth.", resume: "BECCA SMITH..." },
        { id: 14, name: "Chris Evans", score: "85%", status: "Sourced", source: "LinkedIn", aiSummary: "Strong communicator.", resume: "CHRIS EVANS..." },
        { id: 15, name: "Julie Vance", score: "96%", status: "Needs Review", source: "Manual", aiSummary: "Elite match.", resume: "JULIE VANCE..." }
      ]
    }
  ]);

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
      {/* SIDEBAR: CLEANER NAVIGATION (REMOVED CANDIDATES TAB) */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
           <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => {setActiveTab(tab); setActiveJobView(null);}} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{activeJobView ? activeJobView.title : activeTab}</h2>
            {activeJobView && <button onClick={() => setActiveJobView(null)} className="mt-4 text-[10px] font-black uppercase text-indigo-400">← Back to All Jobs</button>}
        </header>

        {/* DASHBOARD SUMMARY */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-4 gap-6 animate-in fade-in">
             {[
                { label: 'Active Reqs', val: '2', color: 'text-indigo-400' },
                { label: 'Total Pool', val: '15', color: 'text-white' },
                { label: 'Net Savings', val: '$22.5k', color: 'text-emerald-400' },
                { label: 'Avg Match', val: '84%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase italic">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                </div>
              ))}
          </div>
        )}

        {/* JOBS LIST VIEW */}
        {activeTab === 'Jobs' && !activeJobView && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-10 rounded-[40px] flex justify-between items-center group hover:border-indigo-500 transition-all">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase text-white mb-2 leading-none">{j.title}</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{j.location} • {j.candidates.length} Elite Matches</p>
                  </div>
                  <button onClick={() => setActiveJobView(j)} className="px-8 py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Manage Pipeline</button>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATE PIPELINE (FILTERED BY JOB) */}
        {activeJobView && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
             {activeJobView.candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">{c.score.replace('%', '')}</div>
                  <div className="flex-1">
                    <p className="font-black text-lg uppercase italic text-white leading-none mb-1">{c.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{c.status} • {c.source}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATE DETAIL MODAL */}
        {selectedCandidate && (
           <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
              <div className="bg-[#0B0F1A] border border-slate-700 w-full max-w-6xl h-[85vh] rounded-[48px] flex overflow-hidden shadow-2xl animate-in zoom-in-95">
                 <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                    <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500 leading-none">← Back to Pipeline</button>
                    <h2 className="text-3xl font-[900] italic uppercase leading-none mb-8">{selectedCandidate.name}</h2>
                    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 mb-6">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic leading-none">AI Redline Summary</p>
                       <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                    </div>
                    <button className="w-full py-5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-xl shadow-indigo-500/20">Dispatch Loop Invite</button>
                 </div>
                 <div className="w-2/3 bg-white text-slate-900 p-12 overflow-y-auto rounded-r-[48px]">
                    <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{selectedCandidate.resume}</pre>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}
