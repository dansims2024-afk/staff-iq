import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeJobView, setActiveJobView] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy XML Link");

  // --- 2. DEEP PRODUCTION DATASET ---
  const [jobs] = useState([
    { 
      id: 1, title: "Staff Accountant", location: "Princeton, NJ", dept: "Finance", health: 92,
      xmlUrl: "https://staff-iq.com/feeds/princeton-acc-1042.xml",
      jd: "MISSION: STAFF ACCOUNTANT\n\nTHE IMPACT\nAs our Staff Accountant in Princeton, you will be the anchor of our financial operations. You'll ensure that our high-velocity environment remains organized, compliant with GAAP, and infinitely scalable.\n\n90-DAY SUCCESS METRICS\n• Workflow Audit: Review and optimize 3 core month-end closing processes.\n• Tech Stack: Lead the final migration phase of legacy data into our NetSuite ERP.\n• Accuracy: Maintain a 100% precision rate on all mission-critical financial reporting.",
      candidates: [
        { id: 1, name: "Michael Vanhouten", score: "96%", status: "Final Loop", source: "Referral", aiSummary: "Elite match. NetSuite expert and Princeton local.", resume: "MICHAEL VANHOUTEN\nPrinceton, NJ\n\nEXPERIENCE\nSenior Accountant | Mercer Capital (2020-Present)\n- Managed $50M annual assets.\n- Led NetSuite ERP implementation.\n\nJunior Accountant | Princeton H&R (2018-2020)\n- Handled 200+ tax clients annually." },
        { id: 2, name: "Sarah Jenkins", score: "91%", status: "Technical", source: "LinkedIn", aiSummary: "Strong technical skills, particularly in Excel automation.", resume: "SARAH JENKINS\nLawrenceville, NJ\n\nEXPERIENCE\nBookkeeper | Main St. Bakery (2021-Present)\n- Automated payroll for 30 employees using VBA.\n- Managed all AP/AR functions." },
        { id: 3, name: "David Ross", score: "88%", status: "Screening", source: "Indeed", aiSummary: "Deep FP&A background; overqualified for Staff level.", resume: "DAVID ROSS\nNew Brunswick, NJ\n\nEXPERIENCE\nFinancial Analyst | J&J (2017-2021)\n- Strategic budget planning for regional HQ.\n- Managed multi-million dollar forecasts." },
        { id: 4, name: "Emily Chen", score: "74%", status: "Needs Review", source: "Manual", aiSummary: "AP Specialist; lacks General Ledger depth.", resume: "EMILY CHEN\nWest Windsor, NJ\n\nEXPERIENCE\nAP Clerk | Logistics Co (2022-Present)\n- Processed 500+ invoices weekly.\n- Vendor relationship management." },
        { id: 5, name: "James Peterson", score: "82%", status: "Sourced", source: "ZipRecruiter", aiSummary: "Solid background but high job-hopping risk.", resume: "JAMES PETERSON\nPlainsboro, NJ\n\nEXPERIENCE\nAccountant | Various Firms (2-year stints)\n- General Ledger maintenance.\n- Bank reconciliations." },
        { id: 6, name: "Raj Patel", score: "93%", status: "Needs Review", source: "Manual", aiSummary: "Elite auditor with CPA track; high potential.", resume: "RAJ PATEL\nEdison, NJ\n\nEXPERIENCE\nStaff Auditor | KPMG (2021-Present)\n- Conducted external audits for Fortune 500 clients.\n- Expert in internal control testing." },
        { id: 7, name: "Steve Zhao", score: "94%", status: "Final Loop", source: "Referral", aiSummary: "Perfect cultural fit for Princeton hub.", resume: "STEVE ZHAO\nPrinceton, NJ\n\nEXPERIENCE\nAccountant | Princeton University (2019-Present)\n- Grant accounting and departmental budgeting.\n- Expert in Oracle Financials." }
      ]
    },
    { 
      id: 2, title: "Office Manager", location: "East Windsor, NJ", dept: "Operations", health: 85,
      xmlUrl: "https://staff-iq.com/feeds/ew-ops-2091.xml",
      jd: "MISSION: OFFICE MANAGER\n\nTHE IMPACT\nAs the operational anchor for our East Windsor site, you will optimize workspace efficiency and maintain essential infrastructure with precision. You are the 'first responder' for all office needs.\n\n90-DAY SUCCESS METRICS\n• Vendor Optimization: Reduce facility vendor spend by 15% through strategic renegotiation.\n• System Implementation: Launch a digital inventory system for critical supplies.\n• Culture: Establish a seamless onboarding flow for new hires.",
      candidates: [
        { id: 11, name: "Julie Vance", score: "96%", status: "Needs Review", source: "Manual", aiSummary: "Hospitality veteran; elite Office Manager match.", resume: "JULIE VANCE\nEast Windsor, NJ\n\nEXPERIENCE\nFront Office Manager | Marriott (2019-Present)\n- Managed staff of 15 and facility operations.\n- Improved guest satisfaction scores by 20%." },
        { id: 12, name: "Karen Miller", score: "89%", status: "Technical", source: "LinkedIn", aiSummary: "Excellent operations and Office Management exp.", resume: "KAREN MILLER\nEast Windsor, NJ\n\nEXPERIENCE\nOffice Administrator | Health Group (2015-Present)\n- Managed 3 medical office locations.\n- Handled billing and scheduling." },
        { id: 13, name: "Becca Smith", score: "72%", status: "Needs Review", source: "Indeed", aiSummary: "Solid admin, lacks manager level depth.", resume: "BECCA SMITH\nHightstown, NJ\n\nEXPERIENCE\nAdministrative Assistant | Local Law (2020-Present)\n- Filing, answering phones, and client intake.\n- Managed lawyer calendars." },
        { id: 14, name: "Chris Evans", score: "85%", status: "Sourced", source: "LinkedIn", aiSummary: "Strong communicator; good for Ops role.", resume: "CHRIS EVANS\nTrenton, NJ\n\nEXPERIENCE\nOperations Coordinator | Tech Start-up (2021-Present)\n- Coordinated remote team logistics.\n- Managed office expansion projects." },
        { id: 15, name: "Marcus Thorne", score: "55%", status: "Rejected", source: "LinkedIn", aiSummary: "Salary mismatch; heavily overqualified.", resume: "MARCUS THORNE\nPrinceton, NJ\n\nEXPERIENCE\nController | Regional Bank (2010-2023)\n- Strategic financial oversight." }
      ]
    }
  ]);

  // --- 3. CORE LOGIC ---
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied! ✓");
    setTimeout(() => setCopyStatus("Copy XML Link"), 2000);
  };

  const generateJD = () => {
    if (!title) return alert("Job Title Required.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure that our high-velocity environment remains organized and scalable.\n\n90-DAY SUCCESS METRICS\n• Audit 3 core workflows.\n• Maintain 100% accuracy.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
           <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white">Staff-IQ</h1>
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

        {/* DRILL-DOWN: PIPELINE & XML SYNDICATION */}
        {activeJobView && (
          <div className="grid grid-cols-12 gap-10 animate-in slide-in-from-bottom-4">
             <div className="col-span-7 space-y-4">
               {activeJobView.candidates.map((c) => (
                 <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-[900] italic text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">{c.score.replace('%', '')}</div>
                    <div className="flex-1"><p className="font-black text-lg uppercase italic text-white mb-1">{c.name}</p><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.status} • {c.source}</p></div>
                 </div>
               ))}
             </div>
             <div className="col-span-5 space-y-6">
                <div className="bg-[#111827] border border-slate-800 p-10 rounded-[40px]">
                   <h3 className="text-xs font-black uppercase text-slate-500 mb-6 italic">Active Requisition</h3>
                   <pre className="whitespace-pre-wrap font-bold text-slate-400 text-[11px] leading-relaxed italic mb-8 border-b border-slate-800 pb-8">{activeJobView.jd}</pre>
                   
                   <div className="space-y-3 pt-6">
                      <button className="w-full py-4 bg-emerald-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Broadcast Requisition 🚀</button>
                      <button onClick={() => copyToClipboard(activeJobView.xmlUrl)} className="w-full py-4 bg-slate-800 rounded-xl text-[10px] font-black uppercase text-white flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all">
                        {copyStatus}
                        <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[8px]">i</div>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* POST A JOB: JD GENERATOR */}
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

        {/* DASHBOARD */}
        {activeTab === 'Dashboard' && (
           <div className="grid grid-cols-4 gap-6 animate-in fade-in">
             {[
                { label: 'Active Reqs', val: '2', color: 'text-indigo-400' },
                { label: 'Total Pool', val: '12', color: 'text-white' },
                { label: 'Net Savings', val: '$22.5k', color: 'text-emerald-400' },
                { label: 'Velocity', val: '6 Days', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px] group relative">
                   <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">{s.label}</p>
                   <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                </div>
              ))}
           </div>
        )}

        {/* CANDIDATE DETAIL MODAL */}
        {selectedCandidate && (
           <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
              <div className="bg-[#0B0F1A] border border-slate-700 w-full max-w-6xl h-[85vh] rounded-[48px] flex overflow-hidden shadow-2xl animate-in zoom-in-95">
                 <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                    <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500">← Back</button>
                    <h2 className="text-3xl font-[900] italic uppercase leading-none mb-8">{selectedCandidate.name}</h2>
                    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 mb-6">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic">AI Redline Summary</p>
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
