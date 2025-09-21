import React from 'react';
import OrderTable from '../components/orders/OrderTable';

const OrdersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-foreground mb-6">Order List</h1>
      <OrderTable />
    </div>
  );
};

export default OrdersPage;