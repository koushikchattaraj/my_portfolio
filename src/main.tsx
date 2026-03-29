import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import siteLogoUrl from './assets/logo.png'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import './index.css'
import App from './App.tsx'

{
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = siteLogoUrl
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResumeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ResumeProvider>
  </StrictMode>,
)
