import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply dark mode based on OS preference and keep it in sync
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
const applyTheme = (isDark: boolean) => {
  const el = document.documentElement
  if (isDark) el.classList.add('dark')
  else el.classList.remove('dark')
}
applyTheme(prefersDark?.matches ?? false)
prefersDark?.addEventListener?.('change', (e) => applyTheme(e.matches))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
