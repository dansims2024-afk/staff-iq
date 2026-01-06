import React from 'react';
// Ensure this matches your actual CSS filename in the src folder
import './App.css'; 

function App() {
  const candidates = [
    { id: 1, name: 'MT', score: 72, role: 'Marcus Todd', dept: 'Operations', status: 'New Leads' },
    { id: 2, name: 'AR', score: 89, role: 'Alex Rivera', dept: 'Store Manager', status: 'In Review' },
    { id: 3, name: 'SC', score: 87, role: 'Sarah Chen', dept: 'Sales Lead', status: 'Interviewing' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">IQ</div>
        <nav>
          <ul>
            <li>Staff-IQ</li>
            <li>Dashboard</li>
            <li>Candidates</li>
            <li>Job Posts</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Active Pipeline</h1>
        <p className="subtitle">Ranking by Staff-IQ Smart Score</p>
        
        <div className="search-bar">
          <input type="text" placeholder="Search talent..." />
          <button className="add-btn">+ Add Candidate</button>
        </div>

        {['New Leads', 'In Review', 'Interviewing'].map((section) => (
          <section key={section} className="pipeline-section">
            <h2>{section} 1</h2>
            {candidates
              .filter((c) => c.status === section)
              .map((candidate) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="avatar">{candidate.name}</div>
                  <div className="score">{candidate.score} IQ</div>
                  <div className="info">
                    <h3>{candidate.role}</h3>
                    <p>{candidate.dept}</p>
                  </div>
                  <div className="actions">
                    <button className="hire-btn">Hire</button>
                    <span className="more-options">...</span>
                  </div>
                </div>
              ))}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
