import React, { useEffect, useState } from 'react';

export default function PublicApplyPage() {
  const [source, setSource] = useState("Direct"); // Default source

  useEffect(() => {
    // Logic to read the ?source= parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get('source');
    if (urlSource) {
      // Capitalize first letter (e.g., "linkedin" -> "LinkedIn")
      setSource(urlSource.charAt(0).toUpperCase() + urlSource.slice(1));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Branding Header */}
        <div className="bg-[#0F172A] p-8 text-white flex items-center justify-between">
           <div>
              <h1 className="text-xl font-black italic tracking-tighter uppercase mb-1">Staff IQ</h1>
              <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Powered by SmartRecruit AI</p>
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-indigo-500 flex items-center justify-center text-lg">✦</div>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-black mb-2">Senior Software Engineer</h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">Remote • Engineering • Full-time</p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert(`Applied! Source captured as: ${source}`); }}>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Full Name</label>
              <input required type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Jane Doe" />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Resume / CV</label>
              <div className="w-full p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50/50">
                 <p className="text-xs font-bold text-slate-400">Click to upload or drag and drop</p>
                 <p className="text-[10px] text-slate-300 mt-1 uppercase">PDF, DOCX up to 10MB</p>
              </div>
            </div>

            {/* Hidden Source Field: This is how the magic happens */}
            <input type="hidden" name="source" value={source} />

            <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
              Submit Application
            </button>
            
            <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
              Applying via <span className="text-indigo-500">{source}</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
