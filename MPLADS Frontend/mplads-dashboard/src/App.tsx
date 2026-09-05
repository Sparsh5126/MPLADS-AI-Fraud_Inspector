import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleSelection } from './pages/RoleSelection';
import { MinistryLayout } from './layouts/MinistryLayout';

import { Dashboard } from './pages/Dashboard';
import { Works } from './pages/Works';
import { WorkInvestigation } from './pages/WorkInvestigation';
import { MapView } from './pages/MapView';
import { Investigations } from './pages/Investigations';
import { CostAnalysis } from './pages/CostAnalysis';
import { PaymentAnalysis } from './pages/PaymentAnalysis';
import { DuplicateWorks } from './pages/DuplicateWorks';
import { ImageForensics } from './pages/ImageForensics';
import { VendorNetwork } from './pages/VendorNetwork';
import { Compliance } from './pages/Compliance';
import { Reports } from './pages/Reports';
import { SettingsPage } from './pages/Settings';
import { StateLayout } from './layouts/StateLayout';
import { StateDashboard } from './pages/StateDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        
        {/* Ministry Routes */}
        <Route path="/ministry" element={<MinistryLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:id" element={<WorkInvestigation />} />
          <Route path="map" element={<MapView />} />
          <Route path="investigations" element={<Investigations />} />
          <Route path="cost-analysis" element={<CostAnalysis />} />
          <Route path="payment-analysis" element={<PaymentAnalysis />} />
          <Route path="duplicate-works" element={<DuplicateWorks />} />
          <Route path="image-forensics" element={<ImageForensics />} />
          <Route path="vendor-network" element={<VendorNetwork />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* State Routes */}
        <Route path="/state" element={<StateLayout />}>
          <Route index element={<StateDashboard />} />
          <Route path="*" element={<Navigate to="/state" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
