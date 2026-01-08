import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- SAMPLE DATA ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", type: "Full-time", location: "Remote", applicants: 42 },
    { id: 102, title: "Product Designer", dept: "Design", type: "Contract", location: "New York", applicants: 18 },
    { id: 103, title: "Marketing Manager", dept: "Growth", type: "Full-time", location: "London", applicants: 25 },
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", status: "Interviewing", score: "94%", date: "2026-01-05" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", status: "New", score: "88%", date: "2026-01-07" },
    { id: 3, name: "Elena Rodriguez", role: "Product Manager", status: "Offered", score: "91%", date: "2026-01-04" },
    { id: 4, name: "James Wilson", role: "Senior Dev", status: "Rejected", score: "62%", date: "2025-12-28" },
  ];

  // --- FUNCTIONS ---
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
      
      {/* SIDEBAR */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl">
        <div className="mb-12 flex items-center gap-2">
           {/* Updated Logo from Pic */}
           <div className="w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center">
              <span className="text-indigo-400 text-lg">✦</span>
           </div>
           <h1 className="text-xl font-black italic tracking-tighter uppercase">STAFF IQ</h1>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          {[
            { id: 'Dashboard', icon: '📊' },
            { id: 'Jobs', icon: '💼' },
            { id: 'Post a Job', icon: '🚀' },
            { id: 'Candidates', icon: '👥' },
            { id: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all flex items-center gap-3 ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="text-lg">{tab.icon}</span> {tab.id}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-black italic tracking-tight">{activeTab}</h2>
          <div className="text-sm font-bold text-slate-400 tracking-widest uppercase">Jan 2026</div>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Active Roles</p>
                <p className="text-4xl font-black text-indigo-600">{jobs.length}</p>
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
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="font-black uppercase text-xs text-slate-400 mb-6 tracking-widest">Recruitment Pipeline</h3>
               <div className="h-40 flex items-end gap-4 px-4">
                  {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-50 rounded-t-xl transition-all hover:bg-indigo-500 group relative" style={{height: `${h}%`}}></div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* 2. JOBS VIEW */}
        {activeTab === 'Jobs' && (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <h4 className="text-lg font-black">{job.title}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs font-bold text-slate-400">📍 {job.location}</span>
                    <span className="text-xs font-bold text-indigo-500">📁 {job.dept}</span>
                    <span className="text-xs font-bold text-emerald-500">⏱ {job.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-right">
                  <div>
                    <p className="text-sm font-black">{job.applicants}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Applicants</p>
                  </div>
                  <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black">Edit Job</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB VIEW */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Job Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Senior Product Designer" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Salary Range</label>
                  <input defaultValue="120,000 - 150,000" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-center font-bold" />
                </div>
              </div>
              <div className="flex justify-between mb-4 items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase">AI Description Generation</label>
                <button onClick={generateWithGemini} disabled={isGenerating} className="text-indigo-600 font-black text-sm">
                  {isGenerating ? "⌛ Writing..." : "✨ Generate with Gemini"}
                </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-80 p-6 bg-slate-50 rounded-3xl border-none mb-8 outline-none leading-relaxed text-sm" placeholder="AI-generated content will appear here..." />
              <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl">
                Publish Requisition 🚀
              </button>
            </div>
            
            <div className="w-80">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Market Health</p>
                  <h3 className={`text-2xl font-black italic ${title ? 'text-slate-900' : 'text-slate-200'}`}>{title || "Awaiting Title"}</h3>
                  <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Local Competition</p>
                     <p className="font-black text-emerald-500">Moderate</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES VIEW */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="p-6">Name</th>
                  <th className="p-6">Desired Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">AI Fit Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-sm text-slate-500">{c.role}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        c.status === 'Offered' ? 'bg-emerald-100 text-emerald-700' : 
                        c.status === 'Interviewing' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-6 text-center font-mono font-bold text-indigo-600">{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS VIEW */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-500">
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-xs text-slate-400 uppercase mb-8">Diversity Analytics</h4>
                <div className="w-48 h-48 rounded-full border-[16px] border-indigo-500 mx-auto relative flex items-center justify-center">
                   <div className="text-center">
                      <p className="text-2xl font-black">82%</p>
                      <p className="text-[10px] font-bold text-slate-400">Match Rate</p>
                   </div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-xs text-slate-400 uppercase mb-8">Channel Effectiveness</h4>
                <div className="space-y-6">
                   {['LinkedIn', 'Indeed', 'Referrals'].map((source, i) => (
                     <div key={source}>
                        <div className="flex justify-between text-xs font-bold mb-1">
                           <span>{source}</span>
                           <span>{90 - (i*20)}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500" style={{width: `${90-(i*20)}%`}}></div>
                        </div>
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
