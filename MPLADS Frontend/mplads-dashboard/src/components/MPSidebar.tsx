import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, FileText, MapPin, LayoutGrid, Users,
  CreditCard, BookMarked, ShieldAlert, BarChart3,
  FileBarChart, Settings,
} from 'lucide-react';

const navItems = [
  { path: '/mp',                       icon: Home,        label: 'Dashboard' },
  { path: '/mp/works',                 icon: FileText,    label: 'My MPLADS Works' },
  { path: '/mp/constituency',          icon: MapPin,      label: 'Constituency Overview' },
  { path: '/mp/districts',             icon: LayoutGrid,  label: 'Districts' },
  { path: '/mp/agencies',              icon: Users,       label: 'Implementing Agencies' },
  { path: '/mp/payments',              icon: CreditCard,  label: 'Payments' },
  { path: '/mp/recommended',           icon: BookMarked,  label: 'Recommended Works' },
  { path: '/mp/classification',        icon: ShieldAlert, label: 'Classification' },
  { path: '/mp/anomaly-analysis',      icon: BarChart3,   label: 'Anomaly Analysis' },
  { path: '/mp/reports',               icon: FileBarChart,label: 'Reports' },
  { path: '/mp/settings',              icon: Settings,    label: 'Settings' },
];

export const MPSidebar: React.FC = () => {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col"
      style={{ width: 'var(--sidebar-width)', backgroundColor: '#0D233D' }}
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
            <p className="text-white/40 text-[9px] leading-tight mt-1">MPLADS Monitoring Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1 px-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/mp'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all ${
                isActive
                  ? 'bg-blue-600/25 text-white font-semibold'
                  : 'text-blue-100/55 hover:bg-white/6 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-400 rounded-r-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}
                <Icon size={16} className={isActive ? 'text-white' : 'text-blue-200/45'} />
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 pt-3 pb-2 mt-auto flex-shrink-0">
        {/* Parliament illustration */}
        <div className="flex justify-center mb-3 opacity-20">
          <svg width="120" height="56" viewBox="0 0 120 56" fill="none" stroke="white" strokeWidth="1">
            <rect x="5" y="38" width="110" height="16" rx="1" />
            <rect x="15" y="26" width="90" height="14" rx="1" />
            <rect x="28" y="16" width="64" height="12" rx="1" />
            <ellipse cx="60" cy="16" rx="14" ry="7" />
            <line x1="60" y1="9" x2="60" y2="3" strokeWidth="1.5" />
            {[22,32,42,52,62,72,82,92].map(x => (
              <rect key={x} x={x} y={40} width="5" height="14" rx="0.5" />
            ))}
          </svg>
        </div>
        <p className="text-white/60 font-semibold text-[11px] tracking-wide text-center">People's Development</p>
        <p className="text-white/40 text-[10px] text-center">Transparent Governance · Stronger India</p>
        <div className="mt-3 h-[2px] rounded-full overflow-hidden flex">
          <div className="flex-1 bg-orange-400" />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1 bg-green-500" />
        </div>
      </div>
    </aside>
  );
};
