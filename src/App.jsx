import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE & SELECTIONS ---
  const [activeTab, setActiveTab] = useState('Candidates');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewingJD, setViewingJD] = useState(null);
  const [selectedForBulk, setSelectedForBulk] = useState([]);

  // --- 2. SAMPLE DATA: STAFF ACCOUNTANT (PRINCETON) ---
  const [jobs] = useState([
    { 
      id: 1, 
      title: "STAFF ACCOUNTANT", 
      location: "Princeton, NJ", 
      dept: "Finance", 
      applicants: 10, 
      health: 92,
      posted: "2 days ago",
      description: `MISSION: STAFF ACCOUNTANT\n\nTHE IMPACT\nJoin Staff-IQ, the platform redefining recruitment. As our Staff Accountant, you will ensure that our high-velocity environment remains organized, efficient, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Optimization: Audit and improve at least 3 core workflows.\n• Execution: Maintain 100% accuracy on mission-critical projects.\n\nTHE ARCHETYPE\n• High-Velocity Execution: Anticipate needs before they arise.\n• Strategic Mindset: Solve problems at the root.`
    }
  ]);

  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match. NetSuite expert and Princeton local.", pros: ["5yrs exp", "NetSuite Certified"], cons: ["High salary expectations"], resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\nEXPERIENCE: Senior Accountant at Mercer Capital..." },
    { id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", status: "Technical", source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", aiSummary: "Strong technical skills, slightly junior.", pros: ["Excel Expert", "QuickBooks"], cons: ["2yrs exp"], resume: "SARAH JENKINS\nLawrenceville, NJ\nEXPERIENCE: Bookkeeper at Main St. Bakery..." },
    { id: 3, name: "David Ross", role: "Financial Analyst", score: "88%", status: "Screening", source: "Indeed", sourceColor: "text-indigo-400", time: "1d ago", aiSummary: "Overqualified but high growth potential.", pros: ["FP&A Experience"], cons: ["Retention risk"], resume: "DAVID ROSS\nNew Brunswick, NJ\nEXPERIENCE: Financial Analyst at J&J..." },
    { id: 4, name: "Emily Chen", role: "AP Specialist", score: "74%", status: "Needs Review", source: "Manual Upload", sourceColor: "text-slate-400", time: "30m ago", aiSummary: "Focused on AP, lacks GL depth.", pros: ["High volume processing"], cons: ["No GAAP tracking"], resume: "EMILY CHEN\nWest Windsor, NJ\nEXPERIENCE: AP Clerk at Logistics Co..." },
    { id: 5, name: "James Peterson", role: "Accountant", score: "82%", status: "Sourced", source: "ZipRecruiter", sourceColor: "text-emerald-400", time: "3h ago", aiSummary: "Solid background but high job-hopping risk.", pros: ["Tech savvy"], cons: ["Frequent tenure gaps"], resume: "JAMES PETERSON\nPlainsboro, NJ\nEXPERIENCE: Accountant at various firms..." },
    { id: 6, name: "Linda Gomez", role: "Bookkeeper", score: "65%", status: "Rejected", source: "Indeed", sourceColor: "text-indigo-400", time: "4d ago", aiSummary: "Skills do not align with Staff level requirements.", pros: ["Loyal tenure"], cons: ["No ERP experience"], resume: "LINDA GOMEZ\nHamilton, NJ\nEXPERIENCE: 10yrs at Joe's Plumbing..." },
    { id: 7, name: "Raj Patel", role: "Staff Auditor", score: "93%", status: "Needs Review", source: "Manual Upload", sourceColor: "text-slate-400", time: "1h ago", aiSummary: "Elite auditor candidate with CPA track.", pros: ["CPA Eligible", "Public Accounting"], cons: ["Sponsorship transfer"], resume: "RAJ PATEL\nEdison, NJ\nEXPERIENCE: Auditor at KPMG..." },
    { id: 8, name: "Marcus Thorne", role: "Controller", score: "55%", status: "Rejected", source: "LinkedIn", sourceColor: "text-blue-400", time: "6h ago", aiSummary: "Heavily overqualified; presenting as a flight risk.", pros: ["Extremely senior"], cons: ["Salary mismatch"], resume: "MARCUS THORNE\nPrinceton, NJ\nEXPERIENCE: Controller at Regional Bank..." },
    { id: 9, name: "Anita Roy", role: "Grad Student", score: "78%", status: "Sourced", source: "Jooble", sourceColor: "text-rose-400", time: "12h ago", aiSummary: "Recent grad with exceptional GPA, zero field exp.", pros: ["3.9 GPA", "Fast learner"], cons: ["No practical background"], resume: "ANITA ROY\nPrinceton Jct, NJ\nEDUCATION: B.S. Accounting, Princeton Univ..." },
    { id: 10, name: "Tom Baines", role: "Tax Associate", score: "80%", status: "Screening", source: "Employee Referral", sourceColor: "text-amber-400", time: "3d ago", aiSummary: "Tax pro pivoting to General Ledger role.", pros: ["Internal Referral", "Tax Law Expert"], cons: ["GL learning curve"], resume: "TOM BAINES\nEwing, NJ\nEXPERIENCE: Tax Associate at Liberty Tax..." }
  ]);

  // --- 3. CORE LOGIC: BULK ACTIONS ---
  const toggleSelect = (id) => {
    setSelectedForBulk(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkInvite = () => {
    if (selectedForBulk.length === 0) return alert("Select candidates first.");
    alert(`AUTOMATED LOOP: Sending branded interview invites to ${selectedForBulk.length} candidates.`);
    setSelectedForBulk([]);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR: LOGO RESTORED TO TOP LEFT */}
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
        <div className="mt-auto pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node: Princeton_NJ</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Target: Staff Accountant (Princeton, NJ)</p>
          </div>
        </header>

        {/* DASHBOARD: METRIC STRIP */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Active Reqs', val: '1', color: 'text-indigo-400' },
                { label: 'Total Applicants', val: '10', color: 'text-white' },
                { label: 'Sourcing ROI', val: '$4.2k', color: 'text-emerald-400' },
                { label: 'Avg Match', val: '81%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'Jobs' && !viewingJD && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all">
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

        {/* JOB DESCRIPTION VIEW */}
        {viewingJD && (
          <div className="animate-in slide-in-from-bottom-4">
             <button onClick={() => setViewingJD(null)} className="mb-8 text-[10px] font-black uppercase text-indigo-400">← Back to Jobs</button>
             <div className="bg-[#111827] p-12 rounded-[48px] border border-slate-800">
                <div className="w-full p-12 bg-slate-900/50 rounded-[40px] shadow-inner overflow-y-auto min-h-[500px]">
                   {viewingJD.description.split('\n').map((line, i) => (
                      <p key={i} className={`text-sm mb-3 ${line.startsWith('MISSION:') ? 'text-4xl font-[900] italic text-indigo-400 mb-10' : 'font-bold text-slate-400 leading-relaxed'}`}>{line}</p>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* CANDIDATES LIST: WITH BULK ACTIONS */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center bg-[#111827] p-6 rounded-[32px] border border-slate-800 sticky top-0 z-20">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">{selectedForBulk.length} Selected for Loop</span>
                <button 
                  onClick={handleBulkInvite}
                  disabled={selectedForBulk.length === 0}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedForBulk.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                >
                  Bulk Invite to Loop 🚀
                </button>
             </div>
             
             {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all shadow-sm">
                  <input 
                    type="checkbox" 
                    checked={selectedForBulk.includes(c.id)}
                    onChange={() => toggleSelect(c.id)}
                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                  />
                  <div onClick={() => setSelectedCandidate(c)} className="flex-1 flex items-center gap-8 cursor-pointer">
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
               </div>
             ))}
          </div>
        )}

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
                   <div className="space-y-4">
                      <button className="w-full py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Schedule Loop</button>
                   </div>
                </div>
                <div className="w-2/3 bg-[#1E293B] p-10 overflow-y-auto">
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
