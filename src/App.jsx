import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Main Controller) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeJobView, setActiveJobView] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // --- 2. ENHANCED PRODUCTION DATASET ---
  const [jobs] = useState([
    { 
      id: 1, title: "Staff Accountant", location: "Princeton, NJ", dept: "Finance", health: 92,
      jd: "MISSION: STAFF ACCOUNTANT\n\nTHE IMPACT\nJoin Staff-IQ in our Princeton hub. You will manage full-cycle accounting, ensuring that our high-velocity financial environment remains 100% accurate and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Audit and improve 3 core month-end workflows.\n• Complete migration of legacy ledger to NetSuite ERP.",
      candidates: [
        { 
          id: 1, name: "Michael Vanhouten", score: "96%", status: "Final Loop", source: "Referral", 
          aiSummary: "Elite match. Deep experience with NetSuite and GAAP compliance. Princeton local with public accounting background.", 
          resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\n\nEXPERIENCE\nSenior Accountant | Mercer Capital (2020-Present)\n• Managed $50M in annual assets.\n• Led NetSuite ERP implementation.\n\nJunior Accountant | Princeton H&R (2018-2020)\n• Handled 200+ tax clients annually." 
        },
        { 
          id: 2, name: "Sarah Jenkins", score: "91%", status: "Technical", source: "LinkedIn", 
          aiSummary: "Strong technical skills, particularly in Excel automation. Highly organized but requires NetSuite training.", 
          resume: "SARAH JENKINS\nLawrenceville, NJ\n\nEXPERIENCE\nBookkeeper | Main St. Bakery (2021-Present)\n• Automated payroll for 30 employees using VBA.\n• Managed all AP/AR functions." 
        }
      ]
    },
    { 
      id: 2, title: "Office Manager", location: "East Windsor, NJ", dept: "Operations", health: 85,
      jd: "MISSION: OFFICE MANAGER\n\nTHE IMPACT\nAs the operational anchor for our East Windsor site, you will optimize workspace efficiency and maintain essential infrastructure with precision.\n\n90-DAY SUCCESS METRICS\n• Reduce facility vendor spend by 15%.\n• Implement a new digital inventory system for mission-critical supplies.",
      candidates: [
        { id: 15, name: "Julie Vance", score: "96%", status: "Needs Review", source: "Manual", aiSummary: "Hospitality veteran with elite organizational skills. Local to East Windsor.", resume: "JULIE VANCE\nEast Windsor, NJ\n\nEXPERIENCE\nFront Office Manager | Marriott (2019-Present)\n• Managed staff of 15 and facility operations.\n• Improved guest satisfaction scores by 20%." }
      ]
    }
  ]);

  // --- 3. JD GENERATOR LOGIC ---
  const generateJD = () => {
    if (!title) return alert("System requires a Job Title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin the Staff-IQ mission. As our ${title}, you will ensure that our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Process Optimization: Audit at least 3 core workflows.\n• Execution: Maintain 100% accuracy on mission-critical projects.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Staff-IQ Logo" className="w-10 h-10 object-contain" />
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
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeJobView ? activeJobView.title : activeTab}</h2>
            {activeJobView && <button onClick={() => setActiveJobView(null)} className="mt-4 text-[10px] font-black uppercase text-indigo-400">← Back to All Jobs</button>}
        </header>

        {/* DASHBOARD: WITH INFO BUTTONS */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-4 gap-6 animate-in fade-in">
             {[
                { label: 'Net Savings', val: '$22.5k', color: 'text-emerald-400', info: "Savings calculated by subtracting Staff-IQ's flat fee from the market-average Cost-Per-Hire ($4,200) for these roles." },
                { label: 'Sourcing ROI', val: '412%', color: 'text-indigo-400', info: "Return on investment based on viral reach vs. paid ad spend." },
                { label: 'Avg Match', val: '84%', color: 'text-amber-400', info: "The average AI Fit Score across all 15 active candidates." },
                { label: 'Velocity', val: '6 Days', color: 'text-white', info: "Average time taken to move a candidate from Sourced to Final Loop." }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px] group relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-[10px] font-black uppercase italic leading-none">{s.label}</p>
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[8px] font-black text-slate-500 hover:border-indigo-400 hover:text-indigo-400 cursor-help transition-all">i</div>
                  </div>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none`}>{s.val}</p>
                  {/* TOOLTIP */}
                  <div className="absolute top-0 left-0 w-full p-6 bg-indigo-600 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-2xl">
                    <p className="text-[10px] font-black uppercase mb-1 italic">Intelligence Insight</p>
                    <p className="text-[11px] font-bold leading-relaxed">{s.info}</p>
                  </div>
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

        {/* CANDIDATE PIPELINE & JD VIEW */}
        {activeJobView && (
          <div className="grid grid-cols-12 gap-10 animate-in slide-in-from-bottom-4">
             <div className="col-span-7 space-y-4">
               {activeJobView.candidates.map((c) => (
                 <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">{c.score.replace('%', '')}</div>
                    <div className="flex-1"><p className="font-black text-lg uppercase italic text-white leading-none mb-1">{c.name}</p><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{c.status} • {c.source}</p></div>
                 </div>
               ))}
             </div>
             {/* JOB DESCRIPTION CARD */}
             <div className="col-span-5 bg-[#111827] border border-slate-800 p-10 rounded-[40px] h-fit">
                <h3 className="text-xs font-black uppercase text-slate-500 mb-6 italic">Active Requisition</h3>
                <pre className="whitespace-pre-wrap font-bold text-slate-400 text-[11px] leading-relaxed italic">{activeJobView.jd}</pre>
             </div>
          </div>
        )}

        {/* JD GENERATOR */}
        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4 space-y-8">
             <div className="bg-[#111827] p-10 rounded-[48px] border border-slate-800 shadow-2xl">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800/50 p-6 rounded-[32px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white shadow-inner" placeholder="TARGET ROLE TITLE..." />
                <button onClick={generateJD} className="mb-10 bg-indigo-600 text-white px-10 py-3 rounded-full font-[900] italic text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl">{isGenerating ? "Analyzing Requirements..." : "✨ Generate Strategic JD"}</button>
                <div className="w-full min-h-[400px] p-10 bg-slate-900/50 rounded-[40px] shadow-inner border border-slate-800 overflow-y-auto">
                   {description ? <p className="text-sm font-bold text-slate-400 leading-relaxed whitespace-pre-wrap">{description}</p> : <div className="h-full flex items-center justify-center opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>}
                </div>
             </div>
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
                    <button className="w-full py-5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-xl shadow-indigo-500/20">Schedule Interview</button>
                 </div>
                 <div className="w-2/3 bg-white text-slate-900 p-12 overflow-y-auto rounded-r-[48px]"><pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{selectedCandidate.resume}</pre></div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}
