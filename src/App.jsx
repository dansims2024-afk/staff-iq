import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Jobs');
  const [copyStatus, setCopyStatus] = useState("Copy XML Link");

  // --- SAMPLE DATA WITH SYNC STATUS ---
  const [jobs] = useState([{ 
    id: 1, title: "Staff Accountant", location: "Princeton, NJ", 
    xmlUrl: "https://staff-iq.com/feeds/princeton-acc-1042.xml",
    lastCrawl: "14 mins ago",
    crawlSource: "Indeed Bot"
  }]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied! ✓");
    setTimeout(() => setCopyStatus("Copy XML Link"), 2000);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      <nav className="w-72 p-8 fixed h-full bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
        <div className="mb-12 flex items-center gap-3">
           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
           <h1 className="text-2xl font-[900] italic uppercase tracking-tighter text-white leading-none">Staff-IQ</h1>
        </div>
        <div className="flex flex-col gap-2">
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12"><h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{activeTab}</h2></header>

        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-10 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-4 text-white">{j.title}</h4>
                    {/* SYNC STATUS */}
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Last Crawled: {j.lastCrawl} by {j.crawlSource}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative group/tip">
                       <button onClick={() => copyToClipboard(j.xmlUrl)} className="px-8 py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-600 transition-all flex items-center gap-3">
                        {copyStatus}
                        <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[8px]">i</div>
                      </button>
                      <div className="absolute bottom-full right-0 mb-4 w-64 p-6 bg-indigo-600 rounded-[24px] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 italic leading-none">Distribution Intel</p>
                        <p className="text-[11px] font-bold leading-relaxed">Paste this link into Indeed or Jooble "Feed Settings" to sync this job automatically.</p>
                      </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}
