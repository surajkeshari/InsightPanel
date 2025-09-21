import React, { useState } from 'react';
import { FiPlus, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { orderData } from '../../data/demoData.js';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination.jsx';
import { UserAvatar } from '../../assets/user-avatars.jsx';

const OrderTable = () => {
  const [orders] = useState(orderData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-card p-4 sm:p-6 rounded-xl border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-[var(--bg-main)]">
            <FiPlus size={16}/> Add
          </button>
        </div>
        <div className="relative w-full sm:w-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search orders..." className="w-full sm:w-64 bg-[var(--bg-main)] border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border hidden md:table">
          <thead className="bg-[var(--bg-main)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider"><input type="checkbox" /></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {currentItems.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserAvatar name={order.user} />
                    <div className="ml-3 text-sm font-medium text-foreground">{order.user}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{order.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-muted hover:text-foreground"><FiMoreVertical /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentItems.map(order => (
                <div key={order.id} className="bg-[var(--bg-main)] p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-accent">{order.id}</div>
                        <StatusBadge status={order.status} />
                    </div>
                    <div className="mb-2">
                        <div className="text-sm font-medium text-foreground">{order.user}</div>
                        <div className="text-sm text-muted">{order.project}</div>
                    </div>
                    <div className="text-xs text-muted">{order.date}</div>
                </div>
            ))}
        </div>
      </div>
       <Pagination
        totalItems={orders.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OrderTable;