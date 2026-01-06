import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 

// If index.css is missing or has a different name, 
// removing or commenting out the line below will fix the build error.
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
