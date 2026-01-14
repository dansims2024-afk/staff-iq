import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Candidates');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", score: "94%", aiHits: ["5+ years React expert", "Led 10+ person team", "Strong cloud architecture"], email: "sarah.c@example.com" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", score: "88%", aiHits: ["Figma Systems expert", "Strong accessibility focus", "B2B SaaS background"], email: "m.wright@example.com" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* SIDEBAR BRANDING */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ Logo" className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none">AI-Powered Sourcing & Tracking</p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 ${activeTab === tab ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-[900] italic uppercase">{activeTab}</h2>
        </header>

        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-6">Candidate</th>
                  <th className="p-6">AI Fit Score</th>
                  <th className="p-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                    <td className="p-6">
                      <button onClick={() => setSelectedCandidate(c)} className="text-[10px] font-black uppercase text-indigo-600 hover:underline">Review AI Hits →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CANDIDATE INTEL MODAL */}
        {selectedCandidate && !showEmailPreview && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-8 text-white flex justify-between items-center">
                <h3 className="font-[900] italic uppercase tracking-tighter">Candidate Intel</h3>
                <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 text-xl">✕</button>
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-[900] italic uppercase mb-1">{selectedCandidate.name}</h4>
                <div className="mb-8 bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-widest">✨ AI Analysis Highlights</p>
                  <ul className="space-y-2">
                    {selectedCandidate.aiHits.map((hit, i) => <li key={i} className="text-sm font-bold text-slate-700">• {hit}</li>)}
                  </ul>
                </div>
                <button onClick={() => setShowEmailPreview(true)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-tighter hover:bg-indigo-700 shadow-xl shadow-indigo-100">Schedule Interview</button>
              </div>
            </div>
          </div>
        )}

        {/* BRANDED EMAIL PREVIEW */}
        {showEmailPreview && selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Branded Email Preview</span>
                <button onClick={() => setShowEmailPreview(false)} className="text-slate-400">Back to Intel</button>
              </div>
              
              <div className="p-12 bg-white">
                <div className="max-w-md mx-auto border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-[#0F172A] p-6 flex items-center gap-3">
                    <img src="/logo.png" className="w-6 h-6" alt="logo" />
                    <span className="text-white font-[900] italic uppercase text-sm tracking-tighter">Staff-IQ</span>
                  </div>
                  <div className="p-8 space-y-4">
                    <h5 className="text-xl font-[900] italic uppercase leading-tight">Great news, {selectedCandidate.name.split(' ')[0]}!</h5>
                    <p className="text-sm text-slate-600 leading-relaxed">Our AI team at <b>Staff-IQ</b> has reviewed your application for the <b>{selectedCandidate.role}</b> role, and we are impressed by your background.</p>
                    <p className="text-sm text-slate-600">We would love to schedule a 30-minute introductory call to discuss the next steps.</p>
                    <div className="py-4">
                      <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">Pick a Time 📅</button>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">Sent via Staff-IQ Automated Scheduling</p>
                  </div>
                </div>
                <button 
                  onClick={() => { alert('Email Sent!'); setShowEmailPreview(false); setSelectedCandidate(null); }}
                  className="w-full mt-10 py-5 bg-[#0F172A] text-white rounded-2xl font-[900] italic uppercase shadow-xl"
                >
                  Send Branded Invite 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
