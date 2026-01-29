
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDom from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDom.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1040355926451-c3arkncedlbr3cchc14q72ri02kv8l50.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>,
)
