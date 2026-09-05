import React from 'react';
import { Outlet } from 'react-router-dom';
import { StateSidebar } from '../components/StateSidebar';
import { StateTopbar } from '../components/StateTopbar';

export const StateLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <StateSidebar />
      <StateTopbar />
      
      <main
        className="min-h-screen transition-all duration-200"
        style={{
          marginLeft: 250,
          paddingTop: 64 + 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 40,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
