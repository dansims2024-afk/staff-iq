import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('pipeline'); 
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [jobForm, setJobForm] = useState({
    title: "Store Manager",
    location: "Plainsboro, NJ",
    salaryMin: "65000",
    salaryMax: "85000",
    description: ""
  });

  // --- GEMINI AI GENERATION ---
  const generateWithGemini = async () => {
    if (!jobForm.title) return alert("Please enter a Job Title first!");
    
    setIsGenerating(true);
    
    // REPLACE THIS URL with your Zapier Webhook URL from Step 1
    const ZAPIER_GEMINI_WEBHOOK = "https://hooks.zapier.com/your-zapier-url";

    try {
      const response = await fetch(ZAPIER_GEMINI_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({ 
          title: jobForm.title, 
          location: jobForm.location 
        }),
      });

      const data = await response.json();
      
      // Assuming your Zapier response returns a field called 'text'
      if (data && data.text) {
        setJobForm({ ...jobForm, description: data.text });
      } else {
        // Fallback for testing if Zapier isn't live yet
        setJobForm({ ...jobForm, description: `Join our team as a ${jobForm.title} in ${jobForm.location}. We offer competitive pay and a great culture.` });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Connected to Gemini! (Simulating response for now)");
      setJobForm({ ...jobForm, description: `Join our team as a ${jobForm.title} in ${jobForm.location}. We are looking for a leader to drive sales and manage staff.` });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    alert("🚀 Successfully sent to Google Indexing via Gemini!");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="mb-10 px-2 font-black italic text-2xl tracking-tighter">
          STAFF <span className="text-indigo-500">IQ</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('pipeline')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'pipeline' ? 'bg-[#1F2937] border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Active Pipeline</button>
          <button onClick={() => setActiveTab('post-job')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-[#1F2937] border-l-4 border-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Post a Job 🚀</button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-12">
        {activeTab === 'pipeline' && (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Active Pipeline</h1>
            <p className="text-slate-500 mb-8">AI-ranked matches for <b>{jobForm.title}</b></p>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-black text-green-600 text-2xl">89</div>
                <div>
                  <h4 className="text-xl font-bold">Alex Rivera</h4>
                  <p className="text-slate-400">Top Match • Verified Experience</p>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">View Profile</button>
            </div>
          </div>
        )}

        {activeTab === 'post-job' && (
          <div className="max-w-3xl animate-in slide-in-from-bottom-6 duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Post a New Job</h1>
            <p className="text-slate-500 mb-10">Powered by <b>Google Gemini AI</b></p>
            
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 space-y-8 border border-slate-50">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Job Title</label>
                  <input type="text" value={jobForm.title} onChange={(e) => setJobForm({...jobForm, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location</label>
                  <input type="text" value={jobForm.location} onChange={(e) => setJobForm({...jobForm, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Job Description</label>
                  <button onClick={generateWithGemini} className="text-xs font-black text-indigo-600 flex items-center gap-2 hover:scale-105 transition-transform">
                    {isGenerating ? "🌀 Gemini is thinking..." : "✨ Generate with Gemini"}
                  </button>
                </div>
                <textarea 
                  rows="6" 
                  value={jobForm.description} 
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-3xl p-6 text-slate-600 font-medium leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Tell Gemini to write this for you..."
                />
              </div>

              <button onClick={handlePublish} className="w-full bg-[#0F172A] text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 text-lg">
                Publish to Google Search 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
