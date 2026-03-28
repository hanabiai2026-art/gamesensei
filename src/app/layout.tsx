import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const font = Rajdhani({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'GameSensei - Professional Game Coaching',
  description:
    'Level up your gameplay with professional coaching from top-tier players. Personalized sessions, proven strategies, and real results across all major titles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
