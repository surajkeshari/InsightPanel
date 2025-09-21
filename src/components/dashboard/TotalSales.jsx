import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { totalSalesData } from '../../data/demoData';

const TotalSales = () => {
  return (
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm h-full">
      <h4 className="text-lg font-semibold mb-4">Total Sales</h4>
      <div className="w-full h-60">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={totalSalesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {totalSalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend layout="vertical" verticalAlign="middle" align="right" 
              iconType="circle"
              formatter={(value, entry) => (
                <span className="text-muted">
                  {value} <span className="text-foreground font-medium">${entry.payload.value}</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSales;