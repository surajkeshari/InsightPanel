import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatCard = ({ title, value, change, isPositive, icon }) => {
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const arrowIcon = isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />;
  const iconBgColor = isPositive ? 'bg-green-100/50' : 'bg-red-100/50';
  const iconColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between h-full transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-muted">{title}</p>
        <div className={`p-2 rounded-full ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{value}</h3>
        <p className={`flex items-center text-sm font-semibold mt-2 ${changeColor}`}>
          {arrowIcon}
          <span>{change}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;