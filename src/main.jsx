import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css' // Ensure your Tailwind/CSS imports are here

// Import your two pages
import App from './App' // The Admin Dashboard
import PublicJobPage from './pages/PublicJobPage' // The Google Job Page
import ApplyPage from './pages/ApplyPage' // (Optional) If you created the upload page

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route 1: The Landing Page (Redirects to Admin for now) */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Route 2: The Admin Dashboard (Client View) */}
        <Route path="/admin" element={<App />} />

        {/* Route 3: The Public Job Posting (Candidate View / Google Bot View) */}
        <Route path="/jobs/store-manager" element={<PublicJobPage />} />
        
        {/* Route 4: The Apply Page (Where the 'Apply Now' button goes) */}
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
