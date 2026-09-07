import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const works = [
  { id: 'W1042', title: 'Community hall construction', village: 'Brahmpuri', ia: 'Dev Infra Pvt Ltd', progress: 100, status: 'Completed', daysLeft: 0, lastUpdate: '12 Jun 2025' },
  { id: 'W1038', title: 'Primary road widening', village: 'Kharkhoda', ia: 'UP Roads Corp', progress: 62, status: 'In Progress', daysLeft: 28, lastUpdate: '20 Jun 2025' },
  { id: 'W1029', title: 'Drainage system phase-2', village: 'Sardhana', ia: 'City Construct Ltd', progress: 28, status: 'Delayed', daysLeft: -18, lastUpdate: '01 Jun 2025' },
  { id: 'W1021', title: 'Anganwadi building', village: 'Daurala', ia: 'GreenBuild Assoc', progress: 78, status: 'In Progress', daysLeft: 15, lastUpdate: '22 Jun 2025' },
  { id: 'W1015', title: 'Solar street lights', village: 'Mawana', ia: 'LightTech Infra', progress: 100, status: 'Completed', daysLeft: 0, lastUpdate: '10 Jun 2025' },
  { id: 'W1008', title: 'Water supply pipeline', village: 'Hastinapur', ia: 'Aqua Projects Ltd', progress: 44, status: 'In Progress', daysLeft: 45, lastUpdate: '18 Jun 2025' },
  { id: 'W1002', title: 'School building renovation', village: 'Kithor', ia: 'EduBuild Co', progress: 0, status: 'Not Started', daysLeft: -30, lastUpdate: 'Never' },
  { id: 'W0994', title: 'Community health center', village: 'Meerut City', ia: 'HealthPro Infra', progress: 15, status: 'Delayed', daysLeft: -45, lastUpdate: '28 May 2025' },
];

const progressBucketData = [
  { range: '0%', count: 1 },
  { range: '1-25%', count: 2 },
  { range: '26-50%', count: 2 },
  { range: '51-75%', count: 1 },
  { range: '76-99%', count: 1 },
  { range: '100%', count: 2 },
];

const statusStyles: Record<string, string> = {
  'Completed':   'bg-green-100 text-green-700 border-green-200',
  'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
  'Delayed':     'bg-red-100 text-red-700 border-red-200',
  'Not Started': 'bg-gray-100 text-gray-600 border-gray-200',
};

export const DistrictWorkProgress: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const filtered = works.filter(w => statusFilter === 'All' || w.status === statusFilter);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Work Progress</h1>
        <p className="text-sm text-gray-500 mt-0.5">Real-time progress tracking for Meerut district works</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Completed', value: works.filter(w => w.status === 'Completed').length, icon: CheckCircle2, col: 'text-green-600 bg-green-50' },
          { label: 'In Progress', value: works.filter(w => w.status === 'In Progress').length, icon: Clock, col: 'text-blue-600 bg-blue-50' },
          { label: 'Delayed', value: works.filter(w => w.status === 'Delayed').length, icon: AlertTriangle, col: 'text-red-600 bg-red-50' },
          { label: 'Avg. Progress', value: `${Math.round(works.reduce((s, w) => s + w.progress, 0) / works.length)}%`, icon: TrendingUp, col: 'text-purple-600 bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.col.split(' ')[1]}`}>
              <s.icon size={18} className={s.col.split(' ')[0]} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Distribution Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 col-span-1">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Progress Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressBucketData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" name="Works" fill="#3B82F6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Works progress table */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900 flex-1">Individual Work Progress</h2>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none">
              {['All', 'In Progress', 'Delayed', 'Completed', 'Not Started'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Work ID', 'Title', 'Progress', 'Days Left', 'Status', 'Last Update'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(w => (
                  <tr key={w.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-blue-600 font-semibold">{w.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-[180px] truncate">{w.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-gray-100 rounded-full w-20">
                          <div className="h-full rounded-full transition-all"
                            style={{ width: `${w.progress}%`, backgroundColor: w.status === 'Delayed' ? '#EF4444' : '#3B82F6' }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{w.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: w.daysLeft < 0 ? '#EF4444' : w.daysLeft < 15 ? '#F97316' : '#22C55E' }}>
                      {w.daysLeft === 0 ? '—' : w.daysLeft < 0 ? `${Math.abs(w.daysLeft)}d overdue` : `${w.daysLeft}d left`}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyles[w.status]}`}>{w.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{w.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
