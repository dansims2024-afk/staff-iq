import React, { useState } from 'react';
import { 
  LayoutDashboard, PlusSquare, Users, BarChart3, Settings, Sparkles, Loader2 
} from 'lucide-react';

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AI GENERATION LOGIC ---
  const generateDescription = async () => {
    if (!title) return alert("Please enter a Job Title first!");
    
    // Checks if the script we added to index.html is loaded
    if (!window.google) {
      return alert("AI Library is still loading or missing from index.html. Please check your script tag.");
    }

    setIsGenerating(true);
    try {
      // Accessing the global library loaded via CDN
      const genAI = new window.google.generativeAi.GoogleGenerativeAI("YOUR_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Write a professional 3-paragraph job description for a ${title}.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setDescription(response.text());
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("AI failed to respond. Make sure you have a valid API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const menuItems = [
    { id: 'Dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'Post a Job', icon: <PlusSquare size={20} />, label: 'Post a Job 🚀' },
    { id: 'Candidates', icon: <Users size={20} />, label: 'Candidates' },
    { id: 'Analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { id: 'Settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col p-6 fixed h-full shadow-2xl">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold italic">S</div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Staff IQ</h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 min-h-screen">
        <header className="px-8 pt-8 pb-4 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10">
          <h2 className="text-3xl font-black italic tracking-tight">{activeTab}</h2>
        </header>

        <section className="max-w-6xl p-8">
          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Roles</p>
                <p className="text-3xl font-black">12</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Candidates</p>
                <p className="text-3xl font-black">458</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Interviews</p>
                <p className="text-3xl font-black">5</p>
              </div>
            </div>
          )}

          {activeTab === 'Post a Job' && (
            <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="flex gap-4 mb-8">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-2 mb-1 block">Job Title</label>
                    <input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-2 mb-1 block">Salary</label>
                    <input defaultValue="55000" className="w-full p-4 bg-slate-50 rounded-xl border-none font-mono text-center" />
                  </div>
                </div>

                <div className="mb-4 flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <button 
                    onClick={generateDescription}
                    disabled={isGenerating}
                    className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline"
                  >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    Generate with Gemini
                  </button>
                </div>
                
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Click 'Generate' to create a description..." 
                  className="w-full h-80 p-6 bg-slate-50 rounded-2xl border-none mb-6 resize-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />

                <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all shadow-lg">
                  Publish Requisition 🚀
                </button>
              </div>

              <div className="w-full lg:w-80">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Market Health</p>
                  <h3 className={`text-2xl font-bold ${title ? 'text-slate-900' : 'text-slate-200'}`}>
                    {title || "Awaiting Title"}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {['Candidates', 'Analytics', 'Settings'].includes(activeTab) && (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="italic">The {activeTab} module is currently under development.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
