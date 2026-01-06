import React, { useState } from 'react';

const App = () => {
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Slider State - Forces 100% Total
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, color: 'bg-blue-100 text-blue-700', barColor: 'bg-blue-500', subtext: 'P&L, Inventory, Math' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, color: 'bg-purple-100 text-purple-700', barColor: 'bg-purple-500', subtext: 'Team Size, Training, Retention' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, color: 'bg-orange-100 text-orange-700', barColor: 'bg-orange-500', subtext: 'Scheduling, Merchandising, Safety' },
  ]);

  // 2. Mock Candidate Data with Status & Evidence
  const [candidates, setCandidates] = useState([
    { 
      id: 1, 
      name: 'Alex Rivera', 
      status: 'New',
      summary: "High-performer in retail finance. Managed a $2M annual budget and improved team efficiency by 15%.",
      scores: { financial: 92, leadership: 55, operations: 40 },
      matchedSkills: [
        { name: 'P&L Management', cat: 'financial' },
        { name: 'Budgeting', cat: 'financial' },
        { name: 'Staff Training', cat: 'leadership' }
      ]
    },
    { 
      id: 2, 
      name: 'Jordan Smith', 
      status: 'New',
      summary: "Leadership specialist. Reduced staff turnover by 40% over two years through mentor programs.",
      scores: { financial: 40, leadership: 95, operations: 75 },
      matchedSkills: [
        { name: 'Conflict Resolution', cat: 'leadership' },
        { name: 'Retention Strategy', cat: 'leadership' },
        { name: 'Inventory Control', cat: 'operations' }
      ]
    }
  ]);

  // Proportional Logic for Sliders
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

  const updateStatus = (id, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const rankedCandidates = [...candidates].sort((a, b) => calculateTotalScore(b.scores) - calculateTotalScore(a.scores));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* LEFT: Controls (The Tool) */}
      <div className="w-full lg:w-[400px] bg-white rounded-3xl shadow-xl border border-slate-100 p-8 h-fit lg:sticky lg:top-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Job Intelligence</h2>
        <p className="text-slate-500 mb-10 text-sm">Tune the AI to prioritize what matters. Rankings update instantly.</p>

        <div className="space-y-12">
          {skills.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 tracking-tight">{skill.label}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{skill.subtext}</p>
                </div>
                <span className="text-2xl font-black text-slate-900">{Math.round(skill.value)}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={skill.value}
                onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:bg-slate-200"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-bold text-slate-400 uppercase text-center tracking-widest">Total Weight: 100%</p>
        </div>
      </div>

      {/* RIGHT: Feed & Details (The Workflow) */}
      <div className="flex-1 space-y-6">
        
        {/* Batch Upload Section */}
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
          <span className="text-2xl mb-2 block group-hover:scale-125 transition-transform">📄</span>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Batch Upload Resumes</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Drag & Drop multiple PDFs to compare candidates instantly</p>
        </div>

        <div className="flex justify-between items-center px-2">
          <h3 className="text-lg font-bold text-slate-800">Ranked Results</h3>
          <span className="text-xs font-semibold text-slate-400 tracking-tight italic">Sorted by AI Match Score</span>
        </div>

        {rankedCandidates.map((c, index) => {
          const score = calculateTotalScore(c.scores);
          const isActive = activeCandidate?.id === c.id;

          return (
            <div 
              key={c.id} 
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${isActive ? 'ring-2 ring-indigo-500 shadow-2xl scale-[1.01]' : 'border-slate-100 shadow-sm hover:shadow-md'}`}
            >
              {/* Card Header */}
              <div 
                onClick={() => setActiveCandidate(isActive ? null : c)}
                className="p-6 flex items-center justify-between gap-6 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                   <span className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-black ${score > 70 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    #{index + 1}
                   </span>
                   <div>
                    <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${c.status === 'Shortlisted' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {c.status}
                    </span>
                   </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-indigo-600 leading-none">{Math.round(score)}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">AI Match</div>
                </div>
              </div>

              {/* Expanded Evidence & Logic View */}
              {isActive && (
                <div className="px-8 pb-8 pt-4 border-t border-slate-50 bg-slate-50/50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid lg:grid-cols-2 gap-10">
                    
                    {/* Column 1: Evidence */}
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3 underline decoration-indigo-200 underline-offset-4">Extracted Insights</h5>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">"{c.summary}"</p>
                      
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Skills Identified</h5>
                      <div className="flex flex-wrap gap-2">
                        {c.matchedSkills.map((s, i) => (
                          <span key={i} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-white/50 ${skills.find(sk => sk.id === s.cat).color}`}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Column 2: Weighted Breakdown */}
                    <div className="space-y-6">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Priority Match Breakdown</h5>
                      {skills.map(skill => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span className="font-bold text-slate-700 uppercase tracking-tight">{skill.label}</span>
                            <span className="font-black text-slate-900">{c.scores[skill.id]}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className={`${skill.barColor} h-full transition-all duration-1000`} style={{ width: `${c.scores[skill.id]}%` }}></div>
                          </div>
                        </div>
                      ))}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-6">
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(c.id, 'Shortlisted'); }}
                          className="flex-1 bg-green-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                        >
                          Shortlist
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(c.id, 'Rejected'); }}
                          className="flex-1 bg-white border border-slate-200 text-slate-400 text-xs font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
