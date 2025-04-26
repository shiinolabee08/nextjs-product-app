import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

type NextPageWithTitle = AppProps['Component'] & { pageTitle?: string }

export default function MyApp({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithTitle
  const title = PageComponent.pageTitle || 'Default App Title'

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title} | AJP Templates</title>
      </Head>
      <main className="flex-1">
        <PageComponent {...pageProps} />
      </main>

      <footer className="bg-gray-200 p-4 text-blue-600 text-center">AJP Solutions | Copyright @ 2025 </footer>
    </div>
  )
}