import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memorae - Your AI-Powered Second Brain',
  description: 'Capture, organize, and recall everything that matters with intelligent memory assistance',
  keywords: 'AI, memory assistant, knowledge management, productivity, second brain',
  authors: [{ name: 'Memorae Team' }],
  openGraph: {
    title: 'Memorae - Your AI-Powered Second Brain',
    description: 'Capture, organize, and recall everything that matters with intelligent memory assistance',
    type: 'website',
    url: 'https://memorae.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
