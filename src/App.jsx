import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // --- 1. VELOCITY DATASET (Days in Stage) ---
  const [candidates, setCandidates] = useState([
    { 
      id: 1, name: "Michael Vanhouten", score: "96%", status: "Final Loop", 
      history: [
        { stage: "Needs Review", days: 1 },
        { stage: "Technical", days: 3 },
        { stage: "Final Loop", days: 2 }
      ]
    },
    { 
      id: 2, name: "Sarah Jenkins", score: "91%", status: "Technical", 
      history: [
        { stage: "Needs Review", days: 2 },
        { stage: "Technical", days: 4 }
      ]
    }
  ]);

  // --- 2. CALCULATE AGGREGATE VELOCITY ---
  const avgVelocity = {
    "Needs Review": 1.5,
    "Technical": 3.5,
    "Final Loop": 2.0
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
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12"><h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{activeTab}</h2></header>

        {/* DASHBOARD: VELOCITY WIDGET */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-12 gap-10 animate-in fade-in">
             <div className="col-span-8 bg-[#111827] border border-slate-800 p-10 rounded-[40px]">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic mb-10 leading-none">Pipeline Velocity (Avg Days per Stage)</h3>
                <div className="flex justify-between items-end h-48 px-10">
                   {Object.entries(avgVelocity).map(([stage, days]) => (
                     <div key={stage} className="flex flex-col items-center gap-4 w-1/4">
                        <div className="w-full bg-slate-900 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end">
                           <div className="bg-indigo-500 w-full transition-all duration-1000" style={{ height: `${(days / 5) * 100}%` }}></div>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-500 italic text-center">{stage}</p>
                        <p className="text-xl font-black italic text-white leading-none">{days}d</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="col-span-4 bg-[#111827] border border-slate-800 p-10 rounded-[40px] flex flex-col justify-center">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 italic">Velocity Insight</p>
                <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase italic">Technical screening is your current bottleneck, averaging 3.5 days. Consider enabling <span className="text-white">Auto-Loop</span> to reduce friction.</p>
             </div>
          </div>
        )}

        {/* CANDIDATES: INDIVIDUAL VELOCITY */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6">
             {candidates.map((c) => (
               <div key={c.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-center group hover:border-indigo-500 transition-all">
                  <div>
                    <p className="font-black text-2xl uppercase italic text-white mb-1 leading-none">{c.name}</p>
                    <div className="flex gap-4 items-center mt-4">
                       {c.history.map((h, i) => (
                         <div key={i} className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-600 uppercase italic leading-none">{h.stage}:</span>
                            <span className="text-[10px] font-black text-indigo-400 leading-none">{h.days}d</span>
                            {i < c.history.length - 1 && <span className="text-slate-800">→</span>}
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Total Cycle</p>
                     <p className="text-3xl font-[900] italic text-white leading-none">{c.history.reduce((acc, h) => acc + h.days, 0)}d</p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}
