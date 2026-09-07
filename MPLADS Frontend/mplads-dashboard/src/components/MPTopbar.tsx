import React, { useState } from 'react';
import { Search, Bell, LogOut, ChevronDown, X, AlertTriangle, Info, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, icon: AlertTriangle, color: 'text-red-500 bg-red-50',  title: '18 works delayed beyond 6 months', desc: 'Immediate review required', time: '30 min ago' },
  { id: 2, icon: Clock,         color: 'text-amber-500 bg-amber-50', title: '32 works with low progress (< 25%)', desc: 'Progress update pending', time: '2 hr ago' },
  { id: 3, icon: Info,          color: 'text-blue-500 bg-blue-50',  title: 'New recommended work added', desc: 'RW-052 – Anganwadi, Kithor', time: '5 hr ago' },
];

export const MPTopbar: React.FC = () => {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-6 gap-4"
      style={{ left: 'var(--sidebar-width)' }}
    >
      {/* Search */}
      <div className="flex-1 max-w-[520px]">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search work ID, village, district, IA, keyword..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(s => !s)}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              3
            </span>
          </button>
          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Notifications</p>
                <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
              </div>
              <div className="divide-y divide-gray-50">
                {notifications.map(n => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.color.split(' ')[1]}`}>
                      <n.icon size={15} className={n.color.split(' ')[0]} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View all notifications →</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* MP Identity */}
        <button className="flex items-center gap-2.5 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors">
          <div className="w-9 h-9 rounded-full bg-[#0D233D] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
            MP
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Shri Rajendra Agrawal</p>
            <p className="text-[11px] text-gray-500 leading-tight">Member of Parliament · Meerut, UP</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        {/* Logout */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut size={17} />
          <span className="text-sm font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};
