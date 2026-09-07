import React from 'react';
import { Outlet } from 'react-router-dom';
import { MPSidebar } from '../components/MPSidebar';
import { MPTopbar } from '../components/MPTopbar';

export const MPLayout: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC]">
      <MPSidebar />
      <MPTopbar />
      <main
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-width)',
          paddingTop: 'calc(var(--header-height) + 24px)',
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
