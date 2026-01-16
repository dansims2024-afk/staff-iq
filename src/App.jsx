import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('Jobs');
  const [copyStatus, setCopyStatus] = useState("Copy XML Link");
  const [showSyncGuide, setShowSyncGuide] = useState(false);

  // --- 2. SAMPLE DATA ---
  const [jobs] = useState([{ 
    id: 1, title: "Staff Accountant", location: "Princeton, NJ", 
    xmlUrl: "https://staff-iq.com/feeds/princeton-acc-1042.xml",
    lastCrawl: "14 mins ago",
    crawlSource: "Indeed Bot"
  }]);

  // --- 3. CORE LOGIC ---
  const copyAndGuide = (text) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied! ✓");
    setShowSyncGuide(true); // TRIGGER THE WIZARD
    setTimeout(() => setCopyStatus("Copy XML Link"), 3000);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#0B0F1A] text-white">
      
      {/* SIDEBAR */}
      <nav className="w-72 p-8 fixed h-full flex flex-col bg-[#111827] border-r border-slate-800 shadow-2xl z-30">
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

        {/* JOBS TAB */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
             {jobs.map(j => (
               <div key={j.id} className="bg-[#111827] border border-slate-800 p-10 rounded-[40px] flex justify-between items-end hover:border-indigo-500 transition-all">
                  <div>
                    <h4 className="text-3xl font-[900] italic uppercase leading-none mb-4 text-white">{j.title}</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Sync Active: {j.lastCrawl}</p>
                  </div>
                  <button onClick={() => copyAndGuide(j.xmlUrl)} className="px-8 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">{copyStatus}</button>
               </div>
             ))}
          </div>
        )}

        {/* SYNC GUIDE MODAL */}
        {showSyncGuide && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
             <div className="bg-[#111827] border border-slate-700 w-full max-w-2xl rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95">
                <div className="p-12 space-y-8">
                   <div className="flex justify-between items-start">
                      <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Digital Umbilical Cord: Ready</div>
                      <button onClick={() => setShowSyncGuide(false)} className="text-slate-500 hover:text-white font-black">✕</button>
                   </div>
                   
                   <h3 className="text-3xl font-[900] italic uppercase leading-none">Where to Paste Your Link</h3>
                   
                   <div className="space-y-6">
                      {[
                        { board: "Indeed", step: "Go to 'Employer Home' > 'Job Sources' > Paste XML URL." },
                        { board: "Jooble", step: "Login to Partner Panel > 'Feed Settings' > Paste XML URL." },
                        { board: "LinkedIn", step: "Use 'Job Slot' settings or 'XML Feed' partner portal." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-6 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                           <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black italic">{i+1}</div>
                           <div>
                              <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">{item.board}</p>
                              <p className="text-sm font-bold text-slate-400 leading-relaxed">{item.step}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <button onClick={() => setShowSyncGuide(false)} className="w-full py-6 bg-white text-black rounded-[24px] font-[900] italic uppercase tracking-widest hover:scale-[1.02] transition-all">Got it, Let's Go Viral</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
