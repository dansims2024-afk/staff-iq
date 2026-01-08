import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- MOCK DATA FOR ROBUSTNESS ---
  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", status: "Interviewing", score: "94%" },
    { id: 2, name: "Marcus Wright", role: "UX Designer", status: "New", score: "88%" },
    { id: 3, name: "Elena Rodriguez", role: "Product Manager", status: "Offered", score: "91%" },
    { id: 4, name: "James Wilson", role: "Senior Dev", status: "Rejected", score: "62%" },
  ];

  // --- AI LOGIC ---
  const generateWithGemini = async () => {
    if (!title) return alert("Enter a title first!");
    const googleAI = window.google?.generativeAi;
    if (!googleAI) return alert("AI Library still loading...");
    
    setIsGenerating(true);
    try {
      const genAI = new googleAI.GoogleGenerativeAI("YOUR_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Create a 3-paragraph job description and 3 interview questions for a ${title}.`;
      const result = await model.generateContent(prompt);
      setDescription(result.response.text());
    } catch (e) {
      alert("AI Error: Check your API Key");
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* SIDEBAR */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold italic text-white">S</div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Staff IQ</h1>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left p-3 px-5 rounded-xl font-bold transition-all flex items-center gap-3 ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tab === 'Dashboard' ? '📊' : tab === 'Post a Job' ? '🚀' : tab === 'Candidates' ? '👥' : '📈'} {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-black italic tracking-tight">{activeTab}</h2>
          <div className="text-sm font-bold text-slate-400">JANUARY 2026</div>
        </header>

        {/* 1. ROBUST DASHBOARD VIEW */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-black uppercase mb-2">Active Roles</p>
                <p className="text-4xl font-black">12</p>
                <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="bg-indigo-500 h-full w-2/3"></div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-black uppercase mb-2">Total Applicants</p>
                <p className="text-4xl font-black">458</p>
                <p className="text-emerald-500 text-xs font-bold mt-2">↑ 12% from last week</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-slate-400 text-xs font-black uppercase mb-2">Avg. Time to Hire</p>
                <p className="text-4xl font-black">18d</p>
                <p className="text-slate-400 text-xs font-bold mt-2">Industry avg: 24d</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="font-black uppercase text-xs text-slate-400 mb-6">Recent Activity</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">JD</div>
                          <div>
                             <p className="font-bold text-sm">New Application: John Doe</p>
                             <p className="text-xs text-slate-400">Senior Software Engineer • 2h ago</p>
                          </div>
                       </div>
                       <button className="text-xs font-bold text-indigo-600">View Profile →</button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* 2. FUNCTIONAL CANDIDATES TABLE */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <input placeholder="Search candidates..." className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-indigo-500" />
               <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Export CSV</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50">
                  <th className="p-6">Candidate Name</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">AI Fit Score</th>
                  <th className="p-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
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
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                    <td className="p-6">
                      <button className="text-slate-400 hover:text-indigo-600 font-bold text-xs">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. ROBUST POST A JOB VIEW */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Position Name</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Lead Designer" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Salary Range (Yearly)</label>
                  <input defaultValue="120,000 - 150,000" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-center font-bold" />
                </div>
              </div>
              <div className="flex justify-between mb-4 items-end">
                <label className="text-[10px] font-black text-slate-400 uppercase">AI Description & Interview Prep</label>
                <button onClick={generateWithGemini} disabled={isGenerating} className="text-indigo-600 font-black text-sm hover:underline">
                  {isGenerating ? "⌛ Thinking..." : "✨ Generate with Gemini"}
                </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-80 p-6 bg-slate-50 rounded-3xl border-none mb-8 outline-none leading-relaxed text-sm whitespace-pre-wrap" placeholder="Click 'Generate' to use Gemini 1.5 Flash..." />
              <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all transform hover:scale-[1.01] shadow-xl">
                Publish Requisition 🚀
              </button>
            </div>

            <div className="w-80 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Market Health</p>
                <h3 className={`text-2xl font-black italic ${title ? 'text-slate-900' : 'text-slate-200'}`}>{title || "Awaiting Title"}</h3>
                <div className="mt-6 space-y-4">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400">DEMAND</p>
                      <p className="font-bold text-emerald-500">Very High 🔥</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400">CANDIDATE AVAILABILITY</p>
                      <p className="font-bold text-amber-500">Scarce (Top 5%)</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
