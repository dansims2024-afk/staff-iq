import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('pipeline'); 
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [autoReplyText, setAutoReplyText] = useState("");
  
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Store Manager', score: 89, time: '2h ago', status: 'Screening', bio: 'Experienced retail leader.', skills: ['P&L', 'Leadership'] },
  ]);

  // --- GEMINI: GENERATE AUTO-REPLY ---
  const generateAutoReply = () => {
    setIsGeneratingEmail(true);
    // Simulating Gemini's response for an SEO-optimized, friendly reply
    setTimeout(() => {
      const template = `Hi {{candidate_name}},\n\nThank you for applying for the position at Staff IQ! Our team has received your resume, and our AI-matching engine is currently reviewing your qualifications against our requirements. \n\nWe pride ourselves on a fast hiring process and will be in touch within 48 hours if there is a match. In the meantime, feel free to check out our team page!\n\nBest regards,\nThe Hiring Team`;
      setAutoReplyText(template);
      setIsGeneratingEmail(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10">
        <div className="mb-10 px-2 font-black italic text-2xl tracking-tighter uppercase underline decoration-indigo-500">Staff IQ</div>
        <nav className="flex-1 space-y-2 text-sm">
          <button onClick={() => setActiveTab('pipeline')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'pipeline' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Candidate Pipeline</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'settings' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>ATS Settings</button>
          <button onClick={() => setActiveTab('post-job')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'post-job' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Post a Job 🚀</button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-12">
        
        {/* SETTINGS VIEW with EMAIL GENERATOR */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-black mb-2">ATS Settings</h1>
            <p className="text-slate-500 mb-10 font-medium">Automate your candidate communications with Gemini AI.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT: Channel Settings */}
              <div className="bg-white rounded-[2.5rem] shadow-sm p-10 border border-slate-100">
                <h4 className="font-black text-slate-900 mb-6">Inbound Channels</h4>
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 mb-6">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Inbound Email</p>
                  <p className="text-indigo-900 font-bold">jobs@staff-iq.com</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Auto-Reply Status</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-inner">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: EMAIL COMPOSER */}
              <div className="bg-white rounded-[2.5rem] shadow-sm p-10 border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-black text-slate-900">Auto-Reply Template</h4>
                  <button 
                    onClick={generateAutoReply}
                    className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1 hover:underline"
                  >
                    {isGeneratingEmail ? "✨ Writing..." : "✨ Reset with Gemini"}
                  </button>
                </div>
                
                <textarea 
                  value={autoReplyText}
                  onChange={(e) => setAutoReplyText(e.target.value)}
                  placeholder="Tell Gemini to write a professional response..."
                  className="w-full h-64 bg-slate-50 border-none rounded-3xl p-6 text-sm font-medium leading-relaxed text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                
                <button className="w-full mt-6 py-4 bg-[#0F172A] text-white font-black rounded-2xl text-xs uppercase tracking-widest">
                  Save Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PIPELINE VIEW */}
        {activeTab === 'pipeline' && (
          <div className="max-w-5xl animate-in fade-in">
            <h1 className="text-4xl font-black mb-10">Candidate Pipeline</h1>
            <div className="space-y-4">
              {candidates.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600">{c.score}</div>
                    <div>
                      <h4 className="font-black text-lg">{c.name}</h4>
                      <p className="text-xs font-bold text-slate-400">{c.role}</p>
                    </div>
                  </div>
                  <button className="bg-slate-100 px-6 py-3 rounded-xl font-bold text-xs">View Profile</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
