'use client';

import { useState } from 'react';

interface AffordabilityCalculatorProps {
  totalMonthlyPayment: number;
}

export default function AffordabilityCalculator({
  totalMonthlyPayment,
}: AffordabilityCalculatorProps) {
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPaymentSaved, setDownPaymentSaved] = useState(80000);

  const monthlyIncome = annualIncome / 12;
  const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
  const backEndRatio = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;

  // Standard lending guidelines
  const maxFrontEndRatio = 28;
  const maxBackEndRatio = 36;

  const isAffordable = frontEndRatio <= maxFrontEndRatio && backEndRatio <= maxBackEndRatio;

  // Calculate max affordable home price based on income
  const maxMonthlyPayment = monthlyIncome * 0.28;
  const maxTotalDebt = monthlyIncome * 0.36;
  const maxHousingPayment = Math.min(maxMonthlyPayment, maxTotalDebt - monthlyDebts);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Affordability Calculator</h2>
        <p className="text-gray-600">
          Check if this mortgage fits within recommended debt-to-income ratios
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Gross Income
          </label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Monthly: {formatCurrency(monthlyIncome)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Debt Payments
          </label>
          <input
            type="number"
            value={monthlyDebts}
            onChange={(e) => setMonthlyDebts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Car loans, credit cards, student loans, etc.
          </p>
        </div>
      </div>

      {/* Affordability Status */}
      <div className={`p-6 rounded-lg mb-8 ${isAffordable ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex items-center mb-4">
          {isAffordable ? (
            <>
              <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-green-900">This mortgage appears affordable!</h3>
            </>
          ) : (
            <>
              <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-red-900">This mortgage may be a stretch</h3>
            </>
          )}
        </div>
        <p className={isAffordable ? 'text-green-800' : 'text-red-800'}>
          {isAffordable
            ? 'Your debt-to-income ratios are within recommended guidelines.'
            : 'Your debt-to-income ratios exceed recommended guidelines. Consider a less expensive home or increasing your down payment.'}
        </p>
      </div>

      {/* Debt-to-Income Ratios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Front-End Ratio (Housing)</h4>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Your Ratio</span>
              <span className={`font-semibold ${frontEndRatio > maxFrontEndRatio ? 'text-red-600' : 'text-green-600'}`}>
                {formatPercent(frontEndRatio)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  frontEndRatio > maxFrontEndRatio ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(frontEndRatio, 50)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Recommended: ≤ {maxFrontEndRatio}%
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Housing Payment: {formatCurrency(totalMonthlyPayment)}</p>
            <p>Monthly Income: {formatCurrency(monthlyIncome)}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Back-End Ratio (Total Debt)</h4>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Your Ratio</span>
              <span className={`font-semibold ${backEndRatio > maxBackEndRatio ? 'text-red-600' : 'text-green-600'}`}>
                {formatPercent(backEndRatio)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  backEndRatio > maxBackEndRatio ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(backEndRatio, 60)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Recommended: ≤ {maxBackEndRatio}%
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Total Debt: {formatCurrency(totalMonthlyPayment + monthlyDebts)}</p>
            <p>Monthly Income: {formatCurrency(monthlyIncome)}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-3">Based on Your Income</h4>
        <div className="space-y-2 text-blue-800">
          <p>• Maximum recommended housing payment: {formatCurrency(maxMonthlyPayment)}</p>
          <p>• Maximum total debt payments: {formatCurrency(maxTotalDebt)}</p>
          <p>• Available for housing after other debts: {formatCurrency(maxHousingPayment)}</p>
        </div>
        {!isAffordable && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="font-semibold mb-2">To make this affordable, you could:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Increase down payment to reduce monthly payment</li>
              <li>Look for homes priced {formatCurrency((totalMonthlyPayment - maxHousingPayment) * 200)} less</li>
              <li>Pay off existing debts to free up {formatCurrency(monthlyDebts)}/month</li>
              <li>Wait and save to increase income or down payment</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}