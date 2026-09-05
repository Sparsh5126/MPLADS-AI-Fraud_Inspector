import React, { useState } from 'react';
import { Bell, Shield, Eye, Globe, Moon } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({ email: true, sms: false, inApp: true });
  const [thresholds, setThresholds] = useState({ critical: 75, high: 55, medium: 35 });
  const [language, setLanguage] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure your dashboard preferences and alert settings</p>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-gray-500" />
          <p className="text-sm font-semibold text-gray-800">Notification Preferences</p>
        </div>
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive critical alerts via email' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Receive critical alerts via SMS' },
            { key: 'inApp', label: 'In-App Notifications', desc: 'Show notification badge in dashboard' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className={`w-11 h-6 rounded-full relative transition-colors ${notifications[key as keyof typeof notifications] ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifications[key as keyof typeof notifications] ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Risk thresholds */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-gray-500" />
          <p className="text-sm font-semibold text-gray-800">Risk Score Thresholds</p>
        </div>
        <div className="space-y-4">
          {[
            { key: 'critical', label: 'Critical threshold', color: '#EF4444' },
            { key: 'high', label: 'High threshold', color: '#F97316' },
            { key: 'medium', label: 'Medium threshold', color: '#F59E0B' },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{thresholds[key as keyof typeof thresholds]}</span>
              </div>
              <input
                type="range" min={10} max={95}
                value={thresholds[key as keyof typeof thresholds]}
                onChange={e => setThresholds(t => ({ ...t, [key]: Number(e.target.value) }))}
                className="w-full accent-current"
                style={{ accentColor: color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-gray-500" />
          <p className="text-sm font-semibold text-gray-800">Language & Region</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Interface Language</label>
          <select className="select-filter" value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </div>
      </div>

      <button onClick={handleSave} className={`btn-primary ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}>
        {saved ? '✓ Settings Saved' : 'Save Settings'}
      </button>
    </div>
  );
};
