import React, { useState, useEffect } from 'react';

const JobIntelligenceSettings = () => {
  // 1. Slider State
  const [skills, setSkills] = useState([
    { id: 'financial', label: 'Financial Literacy', value: 40, subtext: 'P&L, Inventory, Math' },
    { id: 'leadership', label: 'Leadership & Management', value: 35, subtext: 'Team Size, Training, Retention' },
    { id: 'operations', label: 'Operations & Logistics', value: 25, subtext: 'Scheduling, Merchandising, Safety' },
  ]);

  // 2. Mock Candidate Data (Raw scores out of 100 for each category)
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alex Rivera', scores: { financial: 90, leadership: 60, operations: 40 } },
    { id: 2, name: 'Jordan Smith', scores: { financial: 30, leadership: 95, operations: 70 } },
    { id: 3, name: 'Taylor Wong', scores: { financial: 50, leadership: 50, operations: 95 } },
  ]);

  // 3. Logic to force 100% total
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

  // 4. Calculate weighted score for each candidate
  const calculateTotalScore = (candidateScores) => {
    return skills.reduce((total, skill) => {
      return total + (candidateScores[skill.id] * (skill.value / 100));
    }, 0);
  };

  // Sort candidates by their calculated score
  const rankedCandidates = [...candidates].sort((a, b) => 
    calculateTotalScore(b.scores) - calculateTotalScore(a.scores)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-50 min-h-screen font-sans text-slate-900">
      
      {/* LEFT PANEL: Settings */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-2 text-indigo-900">Job Intelligence Settings</h2>
        <p className="text-slate-500 mb-8 font-medium">Tune the AI to prioritize skills for <span className="text-indigo-600">Store Manager</span>.</p>

        <div className="space-y-10">
          {skills.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-slate-700">{skill.label}</span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round(skill.value)}%
                </span>
              </div>
              <input
                type="range" min="0" max="100" value={skill.value}
                onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-xs text-slate-400 mt-2 italic">{skill.subtext}</p>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          Save & Recalculate
        </button>
      </div>

      {/* RIGHT PANEL: Live Results */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          Ranked Candidates
          <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-0.5 rounded italic">Live Update</span>
        </h3>
        
        <div className="space-y-4">
          {rankedCandidates.map((c, index) => {
            const score = calculateTotalScore(c.scores);
            return (
              <div key={c.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center gap-4 transition-all">
                <div className="text-2xl font-black text-slate-200 w-8">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-700">{c.name}</span>
                    <span className="text-sm font-bold text-indigo-600">{Math.round(score)}% Match</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-500" 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default JobIntelligenceSettings;
