import React from 'react';
import { topProductsData } from '../../data/demoData';

const TopProducts = () => {
  return (
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Top Selling Products</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase border-b border-border">
            <tr>
              <th scope="col" className="py-3 px-4">Name</th>
              <th scope="col" className="py-3 px-4">Price</th>
              <th scope="col" className="py-3 px-4">Quantity</th>
              <th scope="col" className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {topProductsData.map((product, index) => (
              <tr key={index} className="border-b border-border">
                <td className="py-4 px-4 font-medium text-foreground">{product.name}</td>
                <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                <td className="py-4 px-4">{product.quantity}</td>
                <td className="py-4 px-4">${product.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;