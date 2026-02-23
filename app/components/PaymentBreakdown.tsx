'use client';

interface PaymentBreakdownProps {
  monthlyPayment: number;
  monthlyPMI: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  hoaFees: number;
  totalMonthlyPayment: number;
}

export default function PaymentBreakdown({
  monthlyPayment,
  monthlyPMI,
  monthlyPropertyTax,
  monthlyInsurance,
  hoaFees,
  totalMonthlyPayment,
}: PaymentBreakdownProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Calculate percentages
  const principalPercent = monthlyPayment / totalMonthlyPayment;
  const pmiPercent = monthlyPMI / totalMonthlyPayment;
  const taxPercent = monthlyPropertyTax / totalMonthlyPayment;
  const insurancePercent = monthlyInsurance / totalMonthlyPayment;
  const hoaPercent = hoaFees / totalMonthlyPayment;

  const segments = [
    { label: 'Principal & Interest', amount: monthlyPayment, percent: principalPercent, color: 'bg-blue-500' },
    ...(monthlyPMI > 0 ? [{ label: 'PMI', amount: monthlyPMI, percent: pmiPercent, color: 'bg-orange-500' }] : []),
    { label: 'Property Tax', amount: monthlyPropertyTax, percent: taxPercent, color: 'bg-green-500' },
    { label: 'Home Insurance', amount: monthlyInsurance, percent: insurancePercent, color: 'bg-purple-500' },
    ...(hoaFees > 0 ? [{ label: 'HOA Fees', amount: hoaFees, percent: hoaPercent, color: 'bg-pink-500' }] : []),
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Breakdown</h2>
        <p className="text-gray-600">
          Visual breakdown of your total monthly payment
        </p>
      </div>

      {/* Total Payment */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">Total Monthly Payment</p>
        <p className="text-4xl font-bold text-blue-600">{formatCurrency(totalMonthlyPayment)}</p>
      </div>

      {/* Visual Bar Chart */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden flex">
          {segments.map((segment, index) => (
            <div
              key={segment.label}
              className={`${segment.color} h-full transition-all duration-500`}
              style={{ width: `${segment.percent * 100}%` }}
              title={`${segment.label}: ${formatCurrency(segment.amount)}`}
            />
          ))}
        </div>
      </div>

      {/* Legend and Details */}
      <div className="space-y-4">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-4 h-4 ${segment.color} rounded mr-3`} />
              <span className="text-gray-700">{segment.label}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">{formatCurrency(segment.amount)}</span>
              <span className="text-gray-500 ml-2">({formatPercent(segment.percent)})</span>
            </div>
          </div>
        ))}
      </div>

      {/* Annual Totals */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Annual Totals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Annual Payments</p>
            <p className="text-xl font-semibold">{formatCurrency(totalMonthlyPayment * 12)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Principal & Interest Only</p>
            <p className="text-xl font-semibold">{formatCurrency(monthlyPayment * 12)}</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Money-Saving Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          {monthlyPMI > 0 && (
            <li>• Reach 20% equity to eliminate PMI and save {formatCurrency(monthlyPMI * 12)}/year</li>
          )}
          <li>• Make extra principal payments to reduce total interest paid</li>
          <li>• Review insurance annually for better rates</li>
          <li>• Appeal property tax assessment if overvalued</li>
        </ul>
      </div>
    </div>
  );
}