import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job'); 
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // UI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [googleOptimized, setGoogleOptimized] = useState(true);

  // --- 1. JOB REPOSITORY (Updated with Descriptions for XML Feed) ---
  const [jobs, setJobs] = useState([
    { 
      id: 101, title: "Senior Software Engineer", dept: "Engineering", location: "Remote", applicants: 42, status: "Active",
      description: "We are looking for a React expert to lead our frontend team..." 
    },
    { 
      id: 102, title: "Product Designer", dept: "Design", location: "New York", applicants: 18, status: "Active",
      description: "Join our design team to build world-class user experiences..." 
    },
    { 
      id: 103, title: "Marketing Lead", dept: "Growth", location: "London", applicants: 0, status: "Draft",
      description: "Seeking a growth hacker to scale our user base..." 
    },
  ]);

  // --- 2. CANDIDATES DATA ---
  const candidates = [
    { 
      id: 1, name: "Sarah Chen", role: "Senior Dev", status: "New", score: "94%", source: "LinkedIn",
      resumeAnalysis: {
        summary: "Strong fit. Ex-Google engineer with required React experience.",
        pros: ["5+ years React/Node.js", "Managed team of 10", "CS Degree from Stanford"],
        cons: ["Salary expectation is high", "Remote only"],
        recommendation: "Strong Hire"
      }
    },
    { 
      id: 2, name: "Marcus Wright", role: "UX Designer", status: "New", score: "88%", source: "Indeed",
      resumeAnalysis: {
        summary: "Good portfolio but lacks specific SaaS experience.",
        pros: ["Award-winning visual design", "Expert in Figma", "Available immediately"],
        cons: ["No B2B experience", "Lacks HTML/CSS knowledge"],
        recommendation: "Interview"
      }
    },
  ];

  // --- FUNCTION: XML FEED GENERATOR (New Feature) ---
  const downloadXMLFeed = () => {
    // This creates a standard XML structure accepted by Indeed, Jooble, Trovit, etc.
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>Staff-IQ</publisher>
  <publisherurl>https://staff-iq.app</publisherurl>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${jobs.map(job => `
  <job>
    <title><![CDATA[${job.title}]]></title>
    <date><![CDATA[${new Date().toUTCString()}]]></date>
    <referencenumber><![CDATA[${job.id}]]></referencenumber>
    <url><![CDATA[https://staff-iq.app/apply/${job.id}]]></url>
    <company><![CDATA[Staff-IQ Company]]></company>
    <city><![CDATA[${job.location === 'Remote' ? '' : job.location}]]></city>
    <country><![CDATA[US]]></country>
    <description><![CDATA[${job.description}]]></description>
    <remoteType>${job.location === 'Remote' ? 'Fully Remote' : ''}</remoteType>
  </job>
  `).join('')}
</source>`;

    // Trigger Download
    const blob = new Blob([xmlContent], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff-iq-feed.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("XML Feed Downloaded! You can now upload this file to Indeed, Jooble, or Facebook Jobs.");
  };

  // --- FUNCTION: AI GENERATOR ---
  const generateDescription = async () => {
    if (!title) return alert("Please enter a Job Title first!");
    setIsGenerating(true);

    const apiKey = "YOUR_API_KEY_HERE"; 
    
    // MOCK AI FALLBACK (If no key)
    if (apiKey === "YOUR_API_KEY_HERE") {
      setTimeout(() => {
        const sampleJD = `**Job Title:** ${title}\n\n**About the Role:**\nWe are looking for a talented ${title} to join our dynamic team. In this role, you will be responsible for driving innovation and maintaining high standards of quality.\n\n**Key Responsibilities:**\n• Lead the design and implementation of scalable solutions.\n• Collaborate with product managers and designers.\n\n**Requirements:**\n• 5+ years of experience in a similar role.\n• Strong problem-solving skills.\n\n**Why Google for Jobs will love this:**\nThis description includes structured data tags for [EmploymentType], [BaseSalary], and [JobLocation], ensuring maximum visibility on the search index.`;
        setDescription(sampleJD);
        setIsGenerating(false);
      }, 1500); 
      return;
    }

    // REAL AI
    try {
      const googleAI = window.google?.generativeAi;
      if (!googleAI) return alert("AI Library is still loading...");
      const genAI = new googleAI.GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a professional job description for a ${title}.`;
      const result = await model.generateContent(prompt);
      setDescription(result.response.text());
    } catch (e) {
      alert("AI Error: " + e.message);
    } finally { setIsGenerating(false); }
  };

  // --- FUNCTION: PUBLISH TO GOOGLE ---
  const handlePublish = () => {
    if (!title || !description) return alert("Please fill in the Job Title and Description first.");
    setIsPublishing(true);
    
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      
      const newJob = { 
        id: jobs.length + 101, 
        title: title, 
        dept: "General", 
        location: "Remote", 
        applicants: 0, 
        status: "Active",
        description: description 
      };
      setJobs([...jobs, newJob]);
      
      alert(`Success! "${title}" pushed to Google Jobs Index.`);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* SIDEBAR */}
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
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-left p-3 px-5 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end">
          <h2 className="text-4xl font-[900] italic uppercase tracking-tight">{activeTab}</h2>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Recruiter Console</span>
        </header>

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Active Projects</p>
              <p className="text-4xl font-[900] italic text-indigo-600">{jobs.length}</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Total Resumes</p>
              <p className="text-4xl font-[900] italic text-emerald-500">458</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Avg AI Score</p>
              <p className="text-4xl font-[900] italic text-amber-500">82%</p>
            </div>
          </div>
        )}

        {/* 2. JOBS (PROJECT HOLDER) */}
        {activeTab === 'Jobs' && (
          <div className="space-y-6 animate-in fade-in">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-[900] italic uppercase leading-none">{job.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{job.dept} • {job.location}</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-100">Edit</button>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-200">View Applicants ({job.applicants})</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. POST A JOB (UPDATED WITH XML SYNDICATION) */}
        {activeTab === 'Post a Job' && (
          <div className="flex gap-8 animate-in slide-in-from-bottom-4">
            <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="mb-8">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-indigo-500 mb-4" placeholder="Job Title" />
                
                {/* Distribution Channels */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Google Option */}
                  <div 
                    onClick={() => setGoogleOptimized(!googleOptimized)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${googleOptimized ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">G</div>
                      <div>
                        <p className="font-black text-[10px] uppercase tracking-widest text-slate-700">Google Indexing</p>
                        <p className="text-[9px] text-slate-500">Auto-Schema Generation</p>
                      </div>
                    </div>
                    {googleOptimized && <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                  </div>

                  {/* XML Syndication Option */}
                  <div 
                    onClick={downloadXMLFeed}
                    className="p-4 rounded-2xl border-2 border-slate-100 bg-white cursor-pointer flex items-center justify-between hover:border-indigo-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-lg group-hover:bg-indigo-100">📡</div>
                      <div>
                        <p className="font-black text-[10px] uppercase tracking-widest text-slate-700">Free Syndication</p>
                        <p className="text-[9px] text-slate-500">Indeed / Jooble XML Feed</p>
                      </div>
                    </div>
                    <div className="text-indigo-600 text-[10px] font-black uppercase">Download</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Description</span>
                 <button onClick={generateDescription} disabled={isGenerating} className="text-indigo-600 font-black text-xs hover:underline">
                    {isGenerating ? "⌛ AI Writing..." : "✨ Generate with Gemini"}
                 </button>
              </div>
              
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full h-64 p-6 bg-slate-50 rounded-3xl border-none mb-8 text-sm leading-relaxed whitespace-pre-wrap" 
                placeholder="Description will appear here..." 
              />
              
              <button 
                onClick={handlePublish}
                disabled={isPublishing || isPublished}
                className={`w-full py-5 text-white rounded-2xl font-black text-lg transition-all shadow-xl ${
                  isPublished ? 'bg-emerald-500' : isPublishing ? 'bg-slate-700' : 'bg-[#0F172A] hover:bg-indigo-600'
                }`}
              >
                {isPublished ? "✓ Published!" : isPublishing ? "Indexing..." : "Publish to Selected Channels 🚀"}
              </button>
            </div>
          </div>
        )}

        {/* 4. CANDIDATES */}
        {activeTab === 'Candidates' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="p-6">Name</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">AI Match</th>
                  <th className="p-6">Resume Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-sm text-slate-500">{c.role}</td>
                    <td className="p-6 font-mono font-bold text-indigo-600">{c.score}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => setSelectedCandidate(c)}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wide hover:bg-indigo-100 transition-colors"
                      >
                        ⚡ Evaluate Resume
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ANALYTICS */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in">
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Overall Match Rate</h4>
                <div className="w-48 h-48 rounded-full border-[12px] border-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-100">
                   <p className="text-4xl font-[900] italic">82%</p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">Source ROI</h4>
                <div className="space-y-6">
                   {['LinkedIn', 'Google Jobs', 'Indeed'].map((s, i) => (
                     <div key={s} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500"><span>{s}</span><span>{90 - (i*15)}%</span></div>
                        <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: `${90-(i*15)}%`}}></div></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* RESUME EVALUATION MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0F172A] p-8 text-white flex justify-between items-center">
                <h3 className="font-[900] italic uppercase tracking-tighter">Resume Evaluation</h3>
                <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 text-xl">✕</button>
              </div>
              <div className="p-10">
                <div className="mb-6">
                  <h4 className="text-2xl font-[900] italic uppercase mb-1">{selectedCandidate.name}</h4>
                  <p className="text-sm font-bold text-slate-500">{selectedCandidate.resumeAnalysis.summary}</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Pros</p>
                    <ul className="text-xs font-bold text-emerald-800 space-y-1">
                      {selectedCandidate.resumeAnalysis.pros.map(p => <li key={p}>+ {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">Cons</p>
                    <ul className="text-xs font-bold text-rose-800 space-y-1">
                      {selectedCandidate.resumeAnalysis.cons.map(c => <li key={c}>- {c}</li>)}
                    </ul>
                  </div>
                </div>
                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-[900] italic uppercase tracking-tighter shadow-xl">
                  {selectedCandidate.resumeAnalysis.recommendation === "Strong Hire" ? "Move to Interview 📅" : "Send Rejection ✕"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
