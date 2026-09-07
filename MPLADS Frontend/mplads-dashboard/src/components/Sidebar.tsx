import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, ListChecks, MapPin, AlertTriangle, BarChart3, CreditCard,
  Copy, Image, Network, ShieldCheck, FileText, Settings, FileBarChart,
} from 'lucide-react';

const navItems = [
  { path: '/ministry', icon: Home, label: 'Dashboard' },
  { path: '/ministry/works', icon: FileText, label: 'Works & Projects' },
  { path: '/ministry/map', icon: MapPin, label: 'Geographic View' },
  { path: '/ministry/investigations', icon: AlertTriangle, label: 'Investigations' },
  
  { section: 'Analytics' },
  { path: '/ministry/cost-analysis', icon: BarChart3, label: 'Cost Analysis' },
  { path: '/ministry/payment-analysis', icon: CreditCard, label: 'Payment Analysis' },
  { path: '/ministry/duplicate-works', icon: Copy, label: 'Duplicate Works' },
  { path: '/ministry/image-forensics', icon: Image, label: 'Image Forensics' },
  { path: '/ministry/vendor-network', icon: Network, label: 'Vendor Network' },
  
  { section: 'Management' },
  { path: '/ministry/compliance', icon: ShieldCheck, label: 'Compliance Rules' },
  { path: '/ministry/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/ministry/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col"
      style={{ width: collapsed ? 64 : 240, backgroundColor: '#0F1B2D', transition: 'width 0.2s' }}
    >
      {/* Logo / Branding */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Ashoka Emblem SVG placeholder */}
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-600/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#60A5FA" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" fill="#60A5FA"/>
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <line
                  key={i}
                  x1="12" y1="12"
                  x2={12 + 8 * Math.cos((deg - 90) * Math.PI / 180)}
                  y2={12 + 8 * Math.sin((deg - 90) * Math.PI / 180)}
                  stroke="#60A5FA" strokeWidth="1" opacity="0.5"
                />
              ))}
            </svg>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Yatharth</p>
              <p className="text-blue-300 text-[10px] leading-tight">Fraud & Anomaly Detection</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-2.5">
            <p className="text-white/35 text-[9px] uppercase tracking-widest leading-relaxed">
              Transparent Development · Stronger India
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item, index) => {
          if ('section' in item) {
            return !collapsed ? (
              <p key={index} className="text-white/40 text-[10px] uppercase font-semibold tracking-wider mt-5 mb-2 px-4">
                {item.section}
              </p>
            ) : null;
          }
          const { path, icon: Icon, label } = item;
          return (
            <NavLink
              key={path}
              to={path as string}
              end={path === '/ministry'}
              className={({ isActive }) =>
                `nav-item mb-0.5 ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              {Icon && <Icon size={17} className="flex-shrink-0" />}
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom quote */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/10 flex-shrink-0">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white/50 text-[10px] italic leading-relaxed mb-2">
              "Accountability today for a better tomorrow."
            </p>
            <p className="text-white/30 text-[9px] uppercase tracking-wider">Yatharth</p>
            <p className="text-white/25 text-[9px]">People's Development, People's Trust</p>
          </div>
        </div>
      )}
    </aside>
  );
};
