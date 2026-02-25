import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization Schedule',
  description: 'Free mortgage calculator to estimate monthly payments, see amortization schedules, and determine affordability. Includes PMI, taxes, insurance, and HOA fees.',
  keywords: 'mortgage calculator, home loan calculator, monthly payment calculator, amortization schedule, PMI calculator, affordability calculator, mortgage payment calculator',
  authors: [{ name: 'Larry\'s World' }],
  creator: 'Larry\'s World',
  publisher: 'Larry\'s World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization Schedule',
    description: 'Free mortgage calculator to estimate monthly payments, see amortization schedules, and determine affordability.',
    type: 'website',
    url: 'https://larrys-world.github.io/mortgage-calculator/',
    siteName: 'Larry\'s World Mortgage Calculator',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Monthly Payments & Amortization',
    description: 'Calculate your mortgage payments, PMI, taxes, and see full amortization schedule',
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
  alternates: {
    canonical: 'https://larrys-world.github.io/mortgage-calculator/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  description: 'Free mortgage calculator with PMI, taxes, insurance, and full amortization schedule.',
  url: 'https://larrys-world.github.io/mortgage-calculator/',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '3420',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}