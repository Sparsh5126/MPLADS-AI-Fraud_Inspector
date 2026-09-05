import React from 'react';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StateTopbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-6"
      style={{ left: 250 }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search work ID, district, MP, constituency..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* User Profile */}
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-2 rounded-lg transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
            SN
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700 leading-tight">State Nodal Authority</p>
            <p className="text-[11px] text-gray-500 leading-tight">Uttar Pradesh</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* Logout */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};
