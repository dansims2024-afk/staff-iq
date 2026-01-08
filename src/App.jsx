import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  LayoutDashboard, PlusSquare, Users, BarChart3, Settings, Sparkles, Loader2 
} from 'lucide-react';

// --- CONFIGURATION ---
const API_KEY = "YOUR_API_KEY_HERE"; 
const genAI = new GoogleGenerativeAI(API_KEY);

// --- SUB-COMPONENTS ---
const DashboardView = () => (
  <div className="p-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { label: 'Active Jobs', val: '12', color: 'text-indigo-600' },
        { label: 'Total Applicants', val: '458', color: 'text-emerald-600' },
        { label: 'Interviews Today', val: '5', color: 'text-amber-600' }
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.val}</p>
        </div>
      ))}
    </div>
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-64 flex items-center justify-center">
      <p className="text-slate-400 italic text-sm">Main Analytics Chart Placeholder</p>
    </div>
  </div>
);

const PostJobView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescription = async () => {
    if (!title) return alert("Please enter a Job Title first!");
    setIsGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a professional 3-paragraph job description for a ${title}.`;
      const result = await model.generateContent(prompt);
      setDescription(result.response.text());
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Failed to generate. Check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 ml-2 mb-1 block">Job Title</label>
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="e.g. Senior Product Designer"
            />
          </div>
          <div className="w-32">
            <label className="text-[10px] uppercase font-bold text-slate-400 ml-2 mb-1 block">Salary</label>
            <input defaultValue="55000" className="w-full p-4 bg-slate-50 rounded-xl border-none font-mono" />
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
          <button 
            onClick={generateDescription}
            disabled={isGenerating}
            className="flex items-center gap-2 text-indigo-600 font-bold text-sm"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Generate with Gemini
          </button>
        </div>
        
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Click Generate to see Gemini's magic..." 
          className="w-full h-80 p-6 bg-slate-50 rounded-2xl border-none mb-6 resize-none focus:ring-2 focus:ring-indigo-500"
        />

        <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3">
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
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job');

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
      <div className="w-64 bg-[#0F172A] text-white flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-2 mb-12">
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Staff IQ</h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 ml-64 min-h-screen">
        <header className="px-8 pt-8 pb-4 bg-slate-50">
          <h2 className="text-3xl font-black italic tracking-tight">{activeTab}</h2>
        </header>

        <main className="max-w-6xl">
          {activeTab === 'Dashboard' && <DashboardView />}
          {activeTab === 'Post a Job' && <PostJobView />}
          {['Candidates', 'Analytics', 'Settings'].includes(activeTab) && (
            <div className="p-8 text-slate-400 italic">This module is coming soon...</div>
          )}
        </main>
      </div>
    </div>
  );
}
