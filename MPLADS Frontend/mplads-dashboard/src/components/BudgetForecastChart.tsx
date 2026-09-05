import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { month: 'Apr', Sanctioned: 4.2, Utilized: 2.1, Projected: 0 },
  { month: 'May', Sanctioned: 5.8, Utilized: 3.5, Projected: 0 },
  { month: 'Jun', Sanctioned: 8.4, Utilized: 5.2, Projected: 0 },
  { month: 'Jul', Sanctioned: 12.0, Utilized: 8.1, Projected: 0 },
  { month: 'Aug', Sanctioned: 15.5, Utilized: 11.4, Projected: 0 },
  { month: 'Sep', Sanctioned: 18.2, Utilized: 14.5, Projected: 0 }, // Current month
  { month: 'Oct', Sanctioned: 18.2, Utilized: 14.5, Projected: 16.8 },
  { month: 'Nov', Sanctioned: 18.2, Utilized: 14.5, Projected: 19.5 },
  { month: 'Dec', Sanctioned: 18.2, Utilized: 14.5, Projected: 22.1 },
  { month: 'Jan', Sanctioned: 18.2, Utilized: 14.5, Projected: 25.0 }, // Exceeding ₹25Cr entitlement for 5 MPs limit if not careful
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 text-sm mb-2">{label} 2025</p>
        {payload.map((entry: any, index: number) => {
          if (entry.value === 0 && entry.dataKey === 'Projected') return null;
          if (entry.value === 14.5 && entry.dataKey === 'Utilized' && label !== 'Sep') return null; // hide flat line for future
          return (
            <div key={index} className="flex items-center justify-between gap-4 text-xs mb-1">
              <span style={{ color: entry.color }} className="font-medium">{entry.name}</span>
              <span className="font-bold text-gray-800">₹{entry.value.toFixed(1)} Cr</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export const BudgetForecastChart: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-800">Budget Utilization & Forecast (Total MPs: 5)</p>
        <div className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          Total Annual Entitlement: ₹25.0 Cr
        </div>
      </div>
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
            
            <Bar dataKey="Sanctioned" name="Sanctioned Amount" barSize={20} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index > 5 ? '#E5E7EB' : '#93C5FD'} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="Utilized" name="Actual Utilized" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            <Line type="monotone" dataKey="Projected" name="Forecast Utilized" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#F59E0B' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
