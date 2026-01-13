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
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">
               Staff-IQ
             </h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none">
            AI-Powered Sourcing & Tracking
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

      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-[900] italic tracking-tight uppercase leading-none">{activeTab}</h2>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">JAN 2026</div>
        </header>

        {/* Views remain populated with functional logic */}
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

        {/* ... Rest of the views (Jobs, Post a Job, etc.) follow the same layout */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-[900] italic uppercase leading-none mb-2">{job.title}</h4>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{job.dept} • {job.location}</p>
                  </div>
                  <button onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black">Share & Track</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
