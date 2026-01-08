import React, { useState } from 'react';

const App = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline', 'post-job', or 'job-settings'
  
  // Job Form State (For Google)
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "We are seeking a dynamic leader..."
  });

  // Slider State (For Job Settings)
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, subtext: 'Importance of P&L, Inventory, Math skills.' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, subtext: 'Importance of Team Size, Training, Retention.' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, subtext: 'Importance of Scheduling, Merchandising, Safety.' },
  ]);

  // Slider Logic (Forces 100% Total)
  const handleSliderChange = (id, newValue) => {
    setSkills((prevSkills) => {
      const changedIndex = prevSkills.findIndex((s) => s.id === id);
      const otherIndices = prevSkills.map((_, i) => i).filter((i) => i !== changedIndex);
      const diff = newValue - prevSkills[changedIndex].value;
      const othersSum = otherIndices.reduce((sum, i) => sum + prevSkills[i].value, 0);
      const newSkills = [...prevSkills];
      newSkills[changedIndex].value = newValue;
      if (othersSum === 0) {
        otherIndices.forEach((i) => { newSkills[i].value = (100 - newValue) / 2; });
      } else {
        otherIndices.forEach((i) => {
          const weight = prevSkills[i].value / othersSum;
          newSkills[i].value = Math.max(0, prevSkills[i].value - diff * weight);
        });
      }
      return newSkills;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10 px-2">
          <span className="text-2xl font-black tracking-tighter italic">STAFF <span className="text-indigo-500">IQ</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {/* TAB 1: PIPELINE */}
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-[#1F2937] text-white shadow-lg border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Active Pipeline
          </button>
          
          {/* TAB 2: POST A JOB (THIS WAS MISSING) */}
          <button 
            onClick={() => setActiveTab('post-job')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-[#1F2937] text-white shadow-lg border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Post a Job 🚀
          </button>
          
          <div className="px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center justify-between">
            Team Analysis <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px]">NEW</span>
          </div>

          {/* TAB 3: JOB SETTINGS */}
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
        
        {/* VIEW 1: ACTIVE PIPELINE (Matches Screenshot 1) */}
        {activeTab === 'pipeline' && (
          <div className="max-w-4xl animate-in fade-in duration-300">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Active Pipeline</h1>
            <p className="text-slate-500 mb-8 font-medium">Ranking candidates by Job Intelligence Score</p>
            
            <div className="space-y-4">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-xl">89</div>
                    <div>
                      <h4 className="text-lg font-bold">Alex Rivera</h4>
                      <p className="text-sm text-slate-400 font-medium">Senior Store Manager • Applied 2h ago</p>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-indigo-700">View Profile</button>
               </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-xl">87</div>
                    <div>
                      <h4 className="text-lg font-bold">Sarah Chen</h4>
                      <p className="text-sm text-slate-400 font-medium">Sales Lead • Applied 5h ago</p>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-indigo-700">View Profile</button>
               </div>
            </div>
          </div>
        )}

        {/* VIEW 2: POST A JOB (The New Feature) */}
        {activeTab === 'post-job' && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Post a New Job</h1>
            <p className="text-slate-500 mb-10 font-medium">This data is structured for <span className="text-indigo-600 font-bold uppercase text-xs tracking-widest">Google Indexing</span>.</p>
            
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Job Title</label>
                  <input type="text" value={jobForm.title} onChange={(e) => setJobForm({...jobForm, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                  <input type="text" value={jobForm.location} onChange={(e) => setJobForm({...jobForm, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Min Salary</label>
                  <input type="number" value={jobForm.salaryMin} onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Max Salary</label>
                  <input type="number" value={jobForm.salaryMax} onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900" />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                <textarea rows="5" value={jobForm.description} onChange={(e) => setJobForm({...jobForm, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <button className="w-full bg-[#111827] text-white font-black py-4 rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                Publish to Google
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: JOB SETTINGS (Matches Screenshot 2) */}
        {activeTab === 'job-settings' && (
          <div className="max-w-2xl animate-in fade-in duration-300">
             <h1 className="text-3xl font-black text-slate-900 mb-4">Job Intelligence Settings</h1>
             <p className="text-slate-500 mb-8">Tune the AI to prioritize the skills that matter for <span className="font-bold text-slate-700">Store Manager</span>.</p>
             
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-10">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-800">{skill.label}</span>
                      <span className="font-bold text-slate-900">{Math.round(skill.value)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={skill.value} 
                      onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))} 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <p className="text-xs text-slate-400 mt-2">{skill.subtext}</p>
                  </div>
                ))}
                
                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Save & Recalculate Scores
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
