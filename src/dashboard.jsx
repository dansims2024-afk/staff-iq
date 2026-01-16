import React from 'react';

export default function Dashboard({ jobs, candidates }) {
  const metrics = [
    { label: 'Active Reqs', val: jobs.length, color: 'text-indigo-400' },
    { label: 'Total Applicants', val: candidates.length, color: 'text-white' },
    { label: 'Sourcing ROI', val: '$4.2k', color: 'text-emerald-400' },
    { label: 'Avg Match', val: '81%', color: 'text-amber-400' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((s, i) => (
          <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-[32px]">
            <p className="text-slate-500 text-[10px] font-black uppercase mb-1 italic leading-none">{s.label}</p>
            <p className={`text-4xl font-[900] italic ${s.color} leading-none mt-2`}>{s.val}</p>
          </div>
        ))}
      </div>
      {/* Additional Dashboard widgets would go here */}
    </div>
  );
}
