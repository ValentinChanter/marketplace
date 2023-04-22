import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { StateContext } from '../../context/StateContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Toaster /> {/* Notification */}
      <Component {...pageProps} />
    </StateContext>
    )
}
