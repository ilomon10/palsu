import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DesignSystemProvider } from '../components/DesignSystemProvider'
import { ToastProvider, ToastViewport } from '../components/Toast'

function App({ Component, pageProps }: AppProps) {
  return (
    <DesignSystemProvider>
      <ToastProvider swipeDirection="right">
        <Component {...pageProps} />
        <ToastViewport />
      </ToastProvider>
    </DesignSystemProvider>
  )
}

export default App
