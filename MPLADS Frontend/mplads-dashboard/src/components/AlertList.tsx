import React from 'react';
import { AlertTriangle, Image, CreditCard, Network, DollarSign, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Alert } from '../data/mockAlerts';

interface AlertListProps {
  alerts: Alert[];
  limit?: number;
}

const alertIcons: Record<string, React.ReactNode> = {
  cost: <DollarSign size={14} />,
  duplicate: <AlertTriangle size={14} />,
  payment: <CreditCard size={14} />,
  image: <Image size={14} />,
  vendor: <Network size={14} />,
  compliance: <Shield size={14} />,
};

const alertIconBg: Record<string, string> = {
  cost: '#FEF2F2',
  duplicate: '#FEF2F2',
  payment: '#FFF7ED',
  image: '#FEF2F2',
  vendor: '#FFF7ED',
  compliance: '#FEF2F2',
};

const alertIconColor: Record<string, string> = {
  cost: '#DC2626',
  duplicate: '#DC2626',
  payment: '#EA580C',
  image: '#DC2626',
  vendor: '#EA580C',
  compliance: '#DC2626',
};

export const AlertList: React.FC<AlertListProps> = ({ alerts, limit }) => {
  const navigate = useNavigate();
  const displayed = limit ? alerts.slice(0, limit) : alerts;

  return (
    <div className="flex flex-col divide-y divide-gray-50">
      {displayed.map(alert => (
        <div
          key={alert.id}
          className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 cursor-pointer hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
          onClick={() => navigate(`/works/${alert.work_id}`)}
        >
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 mt-0.5"
            style={{ backgroundColor: alertIconBg[alert.type], color: alertIconColor[alert.type] }}
          >
            {alertIcons[alert.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 leading-tight">{alert.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{alert.reference}</p>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{alert.timeAgo}</span>
        </div>
      ))}
    </div>
  );
};
