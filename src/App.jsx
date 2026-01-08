import React, { useState } from 'react';

const App = () => {
  const [view, setView] = useState('candidates'); // 'candidates' or 'job-editor'
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [copied, setCopied] = useState(false);

  // 1. Slider State
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, color: 'bg-blue-100 text-blue-700', barColor: 'bg-blue-500', subtext: 'P&L, Inventory, Math' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, color: 'bg-purple-100 text-purple-700', barColor: 'bg-purple-500', subtext: 'Team Size, Training, Retention' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, color: 'bg-orange-100 text-orange-700', barColor: 'bg-orange-500', subtext: 'Scheduling, Merchandising, Safety' },
  ]);

  // 2. Job Posting State (The data Google "grabs")
  const [jobPosting, setJobPosting] = useState({
    title: "Store Manager",
    company: "Global Retail Corp",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: "We are seeking an experienced Store Manager to oversee daily operations..."
  });

  // 3. Mock Candidates
  const [candidates] = useState([
    { id: 1, name: 'Alex Rivera', status: 'New', summary: "High-performer in retail finance.", scores: { financial: 92, leadership: 55, operations: 40 }, matchedSkills: [{ name: 'P&L Management', cat: 'financial' }] },
    { id: 2, name: 'Jordan Smith', status: 'New', summary: "Leadership specialist.", scores: { financial: 40, leadership: 95, operations: 75 }, matchedSkills: [{ name: 'Retention Strategy', cat: 'leadership' }] }
  ]);

  // Proportional Slider Logic
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

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/jobs/store-manager");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rankedCandidates = [...candidates].sort((a, b) => calculateTotalScore(b.scores) - calculateTotalScore(a.scores));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* LEFT PANEL: ADMIN SETTINGS */}
      <div className="w-full lg:w-[400px] bg-white rounded-3xl shadow-xl border border-slate-100 p-8 h-fit lg:sticky lg:top-8">
        
        <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-2xl">
          <button onClick={() => setView('candidates')} className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${view === 'candidates' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Candidates</button>
          <button onClick={() => setView('job-editor')} className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${view === 'job-editor' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Job Details</button>
        </div>

        {view === 'candidates' ? (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Job Intelligence</h2>
            <p className="text-slate-500 mb-10 text-sm">Adjust weights to re-rank the candidate pool.</p>
            <div className="space-y-10">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-bold text-slate-700">{skill.label}</span>
                    <span className="text-2xl font-black text-slate-900">{Math.round(skill.value)}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={skill.value} onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500 space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Google Job Editor</h2>
            <p className="text-slate-500 text-sm mb-6">Details here are automatically optimized for Google Search.</p>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
              <input type="text" value={jobPosting.title} onChange={e => setJobPosting({...jobPosting, title: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Min Salary</label>
                <input type="number" value={jobPosting.salaryMin} onChange={e => setJobPosting({...jobPosting, salaryMin: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Max Salary</label>
                <input type="number" value={jobPosting.salaryMax} onChange={e => setJobPosting({...jobPosting, salaryMax: e.target.value})} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-green-600 transition-all">Publish Update</button>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: LIVE FEED */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{jobPosting.title}</h3>
            <p className="text-xs text-slate-400 font-medium">📍 {jobPosting.location} • {candidates.length} Applicants</p>
          </div>
          <button onClick={handleShareLink} className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all ${copied ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700'}`}>
            {copied ? '✓ Link Copied' : '🔗 Share Public Job Page'}
          </button>
        </div>

        {view === 'candidates' && rankedCandidates.map((c, index) => {
          const score = calculateTotalScore(c.scores);
          return (
            <div key={c.id} onClick={() => setActiveCandidate(activeCandidate === c.id ? null : c.id)} className={`bg-white rounded-3xl border p-6 transition-all cursor-pointer ${activeCandidate === c.id ? 'ring-2 ring-indigo-500' : 'border-slate-100 shadow-sm hover:shadow-md'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full font-black text-sm">#{index + 1}</span>
                  <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600">{Math.round(score)}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
