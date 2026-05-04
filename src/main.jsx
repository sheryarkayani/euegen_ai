import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1a1627',
            border: '1px solid rgba(34,29,53,0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(34,29,53,0.08)',
          },
          success: {
            iconTheme: { primary: '#d4a853', secondary: '#0c0a0e' },
          },
          error: {
            iconTheme: { primary: '#e8748a', secondary: '#0c0a0e' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
