'use client';

import { useState, useEffect } from 'react';
import MortgageCalculator from './components/MortgageCalculator';
import AmortizationSchedule from './components/AmortizationSchedule';
import PaymentBreakdown from './components/PaymentBreakdown';
import AffordabilityCalculator from './components/AffordabilityCalculator';
import { HeaderAd, FooterAd, InContentAd } from '@/components/monetization/AdSense';

// AdSense configuration - replace with actual values when available
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';
const ADSENSE_SLOTS = {
  header: 'XXXXXXXXXX',
  footer: 'XXXXXXXXXX',
  content: 'XXXXXXXXXX'
};

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(5000);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaFees, setHoaFees] = useState(0);
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculate derived values
  const principal = loanAmount - downPayment;
  const downPaymentPercent = (downPayment / loanAmount) * 100;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Calculate monthly payment (principal + interest)
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Calculate PMI if down payment < 20%
  const pmiRate = downPaymentPercent < 20 ? 0.005 : 0; // 0.5% annually
  const monthlyPMI = downPaymentPercent < 20 ? (principal * pmiRate) / 12 : 0;

  // Calculate total monthly payment
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = homeInsurance / 12;
  const totalMonthlyPayment = monthlyPayment + monthlyPMI + monthlyPropertyTax + monthlyInsurance + hoaFees;

  // Calculate total interest
  const totalInterest = (monthlyPayment * numPayments) - principal;

  // Add AdSense script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Mortgage Calculator</h1>
          <p className="mt-2 text-gray-600">Calculate your monthly mortgage payment and see a detailed amortization schedule</p>
        </div>
      </header>

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <HeaderAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.header} />
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calculator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Amortization Schedule
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'breakdown'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment Breakdown
            </button>
            <button
              onClick={() => setActiveTab('affordability')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'affordability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Affordability
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && (
          <>
            <MortgageCalculator
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              downPayment={downPayment}
              setDownPayment={setDownPayment}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              loanTerm={loanTerm}
              setLoanTerm={setLoanTerm}
              propertyTax={propertyTax}
              setPropertyTax={setPropertyTax}
              homeInsurance={homeInsurance}
              setHomeInsurance={setHomeInsurance}
              hoaFees={hoaFees}
              setHoaFees={setHoaFees}
              monthlyPayment={monthlyPayment}
              monthlyPMI={monthlyPMI}
              totalMonthlyPayment={totalMonthlyPayment}
              totalInterest={totalInterest}
              principal={principal}
            />
            {/* In-content ad after calculator */}
            <div className="mt-8">
              <InContentAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.content} />
            </div>
          </>
        )}
        
        {activeTab === 'schedule' && (
          <AmortizationSchedule
            principal={principal}
            interestRate={interestRate}
            loanTerm={loanTerm}
            monthlyPayment={monthlyPayment}
          />
        )}
        
        {activeTab === 'breakdown' && (
          <PaymentBreakdown
            monthlyPayment={monthlyPayment}
            monthlyPMI={monthlyPMI}
            monthlyPropertyTax={monthlyPropertyTax}
            monthlyInsurance={monthlyInsurance}
            hoaFees={hoaFees}
            totalMonthlyPayment={totalMonthlyPayment}
          />
        )}
        
        {activeTab === 'affordability' && (
          <AffordabilityCalculator
            totalMonthlyPayment={totalMonthlyPayment}
          />
        )}
      </main>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.footer} />
      </div>

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Mortgage Calculator. This calculator provides estimates for informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}