import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedJob, setSelectedJob] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- REUSABLE SAMPLE DATA ---
  const jobs = [
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active" },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active" },
    { id: 103, title: "Marketing Manager", dept: "Growth", location: "London", applicants: 25, status: "Paused" },
  ];

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", status: "Interviewing", score: "94%", source: "LinkedIn" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", status: "New", score: "88%", source: "Indeed" },
    { id: 3, name: "Elena Rodriguez", role: "Product Manager", status: "Offered", score: "91%", source: "Referral" },
  ];

  // --- AI GENERATION LOGIC ---
  const generateWithGemini = async () => {
    if (!title) return alert("Please enter a Job Title first!");
    const googleAI = window.google?.generativeAi;
    if (!googleAI) return alert("AI Library is still loading...");
    
    setIsGenerating(true);
    try {
      const genAI = new googleAI.GoogleGenerativeAI("YOUR_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a professional 3-paragraph job description for a ${title}.`;
      const result = await model.generateContent(prompt);
      setDescription(result.response.text());
    } catch (e) {
      alert("AI Error: Check your API Key in the code.");
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* SIDEBAR: LOGO UPDATED FROM PIC */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-20">
        <div className="mb-12 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center">
              <span className="text-indigo-400 text-lg">✦</span>
           </div>
           <h1 className="text-xl font-black italic tracking-tighter uppercase">STAFF IQ</h1>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedJob(null); }}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all flex items-center gap-3 ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-black italic tracking-tight">{activeTab}</h2>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Jan 2026</div>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Active Roles</p>
              <p className="text-4xl font-black text-indigo-600">12</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Total Candidates</p>
              <p className="text-4xl font-black text-emerald-500">458</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Interviews Scheduled</p>
              <p className="text-4xl font-black text-amber-500">12</p>
            </div>
          </div>
        )}

        {/* 2. JOBS VIEW WITH SMART TRACKING */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-black">{job.title}</h4>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{job.dept} • {job.location}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg"
                  >
                    Share & Track 🔗
                  </button>
                </div>
                {selectedJob?.id === job.id && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl animate-in slide-in-from-top-2">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Unique Tracking URLs</h5>
                    <div className="space-y-3">
                      {['LinkedIn', 'Indeed'].map(src => (
                        <div key={src} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-black w-16">{src}</span>
                          <input readOnly value={`https://staffiq.app/apply/${job.id}?source=${src.toLowerCase()}`} className="flex-1 text-[10px] font-mono text-slate-500 bg-transparent border-none outline-none" />
                          <button className="text-[10px] font-black text-indigo-600">COPY</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB VIEW */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border-none font-bold" placeholder="Job Title" />
                <input defaultValue="55,000" className="p-4 bg-slate-50 rounded-2xl border-none font-bold text-center" />
              </div>
              <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Description</span>
                 <button onClick={generateWithGemini} disabled={isGenerating} className="text-indigo-600 font-black text-xs">
                    {isGenerating ? "⌛ AI writing..." : "✨ Generate with Gemini"}
                 </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-80 p-6 bg-slate-50 rounded-3xl border-none mb-8 text-sm leading-relaxed" placeholder="Click 'Generate' to see magic..." />
              <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all">Publish Job 🚀</button>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES TABLE */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-6">Name</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Source</th>
                  <th className="p-6">AI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-sm text-slate-500">{c.role}</td>
                    <td className="p-6"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black">{c.source}</span></td>
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS VIEW */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Match Rate</h4>
                <div className="w-40 h-40 rounded-full border-[12px] border-indigo-500 mx-auto flex items-center justify-center">
                   <p className="text-3xl font-black italic">82%</p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Channel ROI</h4>
                <div className="space-y-6">
                   {['LinkedIn', 'Indeed', 'Referrals'].map((s, i) => (
                     <div key={s} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase"><span>{s}</span><span>{90 - (i*20)}%</span></div>
                        <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: `${90-(i*20)}%`}}></div></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
