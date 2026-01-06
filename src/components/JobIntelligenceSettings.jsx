import React, { useState } from 'react';

const JobIntelligenceSettings = () => {
  // Initial state totals 100%
  const [skills, setSkills] = useState([
    {
      id: 'financial',
      label: 'Financial Literacy',
      subtext: 'Importance of P&L, Inventory, Math skills.',
      value: 40,
    },
    {
      id: 'leadership',
      label: 'Leadership & Management',
      subtext: 'Importance of Team Size, Training, Retention.',
      value: 35,
    },
    {
      id: 'operations',
      label: 'Operations & Logistics',
      subtext: 'Importance of Scheduling, Merchandising, Safety.',
      value: 25,
    },
  ]);

  const handleSliderChange = (id, newValue) => {
    setSkills((prevSkills) => {
      const changedIndex = prevSkills.findIndex((s) => s.id === id);
      const otherIndices = prevSkills
        .map((_, i) => i)
        .filter((i) => i !== changedIndex);

      const oldValue = prevSkills[changedIndex].value;
      const diff = newValue - oldValue;

      // Calculate the sum of the other sliders to distribute the difference
      const othersSum = otherIndices.reduce((sum, i) => sum + prevSkills[i].value, 0);

      const newSkills = [...prevSkills];
      newSkills[changedIndex].value = newValue;

      if (othersSum === 0) {
        // If others are zero, split the remaining value equally
        const remaining = 100 - newValue;
        otherIndices.forEach((i) => {
          newSkills[i].value = remaining / otherIndices.length;
        });
      } else {
        // Distribute the difference proportionally among others
        otherIndices.forEach((i) => {
          const weight = prevSkills[i].value / othersSum;
          const updatedValue = prevSkills[i].value - diff * weight;
          // Ensure no value goes below 0
          newSkills[i].value = Math.max(0, updatedValue);
        });
      }

      // Final normalization pass to fix rounding errors and ensure exactly 100%
      const finalSum = newSkills.reduce((sum, s) => sum + s.value, 0);
      if (finalSum !== 100) {
        const adjustment = (100 - finalSum) / otherIndices.length;
        otherIndices.forEach((i) => {
          newSkills[i].value += adjustment;
        });
      }

      return newSkills;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Intelligence Settings</h2>
        <p className="text-slate-500 mb-8">
          Tune the AI to prioritize the skills that matter for <span className="font-semibold text-slate-700">Store Manager</span>.
        </p>

        <div className="space-y-10 mb-10">
          {skills.map((skill) => (
            <div key={skill.id} className="group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-700">{skill.label}</span>
                <span className="text-lg font-bold text-slate-900">{Math.round(skill.value)}%</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={skill.value}
                onChange={(e) => handleSliderChange(skill.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              
              <p className="mt-2 text-sm text-slate-400">{skill.subtext}</p>
            </div>
          ))}
        </div>

        <button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-md"
          onClick={() => console.log('Saving weights:', skills)}
        >
          Save & Recalculate Scores
        </button>
        
        <div className="mt-4 text-center text-xs text-slate-300">
          Total Weight: {Math.round(skills.reduce((a, b) => a + b.value, 0))}%
        </div>
      </div>
    </div>
  );
};

export default JobIntelligenceSettings;
