import React from 'react';
import { Outlet } from 'react-router-dom';
import { DistrictSidebar } from '../components/DistrictSidebar';
import { DistrictTopbar } from '../components/DistrictTopbar';

export const DistrictLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <DistrictSidebar />
      <DistrictTopbar />
      <main
        className="min-h-screen transition-all duration-200"
        style={{
          marginLeft: 260,
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
