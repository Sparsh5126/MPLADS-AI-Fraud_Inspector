import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, FileText, Users, CreditCard, AlertTriangle, Clock,
  FileBarChart, Settings,
} from 'lucide-react';

const navItems = [
  { path: '/district', icon: Home, label: 'Dashboard' },
  { path: '/district/works', icon: FileText, label: 'Works & Projects' },
  { path: '/district/agencies', icon: Users, label: 'Implementing Agencies' },
  { path: '/district/payments', icon: CreditCard, label: 'Payments' },
  { path: '/district/anomaly-analysis', icon: AlertTriangle, label: 'Anomaly Analysis' },
  { path: '/district/work-progress', icon: Clock, label: 'Work Progress' },
  { path: '/district/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/district/settings', icon: Settings, label: 'Settings' },
];

export const DistrictSidebar: React.FC = () => {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col"
      style={{ width: 260, backgroundColor: '#0D233D' }}
    >
      {/* MoSPI Branding */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.08)" />
              <circle cx="12" cy="10" r="3" />
              <path d="M8 17h8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight tracking-wide">MoSPI</p>
            <p className="text-white/55 text-[9.5px] leading-tight mt-0.5">Ministry of Statistics &</p>
            <p className="text-white/55 text-[9.5px] leading-tight">Programme Implementation</p>
            <p className="text-white/40 text-[9px] leading-tight mt-1">Yatharth Monitoring Portal</p>
          </div>
        </div>
      </div>

      {/* Role Card */}
      <div className="px-4 mb-3">
        <div className="bg-white/10 border border-white/15 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="1.8">
              <path d="M3 21h18" strokeLinecap="round" />
              <path d="M5 21V7l7-4 7 4v14" />
              <path d="M9 21V12h6v9" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white/50 text-[9px] uppercase font-bold tracking-wider leading-none mb-1">District Authority</p>
            <p className="text-white font-semibold text-sm leading-tight">Meerut, Uttar Pradesh</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1 px-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/district'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all ${
                isActive
                  ? 'bg-blue-600/25 text-white font-semibold shadow-sm'
                  : 'text-blue-100/55 hover:bg-white/6 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-400 rounded-r-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}
                <Icon
                  size={17}
                  className={isActive ? 'text-white' : 'text-blue-200/45'}
                />
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer illustration + text */}
      <div className="px-5 pt-4 pb-2 mt-auto relative overflow-hidden flex-shrink-0">
        {/* Government building SVG illustration */}
        <div className="flex justify-center mb-3 opacity-20">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="white" strokeWidth="1">
            <rect x="10" y="40" width="100" height="18" rx="1" />
            <rect x="18" y="28" width="84" height="14" rx="1" />
            <rect x="26" y="18" width="68" height="12" rx="1" />
            <rect x="55" y="10" width="10" height="10" rx="1" />
            <line x1="55" y1="10" x2="60" y2="4" />
            <line x1="65" y1="10" x2="60" y2="4" />
            {[22,32,42,52,62,72,82,92].map(x => (
              <rect key={x} x={x} y={43} width="6" height="15" rx="0.5" />
            ))}
          </svg>
        </div>
        <p className="text-white/60 font-semibold text-[11px] tracking-wide text-center">Data for Development</p>
        <p className="text-white/40 text-[10px] text-center">Transparent Governance · Stronger India</p>

        {/* Tricolor line */}
        <div className="mt-3 h-[2px] rounded-full overflow-hidden flex">
          <div className="flex-1 bg-orange-400" />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1 bg-green-500" />
        </div>
      </div>
    </aside>
  );
};
