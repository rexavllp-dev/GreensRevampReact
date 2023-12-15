// import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Greens International',
  description: 'Greens International',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" className='light'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body >
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
