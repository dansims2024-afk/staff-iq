import React from 'react';

export default function Candidates({ candidates, onSelectCandidate, selectedForBulk, onToggleSelect, onBulkInvite }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center bg-[#111827] p-6 rounded-[32px] border border-slate-800 sticky top-0 z-20">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
          {selectedForBulk.length} Selected for Loop
        </span>
        <button 
          onClick={onBulkInvite}
          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedForBulk.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
        >
          Bulk Invite to Loop 🚀
        </button>
      </div>
      
      {candidates.sort((a,b) => parseInt(b.score) - parseInt(a.score)).map((c) => (
        <div key={c.id} className="bg-[#111827] border border-slate-800 p-6 rounded-[32px] flex items-center gap-8 group hover:border-indigo-500 transition-all shadow-sm">
          <input 
            type="checkbox" 
            checked={selectedForBulk.includes(c.id)}
            onChange={() => onToggleSelect(c.id)}
            className="w-5 h-5 accent-indigo-600 cursor-pointer"
          />
          <div onClick={() => onSelectCandidate(c)} className="flex-1 flex items-center gap-8 cursor-pointer">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-[900] italic text-indigo-400 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
               {c.score.replace('%', '')}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
               <div>
                  <p className="font-black text-xl uppercase italic leading-none mb-1 text-white">{c.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.role}</p>
               </div>
               <div className="text-right">
                  <p className={`text-[10px] font-bold uppercase ${c.sourceColor} mb-1`}>{c.source}</p>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Received {c.time}</p>
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
