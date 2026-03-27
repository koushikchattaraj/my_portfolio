import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResumeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ResumeProvider>
  </StrictMode>,
)
