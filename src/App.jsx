import React, { useState } from 'react';

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
    if (!window.google || !window.google.generativeAi) {
      return alert("AI Library is still loading. Please wait a moment or check your index.html script tag.");
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
    { id: 'Dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'Post a Job', icon: '🚀', label: 'Post a Job' },
    { id: 'Candidates', icon: '👥', label: 'Candidates' },
    { id: 'Analytics', icon: '📈', label: 'Analytics' },
    { id: 'Settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      {/* SIDEBAR */}
      <aside style={{ width: '256px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', padding: '24px', position: 'fixed', height: '100%' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: '48px' }}>Staff IQ</h1>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === item.id ? '#4f46e5' : 'transparent',
                color: activeTab === item.id ? 'white' : '#94a3b8',
                textAlign: 'left'
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: '256px', minHeight: '100vh' }}>
        <header style={{ padding: '32px 32px 16px 32px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', fontStyle: 'italic' }}>{activeTab}</h2>
        </header>

        <section style={{ maxWidth: '1152px', padding: '32px' }}>
          {activeTab === 'Dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
               <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Active Roles</p>
                <p style={{ fontSize: '30px', fontWeight: '900' }}>12</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Candidates</p>
                <p style={{ fontSize: '30px', fontWeight: '900' }}>458</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Interviews</p>
                <p style={{ fontSize: '30px', fontWeight: '900' }}>5</p>
              </div>
            </div>
          )}

          {activeTab === 'Post a Job' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Job Title</label>
                    <input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: 'none', outline: 'none' }} 
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                  <div style={{ width: '128px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Salary</label>
                    <input defaultValue="55000" style={{ width: '100%', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: 'none', textAlign: 'center' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Description</label>
                  <button 
                    onClick={generateDescription}
                    disabled={isGenerating}
                    style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                  >
                    {isGenerating ? '⌛ Generating...' : '✨ Generate with Gemini'}
                  </button>
                </div>
                
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Click 'Generate' to create a description..." 
                  style={{ width: '100%', height: '320px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: 'none', marginBottom: '24px', outline: 'none', resize: 'none', lineHeight: '1.6' }}
                />

                <button style={{ width: '100%', padding: '20px', backgroundColor: '#0f172a', color: 'white', borderRadius: '16px', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
                  Publish Requisition 🚀
                </button>
              </div>
            </div>
          )}

          {['Candidates', 'Analytics', 'Settings'].includes(activeTab) && (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '24px' }}>
              <p style={{ fontStyle: 'italic' }}>The {activeTab} module is coming soon.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
