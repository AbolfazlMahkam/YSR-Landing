import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'موسسه یاوران سلامت روان | پیوند روانشناسی نوین و حکمت اسلامی',
  description:
    'موسسه آموزشی و پژوهشی یاوران سلامت روان؛ ارائه‌دهنده دوره‌های تخصصی روانشناسی، مشاوره خانواده و روانشناسی اسلامی بر پایه پیوند دانش نوین و معارف اسلامی.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1b5e3b',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
