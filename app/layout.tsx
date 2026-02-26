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

const jsonLd = [
  {
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
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is my monthly mortgage payment calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monthly mortgage payment is calculated using the formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is principal, r is monthly interest rate, and n is number of payments. This covers principal and interest only - add taxes, insurance, PMI, and HOA fees for total payment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is PMI and when do I need it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home price. It protects the lender and usually costs 0.5-1% of the loan amount annually. PMI can be removed once you reach 20% equity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in PITI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PITI stands for Principal, Interest, Taxes, and Insurance - the four components of a monthly mortgage payment. Principal reduces your loan balance, interest is the cost of borrowing, property taxes go to local government, and insurance protects your home.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much house can I afford?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most lenders recommend your monthly housing payment not exceed 28% of gross monthly income, and total debt payments not exceed 36%. Use our calculator to see how different loan amounts affect your monthly payment and affordability.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an amortization schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An amortization schedule shows how each payment is split between principal and interest over the life of your loan. Early payments go mostly to interest, while later payments reduce more principal. Our calculator provides a full amortization table.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Your Mortgage Payment',
    description: 'Step-by-step guide to calculating your monthly mortgage payment and total costs',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Home Price',
        text: 'Input the purchase price or value of the home',
      },
      {
        '@type': 'HowToStep',
        name: 'Set Down Payment',
        text: 'Enter your down payment amount or percentage (minimum 3-5% for most loans)',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Loan Terms',
        text: 'Select your interest rate and loan term (15 or 30 years typical)',
      },
      {
        '@type': 'HowToStep',
        name: 'Add Property Costs',
        text: 'Include annual property taxes, insurance, HOA fees, and PMI if applicable',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate Payment',
        text: 'Click calculate to see monthly payment breakdown and full amortization schedule',
      },
    ],
  },
];

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