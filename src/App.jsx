import React, { useState } from 'react';

// --- MOCK DATA GENERATORS ---
const initialCandidates = [
  { id: 1, name: 'Alex Rivera', role: 'Store Manager', status: 'Screening', score: 89, email: 'alex@example.com', notes: [{ author: 'Dan', text: 'Strong P&L experience.' }] },
  { id: 2, name: 'Sarah Chen', role: 'Sales Lead', status: 'Applied', score: 87, email: 'sarah@example.com', notes: [] },
  { id: 3, name: 'Mike Ross', role: 'Store Manager', status: 'Interview', score: 92, email: 'mike@example.com', notes: [{ author: 'Corinne', text: 'Loved his energy!' }] },
  { id: 4, name: 'Jessica Pearson', role: 'Store Manager', status: 'Offer', score: 98, email: 'jessica@example.com', notes: [] },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [candidates, setCandidates] = useState(initialCandidates);
  const [jobs, setJobs] = useState([
    { id: 101, title: "Store Manager", location: "Plainsboro, NJ", status: "Active", applicants: 3 },
    { id: 102, title: "Sales Lead", location: "New Milford, NJ", status: "Active", applicants: 1 }
  ]);
  
  // State for CRM Search
  const [searchTerm, setSearchTerm] = useState("");
  // State for Modal
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newNote, setNewNote] = useState("");
  // State for Job Form
  const [jobForm, setJobForm] = useState({ title: '', location: '', salary: '' });

  // --- ACTIONS ---

  // 1. PARSING ENGINE (Simulated)
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    alert(`⚡ AI Parsing ${file.name}...`);
    setTimeout(() => {
      const newCand = {
        id: Date.now(),
        name: "Jordan Smith", // Simulating extracted name
        role: "Unassigned",
        status: "Applied",
        score: Math.floor(Math.random() * 20) + 75,
        email: "jordan.smith@gmail.com",
        notes: []
      };
      setCandidates([...candidates, newCand]);
      alert("✅ Candidate added to Database!");
    }, 1500);
  };

  // 2. KANBAN MOVEMENT
  const moveCandidate = (id, newStatus) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  // 3. COLLABORATIVE NOTES
  const addNote = () => {
    if (!newNote) return;
    const updatedCandidates = candidates.map(c => {
      if (c.id === selectedCandidate.id) {
        return { ...c, notes: [...c.notes, { author: 'You', text: newNote }] };
      }
      return c;
    });
    setCandidates(updatedCandidates);
    // Update the local modal data too so it shows instantly
    setSelectedCandidate({ ...selectedCandidate, notes: [...selectedCandidate.notes, { author: 'You', text: newNote }] });
    setNewNote("");
  };

  // 4. HIRING VELOCITY METRICS
  const getVelocity = (stage) => candidates.filter(c => c.status === stage).length;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <div className="w-64 bg-[#0F172A] text-white p-6 flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="mb-10 px-2 font-black italic text-2xl tracking-tighter uppercase underline decoration-indigo-500">Staff IQ</div>
        
        <nav className="flex-1 space-y-2 text-sm">
          <div className="px-4 pb-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">Intelligence</div>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Analytics Hub 📊</button>
          
          <div className="px-4 pt-4 pb-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">Hiring</div>
          <button onClick={() => setActiveTab('kanban')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'kanban' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Pipeline Board</button>
          <button onClick={() => setActiveTab('crm')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'crm' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>Candidate CRM</button>
          <button onClick={() => setActiveTab('jobs')} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'jobs' ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>My Jobs</button>
        </nav>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 ml-64 p-12">

        {/* --- VIEW: ANALYTICS HUB --- */}
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl animate-in fade-in">
            <h1 className="text-4xl font-black mb-8">Hiring Velocity</h1>
            
            {/* Velocity Cards */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              {['Applied', 'Screening', 'Interview', 'Offer'].map(stage => (
                <div key={stage} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">{stage}</h4>
                  <div className="text-4xl font-black text-slate-900">{getVelocity(stage)}</div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-900 text-white p-10 rounded-[3rem] flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black mb-2">Avg. Time to Fill</h3>
                <p className="text-indigo-200">Your velocity is 12% faster than the industry average.</p>
              </div>
              <div className="text-6xl font-black">18 <span className="text-lg font-bold">days</span></div>
            </div>
          </div>
        )}

        {/* --- VIEW: KANBAN BOARD --- */}
        {activeTab === 'kanban' && (
          <div className="h-full overflow-x-auto">
            <h1 className="text-3xl font-black mb-8">Visual Pipeline</h1>
            <div className="flex gap-6 min-w-max">
              {['Applied', 'Screening', 'Interview', 'Offer'].map(column => (
                <div key={column} className="w-80 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="font-black text-sm uppercase tracking-widest">{column}</h3>
                    <span className="bg-slate-200 text-xs font-bold px-2 py-1 rounded-full">{getVelocity(column)}</span>
                  </div>
                  
                  <div className="bg-slate-100/50 p-4 rounded-3xl min-h-[500px] space-y-4">
                    {candidates.filter(c => c.status === column).map(c => (
                      <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900">{c.name}</h4>
                          <span className={`text-xs font-black ${c.score > 90 ? 'text-green-500' : 'text-orange-400'}`}>{c.score}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">{c.role}</p>
                        
                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedCandidate(c)} className="flex-1 bg-slate-50 hover:bg-indigo-50 text-indigo-600 py-2 rounded-lg text-[10px] font-black uppercase">View</button>
                          {column !== 'Offer' && (
                             <button onClick={() => moveCandidate(c.id, column === 'Applied' ? 'Screening' : column === 'Screening' ? 'Interview' : 'Offer')} className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-[10px] font-black uppercase">Move →</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW: CANDIDATE CRM --- */}
        {activeTab === 'crm' && (
          <div className="max-w-5xl animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black">Candidate Database</h1>
              <div className="relative">
                <input type="file" id="crm-upload" className="hidden" onChange={handleResumeUpload} />
                <label htmlFor="crm-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2">
                  <span>⚡ Parsing Engine: Upload Resume</span>
                </label>
              </div>
            </div>

            {/* Search Bar */}
            <input 
              type="text" 
              placeholder="Search by name, skill, or role..." 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl mb-6 font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Name</th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Role</th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Status</th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Score</th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                    <tr key={c.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50">
                      <td className="p-6 font-bold text-slate-900">{c.name}</td>
                      <td className="p-6 text-sm text-slate-500">{c.role}</td>
                      <td className="p-6"><span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-500">{c.status}</span></td>
                      <td className="p-6 font-black text-green-600">{c.score}</td>
                      <td className="p-6"><button onClick={() => setSelectedCandidate(c)} className="text-indigo-600 font-bold text-sm hover:underline">Open Profile</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW: MY JOBS --- */}
        {activeTab === 'jobs' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black">My Jobs</h1>
              <button className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold">+ New Requisition</button>
            </div>
            <div className="grid gap-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-8 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="text-xl font-black">{job.title}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{job.location} • {job.status}</p>
                  </div>
                  <div className="text-center bg-indigo-50 px-6 py-2 rounded-2xl">
                     <div className="text-2xl font-black text-indigo-600">{job.applicants}</div>
                     <div className="text-[9px] uppercase font-black text-indigo-300">Candidates</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MODAL: COLLABORATIVE PROFILE --- */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedCandidate(null)} className="absolute top-8 right-10 text-3xl text-slate-300 hover:text-slate-800">×</button>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-black">{selectedCandidate.score}</div>
                <div>
                  <h2 className="text-3xl font-black">{selectedCandidate.name}</h2>
                  <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">{selectedCandidate.role}</p>
                </div>
              </div>

              {/* Collaborative Notes Section */}
              <div className="bg-slate-50 p-8 rounded-3xl mb-6">
                <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Team Feedback & Notes</h3>
                
                <div className="space-y-4 mb-6">
                  {selectedCandidate.notes.length === 0 && <p className="text-sm italic text-slate-400">No notes yet. Be the first!</p>}
                  {selectedCandidate.notes.map((note, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-black text-indigo-600">{note.author}</span>
