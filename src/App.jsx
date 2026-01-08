import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [jobForm, setJobForm] = useState({ title: '', location: '', salary: '' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- NEW TOP NAVIGATION BAR --- */}
      <div className="bg-[#0F172A] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-2xl font-black italic tracking-tighter">
            STAFF <span className="text-indigo-500">IQ</span>
          </div>

          {/* Top Tabs */}
          <div className="flex gap-1 bg-[#1E293B] p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'pipeline' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Active Pipeline
            </button>
            <button 
              onClick={() => setActiveTab('post-job')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'post-job' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              + Post a Job
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Settings
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-slate-400">LOGGED IN AS</div>
              <div className="text-sm font-bold">Dan Sims</div>
            </div>
            <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">DS</div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto p-8">
        
        {/* VIEW 1: PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Candidate Pipeline</h1>
                <p className="text-slate-500 font-medium">Active Store Manager Role</p>
              </div>
              <button onClick={() => setActiveTab('post-job')} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors">
                Create New Posting
              </button>
            </div>
            
            {/* Candidate Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-black text-green-600 border-4 border-white shadow-sm">92</div>
                <div>
                  <h3 className="text-xl font-bold">Alex Rivera</h3>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Top Match</p>
                </div>
              </div>
              <button className="text-indigo-600 font-bold border border-indigo-100 px-6 py-3 rounded-xl hover:bg-indigo-50">View Profile</button>
            </div>
          </div>
        )}

        {/* VIEW 2: POST A JOB */}
        {activeTab === 'post-job' && (
          <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900">Post to Google Jobs</h2>
                <p className="text-slate-500 mt-2">Create a structured posting instantly.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Job Title</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Store Manager" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. New York, NY" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Salary Range</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="$60k - $80k" />
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-black py-5 rounded-xl text-lg hover:bg-indigo-700 transition-transform active:scale-95 shadow-xl shadow-indigo-200">
                  Publish Job Now 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SETTINGS */}
        {activeTab === 'settings' && (
           <div className="text-center py-20">
             <h2 className="text-2xl font-bold text-slate-400">Settings Panel</h2>
           </div>
        )}

      </div>
    </div>
  );
};

export default App;
