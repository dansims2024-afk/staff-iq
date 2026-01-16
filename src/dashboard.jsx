import React, { useState } from 'react';

// --- SIQ MASTER NODE: LIVE SIMULATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [resumeViewMode, setResumeViewMode] = useState('split'); // 'split' or 'full'

  // --- 1. SINGLE TARGET JOB ---
  const jobStats = {
    title: "Staff Accountant",
    location: "Princeton, NJ",
    applicants: 10,
    interviews: 4,
    health: 92,
    clicks: 342,
    savings: "$4,200"
  };

  // --- 2. THE 10 CANDIDATES (MIXED SOURCES) ---
  const [candidates] = useState([
    { 
      id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", 
      source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago",
      aiSummary: "Perfect match for the Princeton role. Deep experience with NetSuite and GAAP compliance. Strong cultural fit.",
      pros: ["5yrs Local CPA Firm exp", "NetSuite Certified", "Lives in Princeton"],
      cons: ["High salary expectation"],
      resume: `MICHAEL VANHOUTEN\nPrinceton, NJ • (609) 555-0102\n\nSUMMARY\nDedicated Staff Accountant with 5+ years of experience managing general ledgers, month-end closures, and financial reporting for mid-sized firms in the tri-state area.\n\nEXPERIENCE\n\nSenior Accountant | Mercer Capital, Trenton, NJ\n2020 – Present\n• Managed full-cycle accounting for 3 subsidiaries.\n• Reduced month-end close time by 20% via automation.\n• Spearheaded the migration to NetSuite ERP.\n\nJunior Accountant | Princeton H&R, Princeton, NJ\n2018 – 2020\n• Assisted with tax preparation for 200+ clients.\n• Reconciled bank statements for 15 accounts monthly.\n\nEDUCATION\nB.S. Accounting, Rutgers University`
    },
    { 
      id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", status: "Technical", 
      source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago",
      aiSummary: "Strong technical skills but slightly junior. Excellent Excel proficiency demonstrated in screening.",
      pros: ["Advanced Excel (Macros/VBA)", "QuickBooks Pro", "Immediate Availability"],
      cons: ["Only 2 years experience"],
      resume: `SARAH JENKINS\nLawrenceville, NJ • sarah.j@email.com\n\nSKILLS\nAdvanced Excel (VBA, Macros), QuickBooks, SAP, GAAP Standards.\n\nEXPERIENCE\n\nBookkeeper | Main St. Bakery, Lawrenceville, NJ\n2021 – Present\n• Handled all AP/AR for high-volume retail location.\n• Processed bi-weekly payroll for 25 employees.\n\nIntern | Deloitte, Philadelphia, PA\nSummer 2020\n• Assisted audit team with inventory verification.\n\nEDUCATION\nB.A. Finance, Rider University`
    },
    { 
      id: 3, name: "David Ross", role: "Financial Analyst", score: "88%", status: "Screening", 
      source: "Indeed", sourceColor: "text-indigo-400", time: "1d ago",
      aiSummary: "Overqualified for Staff Accountant, but strong potential for growth. Currently a Financial Analyst.",
      pros: ["FP&A Experience", "Strong Modeling"],
      cons: ["Flight risk (might find work boring)", "Remote preference"],
      resume: `DAVID ROSS\nNew Brunswick, NJ\n\nPROFESSIONAL SUMMARY\nFinancial Analyst with a focus on forecasting and variance analysis.\n\nWORK HISTORY\n\nFinancial Analyst | J&J, New Brunswick, NJ\n2019 – Present\n• Supported commercial finance team with quarterly forecasts.\n• Analyzed P&L variances and presented findings to Directors.\n\nStaff Accountant | TechStart, Remote\n2017 – 2019\n• Maintained GL and handled intercompany reconciliations.\n\nEDUCATION\nMBA, Montclair State University`
    },
    { 
      id: 4, name: "Emily Chen", role: "AP Specialist", score: "74%", status: "Needs Review", 
      source: "Manual Upload", sourceColor: "text-slate-400", time: "30m ago",
      aiSummary: "Specialized in Accounts Payable. Lacks general ledger exposure needed for this role.",
      pros: ["High volume AP processing", "Vendor relations"],
      cons: ["Lack of GL experience", "No CPA track"],
      resume: `EMILY CHEN\nWest Windsor, NJ\n\nOBJECTIVE\nTo leverage my 4 years of AP experience in a Staff Accountant role.\n\nEXPERIENCE\n\nAP Clerk | Logistics Co, Cranbury, NJ\n2019 – Present\n• Process 500+ invoices weekly.\n• Resolved billing discrepancies with vendors.\n\nEDUCATION\nA.S. Accounting, Mercer County Community College`
    },
    { 
      id: 5, name: "James Peterson", role: "Accountant", score: "82%", status: "Sourced", 
      source: "ZipRecruiter", sourceColor: "text-emerald-400", time: "3h ago",
      aiSummary: "Solid background but has job-hopped frequently. Validate tenure in phone screen.",
      pros: ["Diverse industry experience", "Tech savvy"],
      cons: ["4 jobs in 5 years", "Gap in employment"],
      resume: `JAMES PETERSON\nPlainsboro, NJ\n\nEXPERIENCE\n\nAccountant | Firm A\n2023 - Present\n\nAccountant | Firm B\n2022 - 2023\n\nAccountant | Firm C\n2021 - 2022\n\nEDUCATION\nB.S. Accounting, TCNJ`
    },
    { 
      id: 6, name: "Linda Gomez", role: "Bookkeeper", score: "65%", status: "Rejected", 
      source: "Indeed", sourceColor: "text-indigo-400", time: "4d ago",
      aiSummary: "Skillset does not match requirements. Primarily bookkeeping for small trades, no corporate accounting.",
      pros: ["Organized", "Loyal (10yrs at last job)"],
      cons: ["No ERP experience", "No Bachelor's degree"],
      resume: `LINDA GOMEZ\nHamilton, NJ\n\nEXPERIENCE\n\nOffice Manager/Bookkeeper | Joe's Plumbing\n2013 – 2023\n• Managed all office finances, invoices, and payroll using QuickBooks Desktop.\n\nEDUCATION\nHigh School Diploma`
    },
    { 
      id: 7, name: "Raj Patel", role: "Staff Accountant", score: "93%", status: "Needs Review", 
      source: "Manual Upload", sourceColor: "text-slate-400", time: "1h ago",
      aiSummary: "Strong candidate sourced from agency database. CPA eligible and 3 years experience.",
      pros: ["CPA Eligible", "Public Accounting Exp"],
      cons: ["Requires H1B sponsorship transfer"],
      resume: `RAJ PATEL\nEdison, NJ\n\nEXPERIENCE\n\nStaff Auditor | KPMG, Short Hills, NJ\n2021 – Present\n• Performed external audits for manufacturing clients.\n• Tested internal controls (SOX compliance).\n\nEDUCATION\nM.S. Accountancy, Rutgers Business School`
    },
    { 
      id: 8, name: "Marcus Thorne", role: "Controller", score: "55%", status: "Rejected", 
      source: "LinkedIn", sourceColor: "text-blue-400", time: "6h ago",
      aiSummary: "Overqualified. Currently a Controller looking to step down, which presents a retention risk.",
      pros: ["Extremely experienced"],
      cons: ["Salary likely too high", "Flight risk"],
      resume: `MARCUS THORNE\nPrinceton, NJ\n\nEXPERIENCE\n\nController | Regional Bank\n2015 – Present\n• Oversee accounting department of 15 staff.\n• Report directly to CFO.\n\nEDUCATION\nB.S. Finance, UPenn`
    },
    { 
      id: 9, name: "Anita Roy", role: "Grad Student", score: "78%", status: "Sourced", 
      source: "Jooble", sourceColor: "text-rose-400", time: "12h ago",
      aiSummary: "Recent grad with high GPA but zero work experience. Good for entry level, maybe not 'Staff' level.",
      pros: ["3.9 GPA", "Fast learner"],
      cons: ["No practical experience"],
      resume: `ANITA ROY\nPrinceton Junction, NJ\n\nEDUCATION\nB.S. Accounting, Princeton University (May 2024)\nGPA: 3.9/4.0\n\nRELEVANT COURSEWORK\nIntermediate Accounting I & II, Auditing, Tax Law.`
    },
    { 
      id: 10, name: "Tom Baines", role: "Tax Associate", score: "80%", status: "Screening", 
      source: "Employee Referral", sourceColor: "text-amber-400", time: "3d ago",
      aiSummary: "Referred by Ops Director. Strong tax background, wants to pivot to General Ledger.",
      pros: ["Internal referral", "Tax expertise"],
      cons: ["Learning curve for GL"],
      resume: `TOM BAINES\nEwing, NJ\n\nEXPERIENCE\n\nTax Associate | Liberty Tax\n2020 – Present\n• Prepared individual and S-Corp tax returns.\n• Advised clients on tax saving strategies.\n\nEDUCATION\nB.A. Accounting, Kean University`
    }
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
          {['Dashboard', 'Candidates', 'Jobs', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Node: Princeton</span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Target: Staff Accountant (Ref #1042)</p>
          </div>
          <div className="bg-[#111827] p-2 rounded-xl border border-slate-800 shadow-lg">
             <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
        </header>

        {/* DASHBOARD: REAL-TIME ANALYTICS FOR THIS JOB */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* KPI STRIP */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Total Candidates', val: '10', color: 'text-white' },
                { label: 'Avg Match Score', val: '81%', color: 'text-indigo-400' },
                { label: 'Sourcing Savings', val: '$4.2k', color: 'text-emerald-400' },
                { label: 'Interviewing', val: '4', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none`}>{s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
              {/* SOURCE BREAKDOWN */}
              <div className="col-span-8 bg-[#111827] border border-slate-800 p-8 rounded-[40px]">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic mb-6">Source Performance ROI</h3>
                 <div className="space-y-4">
                    {[
                      { name: 'LinkedIn (Inbound)', count: 2, pct: '20%', bar: 'w-[20%]', color: 'bg-blue-500' },
                      { name: 'Indeed (Inbound)', count: 2, pct: '20%', bar: 'w-[20%]', color: 'bg-indigo-500' },
                      { name: 'Manual Upload (Outbound)', count: 2, pct: '20%', bar: 'w-[20%]', color: 'bg-slate-500' },
                      { name: 'Employee Referral', count: 2, pct: '20%', bar: 'w-[20%]', color: 'bg-amber-500' },
                      { name: 'Jooble/Zip (XML Feed)', count: 2, pct: '20%', bar: 'w-[20%]', color: 'bg-rose-500' },
                    ].map((source, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-32 text-[10px] font-bold text-slate-400 uppercase">{source.name}</div>
                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden">
                           <div className={`h-full ${source.color} ${source.bar}`}></div>
                        </div>
                        <div className="w-8 text-[10px] font-black text-white">{source.count}</div>
                      </div>
                    ))}
                 </div>
              </div>
              
              {/* HIRING VELOCITY */}
              <div className="col-span-4 bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic">Time to Fill</h4>
                 <p className="text-6xl font-[900] italic leading-none mb-2">6<span className="text-2xl opacity-50 ml-1">Days</span></p>
                 <p className="text-[10px] font-bold opacity-80 uppercase leading-relaxed">Job is trending 40% faster than average for Finance roles in NJ.</p>
                 <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATES LIST */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Showing 10 Active Profiles</span>
                <button className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-lg">Sort by: Fit Score</button>
             </div>
             
             {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
               <div key={c.id} onClick={() => setSelectedCandidate(c)} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer shadow-sm">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     {c.score.replace('%', '')}
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                     <div>
                        <p className="font-black text-xl uppercase italic leading-none mb-1 text-white">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.location || 'Princeton, NJ'}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Source</p>
                        <p className={`text-[10px] font-bold uppercase ${c.sourceColor}`}>{c.source}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-700 ${c.status === 'Needs Review' ? 'text-amber-400' : 'text-slate-300'}`}>{c.status}</span>
                     </div>
                  </div>
                  <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">View Intel →</span>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* CANDIDATE DETAIL MODAL (SPLIT VIEW) */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
             <div className="bg-[#0B0F1A] w-full max-w-6xl h-[85vh] rounded-[48px] border border-slate-700 shadow-2xl flex overflow-hidden animate-in zoom-in-95">
                
                {/* LEFT: AI INTEL */}
                <div className="w-1/3 bg-[#111827] p-10 border-r border-slate-800 overflow-y-auto">
                   <div className="mb-8">
                      <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-[10px] font-black uppercase text-slate-500 hover:text-white">← Back to List</button>
                      <h2 className="text-3xl font-[900] italic uppercase leading-none mb-2">{selectedCandidate.name}</h2>
                      <div className="flex items-center gap-2 mb-6">
                         <span className="text-4xl font-[900] italic text-indigo-400">{selectedCandidate.score}</span>
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest w-24 leading-tight">AI Fit Score based on JD</span>
                      </div>
                      
                      <div className="space-y-6">
                         <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Executive Summary</p>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed">{selectedCandidate.aiSummary}</p>
                         </div>

                         <div>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Top Strengths</p>
                            <ul className="space-y-2">
                               {selectedCandidate.pros.map((pro, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-300"><span className="text-emerald-500">✓</span> {pro}</li>
                               ))}
                            </ul>
                         </div>

                         <div>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3">Risk Factors</p>
                            <ul className="space-y-2">
                               {selectedCandidate.cons.map((con, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-300"><span className="text-rose-500">⚠</span> {con}</li>
                               ))}
                            </ul>
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-auto">
                      <button className="py-4 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-500">Request Interview</button>
                      <button className="py-4 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">Pass / Archive</button>
                   </div>
                </div>

                {/* RIGHT: RESUME VIEWER */}
                <div className="w-2/3 bg-[#1E293B] p-10 overflow-y-auto relative">
                   <div className="absolute top-6 right-8 flex gap-2">
                      <button className="px-4 py-2 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Download PDF</button>
                      <button className="px-4 py-2 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Share Profile</button>
                   </div>
                   <div className="max-w-3xl mx-auto bg-white text-slate-900 p-12 min-h-full shadow-2xl rounded-sm">
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
