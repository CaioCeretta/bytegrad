import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KindeProvider
      domain='https://bytegradcc.kinde.com'
      clientId='1dac60cc4ab84caf8b28e1123498ba3f'
      redirectUri='http://localhost:5173'
    >
    <App />
    </KindeProvider>
  </StrictMode>,
)
