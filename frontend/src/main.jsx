import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PreferencesProvider } from './contexts/PreferencesContext.jsx'
import { NotificationsProvider } from './contexts/NotificationsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreferencesProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </PreferencesProvider>
  </React.StrictMode>,
)
