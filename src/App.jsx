import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [googleOptimized, setGoogleOptimized] = useState(true);

  // --- 1. JOB / PROJECT REPOSITORY DATA ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active" },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active" },
    { id: 103, title: "Marketing Lead", dept: "Growth", location: "London", applicants: 0, status: "Draft" }, // "Holding" project
  ]);

  // --- 2. CANDIDATES WITH RESUME EVALUATION DATA ---
  const candidates = [
    { 
      id: 1, name: "Sarah Chen", role: "Senior Dev", status: "New", score: "94%", source: "LinkedIn",
      resumeAnalysis: {
        summary: "Strong fit. Ex-Google engineer with required React experience.",
        pros: ["5+ years React/Node.js", "Managed team of 10", "CS Degree from Stanford"],
        cons: ["Salary expectation is high", "Remote only"],
        recommendation: "Strong Hire"
      }
    },
    { 
      id: 2, name: "Marcus Wright", role: "UX Designer", status: "New", score: "88%", source: "Indeed",
      resumeAnalysis: {
        summary: "Good portfolio but lacks specific SaaS experience.",
        pros: ["Award-winning visual design", "Expert in Figma", "Available immediately"],
        cons: ["No B2B experience", "Lacks HTML/CSS knowledge"],
        recommendation: "Interview"
      }
    },
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
      const prompt = `Write a professional job description for a ${title}. Include a section on "Why Google for Jobs should index this".`;
      const result = await model.generateContent(prompt);
      setDescription(result.response.text());
    } catch (e) {
      alert("AI Error: Check API Key");
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* SIDEBAR */}
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
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end">
          <h2 className="text-4xl font-[900] italic uppercase tracking-tight">{activeTab}</h2>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Recruiter Console</span>
        </header>

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Active Projects</p>
              <p className="text-4xl font-[900] italic text-indigo-600">3</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Total Resumes</p>
              <p className="text-4xl font-[900] italic text-emerald-500">458</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Avg AI Score</p>
              <p className="text-4xl font-[900] italic text-amber-500">82%</p>
            </div>
          </div>
        )}

        {/* 2. JOBS (PROJECT HOLDER) TAB */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-[900] italic uppercase leading-none">{job.title}</h4>
                    {/* Status Badges */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{job.dept} • {job.location}</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-100">Edit Project</button>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-200">View Applicants ({job.applicants})</button>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-3xl text-slate-400 font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-500 transition-all">
              + Create New Project Holder
            </button>
          </div>
        )}

        {/* 3. POST A JOB TAB (WITH GOOGLE FEATURE) */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="mb-8">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-indigo-500 mb-4" placeholder="Job Title" />
                
                {/* NEW GOOGLE FOR JOBS FEATURE */}
                <div 
                  onClick={() => setGoogleOptimized(!googleOptimized)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${googleOptimized ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">G</div>
                    <div>
                      <p className="font-black text-xs uppercase tracking-widest text-slate-700">Google for Jobs Integration</p>
                      <p className="text-[10px] text-slate-500">Automatically generate Schema.org JSON-LD for free listing.</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${googleOptimized ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                    {googleOptimized && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Description</span>
                 <button onClick={generateWithGemini} disabled={isGenerating} className="text-indigo-600 font-black text-xs hover:underline">
                    {isGenerating ? "⌛ AI writing..." : "✨ Generate with Gemini"}
                 </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-64 p-6 bg-slate-50 rounded-3xl border-none mb-8 text-sm leading-relaxed" placeholder="Description..." />
              <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl">
                Publish & Index on Google 🚀
              </button>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES TAB (WITH AI RESUME EVALUATOR) */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-6">Name</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">AI Match</th>
                  <th className="p-6">Resume Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-sm text-slate-500">{c.role}</td>
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => setSelectedCandidate(c)}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wide hover:bg-indigo-100 transition-colors"
                      >
                        ⚡ Evaluate Resume
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS TAB */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Overall Match Rate</h4>
                <div className="w-48 h-48 rounded-full border-[12px] border-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-100">
                   <p className="text-4xl font-[900] italic">82%</p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Source ROI</h4>
                <div className="space-y-6">
                   {['LinkedIn', 'Google Jobs', 'Indeed'].map((s, i) => (
                     <div key={s} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500"><span>{s}</span><span>{90 - (i*15)}%</span></div>
                        <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: `${90-(i*15)}%`}}></div></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* RESUME EVALUATION MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-8 text-white flex justify-between items-center">
                <h3 className="font-[900] italic uppercase tracking-tighter">Resume Evaluation</h3>
                <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 text-xl">✕</button>
              </div>
              <div className="p-10">
                <div className="mb-6">
                  <h4 className="text-2xl font-[900] italic uppercase mb-1">{selectedCandidate.name}</h4>
                  <p className="text-sm font-bold text-slate-500">{selectedCandidate.resumeAnalysis.summary}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Pros</p>
                    <ul className="text-xs font-bold text-emerald-800 space-y-1">
                      {selectedCandidate.resumeAnalysis.pros.map(p => <li key={p}>+ {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">Cons</p>
                    <ul className="text-xs font-bold text-rose-800 space-y-1">
                      {selectedCandidate.resumeAnalysis.cons.map(c => <li key={c}>- {c}</li>)}
                    </ul>
                  </div>
                </div>

                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl">
                  {selectedCandidate.resumeAnalysis.recommendation === "Strong Hire" ? "Move to Interview 📅" : "Send Rejection ✕"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
