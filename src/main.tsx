
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make Buffer available globally BEFORE any imports that might use it
import { Buffer } from 'buffer'
// Explicitly set Buffer in the global window object
window.Buffer = window.Buffer || Buffer
// Also ensure global is defined and points to window
window.global = window.global || window

createRoot(document.getElementById("root")!).render(<App />);
