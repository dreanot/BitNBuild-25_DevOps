import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SpendingChart = ({ className = '' }) => {
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [categorySpending, setCategorySpending] = useState([]);

  useEffect(() => {
    Papa.parse('/spendingData.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const monthly = [];
        const category = [];
        results.data.forEach((row) => {
          if (row.type === 'monthly') {
            monthly.push({
              month: row.month,
              income: Number(row.income),
              expenses: Number(row.expenses),
              savings: Number(row.savings)
            });
          } else if (row.type === 'category') {
            category.push({
              name: row.category,
              value: Number(row.value),
              color: row.color
            });
          }
        });
        setMonthlySpending(monthly);
        setCategorySpending(category);
      }
    });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`${label} 2025`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ₹${entry.value.toLocaleString('en-IN')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">₹{data.value.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Financial Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly income, expenses and savings pattern</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Monthly Trends (FY 2024-25)</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpending} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" fill="var(--color-success)" name="Income" radius={[2, 2, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-error)" name="Expenses" radius={[2, 2, 0, 0]} />
                <Bar dataKey="savings" fill="var(--color-primary)" name="Savings" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Spending Pie Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Expense Categories (Sep 2025)</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categorySpending.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span className="text-xs text-muted-foreground">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;
