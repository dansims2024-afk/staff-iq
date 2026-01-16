import React, { useState, useEffect } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Permanent Dark Mode) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // --- 2. INITIALIZE SAMPLE DATA (Staff Accountant Scenario) ---
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: "STAFF ACCOUNTANT", 
      location: "Princeton, NJ", 
      dept: "Finance", 
      applicants: 10, 
      clicks: 342, 
      health: 92,
      status: "Active",
      posted: "2 days ago"
    }
  ]);

  const [candidates] = useState([
    { 
      id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", 
      source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", location: "Princeton, NJ",
      aiSummary: "Perfect match. Deep experience with NetSuite and GAAP compliance. Local candidate.",
      pros: ["5yrs Local CPA Firm exp", "NetSuite Certified", "Lives in Princeton"],
      cons: ["High salary expectation ($85k)"],
      resume: `MICHAEL VANHOUTEN\nPrinceton, NJ\n\nSUMMARY\nDedicated Staff Accountant with 5+ years of experience managing general ledgers.\n\nEXPERIENCE\nSenior Accountant | Mercer Capital, Trenton, NJ\nJunior Accountant | Princeton H&R, Princeton, NJ`
    },
    { 
      id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", status: "Technical", 
      source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", location: "Lawrenceville, NJ",
      aiSummary: "Strong technical skills but slightly junior. Excellent Excel proficiency.",
      pros: ["Advanced Excel (Macros/VBA)", "QuickBooks Pro", "Immediate Availability"],
      cons: ["Only 2 years experience"],
      resume: `SARAH JENKINS\nLawrenceville, NJ\n\nEXPERIENCE\nBookkeeper | Main St. Bakery\nIntern | Deloitte`
    },
    { 
      id: 3, name: "David Ross", role: "Financial Analyst", score: "88%", status: "Screening", 
      source: "Indeed", sourceColor: "text-indigo-400", time: "1d ago", location: "New Brunswick, NJ",
      aiSummary: "Overqualified but strong growth potential. Currently a Financial Analyst.",
      pros: ["FP&A Experience", "Strong Modeling"],
      cons: ["Flight risk", "Remote preference"],
      resume: `DAVID ROSS\nNew Brunswick, NJ\n\nEXPERIENCE\nFinancial Analyst | J&J\nStaff Accountant | TechStart`
    },
    { 
      id: 4, name: "Emily Chen", role: "AP Specialist", score: "74%", status: "Needs Review", 
      source: "Manual Upload", sourceColor: "text-slate-400", time: "30m ago", location: "West Windsor, NJ",
      aiSummary: "Specialized in Accounts Payable. Lacks general ledger exposure.",
      pros: ["High volume AP processing", "Vendor relations"],
      cons: ["Lack of GL experience"],
      resume: `EMILY CHEN\nWest Windsor, NJ\n\nEXPERIENCE\nAP Clerk | Logistics Co`
    },
    { id: 5, name: "James Peterson", role: "Accountant", score: "82%", status: "Sourced", source: "ZipRecruiter", sourceColor: "text-emerald-400", time: "3h ago", location: "Plainsboro, NJ", aiSummary: "Validate tenure in screen.", pros: ["Tech savvy"], cons: ["Job hopping"], resume: "JAMES PETERSON Resume Data..." },
    { id: 6, name: "Linda Gomez", role: "Bookkeeper", score: "65%", status: "Rejected", source: "Indeed", sourceColor: "text-indigo-400", time: "4d ago", location: "Hamilton, NJ", aiSummary: "Primarily small business bookkeeping.", pros: ["Loyal"], cons: ["No ERP exp"], resume: "LINDA GOMEZ Resume Data..." },
    { id: 7, name: "Raj Patel", role: "Staff Auditor", score: "93%", status: "Needs Review", source: "Manual Upload", sourceColor: "text-slate-400", time: "1h ago", location: "Edison, NJ", aiSummary: "CPA eligible and 3 years public experience.", pros: ["CPA Eligible"], cons: ["Sponsorship transfer"], resume: "RAJ PATEL Resume Data..." },
    { id: 8, name: "Marcus Thorne", role: "Controller", score: "55%", status: "Rejected", source: "LinkedIn", sourceColor: "text-blue-400", time: "6h ago", location: "Princeton, NJ", aiSummary: "Overqualified Controller.", pros: ["Experienced"], cons: ["Retention risk"], resume: "MARCUS THORNE Resume Data..." },
    { id: 9, name: "Anita Roy", role: "Grad Student", score: "78%", status: "Sourced", source: "Jooble", sourceColor: "text-rose-400", time: "12h ago", location: "Princeton Jct, NJ", aiSummary: "Recent grad, high GPA.", pros: ["3.9 GPA"], cons: ["No experience"], resume: "ANITA ROY Resume Data..." },
    { id: 10, name: "Tom Baines", role: "Tax Associate", score: "80%", status: "Screening", source: "Employee Referral", sourceColor: "text-amber-400", time: "3d ago", location: "Ewing, NJ", aiSummary: "Tax expert pivoting to GL.", pros: ["Internal referral"], cons: ["GL learning curve"], resume: "TOM BAINES Resume Data..." }
  ]);

  const stages = ["Sourced", "Screening", "Technical", "Final Loop"];

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
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic leading-none">Node: Princeton_NJ</span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Intelligence Synchronization Active</p>
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
              <div className="col-span-8 bg-[#111827] border border-slate-800 p-8 rounded-[40px]">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic mb-6 leading-none">Distribution Node Performance</h3>
                 <div className="space-y-4">
                    {['LinkedIn', 'Indeed', 'Employee Referral', 'Manual Feed'].map((source, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-32 text-[10px] font-bold text-slate-400 uppercase leading-none">{source}</div>
                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-[25%]"></div>
                        </div>
                        <div className="w-8 text-[10px] font-black text-white leading-none">2</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="col-span-4 bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic leading-none">Speed to Fill</h4>
                 <p className="text-6xl font-[900] italic leading-none mb-2">6<span className="text-2xl opacity-50 ml-1">Days</span></p>
                 <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-end group hover:border-indigo-500 transition-all shadow-sm">
                  <div>
                    <div className="flex gap-3 mb-6">
                      <span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">{j.dept}</span>
                      <span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">{j.location}</span>
                    </div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-2 text-white">{j.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{j.applicants} Candidates • {j.clicks} Viral Clicks • Posted {j.posted}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveTab('Candidates')} className="px-6 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Manage Pipeline</button>
                    <button className="px-6 py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">XML Link</button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATES TAB */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Showing 10 Elite Matches</span>
             </div>
             {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                     {c.score.replace('%', '')}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                     <div>
                        <p className="font-black text-xl uppercase italic leading-none mb-1 text-white">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.location}</p>
                     </div>
                     <div className="text-right">
                        <p className={`text-[10px] font-bold uppercase ${c.sourceColor}`}>{c.source}</p>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Received {c.time}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATE MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
             <div className="bg-[#0B0F1A] w-full max-w-6xl h-[85vh] rounded-[48px] border border-slate-700 shadow-2xl flex overflow-hidden animate-in zoom-in-95">
                <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                   <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500">← Close</button>
                   <h2 className="text-3xl font-[900] italic uppercase leading-none mb-6">{selectedCandidate.name}</h2>
                   <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 mb-6">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Summary</p>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                   </div>
                   <div className="space-y-4">
                      <button className="w-full py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Schedule Interview</button>
                      <button className="w-full py-4 bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-400">Archive</button>
                   </div>
                </div>
                <div className="w-2/3 bg-[#1E293B] p-12 overflow-y-auto">
                   <div className="max-w-3xl mx-auto bg-white text-slate-900 p-12 min-h-full rounded shadow-2xl">
                      <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{selectedCandidate.resume}</pre>
                   </div>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
