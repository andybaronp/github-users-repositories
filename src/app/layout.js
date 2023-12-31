import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lista usurios Github',
  description: 'Search repositories on Github ',

}
export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <link rel='icon' href='/favicon.png' />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className='max-w-6xl mx-auto mt-28'>{children}</main>
      </body>
    </html>
  )
}
