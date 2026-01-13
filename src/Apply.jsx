import React, { useEffect, useState } from 'react';

export default function PublicApplyPage() {
  const [source, setSource] = useState("Direct");

  useEffect(() => {
    // Captures the referral source from the URL
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get('source');
    if (urlSource) {
      setSource(urlSource.charAt(0).toUpperCase() + urlSource.slice(1));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans selection:bg-indigo-100">
      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Branding Header with Logo */}
        <div className="bg-[#0F172A] p-10 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Staff IQ" className="w-10 h-10 object-contain rounded-xl" />
              <div>
                 <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-0.5 leading-none">STAFF IQ</h1>
                 <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Smart Recruitment</p>
              </div>
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black italic border border-slate-700">SIQ</div>
        </div>

        <div className="p-12">
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight mb-2 italic">Senior Software Engineer</h2>
            <div className="flex gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Remote</span> • <span>Engineering</span> • <span>Full-Time</span>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert(`Application Sent! Source tracked via: ${source}`); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input required type="text" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Jane Doe" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resume / CV</label>
              <div className="w-full p-12 border-2 border-dashed border-slate-200 rounded-[30px] text-center hover:border-indigo-400 transition-all cursor-pointer bg-slate-50/50 hover:bg-white group">
                 <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">📄</div>
                 <p className="text-xs font-black text-slate-500 uppercase tracking-tighter">Click to upload resume</p>
                 <p className="text-[10px] text-slate-300 mt-1 font-bold">PDF OR DOCX (MAX 10MB)</p>
              </div>
            </div>

            <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95">
              Submit Application
            </button>
            
            <div className="pt-4 text-center">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] border-t border-slate-100 pt-4 block">
                Applying via <span className="text-indigo-500">{source}</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
