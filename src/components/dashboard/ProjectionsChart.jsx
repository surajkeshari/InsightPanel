 

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartData } from '../../data/demoData';

const ProjectionsChart = () => {
  return ( 
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm h-full">
      <h4 className="text-lg font-semibold mb-4">Projections vs Actuals</h4>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fill: 'var(--text-secondary)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-default)',
                borderColor: 'var(--border-color)',
              }}
            />
            <Bar dataKey="actual" fill="#8884d8" name="Actual" radius={[4, 4, 0, 0]} />
            <Bar dataKey="projection" fill="#82ca9d" name="Projection" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionsChart;