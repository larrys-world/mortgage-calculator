'use client';

interface MortgageCalculatorProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  propertyTax: number;
  setPropertyTax: (value: number) => void;
  homeInsurance: number;
  setHomeInsurance: (value: number) => void;
  hoaFees: number;
  setHoaFees: (value: number) => void;
  monthlyPayment: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  principal: number;
}

export default function MortgageCalculator({
  loanAmount,
  setLoanAmount,
  downPayment,
  setDownPayment,
  interestRate,
  setInterestRate,
  loanTerm,
  setLoanTerm,
  propertyTax,
  setPropertyTax,
  homeInsurance,
  setHomeInsurance,
  hoaFees,
  setHoaFees,
  monthlyPayment,
  monthlyPMI,
  totalMonthlyPayment,
  totalInterest,
  principal,
}: MortgageCalculatorProps) {
  const downPaymentPercent = (downPayment / loanAmount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Loan Details</h2>
        
        <div className="space-y-6">
          {/* Home Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2">
              <input
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ({downPaymentPercent.toFixed(1)}%)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max={loanAmount}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full"
              />
            </div>
            {downPaymentPercent < 20 && (
              <p className="text-sm text-orange-600 mt-1">
                PMI required for down payments less than 20%
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2">
              <input
                type="range"
                min="3"
                max="10"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          {/* Property Tax */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Property Tax
            </label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Home Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Home Insurance
            </label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* HOA Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly HOA Fees
            </label>
            <input
              type="number"
              value={hoaFees}
              onChange={(e) => setHoaFees(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Monthly Payment Breakdown</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <span className="text-gray-600">Principal & Interest</span>
            <span className="text-xl font-semibold">{formatCurrency(monthlyPayment)}</span>
          </div>
          
          {monthlyPMI > 0 && (
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">PMI</span>
              <span className="text-xl font-semibold">{formatCurrency(monthlyPMI)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pb-4 border-b">
            <span className="text-gray-600">Property Tax</span>
            <span className="text-xl font-semibold">{formatCurrency(propertyTax / 12)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b">
            <span className="text-gray-600">Home Insurance</span>
            <span className="text-xl font-semibold">{formatCurrency(homeInsurance / 12)}</span>
          </div>
          
          {hoaFees > 0 && (
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">HOA Fees</span>
              <span className="text-xl font-semibold">{formatCurrency(hoaFees)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-semibold">Total Monthly Payment</span>
            <span className="text-2xl font-bold text-blue-600">{formatCurrency(totalMonthlyPayment)}</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Amount</span>
              <span className="font-medium">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest Paid</span>
              <span className="font-medium">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount Paid</span>
              <span className="font-medium">{formatCurrency(principal + totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}