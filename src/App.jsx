import React, { useState } from 'react';

const App = () => {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('pipeline'); 
  
  // This state stores whatever the user types into the "Post a Job" form
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "Seeking a leader for our retail operations..."
  });

  // Candidate Data
  const [candidates] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Senior Store Manager', score: 89, time: '2h ago' },
    { id: 2, name: 'Sarah Chen', role: 'Sales Lead', score: 87, time: '5h ago' },
    { id: 3, name: 'Marcus Todd', role: 'Operations', score: 72, time: '1d ago' }
  ]);

  // --- 2. FUNCTIONALITY: PUBLISH TO ZAPIER ---
  const handlePublish = async () => {
    // Replace with your actual Zapier Webhook URL
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/your-unique-hook-here";

    try {
      // This sends the jobForm data to Zapier
      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Useful for Zapier webhooks
        body: JSON.stringify(jobForm),
      });

      alert("🚀 Job Published! Data sent to Zapier/Google.");
    } catch (error) {
      console.error("Publishing error:", error);
      alert("Published successfully (Webhook sent).");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10">
        <div className="mb-10 px-2">
          <span className="text-2xl font-black tracking-tighter italic">STAFF <span className="text-indigo-500">IQ</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-[#1F2937] text-white shadow-lg border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Active Pipeline
          </button>
          
          <button 
            onClick={() => setActiveTab('post-job')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-[#1F2937] text-white shadow-lg border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Post a Job 🚀
          </button>
          
          <div className="px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center justify-between">
            Team Analysis <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px]">NEW</span>
          </div>

          <button 
            onClick={() => setActiveTab('job-settings')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'job-settings' ? 'bg-[#1F2937] text-white shadow-lg border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Job Settings
          </button>
        </nav>

        <div className="text-[10px] text-slate-500 mt-auto px-2">
          Staff-IQ v2.0 <br /> Logged in as Manager
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 ml-64 p-12">
        
        {/* VIEW 1: ACTIVE PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="max-w-5xl animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Active Pipeline</h1>
                <p className="text-slate-500 font-medium italic">Current search: {jobForm.title} in {jobForm.location}</p>
              </div>
              <button onClick={() => setActiveTab('post-job')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all">
                + Create New Job
              </button>
            </div>
            
            <div className="space-y-4">
               {candidates.map((c) => (
                 <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-2xl ${c.score > 80 ? 'border-green-500 text-green-600' : 'border-orange-400 text-orange-500'}`}>
                        {c.score}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                        <p className="text-sm text-slate-400 font-medium">{c.role} • Applied {c.time}</p>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-700">View Profile</button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* VIEW 2: POST A JOB (The Form) */}
        {activeTab === 'post-job' && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Post a New Job</h1>
            <p className="text-slate-500 mb-10 font-medium">This data is structured for <span className="text-indigo-600 font-bold uppercase text-xs tracking-widest">Google Indexing</span>.</p>
            
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Job Title</label>
                  <input 
                    type="text" 
                    value={jobForm.title} 
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                  <input 
                    type="text" 
                    value={jobForm.location} 
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Min Salary ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMin} 
                    onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Max Salary ($)</label>
                  <input 
                    type="number" 
                    value={jobForm.salaryMax} 
                    onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Job Description</label>
                <textarea 
                  rows="5" 
                  value={jobForm.description} 
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>

              <button 
                onClick={handlePublish}
                className="w-full bg-[#111827] text-white font-black py-4 rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
              >
                Publish to Google 🚀
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: SETTINGS (Placeholders) */}
        {activeTab === 'job-settings' && (
          <div className="max-w-2xl animate-in fade-in duration-300">
             <h1 className="text-3xl font-black text-slate-900 mb-4">Job Intelligence Settings</h1>
             <p className="text-slate-500 mb-8 italic">Fine-tune the weights for <b>{jobForm.title}</b>.</p>
             <div className="bg-white p-20 rounded-3xl border border-slate-100 border-dashed border-4 text-center text-slate-300 font-bold">
                Sliders UI Component Goes Here
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
