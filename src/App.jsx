import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('Candidates');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedForBulk, setSelectedForBulk] = useState([]);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // --- 2. SAMPLE DATA: STAFF ACCOUNTANT (PRINCETON) ---
  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match. NetSuite expert and Princeton local.", resume: "MICHAEL VANHOUTEN\nPrinceton, NJ..." },
    { id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", aiSummary: "Strong technical skills, slightly junior.", resume: "SARAH JENKINS\nLawrenceville, NJ..." },
    { id: 3, name: "David Ross", role: "Financial Analyst", score: "88%", source: "Indeed", sourceColor: "text-indigo-400", time: "1d ago", aiSummary: "Overqualified but high growth potential.", resume: "DAVID ROSS\nNew Brunswick, NJ..." },
    { id: 4, name: "Emily Chen", role: "AP Specialist", score: "74%", source: "Manual Upload", sourceColor: "text-slate-400", time: "30m ago", aiSummary: "Focused on AP, lacks GL depth.", resume: "EMILY CHEN\nWest Windsor, NJ..." },
    { id: 5, name: "James Peterson", role: "Accountant", score: "82%", source: "ZipRecruiter", sourceColor: "text-emerald-400", time: "3h ago", aiSummary: "Solid background but high job-hopping risk.", resume: "JAMES PETERSON\nPlainsboro, NJ..." },
    { id: 6, name: "Linda Gomez", role: "Bookkeeper", score: "65%", source: "Indeed", sourceColor: "text-indigo-400", time: "4d ago", aiSummary: "Skills do not align with Staff level requirements.", resume: "LINDA GOMEZ\nHamilton, NJ..." },
    { id: 7, name: "Raj Patel", role: "Staff Auditor", score: "93%", source: "Manual Upload", sourceColor: "text-slate-400", time: "1h ago", aiSummary: "Elite auditor candidate with CPA track.", resume: "RAJ PATEL\nEdison, NJ..." },
    { id: 8, name: "Marcus Thorne", role: "Controller", score: "55%", source: "LinkedIn", sourceColor: "text-blue-400", time: "6h ago", aiSummary: "Heavily overqualified; presenting as a flight risk.", resume: "MARCUS THORNE\nPrinceton, NJ..." },
    { id: 9, name: "Anita Roy", role: "Grad Student", score: "78%", source: "Jooble", sourceColor: "text-rose-400", time: "12h ago", aiSummary: "Recent grad with exceptional GPA, zero field exp.", resume: "ANITA ROY\nPrinceton Jct, NJ..." },
    { id: 10, name: "Tom Baines", role: "Tax Associate", score: "80%", source: "Employee Referral", sourceColor: "text-amber-400", time: "3d ago", aiSummary: "Tax pro pivoting to General Ledger role.", resume: "TOM BAINES\nEwing, NJ..." }
  ]);

  // --- 3. CORE LOGIC ---
  const toggleSelect = (id) => {
    setSelectedForBulk(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkInvite = () => {
    if (selectedForBulk.length === 0) return alert("Select candidates first.");
    setShowEmailPreview(true);
  };

  const confirmSend = () => {
    alert(`MISSION SUCCESS: Branded invites sent to ${selectedForBulk.length} candidates.`);
    setShowEmailPreview(false);
    setSelectedForBulk([]);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR: LOGO + BRANDING */}
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
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Target Node: Princeton_NJ</p>
        </header>

        {/* CANDIDATES LIST */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center bg-[#111827] p-6 rounded-[32px] border border-slate-800 sticky top-0 z-20">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">{selectedForBulk.length} Selected for Loop</span>
                <button onClick={handleBulkInvite} disabled={selectedForBulk.length === 0} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedForBulk.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>Bulk Invite to Loop 🚀</button>
             </div>
             
             {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all">
                  <input type="checkbox" checked={selectedForBulk.includes(c.id)} onChange={() => toggleSelect(c.id)} className="w-5 h-5 accent-indigo-600 cursor-pointer" />
                  <div onClick={() => setSelectedCandidate(c)} className="flex-1 flex items-center gap-8 cursor-pointer">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">{c.score.replace('%', '')}</div>
                    <div className="flex-1">
                        <p className="font-black text-xl uppercase italic leading-none mb-1">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.source}</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* EMAIL PREVIEW MODAL */}
        {showEmailPreview && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-12">
            <div className="bg-white text-slate-900 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8">
               <div className="bg-[#111827] p-8 text-white flex justify-between items-center">
                  <h3 className="font-black uppercase italic tracking-widest text-sm">Automated Loop Preview</h3>
                  <button onClick={() => setShowEmailPreview(false)} className="opacity-50 hover:opacity-100 font-black">✕</button>
               </div>
               <div className="p-12 space-y-8">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                     <img src="/logo.png" className="w-12 h-12" alt="Staff-IQ" />
                     <p className="font-black italic uppercase tracking-tighter text-xl">Staff-IQ</p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-xl font-bold">Great news about your application!</p>
                     <p className="text-slate-500 leading-relaxed font-medium">Hi [Candidate Name], our AI has verified your background as an elite match for our <strong>Staff Accountant</strong> role in Princeton. We'd love to skip the back-and-forth and get you into the technical loop.</p>
                  </div>
                  <button onClick={confirmSend} className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-[900] italic uppercase tracking-widest shadow-xl shadow-indigo-200">Self-Schedule Interview</button>
                  <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">Sent via Staff-IQ Recruitment Engine</p>
               </div>
            </div>
          </div>
        )}

        {/* CANDIDATE DETAIL MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
             <div className="bg-[#0B0F1A] w-full max-w-6xl h-[85vh] rounded-[48px] border border-slate-700 flex overflow-hidden">
                <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                   <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500">← Close Intel</button>
                   <h2 className="text-3xl font-[900] italic uppercase leading-none mb-6">{selectedCandidate.name}</h2>
                   <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 mb-6">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Summary</p>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                   </div>
                   <button onClick={() => {setShowEmailPreview(true); setSelectedCandidate(null); setSelectedForBulk([selectedCandidate.id]);}} className="w-full py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg shadow-indigo-500/20">Invite to Loop</button>
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
