import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export const MinistryLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-main">
      <Sidebar />
      <Topbar sidebarWidth={SIDEBAR_WIDTH} />

      <main
        className="min-h-screen"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          paddingTop: HEADER_HEIGHT + 24,
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
