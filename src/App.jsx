import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Main Controller) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewingJD, setViewingJD] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // --- 2. THE PRODUCTION DATASET: 2 JOBS ---
  const [jobs] = useState([
    { 
      id: 1, title: "Staff Accountant", location: "Princeton, NJ", dept: "Finance", applicants: 10, health: 92,
      description: "MISSION: STAFF ACCOUNTANT\nEnsure high-velocity execution and 100% accuracy on mission-critical projects." 
    },
    { 
      id: 2, title: "Office Manager", location: "East Windsor, NJ", dept: "Operations", applicants: 5, health: 85,
      description: "MISSION: OFFICE MANAGER\nOptimize workflows and manage essential office infrastructure with precision." 
    }
  ]);

  // --- 15 DIVERSE CANDIDATES WITH RESUMES ---
  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", score: "96%", status: "Final Loop", source: "Referral", aiSummary: "Elite match. NetSuite expert.", resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\nSenior Accountant..." },
    { id: 2, name: "Sarah Jenkins", score: "91%", status: "Technical", source: "LinkedIn", aiSummary: "Strong technical skills, slightly junior.", resume: "SARAH JENKINS\nLawrenceville, NJ..." },
    { id: 3, name: "David Ross", score: "88%", status: "Screening", source: "Indeed", aiSummary: "Overqualified but strong potential.", resume: "DAVID ROSS\nNew Brunswick, NJ..." },
    { id: 4, name: "Emily Chen", score: "74%", status: "Needs Review", source: "Manual", aiSummary: "AP Specialist, lacks GL depth.", resume: "EMILY CHEN\nWest Windsor, NJ..." },
    { id: 5, name: "James Peterson", score: "82%", status: "Sourced", source: "ZipRecruiter", aiSummary: "Solid background, job-hopper risk.", resume: "JAMES PETERSON\nPlainsboro, NJ..." },
    { id: 6, name: "Linda Gomez", score: "65%", status: "Rejected", source: "Indeed", aiSummary: "Primary bookkeeping, no ERP experience.", resume: "LINDA GOMEZ\nHamilton, NJ..." },
    { id: 7, name: "Raj Patel", score: "93%", status: "Needs Review", source: "Manual", aiSummary: "Elite auditor with CPA track.", resume: "RAJ PATEL\nEdison, NJ..." },
    { id: 8, name: "Marcus Thorne", score: "55%", status: "Rejected", source: "LinkedIn", aiSummary: "Heavily overqualified; retention risk.", resume: "MARCUS THORNE\nPrinceton, NJ..." },
    { id: 9, name: "Anita Roy", score: "78%", status: "Sourced", source: "Jooble", aiSummary: "Recent grad, zero field experience.", resume: "ANITA ROY\nPrinceton Jct, NJ..." },
    { id: 10, name: "Tom Baines", score: "80%", status: "Screening", source: "Referral", aiSummary: "Tax pro pivoting to General Ledger.", resume: "TOM BAINES\nEwing, NJ..." },
    { id: 11, name: "Karen Miller", score: "89%", status: "Technical", source: "LinkedIn", aiSummary: "Excellent operations and Office Management exp.", resume: "KAREN MILLER\nEast Windsor, NJ..." },
    { id: 12, name: "Steve Zhao", score: "94%", status: "Final Loop", source: "Referral", aiSummary: "Deep Finance background, perfect for Princeton.", resume: "STEVE ZHAO\nPrinceton, NJ..." },
    { id: 13, name: "Becca Smith", score: "72%", status: "Needs Review", source: "Indeed", aiSummary: "Solid admin, lacks manager level depth.", resume: "BECCA SMITH\nHightstown, NJ..." },
    { id: 14, name: "Chris Evans", score: "85%", status: "Sourced", source: "LinkedIn", aiSummary: "Strong communicator, good for Ops role.", resume: "CHRIS EVANS\nTrenton, NJ..." },
    { id: 15, name: "Julie Vance", score: "96%", status: "Needs Review", source: "Manual", aiSummary: "Hospitality veteran; elite Office Manager match.", resume: "JULIE VANCE\nEast Windsor, NJ..." }
  ]);

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
      {/* SIDEBAR: UNIFIED BRANDING */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
           <div>
              <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1 leading-none italic">Elite Sourcing Engine</p>
           </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => {setActiveTab(tab); setViewingJD(null);}} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12 flex justify-between items-start">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{activeTab}</h2>
            <div className="text-right">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Node: NJ_Central_01</p>
            </div>
        </header>

        {/* DASHBOARD: FULL METRICS */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-4 gap-6">
               {[
                { label: 'Active Reqs', val: '2', color: 'text-indigo-400' },
                { label: 'Total Pool', val: '15', color: 'text-white' },
                { label: 'Net Savings', val: '$22.5k', color: 'text-emerald-400' },
                { label: 'Avg Match', val: '84%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-10 rounded-[40px] flex justify-between items-end">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase text-white mb-2">{j.title}</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{j.location} • {j.applicants} Candidates</p>
                  </div>
                  <button onClick={() => setViewingJD(j)} className="px-8 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white">View Intel</button>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATES TAB: FULL LIST */}
        {activeTab === 'Candidates' && (
          <div className="space-y-4 animate-in fade-in">
             {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400">{c.score.replace('%', '')}</div>
                  <div className="flex-1">
                    <p className="font-black text-lg uppercase italic text-white">{c.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.status} • {c.source}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* MODALS: JD, CANDIDATE DETAIL, EMAIL PREVIEW... */}
        {selectedCandidate && (
           <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
              <div className="bg-[#0B0F1A] border border-slate-700 w-full max-w-6xl h-[85vh] rounded-[48px] flex overflow-hidden">
                 <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                    <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500">← Back</button>
                    <h2 className="text-3xl font-[900] italic uppercase mb-8">{selectedCandidate.name}</h2>
                    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 mb-6">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Summary</p>
                       <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white">Schedule via Calendly</button>
                 </div>
                 <div className="w-2/3 bg-white text-slate-900 p-12 overflow-y-auto font-serif">
                    <pre className="whitespace-pre-wrap">{selectedCandidate.resume}</pre>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}
