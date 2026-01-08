import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' or 'post-job'
  
  // Job Form State (What Google "Grabs")
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    company: "Staff IQ Demo",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "Seeking a dynamic leader to manage retail operations..."
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2">
          <span className="text-2xl font-black tracking-tighter">STAFF <span className="text-indigo-400 text-3xl">IQ</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            Active Pipeline
          </button>
          
          <button 
            onClick={() => setActiveTab('post-job')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            Post a New Job
          </button>
          
          <div className="px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest flex justify-between items-center">
            Team Analysis <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px]">NEW</span>
          </div>

          <button className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800">
            Job Settings
          </button>
        </nav>

        <div className="text-[10px] text-slate-500 font-medium">
          Staff-IQ v2.0 <br /> Logged in as Manager
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-10 overflow-y-auto">
        
        {activeTab === 'pipeline' ? (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Active Pipeline</h1>
            <p className="text-slate-500 mb-8 font-medium italic">Ranking candidates for: <span className="text-indigo-600 underline">{jobForm.title}</span></p>
            
            <div className="space-y-4">
              {/* Existing Pipeline View (Alex, Sarah, etc.) goes here */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-green-500">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-xl">89</div>
                  <div>
                    <h4 className="text-lg font-bold">Alex Rivera</h4>
                    <p className="text-sm text-slate-400 font-medium">Senior Store Manager • Applied 2h ago</p>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">View Profile</button>
              </div>
            </div>
          </div>
        ) : (
          /* NEW: POST A JOB SECTION */
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Post a New Job</h1>
            <p className="text-slate-500 mb-10 font-medium">This information will be automatically indexed by <span className="text-indigo-600 font-bold uppercase text-xs tracking-widest">Google for Jobs</span>.</p>
            
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Job Title</label>
                  <input 
                    type="text" 
                    value={jobForm.title} 
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Job Location</label>
                  <input 
                    type="text" 
                    value={jobForm.location} 
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Min Salary ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMin} 
                    onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Salary ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMax} 
                    onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Job Description</label>
                <textarea 
                  rows="6" 
                  value={jobForm.description} 
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                🚀 Publish to Google & Career Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
