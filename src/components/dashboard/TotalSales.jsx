import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { totalSalesData } from '../../data/demoData';

const TotalSales = () => {
    // Corrected data from your image (ensure this matches your demoData)
    const correctedData = [
        { name: 'Affiliate', value: 139.10, color: '#A5B4FC' }, // Light purple
        { name: 'Direct', value: 300.20, color: '#4F46E5' },    // Darker purple
        { name: 'E-mail', value: 48.40, color: '#D9F99D' },     // Light green
        { name: 'Sponsored', value: 154.02, color: '#6366F1' }  // Medium purple
    ];

    // Calculate the correct total from the corrected data
    const totalValue = correctedData.reduce((sum, entry) => sum + entry.value, 0);

    // Custom label for the center of the pie chart
    // This will render directly within the SVG of the PieChart
    const renderCustomTotalLabel = ({ cx, cy }) => (
        <g>
            <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" className="text-sm fill-muted">
                Total
            </text>
            <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="central" className="text-3xl font-bold fill-foreground">
                ${totalValue.toFixed(2)}
            </text>
        </g>
    );

    return (
        <div className="bg-card p-5 rounded-xl border border-border shadow-md h-full transition-all hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Total Sales</h4>
            <div className="w-full h-60">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={correctedData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={true}
                            // No onMouseEnter/onMouseLeave here if using Tooltip and activeShape
                        >
                            {correctedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        {/* This Pie component is used ONLY to render the total label in the center */}
                        <Pie
                            data={[{ name: 'Total', value: totalValue, color: 'transparent' }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={0} // Make it fill the whole center to capture clicks if needed
                            outerRadius={60} // Matches the innerRadius of the main pie
                            fill="transparent"
                            label={renderCustomTotalLabel}
                            labelLine={false}
                            isAnimationActive={false}
                        />
                        <Tooltip
                            formatter={(value, name, props) => [`$${value.toFixed(2)}`, props.payload.name]}
                            labelFormatter={() => ''}
                            contentStyle={{
                                background: 'var(--bg-main)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                            }}
                            itemStyle={{ color: 'var(--foreground)' }}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            iconType="circle"
                            formatter={(value, entry) => (
                                <span className="text-sm text-muted">
                                    {value} <span className="text-foreground font-medium">${entry.payload.value.toFixed(2)}</span>
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* The absolute positioned div for total value is removed as it's now in the SVG */}
        </div>
    );
};

export default TotalSales;