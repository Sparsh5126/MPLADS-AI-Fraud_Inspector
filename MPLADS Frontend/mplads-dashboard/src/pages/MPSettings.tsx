import React, { useState } from 'react';
import { User, Bell, Shield, Monitor, Check } from 'lucide-react';

const sections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'display', icon: Monitor, label: 'Display' },
  { id: 'security', icon: Shield, label: 'Security' },
];

export const MPSettings: React.FC = () => {
  const [active, setActive] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifSettings, setNotifSettings] = useState({ email: true, browser: true, anomaly: true, payments: false, progress: true });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="flex gap-4">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left border-b border-gray-100 last:border-0 ${active === s.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          {active === 'profile' && (
            <>
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Profile Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['Full Name', 'Shri Rajendra Agrawal'], ['Designation', 'Member of Parliament'], ['Constituency', 'Meerut'], ['State', 'Uttar Pradesh'], ['Email', 'mp.meerut@sansad.nic.in'], ['Mobile', '+91 98765 43210']].map(([label, val]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
                    <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                ))}
              </div>
            </>
          )}

          {active === 'notifications' && (
            <>
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifSettings).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Notifications</p>
                      <p className="text-xs text-gray-500">Receive {key} alerts and updates</p>
                    </div>
                    <button onClick={() => setNotifSettings(p => ({ ...p, [key]: !val }))}
                      className={`w-11 h-6 rounded-full transition-colors relative ${val ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${val ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {active === 'display' && (
            <>
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Display Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2">Language</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none w-48">
                    <option>English</option><option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2">Date Format</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none w-48">
                    <option>DD MMM YYYY</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {active === 'security' && (
            <>
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Security</h2>
              <div className="space-y-4">
                {[['Current Password', 'password'], ['New Password', 'password'], ['Confirm New Password', 'password']].map(([label, type]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
                    <input type={type} placeholder="••••••••" className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <button onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {saved ? <><Check size={15} /> Saved!</> : 'Save Changes'}
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
