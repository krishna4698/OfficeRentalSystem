import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='332907425455-lr7rnd2a4oi4fopd20nss1vdq51k0huc.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
    
    
  </StrictMode>,
)
         