import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WrittenProvider } from './contexts/WrittenContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <WrittenProvider>
    <App />
    </WrittenProvider>
  </React.Suspense>,
)
