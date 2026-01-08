import React, { useState } from 'react';

const App = () => {
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [copied, setCopied] = useState(false);

  // 1. Sliders State (Forces 100%)
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, color: 'bg-blue-100 text-blue-700', barColor: 'bg-blue-500', subtext: 'P&L, Inventory, Math' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, color: 'bg-purple-100 text-purple-700', barColor: 'bg-purple-500', subtext: 'Team Size, Training, Retention' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, color: 'bg-orange-100 text-orange-700', barColor: 'bg-orange-500', subtext: 'Scheduling, Merchandising, Safety' },
  ]);

  // 2. NEW: The "Post a Job" Form State
  // These fields are specifically required by Google Jobs (Schema.org)
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    company: "Global Retail Corp",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "We are seeking an experienced Store Manager to oversee daily operations..."
  });

  // 3. Mock Candidates
  const [candidates] = useState([
    { id: 1, name: 'Alex Rivera', scores: { financial: 92, leadership: 55, operations: 40 }, summary: "Finance expert.", matchedSkills: [{name: 'P&L', cat: 'financial'}] },
    { id: 2, name: 'Jordan Smith', scores: { financial: 40, leadership: 95, operations: 75 }, summary: "Leadership pro.", matchedSkills: [{name: 'Retention', cat: 'leadership'}] }
  ]);

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

  const calculateTotalScore = (candidateScores) => {
    return skills.reduce((total, skill) => total + (candidateScores[skill.id] * (skill.value / 100)), 0);
  };

  const handlePublish = () => {
    alert(`Published to Google! \nTitle: ${jobForm.title} \nLocation: ${jobForm.location}`);
    // Here you would normally send jobForm to your database
  };

  const rankedCandidates = [...candidates].sort((a, b) => calculateTotalScore(b.scores) - calculateTotalScore(a.scores));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* LEFT: ADMIN SETTINGS & SLIDERS */}
      <div className="w-full lg:w-[400px] space-y-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 h-fit sticky top-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Job Intelligence</h2>
          <p className="text-slate-500 mb-10 text-sm italic">Rank candidates based on priority.</p>
          <div className="space-y-12">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-end mb-4">
                  <span className="font-bold text-slate-800">{skill.label}</span>
                  <span className="text-2xl font-black text-slate-900">{Math.round(skill.value)}%</span>
                </div>
                <input type="range" min="0" max="100" value={skill.value} onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: JOB POSTER & CANDIDATE LIST */}
      <div className="flex-1 space-y-8">
        
        {/* SECTION: POST A JOB (The Input Area) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-900">Post to Google Jobs</h3>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">Live Sync Active</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
                <input type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Min Salary</label>
                  <input type="number" value={jobForm.salaryMin} onChange={e => setJobForm({...jobForm, salaryMin: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Max Salary</label>
                  <input type="number" value={jobForm.salaryMax} onChange={e => setJobForm({...jobForm, salaryMax: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col h-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Job Description</label>
              <textarea value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm min-h-[150px] outline-none" placeholder="Describe the role..."></textarea>
              <button onClick={handlePublish} className="w-full mt-4 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition-all shadow-lg">
                Publish to Google & Share Link
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: RANKED CANDIDATES */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 px-2">Top Matches for {jobForm.title}</h3>
          {rankedCandidates.map((c, index) => {
            const score = calculateTotalScore(c.scores);
            return (
              <div key={c.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full font-black text-sm">#{index + 1}</span>
                  <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600 leading-none">{Math.round(score)}% Match</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default App;
