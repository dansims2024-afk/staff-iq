import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('post-job'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobForm, setJobForm] = useState({ 
    title: '', 
    salary: '55000', 
    location: 'Plainsboro, NJ',
    description: '' 
  });

  // --- GEMINI: GENERATE DESCRIPTION ---
  const handleAiGenerate = () => {
    if (!jobForm.title) return alert("Please enter a job title first!");
    setIsGenerating(true);
    
    // Simulating Gemini's SEO-optimized output
    setTimeout(() => {
      const generatedText = `Staff IQ is seeking a professional ${jobForm.title} to join our growing team in ${jobForm.location}. 

RESPONSIBILITIES:
- Lead and develop a high-performing team to meet business objectives.
- Oversee daily operations and ensure exceptional service standards.
- Manage inventory and P&L reports to optimize store profitability.

QUALIFICATIONS:
- Proven experience in retail management or a similar leadership role.
- Strong financial literacy and ability to analyze market trends.
- Excellent communication and conflict-resolution skills.

BENEFITS:
- Competitive annual salary of $${jobForm.salary}.
- Opportunities for career advancement within the Staff IQ network.
- Comprehensive benefits package.`;

      setJobForm({ ...jobForm, description: generatedText });
      setIsGenerating(false);
    }, 1500);
  };

  // --- MARKET LOGIC ---
  const getMarketPulse = () => {
    const salary = parseInt(jobForm.salary);
    if (!jobForm.title) return { status: 'Awaiting Title', color: 'text-slate-300', advice: "Enter a role to analyze market data." };
    if (salary < 50000) return { status: 'Critical', color: 'text-red-500', advice: "Salary is below the Plainsboro average for managers." };
    return { status: 'Healthy', color: 'text-green-500', advice: "Salary is competitive for the NJ retail market." };
  };

  const pulse = getMarketPulse();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10">
        <div className="mb-10 px-2 font-black italic text-2xl tracking-tighter uppercase underline decoration-indigo-500">Staff IQ</div>
        <nav className="flex-1 space-y-2 text-sm">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('post-job')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'post-job' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Post a Job 🚀</button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-12">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in">
          
          {/* FORM AREA */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl font-black italic tracking-tight">Post a Job</h1>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input 
                  type="text" placeholder="Job Title" value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input 
                  type="number" value={jobForm.salary}
                  onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                  className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</label>
                  <button 
                    onClick={handleAiGenerate}
                    className="text-xs font-black text-indigo-600 hover:scale-105 transition-all flex items-center gap-1"
                  >
                    {isGenerating ? "✨ Gemini is writing..." : "✨ Generate with Gemini"}
                  </button>
                </div>
                <textarea 
                  rows="10" value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-medium leading-relaxed text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Click Generate to see Gemini's magic..."
                />
              </div>
              
              <button className="w-full bg-[#0F172A] text-white py-6 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl">
                Publish Requisition 🚀
              </button>
            </div>
          </div>

          {/* INSIGHTS SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Market Health</h3>
              <div className={`text-3xl font-black mb-2 ${pulse.color}`}>{pulse.status}</div>
              <p className="text-xs font-bold text-slate-500 italic leading-relaxed">"{pulse.advice}"</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
