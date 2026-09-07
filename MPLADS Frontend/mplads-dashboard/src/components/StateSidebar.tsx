import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, FileText, MapPin, AlertTriangle, GitCompare,
  Users, IndianRupee, FileBarChart, Settings,
} from 'lucide-react';

const navItems = [
  { path: '/state', icon: Home, label: 'Dashboard' },
  { path: '/state/works', icon: FileText, label: 'Works & Projects' },
  { path: '/state/districts', icon: MapPin, label: 'Districts' },
  { path: '/state/anomaly-analysis', icon: AlertTriangle, label: 'Anomaly Analysis' },
  { path: '/state/compare-districts', icon: GitCompare, label: 'Compare Districts' },
  { path: '/state/ia-performance', icon: Users, label: 'IA Performance' },
  { path: '/state/budget', icon: IndianRupee, label: 'Budget & Utilization' },
  { path: '/state/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/state/settings', icon: Settings, label: 'Settings' },
];

export const StateSidebar: React.FC = () => {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col w-[250px] transition-width duration-200"
      style={{ backgroundColor: '#0F1B2D' }}
    >
      {/* MoSPI branding */}
      <div className="px-5 pt-6 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
            {/* Simple emblem placeholder */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.1)"/>
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight tracking-wide">MoSPI</p>
            <p className="text-white/60 text-[10px] leading-tight mt-0.5">Yatharth Monitoring Portal</p>
          </div>
        </div>
      </div>

      {/* Role Indicator Card */}
      <div className="px-4 mb-4">
        <div className="bg-white/10 border border-white/15 rounded-lg p-3">
          <p className="text-white/50 text-[9px] uppercase font-bold tracking-wider mb-1">State Nodal Authority</p>
          <p className="text-white font-semibold text-sm">Uttar Pradesh</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/state'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors ${
                isActive 
                ? 'bg-blue-600/20 text-white font-medium relative' 
                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full" />
                )}
                <Icon size={18} className={isActive ? 'text-white' : 'text-blue-200/50'} />
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Footer */}
      <div className="px-5 py-5 mt-auto relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-30"></div>
        <p className="text-white/70 font-semibold text-xs tracking-wide">Transparent Governance</p>
        <p className="text-white/40 text-[10px] mt-0.5">Stronger India</p>
      </div>
    </aside>
  );
};
