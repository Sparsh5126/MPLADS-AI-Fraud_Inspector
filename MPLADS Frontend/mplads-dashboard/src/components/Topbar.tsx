import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockWorks } from '../data/mockWorks';

interface TopbarProps {
  sidebarWidth: number;
}

export const Topbar: React.FC<TopbarProps> = ({ sidebarWidth }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockWorks>([]);
  const [showResults, setShowResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = mockWorks.filter(w =>
      w.work_id.toLowerCase().includes(q) ||
      w.district.toLowerCase().includes(q) ||
      w.vendor.toLowerCase().includes(q) ||
      w.state.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      w.title.toLowerCase().includes(q)
    ).slice(0, 6);
    setSearchResults(results);
    setShowResults(true);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const riskColors: Record<string, string> = {
    Critical: '#EF4444', High: '#F97316', Medium: '#F59E0B', Low: '#22C55E',
  };

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 z-20"
      style={{ left: sidebarWidth }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl relative" ref={searchRef}>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search work ID, district, vendor, MP..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setShowResults(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            {searchResults.map(w => (
              <div
                key={w.work_id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                onClick={() => { navigate(`/works/${w.work_id}`); setShowResults(false); setSearchQuery(''); }}
              >
                <span className="font-mono text-xs font-bold text-primary">{w.work_id}</span>
                <span className="text-sm text-gray-700 flex-1 truncate">{w.title}</span>
                <span className="text-xs" style={{ color: riskColors[w.risk_level] }}>{w.risk_level}</span>
                <span className="text-xs text-gray-400">{w.district}</span>
              </div>
            ))}
          </div>
        )}
        {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
          <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-sm text-gray-500 text-center z-50">
            No results for "{searchQuery}"
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        {/* User avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(d => !d)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">AO</div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
              <p className="text-[10px] text-gray-500 leading-tight">Ministry Officer</p>
            </div>
            <ChevronDown size={14} className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                <User size={14} className="text-gray-400" /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                <Settings size={14} className="text-gray-400" /> Preferences
              </button>
              <div className="border-t border-gray-100 mt-1" />
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
