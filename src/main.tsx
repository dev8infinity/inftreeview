import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerLicense } from '@syncfusion/ej2-base';


// Registering Syncfusion license key
registerLicense(import.meta.env.VITE_SYNCFUSION_API_KEY);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
