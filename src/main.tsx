import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

export function mountScrollComponent(elementId: string, props = {}) {
  const container = document.getElementById(elementId)
  if (!container) {
    console.error('Container not found:', elementId)
    return
  }
  
  const root = createRoot(container)
  root.render(<App {...props} />)
}

if (typeof window !== 'undefined') {
  (window as unknown as { mountScrollComponent: typeof mountScrollComponent }).mountScrollComponent = mountScrollComponent
}

if (import.meta.env.DEV) {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    createRoot(rootElement).render(<App />)
  }
}