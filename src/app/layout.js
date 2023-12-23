// import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { LanguageProvider, useLanguage } from '@/providers/LanguageProvider'
import { Cookies } from 'react-cookie'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Greens International',
  description: 'Greens International',
}
const cookies = new Cookies();

// export default function RootLayout({ children }) { 
export default function RootLayout({ children }) {

  console.log(cookies.get('accessToken'))

  return (
    <html lang="en" dir="ltr" className='light'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body >
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider >
              <ToastProvider>
                {children}
              </ToastProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
