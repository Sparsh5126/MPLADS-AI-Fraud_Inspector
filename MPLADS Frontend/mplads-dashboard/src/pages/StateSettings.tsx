import React, { useState } from 'react';
import { Settings, Bell, Lock, User, Monitor, Shield, ChevronRight, Check } from 'lucide-react';

const sections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Lock, label: 'Security' },
  { id: 'display', icon: Monitor, label: 'Display' },
  { id: 'access', icon: Shield, label: 'Access Control' },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export const StateSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({ name: 'UP Nodal Officer', email: 'nodal.up@mospi.gov.in', district: 'Uttar Pradesh', role: 'State Nodal Authority' });
  const [notifications, setNotifications] = useState({ criticalAlerts: true, dailyDigest: true, emailReport: false, smsAlerts: false, browserNotif: true });
  const [display, setDisplay] = useState({ compactMode: false, showAnimations: true, highContrast: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and portal configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar Nav */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden lg:col-span-1 h-fit">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${activeSection === s.id ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}
            >
              <span className="flex items-center gap-3">
                <s.icon size={16} className={activeSection === s.id ? 'text-blue-600' : 'text-gray-400'} />
                <span className={`text-sm font-medium ${activeSection === s.id ? 'text-blue-700' : 'text-gray-700'}`}>{s.label}</span>
              </span>
              <ChevronRight size={14} className={activeSection === s.id ? 'text-blue-500' : 'text-gray-300'} />
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><User size={16} className="text-blue-500" /> Profile Settings</h2>
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'State / Region', key: 'district', type: 'text' },
                { label: 'Role', key: 'role', type: 'text', disabled: true },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={profile[f.key as keyof typeof profile]}
                    onChange={e => !f.disabled && setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                    disabled={f.disabled}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all ${f.disabled ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50'}`}
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><Bell size={16} className="text-blue-500" /> Notification Preferences</h2>
              {[
                { key: 'criticalAlerts', label: 'Critical Anomaly Alerts', desc: 'Immediate alerts for critical risk detections' },
                { key: 'dailyDigest', label: 'Daily Digest', desc: 'Summary of daily Yatharth activity' },
                { key: 'emailReport', label: 'Email Reports', desc: 'Receive weekly reports via email' },
                { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get critical alerts via SMS' },
                { key: 'browserNotif', label: 'Browser Notifications', desc: 'Desktop push notifications' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{n.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                  </div>
                  <Toggle
                    value={notifications[n.key as keyof typeof notifications]}
                    onChange={v => setNotifications(prev => ({ ...prev, [n.key]: v }))}
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'display' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><Monitor size={16} className="text-blue-500" /> Display Preferences</h2>
              {[
                { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing for a denser layout' },
                { key: 'showAnimations', label: 'Animations', desc: 'Enable UI transitions and animations' },
                { key: 'highContrast', label: 'High Contrast', desc: 'Increase text contrast for accessibility' },
              ].map(d => (
                <div key={d.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{d.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.desc}</p>
                  </div>
                  <Toggle
                    value={display[d.key as keyof typeof display]}
                    onChange={v => setDisplay(prev => ({ ...prev, [d.key]: v }))}
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><Lock size={16} className="text-blue-500" /> Security Settings</h2>
              <div className="space-y-4">
                {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
                  <div key={l}>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{l}</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                  </div>
                ))}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-800">🔒 Two-Factor Authentication is enabled on your account.</p>
                  <p className="text-xs text-blue-600 mt-1">Your account is secured via OTP on registered mobile number.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'access' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><Shield size={16} className="text-blue-500" /> Access Control</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-amber-800">State Nodal Authority — Read & Write Access</p>
                <p className="text-xs text-amber-600 mt-1">You have access to all districts in Uttar Pradesh. Contact MoSPI admin to modify permissions.</p>
              </div>
              <div className="space-y-2">
                {['View Works & Projects', 'View District Reports', 'Download Reports', 'Flag Anomalies', 'Manage IAS Reviews'].map(p => (
                  <div key={p} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {saved ? <><Check size={15} /> Saved!</> : <><Settings size={15} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
