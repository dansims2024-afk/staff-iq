import React, { useEffect, useState } from 'react';

export default function PublicApplyPage() {
  const [source, setSource] = useState("Direct");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get('source');
    if (urlSource) {
      setSource(urlSource.charAt(0).toUpperCase() + urlSource.slice(1));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Branding Header with Dash and Updated Subtext */}
        <div className="bg-[#0F172A] p-10 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Staff-IQ" className="w-10 h-10 object-contain" />
              <div>
                 <h1 className="text-2xl font-[900] italic tracking-tighter uppercase mb-0 leading-none">STAFF-IQ</h1>
                 <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] leading-none mt-1">AI-Powered Sourcing & Tracking</p>
              </div>
           </div>
        </div>

        <div className="p-12">
          <h2 className="text-4xl font-[900] italic tracking-tight mb-2 uppercase leading-none">Senior Software Engineer</h2>
          <div className="flex gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">
            <span>Remote</span> • <span>Engineering</span> • <span>Full-Time</span>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert(`Source tracked: ${source}`); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input required type="text" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Jane Doe" />
            </div>

            <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl">
              Submit Application
            </button>
            
            <div className="pt-4 text-center">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] block">
                Applying via <span className="text-indigo-500">{source}</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
