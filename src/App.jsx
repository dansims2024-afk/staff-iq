import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job'); 
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [googleOptimized, setGoogleOptimized] = useState(true);
  const [showFeedGuide, setShowFeedGuide] = useState(false);

  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active", description: "React expert..." },
    { id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active", description: "UI/UX lead..." }
  ]);

  const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Dev", status: "New", score: "94%", source: "LinkedIn", resumeAnalysis: { summary: "Ex-Google.", pros: ["React"], cons: ["Expensive"], recommendation: "Hire" } }
  ];

  const downloadXMLFeed = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?><source><publisher>Staff-IQ</publisher><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${jobs.map(job => `<job><title><![CDATA[${job.title}]]></title><url><![CDATA[https://staff-iq.app/apply/${job.id}]]></url><description><![CDATA[${job.description}]]></description></job>`).join('')}</source>`;
    const blob = new Blob([xmlContent], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff-iq-distribution-feed.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Trigger the guide message
    setShowFeedGuide(true);
  };

  const generateDescription = async () => {
    if (!title) return alert("Enter Title!");
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`Professional JD for ${title}...\n\n- Role Responsibilities\n- Required Skills\n- Benefits`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      <nav className="w-64 bg-[#0F172A] text-white p-6 fixed h-full flex flex-col shadow-2xl z-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
             <img src="/logo.png" alt="Staff-IQ Logo" className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-[900] italic tracking-tighter uppercase leading-none">Staff-IQ</h1>
          </div>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-11 leading-none">AI-Powered Sourcing</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Jobs', 'Post a Job', 'Candidates', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>{tab}</button>
          ))}
        </div>
      </nav>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end">
          <h2 className="text-4xl font-[900] italic uppercase tracking-tight">{activeTab}</h2>
        </header>

        {activeTab === 'Post a Job' && (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl border-none font-black text-xl mb-6 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter Job Title..." />
              
              <div className="flex justify-between items-end mb-4">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Content Engine</span>
                 <button onClick={generateDescription} disabled={isGenerating} className="text-indigo-600 font-black text-xs hover:underline">{isGenerating ? "⌛ Thinking..." : "✨ Generate Description"}</button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-64 p-6 bg-slate-50 rounded-3xl border-none mb-8 text-sm leading-relaxed" placeholder="Click generate..." />
              
              <div className="grid grid-cols-2 gap-6">
                <button onClick={() => setIsPublished(true)} className="py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 shadow-xl">{isPublished ? "✓ Indexed on Google" : "Publish to Google Jobs"}</button>
                <button onClick={downloadXMLFeed} className="py-5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all">Download XML Feed</button>
              </div>
            </div>

            {/* THE FEED GUIDE MESSAGE */}
            {showFeedGuide && (
              <div className="bg-indigo-600 text-white p-8 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📡</span>
                    <h3 className="text-xl font-[900] italic uppercase tracking-tighter">What to do with your XML Feed?</h3>
                  </div>
                  <p className="text-indigo-100 text-sm font-bold mb-6 leading-relaxed">Your distribution file is ready! To get 10x more applicants for free, follow these steps:</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <p className="text-[10px] font-black uppercase mb-1 opacity-60">Step 1</p>
                      <p className="text-xs font-bold">Go to Indeed or Jooble Employer Center.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <p className="text-[10px] font-black uppercase mb-1 opacity-60">Step 2</p>
                      <p className="text-xs font-bold">Upload the 'staff-iq-feed.xml' file.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <p className="text-[10px] font-black uppercase mb-1 opacity-60">Step 3</p>
                      <p className="text-xs font-bold">Sit back. They will automatically sync your jobs daily.</p>
                    </div>
                  </div>
                  <button onClick={() => setShowFeedGuide(false)} className="mt-6 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100">Dismiss Guide</button>
                </div>
                {/* Visual design element */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in">
            {[{l:"Active Roles", v:jobs.length, c:"text-indigo-600"}, {l:"Candidates", v:"458", c:"text-emerald-500"}, {l:"Interviews", v:"12", c:"text-amber-500"}].map(s => (
              <div key={s.l} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1">{s.l}</p>
                <p className={`text-4xl font-[900] italic ${s.c}`}>{s.v}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
