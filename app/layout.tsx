import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import { ogImage } from '@/lib/og/card'
import { siteConfig } from '@/lib/site'
import './globals.css'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | پیوند روانشناسی نوین و حکمت اسلامی`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'روانشناسی',
    'مشاوره خانواده',
    'روانشناسی اسلامی',
    'سلامت روان',
    'دوره آموزشی روانشناسی',
    'روان‌درمانی',
    'آرامش معنوی',
    'یاوران سلامت روان',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    languages: {
      'fa-IR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | پیوند روانشناسی نوین و حکمت اسلامی`,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#1b5e3b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'تهران',
    addressRegion: 'تهران',
    addressCountry: 'IR',
    streetAddress: 'خیابان ولیعصر، نبش کوچه یاس، پلاک ۱۲۰',
  },
  telephone: '+98-21-88881234',
  email: siteConfig.email,
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#page-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-green-deep focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          رد شدن به محتوای اصلی
        </a>
        <div className="pattern-field">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}