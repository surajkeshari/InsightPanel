import React from 'react';

const StatusBadge = ({ status }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusStyles = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Complete': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Approved': 'bg-emerald-100 text-emerald-800',
    'Rejected': 'bg-red-100 text-red-800',
  };

  return (
    <span className={`${baseClasses} ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyles[status]?.replace('text', 'bg')?.replace('100', '400')}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;