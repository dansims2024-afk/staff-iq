import React, { useState } from 'react';

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Post a Job');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AI LOGIC (USES GLOBAL SCRIPT FROM INDEX.HTML) ---
  const generateDescription = async () => {
    if (!title) return alert("Please enter a Job Title first!");
    
    // Checks the global window object for the script we added to index.html
    const googleAI = window.google?.generativeAi;
    if (!googleAI) {
      return alert("AI Library is still loading. Please check index.html for the script tag.");
    }

    setIsGenerating(true);
    try {
      const genAI = new googleAI.GoogleGenerativeAI("YOUR_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Write a short professional job description for a ${title}.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setDescription(text);
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI failed to load. Check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Sidebar Menu Items
  const menuItems = [
    { id: 'Dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'Post a Job', icon: '🚀', label: 'Post a Job' },
    { id: 'Candidates', icon: '👥', label: 'Candidates' },
    { id: 'Analytics', icon: '📈', label: 'Analytics' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR */}
      <nav style={{ width: '240px', backgroundColor: '#0f172a', color: 'white', padding: '20px', position: 'fixed', height: '100%' }}>
        <h1 style={{ fontStyle: 'italic', fontWeight: '900', marginBottom: '40px' }}>STAFF IQ</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === item.id ? '#4f46e5' : 'transparent',
                color: activeTab === item.id ? 'white' : '#94a3b8',
                fontWeight: 'bold'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', marginBottom: '30px' }}>{activeTab}</h2>

        {activeTab === 'Dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {['Active Roles', 'Candidates', 'Interviews'].map((label) => (
              <div key={label} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>{label}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{label === 'Candidates' ? '458' : '12'}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Post a Job' && (
          <div style={{ background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <input 
                placeholder="Job Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
              />
              <input defaultValue="55000" style={{ width: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8' }}>DESCRIPTION</span>
              <button onClick={generateDescription} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', cursor: 'pointer' }}>
                {isGenerating ? '⌛ Generating...' : '✨ Generate with Gemini'}
              </button>
            </div>

            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Click Generate..."
              style={{ width: '100%', height: '200px', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}
            />

            <button style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', color: 'white', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>
              Publish Requisition 🚀
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
