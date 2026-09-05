import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Landmark, ShieldCheck } from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'ministry',
      title: 'Ministry Level (MoSPI)',
      description: 'National overview, scheme performance, and aggregated insights across all states.',
      icon: <Building2 size={32} className="text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      path: '/ministry'
    },
    {
      id: 'state',
      title: 'State Nodal Authority',
      description: 'State-specific monitoring, district-level tracking, and anomaly detection.',
      icon: <Landmark size={32} className="text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      path: '/state'
    },
    {
      id: 'district',
      title: 'District Authority',
      description: 'Detailed project management, field inspections, and local vendor oversight.',
      icon: <ShieldCheck size={32} className="text-purple-600" />,
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      path: '/district',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Landmark size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MPLADS Monitoring Portal</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Select your role to access the appropriate dashboard. Each view provides tailored insights and controls for your administrative level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => !role.disabled && navigate(role.path)}
              disabled={role.disabled}
              className={`text-left p-6 rounded-2xl border transition-all ${role.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1'}`}
            >
              <div className={`w-14 h-14 rounded-xl ${role.bg} ${role.border} border flex items-center justify-center mb-4`}>
                {role.icon}
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{role.description}</p>
              
              {!role.disabled && (
                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600">
                  Access Dashboard &rarr;
                </div>
              )}
              {role.disabled && (
                <div className="mt-6 flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Coming Soon
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
