import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewingJD, setViewingJD] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- 1. SAMPLE DATA (STAFF ACCOUNTANT SCENARIO) ---
  const [jobs] = useState([{ 
    id: 1, title: "STAFF ACCOUNTANT", location: "Princeton, NJ", dept: "Finance", 
    applicants: 10, clicks: 342, health: 92, posted: "2 days ago",
    description: "MISSION: STAFF ACCOUNTANT\n\nJoin Staff-IQ in Princeton..." 
  }]);

  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", role: "Staff Accountant", score: "96%", status: "Final Loop", source: "Employee Referral", sourceColor: "text-amber-400", time: "2d ago", aiSummary: "Perfect match for NetSuite/GAAP.", pros: ["5yrs exp", "Princeton local"], cons: ["Salary high"], resume: "MICHAEL VANHOUTEN Resume..." }
  ]);

  // --- 2. ARCHITECT LOGIC ---
  const generateJD = () => {
    if (!title) return alert("Enter a title.");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`MISSION: ${title.toUpperCase()}\n\nTHE IMPACT\nJoin Staff-IQ. As our ${title}, you will ensure high-velocity execution.\n\n90-DAY SUCCESS METRICS\n• Audit 3 core workflows.\n• Maintain 100% accuracy.`);
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
          {['Dashboard', 'Jobs', 'Candidates', 'Post a Job'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-72 p-12">
        <header className="mb-12"><h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{activeTab}</h2></header>

        {/* POST A JOB: THE ARCHITECT & DISTRIBUTION */}
        {activeTab === 'Post a Job' && (
          <div className="grid grid-cols-12 gap-10 animate-in slide-in-from-bottom-4">
            <div className="col-span-8 bg-[#111827] p-10 rounded-[48px] border border-slate-800 shadow-2xl">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800/50 p-6 rounded-[32px] border-none font-[900] italic text-3xl uppercase mb-8 outline-none focus:ring-2 focus:ring-indigo-500 text-white shadow-inner" placeholder="TARGET ROLE TITLE..." />
              <button onClick={generateJD} className="mb-10 bg-indigo-600 text-white px-10 py-3 rounded-full font-[900] italic text-xs uppercase tracking-widest shadow-xl">{isGenerating ? "Analyzing..." : "✨ Generate Strategic JD"}</button>
              <div className="w-full min-h-[400px] p-10 bg-slate-900/50 rounded-[40px] shadow-inner border border-slate-800">
                {description ? <p className="text-sm font-bold text-slate-400 leading-relaxed whitespace-pre-wrap">{description}</p> : <div className="h-full flex items-center justify-center opacity-20"><span className="text-6xl italic font-black">SIQ</span></div>}
              </div>
            </div>

            <div className="col-span-4 bg-[#111827] border border-slate-800 p-8 rounded-[40px] shadow-lg">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 italic">Syndication Nodes</h4>
              {['Google for Jobs', 'Indeed Free-Tier', 'LinkedIn Limited', 'Jooble Global'].map(node => (
                <div key={node} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 mb-3 flex justify-between items-center text-[10px] font-black uppercase italic text-slate-400">
                  {node} <span className="text-indigo-500">✓</span>
                </div>
              ))}
              <button className="w-full mt-8 py-4 bg-white text-black font-[900] italic uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl">Broadcast Requisition</button>
            </div>
          </div>
        )}
        
        {/* ... (Other Tabs like Dashboard and Candidates remain here) ... */}
      </main>
    </div>
  );
}
