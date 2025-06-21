import '@/styles/globals.css'
import '@/styles/theme.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--default-font-family',
  preload: true,
})

type NextPageWithTitle = AppProps['Component'] & { pageTitle?: string }

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const PageComponent = Component as NextPageWithTitle
  const title = PageComponent.pageTitle || 'Default App Title'

  return (
    <ThemeProvider>
      {/* <SessionProvider session={session}> */}
        <div className={`flex min-h-screen flex-col ${inter.variable}`}>
          <Head>
            <title>{title} | AJP Templates</title>
          </Head>
          <main className="flex-1">
            <PageComponent {...pageProps} />
          </main>
        </div>
      {/* </SessionProvider> */}
    </ThemeProvider>
  )
}