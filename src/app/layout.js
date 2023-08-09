import './globals.css'
import { Inter, Space_Mono } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alterestate Github',
  description: 'Search repositories on Github ',
}


export default function RootLayout({ children }) {
  return (

    <html lang="es">
      <body className={inter.className}>

        <Navbar />

        <main
          style={{
            padding: '0 20px',
          }}
        >
          {children}
        </main>

      </body>
    </html >
  )
}
