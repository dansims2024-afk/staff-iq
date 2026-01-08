import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const jobs = [
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42 },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18 },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* SIDEBAR */}
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl">
        <div className="mb-12 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center">
              <span className="text-indigo-400 text-lg">✦</span>
           </div>
           <h1 className="text-xl font-black italic tracking-tighter uppercase">STAFF IQ</h1>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 ${activeTab === tab ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-black italic tracking-tight">{activeTab}</h2>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Jan 2026</div>
        </header>

        {/* JOBS VIEW WITH TRACKING LINKS */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-black">{job.title}</h4>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{job.dept} • {job.location}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-indigo-200"
                  >
                    Share & Track 🔗
                  </button>
                </div>

                {/* Tracking Links Section (Only shows when "Share & Track" is clicked) */}
                {selectedJob?.id === job.id && (
                  <div className="mt-8 pt-8 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl animate-in slide-in-from-top-2">
                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Smart Tracking Links</h5>
                    <p className="text-xs text-slate-400 mb-6 italic">"Use these unique URLs on job boards. Staff IQ will automatically categorize every applicant."</p>
                    
                    <div className="space-y-4">
                      {['LinkedIn', 'Indeed', 'Twitter/X'].map(source => (
                        <div key={source} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-xs font-bold w-20">{source}</span>
                          <input 
                            readOnly 
                            value={`https://staffiq.app/apply/${job.id}?ref=${source.toLowerCase()}`}
                            className="flex-1 bg-slate-50 p-2 rounded text-[10px] font-mono text-slate-500 border-none"
                          />
                          <button className="text-[10px] font-black text-indigo-600 uppercase">Copy</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Analytics' && (
           <div className="p-8 text-center bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-400 italic">Analytics are currently aggregating data from your Smart Tracking Links...</p>
           </div>
        )}
      </main>
    </div>
  );
}
