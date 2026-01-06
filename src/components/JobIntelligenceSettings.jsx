import React, { useState } from 'react';

const JobIntelligenceSettings = () => {
  // 1. Slider State with associated colors for tags
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, color: 'bg-blue-100 text-blue-700', subtext: 'P&L, Inventory, Math' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, color: 'bg-purple-100 text-purple-700', subtext: 'Team Size, Training, Retention' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, color: 'bg-orange-100 text-orange-700', subtext: 'Scheduling, Merchandising, Safety' },
  ]);

  // 2. Mock Candidate Data with "Found Skills" from their resumes
  const [candidates] = useState([
    { 
      id: 1, 
      name: 'Alex Rivera', 
      scores: { financial: 92, leadership: 55, operations: 40 },
      matchedSkills: [
        { name: 'P&L Management', cat: 'financial' },
        { name: 'Budgeting', cat: 'financial' },
        { name: 'Team Training', cat: 'leadership' }
      ]
    },
    { 
      id: 2, 
      name: 'Jordan Smith', 
      scores: { financial: 40, leadership: 95, operations: 75 },
      matchedSkills: [
        { name: 'Conflict Resolution', cat: 'leadership' },
        { name: 'Retention Strategy', cat: 'leadership' },
        { name: 'Inventory Control', cat: 'operations' }
      ]
    },
    { 
      id: 3, 
      name: 'Taylor Wong', 
      scores: { financial: 55, leadership: 40, operations: 98 },
      matchedSkills: [
        { name: 'Logistics Optimization', cat: 'operations' },
        { name: 'Safety Compliance', cat: 'operations' },
        { name: 'Shift Scheduling', cat: 'operations' }
      ]
    },
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

  const rankedCandidates = [...candidates].sort((a, b) => calculateTotalScore(b.scores) - calculateTotalScore(a.scores));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* LEFT: Controls */}
      <div className="w-full lg:w-[450px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-fit sticky top-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Job Intelligence</h2>
        <p className="text-slate-500 mb-10 text-sm leading-relaxed">
          Adjust the priority of skills. The ranking on the right will update <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest">In Real-Time</span>.
        </p>

        <div className="space-y-12">
          {skills.map((skill) => (
            <div key={skill.id} className="relative">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-md">{skill.label}</h4>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">{skill.subtext}</p>
                </div>
                <span className="text-2xl font-black text-slate-900">{Math.round(skill.value)}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={skill.value}
                onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          ))}
        </div>

        <button className="w-full mt-12 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98]">
          Confirm Weights
        </button>
      </div>

      {/* RIGHT: Candidate Feed */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-lg font-bold text-slate-800">Top Matches</h3>
          <span className="text-xs font-semibold text-slate-400">{candidates.length} Candidates Screened</span>
        </div>

        {rankedCandidates.map((c, index) => {
          const score = calculateTotalScore(c.scores);
          return (
            <div key={c.id} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              {/* Score Bar Background */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-50 group-hover:bg-indigo-100 transition-colors"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                  </div>
                  
                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {c.matchedSkills.map((s, i) => {
                      const catInfo = skills.find(sk => sk.id === s.cat);
                      return (
                        <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${catInfo.color}`}>
                          {s.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="text-right min-w-[120px]">
                  <div className="text-3xl font-black text-indigo-600 mb-1">{Math.round(score)}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Match Score</div>
                  
                  {/* Visual mini-bar */}
                  <div className="w-full bg-slate-100 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full transition-all duration-700" style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default JobIntelligenceSettings;
