import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Fira_Code as MonoFont } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const mono = MonoFont({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (<main className={`${inter.variable} ${mono.variable} font-sans`}>
    <Component {...pageProps} />
  </main>)
}

export default MyApp
