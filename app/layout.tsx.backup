import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization Schedule',
  description: 'Free mortgage calculator to estimate monthly payments, see amortization schedules, and determine affordability. Includes PMI, taxes, insurance, and HOA fees.',
  keywords: 'mortgage calculator, home loan calculator, monthly payment calculator, amortization schedule, PMI calculator, affordability calculator',
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Payments & Amortization Schedule',
    description: 'Free mortgage calculator to estimate monthly payments, see amortization schedules, and determine affordability.',
    type: 'website',
    url: 'https://mortgage-calculator.larrys-world.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment and see detailed amortization schedule',
  },
  robots: {
    index: true,
    follow: true,
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
        <link rel="canonical" href="https://mortgage-calculator.larrys-world.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Mortgage Calculator',
              description: 'Free mortgage calculator to estimate monthly payments and amortization schedules',
              url: 'https://mortgage-calculator.larrys-world.com',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}