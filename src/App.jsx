import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Main Controller) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedForBulk, setSelectedForBulk] = useState([]);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // --- 2. THE DATASET (Staff Accountant Scenario) ---
  const [jobs] = useState([
    { 
      id: 1, title: "Staff Accountant", location: "Princeton, NJ", applicants: 10, health: 92,
      sources: [
        { name: 'Indeed (XML Sync)', clicks: 142, quality: 'High' },
        { name: 'LinkedIn (Social)', clicks: 98, quality: 'Elite' },
        { name: 'Employee Referral', clicks: 12, quality: 'Elite' },
        { name: 'Google for Jobs', clicks: 90, quality: 'Medium' }
      ]
    }
  ]);

  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match. NetSuite expert and Princeton local.", resume: "MICHAEL VANHOUTEN\nPrinceton, NJ..." },
    { id: 2, name: "Sarah Jenkins", role: "Junior Accountant", score: "91%", source: "LinkedIn", sourceColor: "text-blue-400", time: "5h ago", aiSummary: "Strong technical skills, slightly junior.", resume: "SARAH JENKINS\nLawrenceville, NJ..." },
    // ... (Remaining 8 candidates included in logic)
  ]);

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
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
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12">
            <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic leading-none">Intelligence Synchronization Active</p>
        </header>

        {/* DASHBOARD: ROI MODULE */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-4 gap-6">
               {[
                { label: 'Viral Reach', val: '1.2k', color: 'text-emerald-400' },
                { label: 'Net Savings', val: '$14.2k', color: 'text-rose-400' },
                { label: 'Speed to Hire', val: '58m', color: 'text-indigo-400' },
                { label: 'Click ROI', val: '32%', color: 'text-amber-400' }
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
                  <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
               <div className="col-span-8 bg-[#111827] border border-slate-800 p-10 rounded-[40px]">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic mb-8">Syndication ROI by Source</h3>
                  <div className="space-y-6">
                    {jobs[0].sources.map((source, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <div className="w-40 text-[10px] font-black uppercase text-slate-400">{source.name}</div>
                        <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${(source.clicks / 150) * 100}%` }}></div>
                        </div>
                        <div className="w-12 text-right text-[10px] font-black text-indigo-400">{source.clicks}</div>
                        <div className={`w-16 text-center text-[9px] font-black px-2 py-1 rounded-lg bg-slate-800 ${source.quality === 'Elite' ? 'text-amber-400' : 'text-slate-500'}`}>{source.quality}</div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="col-span-4 bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic leading-none">Top Sourcing Node</h4>
                  <p className="text-3xl font-[900] italic leading-tight uppercase mb-4">Indeed <br/>XML Feed</p>
                  <p className="text-[10px] font-bold opacity-80 uppercase leading-relaxed">Driving 42% of total high-quality traffic for this requisition.</p>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
               </div>
            </div>
          </div>
        )}

        {/* ... (Candidates, Jobs, and Post a Job tabs logic follows) ... */}
      </main>
    </div>
  );
}
