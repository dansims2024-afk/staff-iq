{/* --- UPDATED COMMAND CENTER DASHBOARD --- */}
{activeTab === 'Dashboard' && (
  <div className="space-y-8 animate-in fade-in duration-500">
    {/* High-Level Intelligence Matrix */}
    <div className="grid grid-cols-4 gap-6">
      <div className="p-8 rounded-[32px] border border-slate-800 bg-[#1E293B] shadow-sm">
        <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic leading-none">Market Reach</p>
        <p className="text-4xl font-[900] italic text-indigo-400 leading-none mt-2">1.2k</p>
        <p className="text-[9px] font-bold text-emerald-500 uppercase mt-2">↑ 18% This Week</p>
      </div>
      <div className="p-8 rounded-[32px] border border-slate-800 bg-[#1E293B] shadow-sm">
        <p className="text-slate-400 text-[10px] font-black uppercase mb-1 italic leading-none">Net Ad Savings</p>
        <p className="text-4xl font-[900] italic text-rose-400 leading-none mt-2">$14.2k</p>
        <p className="text-[9px] font-bold text-slate-500 uppercase mt-2">vs Paid Search</p>
      </div>
      {/* ... Add more KPI cards as needed */}
    </div>

    {/* Predictive Intel Grid */}
    <div className="grid grid-cols-12 gap-8">
      {/* Real-Time Sourcing Feed */}
      <div className="col-span-8 bg-[#1E293B] border border-slate-800 rounded-[40px] p-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">Strategic Sourcing Node</h3>
        <div className="space-y-6">
          {candidates.slice(0, 3).map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-[#0F172A] rounded-2xl border border-slate-800 hover:border-indigo-500 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center font-black italic text-indigo-400">{c.score}</div>
                <div>
                  <p className="font-black text-sm uppercase italic">{c.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role} • {c.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">AI Redline: Match Found</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syndi-Node Status */}
      <div className="col-span-4 space-y-6">
        <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 italic leading-none">Active Syndication</h4>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span>Google Jobs</span><span className="text-emerald-300">Indexed</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span>XML Global Feed</span><span className="text-emerald-300">Live</span>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  </div>
)}
