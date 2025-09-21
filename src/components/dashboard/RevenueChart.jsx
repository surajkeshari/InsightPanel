import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenueData } from '../../data/demoData';

const RevenueChart = () => {
  return (
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Revenue</h4>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fill: 'var(--text-secondary)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-default)',
                borderColor: 'var(--border-color)',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="previousWeek" stroke="#8884d8" strokeWidth={2} name="Previous Week" />
            <Line type="monotone" dataKey="currentWeek" stroke="#82ca9d" strokeWidth={2} name="Current Week" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;