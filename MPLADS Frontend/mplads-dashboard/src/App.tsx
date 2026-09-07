import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { StateWorks } from './pages/StateWorks';
import { StateDistricts } from './pages/StateDistricts';
import { StateAnomalyAnalysis } from './pages/StateAnomalyAnalysis';
import { StateCompareDistricts } from './pages/StateCompareDistricts';
import { StateIAPerformance } from './pages/StateIAPerformance';
import { StateBudget } from './pages/StateBudget';
import { StateReports } from './pages/StateReports';
import { StateSettings } from './pages/StateSettings';
import { DistrictLayout } from './layouts/DistrictLayout';
import { DistrictDashboard } from './pages/DistrictDashboard';
import { DistrictWorks } from './pages/DistrictWorks';
import { DistrictAgencies } from './pages/DistrictAgencies';
import { DistrictPayments } from './pages/DistrictPayments';
import { DistrictAnomalyAnalysis } from './pages/DistrictAnomalyAnalysis';
import { DistrictWorkProgress } from './pages/DistrictWorkProgress';
import { DistrictReports } from './pages/DistrictReports';
import { DistrictSettings } from './pages/DistrictSettings';

import { MPLayout } from './layouts/MPLayout';
import { MPDashboard } from './pages/MPDashboard';
import { MPWorks } from './pages/MPWorks';
import { MPConstituency } from './pages/MPConstituency';
import { MPDistricts } from './pages/MPDistricts';
import { MPAgencies } from './pages/MPAgencies';
import { MPPayments } from './pages/MPPayments';
import { MPRecommended } from './pages/MPRecommended';
import { MPClassification } from './pages/MPClassification';
import { MPAnomalyAnalysis } from './pages/MPAnomalyAnalysis';
import { MPReports } from './pages/MPReports';
import { MPSettings } from './pages/MPSettings';

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
          <Route path="works" element={<StateWorks />} />
          <Route path="districts" element={<StateDistricts />} />
          <Route path="anomaly-analysis" element={<StateAnomalyAnalysis />} />
          <Route path="compare-districts" element={<StateCompareDistricts />} />
          <Route path="ia-performance" element={<StateIAPerformance />} />
          <Route path="budget" element={<StateBudget />} />
          <Route path="reports" element={<StateReports />} />
          <Route path="settings" element={<StateSettings />} />
        </Route>

        {/* District Routes */}
        <Route path="/district" element={<DistrictLayout />}>
          <Route index element={<DistrictDashboard />} />
          <Route path="works" element={<DistrictWorks />} />
          <Route path="agencies" element={<DistrictAgencies />} />
          <Route path="payments" element={<DistrictPayments />} />
          <Route path="anomaly-analysis" element={<DistrictAnomalyAnalysis />} />
          <Route path="work-progress" element={<DistrictWorkProgress />} />
          <Route path="reports" element={<DistrictReports />} />
          <Route path="settings" element={<DistrictSettings />} />
        </Route>

        {/* MP Routes */}
        <Route path="/mp" element={<MPLayout />}>
          <Route index element={<MPDashboard />} />
          <Route path="works" element={<MPWorks />} />
          <Route path="constituency" element={<MPConstituency />} />
          <Route path="districts" element={<MPDistricts />} />
          <Route path="agencies" element={<MPAgencies />} />
          <Route path="payments" element={<MPPayments />} />
          <Route path="recommended" element={<MPRecommended />} />
          <Route path="classification" element={<MPClassification />} />
          <Route path="anomaly-analysis" element={<MPAnomalyAnalysis />} />
          <Route path="reports" element={<MPReports />} />
          <Route path="settings" element={<MPSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
