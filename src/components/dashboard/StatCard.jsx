

import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatCard = ({ title, value, change, isPositive, icon }) => {
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const arrowIcon = isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />;

  return (
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-muted">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-1">{value}</h3>
          <p className={`flex items-center text-sm font-medium mt-2 ${changeColor}`}>
            {arrowIcon}
            {change}
          </p>
        </div>
        <div className="text-2xl text-muted">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;