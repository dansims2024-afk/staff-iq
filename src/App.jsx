import React, { useState } from 'react';

const App = () => {
  // Navigation state: 'pipeline', 'job-settings', or 'post-job'
  const [activeTab, setActiveTab] = useState('pipeline');
  
  // Job Form State (The data Google "grabs")
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    company: "Staff IQ",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "We are seeking a dynamic leader..."
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-[#111827] text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10 px-2 text-2xl font-black italic tracking-tighter">
          STAFF <span className="text-indigo-500">IQ</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-[#1F2937] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Active Pipeline
          </button>
          
          <button 
            onClick={() => setActiveTab('post-job')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-[#1F2937] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Post a Job 🚀
          </button>

          <div className="px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center justify-between">
            Team Analysis <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px]">NEW</span>
          </div>

          <button 
            onClick={() => setActiveTab('job-settings')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'job-settings' ? 'bg-[#1F2937] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Job Settings
          </button>
        </nav>

        <div className="text-[10px] text-slate-500 mt-auto px-2">
          Staff-IQ v2.0 <br /> Logged in as Manager
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-72 p-12">
        
        {/* VIEW 1: ACTIVE PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Active Pipeline</h1>
            <p className="text-slate-500 mb-10">Ranking candidates by Job Intelligence Score</p>
            
            <div className="space-y-4">
               {/* alex, sarah, etc cards go here */}
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-xl">89</div>
                    <div>
                      <h4 className="text-xl font-bold">Alex Rivera</h4>
                      <p className="text-sm text-slate-400">Senior Store Manager • Applied 2h ago</p>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100">View Profile</button>
               </div>
            </div>
          </div>
        )}

        {/* VIEW 2: POST A JOB (The Missing Piece) */}
        {activeTab === 'post-job' && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Create Job Posting</h1>
            <p className="text-slate-500 mb-10">This data is automatically structured for <span className="text-indigo-600 font-bold uppercase text-xs tracking-widest">Google Jobs</span>.</p>
            
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Job Title</label>
                  <input 
                    type="text" 
                    value={jobForm.title} 
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Location</label>
                  <input 
                    type="text" 
                    value={jobForm.location} 
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Salary Min ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMin} 
                    onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Salary Max ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMax} 
                    onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Description (For Google Search)</label>
                <textarea 
                  rows="6" 
                  value={jobForm.description} 
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-medium text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <button className="w-full bg-[#111827] text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                Publish to Google for Jobs 🚀
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: JOB SETTINGS (Your existing sliders) */}
        {activeTab === 'job-settings' && (
          <div className="max-w-2xl animate-in fade-in duration-500">
             <h1 className="text-4xl font-black text-slate-900 mb-2">Job Intelligence Settings</h1>
             <p className="text-slate-500 mb-10 italic">Tune the AI to prioritize the skills that matter for <b>{jobForm.title}</b>.</p>
             {/* sliders UI goes here */}
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-bold mb-4 uppercase text-xs tracking-widest">Adjustment Panel</p>
                <div className="h-40 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-400 font-bold italic">
                  Slider UI Loaded
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
