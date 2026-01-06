import React, { useState } from 'react';
import { 
  Users, LayoutDashboard, Briefcase, Settings, 
  Search, Bell, CheckCircle2, MoreHorizontal, 
  Plus, BrainCircuit, Zap 
} from 'lucide-react';
import { calculateStaffIQ, getScoreClass } from './utils/iqEngine';

const App = () => {
  // Demo State: Job Weights (Owner can tune these)
  const [weights] = useState({ wSkills: 0.4, wExp: 0.3, wCulture: 0.3 });

  // Demo State: Candidates
  const [candidates] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Store Manager', status: 'In Review', metrics: { skills: 98, experience: 75, culture: 92 } },
    { id: 2, name: 'Sarah Chen', role: 'Sales Lead', status: 'Interviewing', metrics: { skills: 85, experience: 90, culture: 88 } },
    { id: 3, name: 'Marcus Todd', role: 'Operations', status: 'New Leads', metrics: { skills: 70, experience: 65, culture: 80 } },
  ]);

  const columns = ['New Leads', 'In Review', 'Interviewing', 'Offer Sent'];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Brand Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm font-black">IQ</div>
          <span className="text-xl font-bold tracking-tight">Staff-IQ</span>
        </div>
        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" />
          <NavItem icon={<Users size={18}/>} label="Candidates" active />
          <NavItem icon={<Briefcase size={18}/>} label="Job Posts" />
        </nav>
        <div className="pt-6 border-t border-slate-800">
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-bold">Active Pipeline</h1>
            <p className="text-xs text-slate-500 italic">Ranking by Staff-IQ Smart Score</p>
          </div>
          <div className="flex gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Search talent..." />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all">
              <Plus size={16} /> Add Candidate
            </button>
          </div>
        </header>

        {/* 3. The Pipeline Board */}
        <div className="flex-1 overflow-x-auto p-8 flex gap-6 items-start">
          {columns.map(col => (
            <div key={col} className="w-72 shrink-0">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between px-1">
                {col} <span className="bg-slate-200 text-slate-600 px-2 rounded-full font-bold">
                  {candidates.filter(c => c.status === col || (col === 'New Leads' && c.status === 'New Leads')).length}
                </span>
              </h3>
              
              <div className="space-y-4">
                {candidates
                  .filter(c => c.status === col || (col === 'New Leads' && c.status === 'New Leads'))
                  .map(candidate => {
                    const score = calculateStaffIQ(candidate.metrics, weights);
                    return (
                      <div key={candidate.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`text-[10px] font-black px-2 py-1 rounded-md border ${getScoreClass(score)}`}>
                            {score} IQ
                          </div>
                        </div>
                        <h4 className="font-bold text-sm mb-1 group-hover:text-indigo-600">{candidate.name}</h4>
                        <p className="text-xs text-slate-500 mb-4">{candidate.role}</p>
                        
                        <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                          <button className="text-emerald-600 hover:text-emerald-700 text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                            <CheckCircle2 size={12} /> Hire
                          </button>
                          <MoreHorizontal size={14} className="text-slate-300" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Helper Sub-component for Sidebar
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default App;
