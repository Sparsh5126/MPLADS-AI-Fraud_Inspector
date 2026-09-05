import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const payments = [
  { date: 'Mar 01', amount: 9.2, cumulative: 9.2, suspicious: true },
  { date: 'Mar 08', amount: 9.5, cumulative: 18.7, suspicious: true },
  { date: 'Mar 10', amount: 9.7, cumulative: 28.4, suspicious: true },
  { date: 'Apr 15', amount: 5.2, cumulative: 33.6, suspicious: false },
  { date: 'May 20', amount: 4.8, cumulative: 38.4, suspicious: false },
];

const THRESHOLD = 10;

export const PaymentAnalysis: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Analysis</h1>
        <p className="text-sm text-gray-500 mt-0.5">Timeline and pattern analysis for work payments — W0812</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Sanctioned', value: '₹18.2 L' },
          { label: 'Total Paid', value: '₹38.4 L' },
          { label: 'Number of Payments', value: '5' },
          { label: 'Suspicious Payments', value: '3', highlight: true },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="card py-3">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Payment timeline */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">Payment Timeline (₹ Lakhs)</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={payments} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="payGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}L`} />
            <Tooltip formatter={(v: number) => `₹${v} L`} />
            <ReferenceLine y={THRESHOLD} stroke="#EF4444" strokeDasharray="4 2"
              label={{ value: 'Threshold ₹10L', fill: '#EF4444', fontSize: 10, position: 'insideTopRight' }} />
            <Area type="monotone" dataKey="amount" name="Payment Amount" stroke="#3B82F6" fill="url(#payGradient)" strokeWidth={2} dot={{ r: 4, fill: '#3B82F6' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payment list with flags */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-800 mb-4">Payment Records</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Cumulative</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Flag</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className={`border-b border-gray-50 ${p.suspicious ? 'bg-red-50/40' : ''}`}>
                <td className="px-4 py-2.5 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2.5 text-gray-700">{p.date}</td>
                <td className="px-4 py-2.5 font-medium text-gray-800">₹{p.amount} L</td>
                <td className="px-4 py-2.5 text-gray-600">₹{p.cumulative} L</td>
                <td className="px-4 py-2.5">
                  {p.suspicious && (
                    <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                      <AlertTriangle size={12} /> Near threshold
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Score */}
      <div className="card border-l-4 border-l-red-500">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Structuring Score</p>
            <p className="text-4xl font-black text-red-600">0.91</p>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 mb-1">Possible payment structuring detected</p>
            <p className="text-sm text-gray-500">3 payments occurred within a short period (10 days) and are close to the applicable ₹10L approval threshold. This pattern requires review before concluding on intent.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
