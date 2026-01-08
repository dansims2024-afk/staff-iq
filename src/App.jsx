import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('pipeline'); 
  const [isGenerating, setIsGenerating] = useState(false);
  
  // --- STATE: JOBS & CANDIDATES ---
  const [jobs, setJobs] = useState([
    { id: 101, title: "Store Manager", location: "Plainsboro, NJ", status: "Active", applicants: 15 },
  ]);

  const [jobForm, setJobForm] = useState({
    title: "",
    location: "",
    salaryMin: "60000",
    salaryMax: "80000",
    description: ""
  });

  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Store Manager', score: 89, time: '2h ago', status: 'Screening', skills: ['P&L', 'Leadership'] },
  ]);

  // --- GEMINI FUNCTIONS ---
  const generateAIDescription = () => {
    if (!jobForm.title) return alert("Enter a Job Title first!");
    setIsGenerating(true);
    setTimeout(() => {
      const aiText = `Join Staff IQ as our next ${jobForm.title}! We are looking for a leader in ${jobForm.location} who can drive sales and manage high-performing teams. Key responsibilities include hitting monthly targets and maintaining excellence in customer service.`;
      setJobForm({ ...jobForm, description: aiText });
      setIsGenerating(false);
    }, 1200);
  };

  const handlePublish = () => {
    if (!jobForm.title) return alert("Title is required");
    const newJob = { 
      id: Date.now(), 
      title: jobForm.title, 
      location: jobForm.location, 
      status: "Active", 
      applicants: 0 
    };
    setJobs([newJob, ...jobs]);
    setActiveTab('manage-jobs'); // Directs to the hub after posting
    alert("🚀 Job Published to your Dashboard!");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="mb-10 px-2 font-black italic text-2xl tracking-tighter uppercase underline decoration-indigo-500">Staff IQ</div>
        <nav className="flex-1 space-y-2 text-sm">
          <button onClick={() => setActiveTab('pipeline')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Candidate Pipeline</button>
          <button onClick={() => setActiveTab('manage-jobs')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'manage-jobs' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Manage Jobs</button>
          <div className="pt-4 pb-2 px-4 text-[10px] uppercase tracking-widest text-slate-500 font-black">Hiring Tools</div>
          <button onClick={() => setActiveTab('post-job')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Post a Job 🚀</button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-12">
        
        {/* VIEW: POST A JOB (RESTORED) */}
        {activeTab === 'post-job' && (
          <div className="max-w-3xl animate-in slide-in-from-bottom-6 duration-500">
            <h1 className="text-4xl font-black mb-2 text-slate-900">Create a Posting</h1>
            <p className="text-slate-500 mb-10 font-medium italic">Gemini will optimize this for Google Job Search SEO.</p>
            
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 space-y-8 border border-slate-50">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Job Title</label>
                  <input type="text" placeholder="e.g. Store Manager" value={jobForm.title} onChange={(e) => setJobForm({...jobForm, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Location</label>
                  <input type="text" placeholder="e.g. Plainsboro, NJ" value={jobForm.location} onChange={(e) => setJobForm({...jobForm, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Description</label>
                  <button onClick={generateAIDescription} className="text-xs font-black text-indigo-600 hover:scale-105 transition-transform">
                    {isGenerating ? "✨ Gemini is writing..." : "✨ Generate with AI"}
                  </button>
                </div>
                <textarea rows="6" value={jobForm.description} onChange={(e) => setJobForm({...jobForm, description: e.target.value})} className="w-full bg-slate-50 border-none rounded-3xl p-6 text-slate-600 font-medium leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe the role or use AI..." />
              </div>

              <button onClick={handlePublish} className="w-full bg-[#0F172A] text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 text-lg">
                Publish to Dashboard & Google 🚀
              </button>
            </div>
          </div>
        )}

        {/* VIEW: MANAGE JOBS */}
        {activeTab === 'manage-jobs' && (
          <div className="max-w-4xl animate-in fade-in">
             <h1 className="text-3xl font-black mb-8">Your Open Jobs</h1>
             <div className="grid grid-cols-1 gap-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm hover:border-indigo-200 transition-all">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{job.title}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{job.location} • <span className="text-green-500">Active</span></p>
                    </div>
                    <div className="text-center bg-indigo-50 px-6 py-2 rounded-2xl">
                      <div className="text-2xl font-black text-indigo-600">{job.applicants}</div>
                      <div className="text-[9px] uppercase font-black text-indigo-300">Applicants</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* VIEW: PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="max-w-4xl animate-in fade-in">
            <h1 className="text-4xl font-black mb-10">Candidate Pipeline</h1>
            {candidates.map((c) => (
              <div key={c.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-2xl">{c.score}</div>
                  <div>
                    <h4 className="text-xl font-bold">{c.name}</h4>
                    <p className="text-slate-400">{c.role} • {c.time}</p>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">Profile</button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
