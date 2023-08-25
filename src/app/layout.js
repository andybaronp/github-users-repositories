import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'

const fonts = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin']
})

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
      <body className={fonts.className} >
        <Navbar />
        <main className='w-screen max-w-screen-xl mx-auto mt-20'>
          {children}
        </main>
      </body>
    </html>
  )
}
