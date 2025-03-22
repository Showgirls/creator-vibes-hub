
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill Buffer for browser environment
import { Buffer } from 'buffer'
// Make sure Buffer is defined globally before any other imports that might use it
window.Buffer = Buffer

createRoot(document.getElementById("root")!).render(<App />);
