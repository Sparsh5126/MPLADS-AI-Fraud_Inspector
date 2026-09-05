import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { year: '2020', Cost: 12, Payment: 8, Duplicate: 4, Compliance: 15 },
  { year: '2021', Cost: 15, Payment: 10, Duplicate: 5, Compliance: 12 },
  { year: '2022', Cost: 18, Payment: 12, Duplicate: 8, Compliance: 18 },
  { year: '2023', Cost: 24, Payment: 15, Duplicate: 12, Compliance: 25 },
  { year: '2024', Cost: 30, Payment: 22, Duplicate: 18, Compliance: 35 },
  { year: '2025', Cost: 18, Payment: 14, Duplicate: 9, Compliance: 20 }, // Partial year / Current
];

export const AnomalyTrendsChart: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPayment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              labelStyle={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
            <Area type="monotone" dataKey="Compliance" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorCompliance)" strokeWidth={2} />
            <Area type="monotone" dataKey="Cost" stroke="#EF4444" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} />
            <Area type="monotone" dataKey="Payment" stroke="#F97316" fillOpacity={1} fill="url(#colorPayment)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
