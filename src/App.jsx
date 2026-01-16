import React, { useState } from 'react';

export default function App() {
  // --- 1. GLOBAL STATE (Main Controller) ---
  const [activeTab, setActiveTab] = useState('Candidates');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState("https://calendly.com/staff-iq/technical-interview");

  // --- 2. THE ATS DATASET ---
  const [candidates] = useState([
    { id: 1, name: "Michael Vanhouten", score: "96%", status: "Technical", calendlyStatus: "Pending Booking" },
    { id: 2, name: "Sarah Jenkins", score: "91%", status: "Needs Review", calendlyStatus: "Not Sent" }
  ]);

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
        <header className="mb-12 flex justify-between items-start">
            <div>
                <h2 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none mb-2">{activeTab}</h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Scheduling Synchronization Active</p>
            </div>
            {/* CALENDLY SETTINGS WIDGET */}
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Link</p>
                  <p className="text-[10px] font-bold text-indigo-400">Calendly.com/Staff-IQ</p>
               </div>
               <button onClick={() => alert("Link Settings Open")} className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs hover:bg-indigo-600 transition-all">⚙</button>
            </div>
        </header>

        {/* CANDIDATES: SCHEDULING STATUS */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6 animate-in fade-in">
             {candidates.map((c) => (
               <div key={c.id} className="bg-[#111827] border border-slate-800 p-8 rounded-[40px] flex justify-between items-center group hover:border-indigo-500 transition-all">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400">{c.score.replace('%', '')}</div>
                    <div>
                        <p className="font-black text-2xl uppercase italic text-white mb-1 leading-none">{c.name}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status: <span className="text-indigo-400">{c.calendlyStatus}</span></p>
                    </div>
                  </div>
                  <button onClick={() => {setSelectedCandidate(c); setShowEmailPreview(true);}} className="px-8 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Send Scheduling Loop</button>
               </div>
             ))}
          </div>
        )}

        {/* CALENDLY-POWERED EMAIL PREVIEW */}
        {showEmailPreview && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8">
             <div className="bg-white text-slate-900 w-full max-w-xl rounded-[48px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8">
                <div className="bg-[#111827] p-8 text-white flex justify-between items-center">
                   <h3 className="font-black uppercase italic text-sm">Automated Loop Preview</h3>
                   <button onClick={() => setShowEmailPreview(false)} className="opacity-50 hover:opacity-100 font-black">✕</button>
                </div>
                <div className="p-12 space-y-8">
                   <p className="text-xl font-bold leading-tight italic uppercase">Congratulations, {selectedCandidate?.name.split(' ')[0]}!</p>
                   <p className="text-slate-500 font-medium leading-relaxed">Our AI team has reviewed your background and wants to move directly to a technical interview. Please use the button below to book a time on our calendar.</p>
                   
                   {/* DYNAMIC CALENDLY BUTTON */}
                   <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Preview of Booking Link</p>
                      <button className="w-full py-5 bg-indigo-600 text-white rounded-[20px] font-[900] italic uppercase tracking-widest shadow-xl">
                         Schedule Technical Interview
                      </button>
                      <p className="mt-4 text-[9px] font-bold text-slate-400 italic">{calendlyLink}</p>
                   </div>

                   <button onClick={() => {setShowEmailPreview(false); alert("Loop Dispatched.");}} className="w-full py-4 bg-[#111827] text-white rounded-2xl font-black uppercase text-xs">Dispatch to Candidate</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
