
// Load polyfills first before any other imports
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
window.global = window;

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(<App />);
