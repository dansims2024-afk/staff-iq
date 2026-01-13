import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedJob, setSelectedJob] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- SAMPLE DATA ---
  const jobs = [
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42 },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18 },
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
      alert("AI Error: Check your API Key.");
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* SIDEBAR WITH UPDATED BRANDING */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ Logo" className="w-8 h-8 object-contain" />
             {/* Matching font: Heavy, Italicized, Tight spacing */}
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">
               Staff-IQ
             </h1>
          </div>
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-11 leading-none">
            Elite Candidate Screening
          </p>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedJob(null); }}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all flex items-center gap-3 ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
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
          <h2 className="text-4xl font-[900] italic tracking-tight uppercase">
            {activeTab}
          </h2>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">JAN 2026</div>
        </header>

        {/* DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Live Roles</p>
              <p className="text-4xl font-[900] italic">{jobs.length}</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Applicants</p>
              <p className="text-4xl font-[900] italic">458</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Interviews</p>
              <p className="text-4xl font-[900] italic">12</p>
            </div>
          </div>
        )}

        {/* JOBS VIEW */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-[900] italic uppercase">{job.title}</h4>
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
                          <input readOnly value={`https://staff-iq.app/apply/${job.id}?source=${src.toLowerCase()}`} className="flex-1 text-[10px] font-mono text-slate-500 bg-transparent border-none outline-none" />
                          <button className="text-[10px] font-black text-indigo-600" onClick={() => alert('Link Copied!')}>COPY</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* POST A JOB VIEW */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Job Title" />
                <input defaultValue="120,000 - 150,000" className="p-4 bg-slate-50 rounded-2xl border-none font-bold text-center" />
              </div>
              <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Description</span>
                 <button onClick={generateWithGemini} disabled={isGenerating} className="text-indigo-600 font-black text-xs hover:underline">
                    {isGenerating ? "⌛ AI writing..." : "✨ Generate with Gemini"}
                 </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-80 p-6 bg-slate-50 rounded-3xl border-none mb-8 text-sm leading-relaxed" placeholder="Click 'Generate' to see magic..." />
              <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all">Publish Job 🚀</button>
            </div>
          </div>
        )}

        {/* CANDIDATES TABLE */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-6">Name</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Source</th>
                  <th className="p-6">AI Fit Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-sm text-slate-500">{c.role}</td>
                    <td className="p-6"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">{c.source}</span></td>
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Match Rate</h4>
                <div className="w-48 h-48 rounded-full border-[12px] border-indigo-500 mx-auto flex items-center justify-center">
                   <p className="text-4xl font-[900] italic">82%</p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Channel ROI</h4>
                <div className="space-y-6">
                   {['LinkedIn', 'Indeed', 'Referrals'].map((s, i) => (
                     <div key={s} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500"><span>{s}</span><span>{90 - (i*20)}%</span></div>
                        <div className="h-2.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: `${90-(i*20)}%`}}></div></div>
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
