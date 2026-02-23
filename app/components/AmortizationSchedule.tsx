'use client';

import { useState } from 'react';

interface AmortizationScheduleProps {
  principal: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

interface PaymentDetail {
  month: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  balance: number;
}

export default function AmortizationSchedule({
  principal,
  interestRate,
  loanTerm,
  monthlyPayment,
}: AmortizationScheduleProps) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  // Generate amortization schedule
  const schedule: PaymentDetail[] = [];
  let balance = principal;
  
  for (let month = 1; month <= totalPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      balance: Math.max(0, balance),
    });
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const displaySchedule = showFullSchedule ? schedule : schedule.slice(0, 12);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Amortization Schedule</h2>
        <p className="text-gray-600">
          See how your payments are split between principal and interest over time
        </p>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">First Payment</p>
          <p className="text-lg font-semibold">
            {formatCurrency(schedule[0].principalPayment)} principal
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(schedule[0].interestPayment)} interest
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Last Payment</p>
          <p className="text-lg font-semibold">
            {formatCurrency(schedule[schedule.length - 1].principalPayment)} principal
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(schedule[schedule.length - 1].interestPayment)} interest
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Interest</p>
          <p className="text-lg font-semibold">
            {formatCurrency(
              schedule.reduce((sum, payment) => sum + payment.interestPayment, 0)
            )}
          </p>
          <p className="text-sm text-gray-500">
            Over {loanTerm} years
          </p>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment #</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Payment</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Principal</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Interest</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Balance</th>
            </tr>
          </thead>
          <tbody>
            {displaySchedule.map((payment, index) => (
              <tr key={payment.month} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-3 px-4">{payment.month}</td>
                <td className="text-right py-3 px-4">{formatCurrency(payment.payment)}</td>
                <td className="text-right py-3 px-4">{formatCurrency(payment.principalPayment)}</td>
                <td className="text-right py-3 px-4">{formatCurrency(payment.interestPayment)}</td>
                <td className="text-right py-3 px-4">{formatCurrency(payment.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Toggle Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowFullSchedule(!showFullSchedule)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showFullSchedule ? 'Show First Year Only' : `Show All ${totalPayments} Payments`}
        </button>
      </div>
      
      {/* Print Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Print Schedule
        </button>
      </div>
    </div>
  );
}