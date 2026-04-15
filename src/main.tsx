import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { queryClient } from './lib/queryClient'
import './index.css'
import App from './App.tsx'

const manifestUrl =
  "https://raw.githubusercontent.com/draysongz/tongrid/main/public/manifest.json"
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App />
      </TonConnectUIProvider>
    </QueryClientProvider>
  </StrictMode>,
)
