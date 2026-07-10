import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './ops.css'
import OpsApp from './OpsApp'

createRoot(document.getElementById('ops-root')).render(
  <StrictMode>
    <OpsApp />
  </StrictMode>,
)
