import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const TaxVisualization = ({ taxData, incomeBreakdown, monthlyProjection }) => {
  const formatIndianCurrency = (value) => {
    return new Intl.NumberFormat('en-IN')?.format(value || 0);
  };

  // Tax breakdown data for pie chart
  const taxBreakdownData = [
    { name: 'Income Tax', value: taxData?.incomeTax, color: '#1E40AF' },
    { name: 'Cess', value: taxData?.cess, color: '#059669' },
    { name: 'Surcharge', value: taxData?.surcharge, color: '#F59E0B' },
    { name: 'Take Home', value: taxData?.takeHome, color: '#10B981' }
  ];

  // Income vs Tax comparison
  const comparisonData = [
    {
      category: 'Gross Income',
      oldRegime: taxData?.grossIncome,
      newRegime: taxData?.grossIncome
    },
    {
      category: 'Deductions',
      oldRegime: taxData?.totalDeductions,
      newRegime: 0
    },
    {
      category: 'Taxable Income',
      oldRegime: taxData?.grossIncome - taxData?.totalDeductions,
      newRegime: taxData?.grossIncome
    },
    {
      category: 'Tax Liability',
      oldRegime: taxData?.oldRegimeTax,
      newRegime: taxData?.newRegimeTax
    }
  ];

  // Monthly projection data
  const monthlyData = [
    { month: 'Apr', tax: monthlyProjection?.april, income: monthlyProjection?.income },
    { month: 'May', tax: monthlyProjection?.may, income: monthlyProjection?.income },
    { month: 'Jun', tax: monthlyProjection?.june, income: monthlyProjection?.income },
    { month: 'Jul', tax: monthlyProjection?.july, income: monthlyProjection?.income },
    { month: 'Aug', tax: monthlyProjection?.august, income: monthlyProjection?.income },
    { month: 'Sep', tax: monthlyProjection?.september, income: monthlyProjection?.income },
    { month: 'Oct', tax: monthlyProjection?.october, income: monthlyProjection?.income },
    { month: 'Nov', tax: monthlyProjection?.november, income: monthlyProjection?.income },
    { month: 'Dec', tax: monthlyProjection?.december, income: monthlyProjection?.income },
    { month: 'Jan', tax: monthlyProjection?.january, income: monthlyProjection?.income },
    { month: 'Feb', tax: monthlyProjection?.february, income: monthlyProjection?.income },
    { month: 'Mar', tax: monthlyProjection?.march, income: monthlyProjection?.income }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: ₹{formatIndianCurrency(entry?.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">₹{formatIndianCurrency(data?.value)}</p>
          <p className="text-sm text-muted-foreground">
            {((data?.value / taxBreakdownData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Tax Breakdown Pie Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="PieChart" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tax Breakdown</h3>
            <p className="text-sm text-muted-foreground">Distribution of your annual tax liability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taxBreakdownData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {taxBreakdownData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">₹{formatIndianCurrency(item?.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Regime Comparison Bar Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Regime Comparison</h3>
            <p className="text-sm text-muted-foreground">Old vs New tax regime analysis</p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 100000)?.toFixed(0)}L`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="oldRegime" fill="var(--color-primary)" name="Old Regime" radius={[4, 4, 0, 0]} />
              <Bar dataKey="newRegime" fill="var(--color-secondary)" name="New Regime" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Monthly Tax Projection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Monthly Tax Projection</h3>
              <p className="text-sm text-muted-foreground">FY 2024-25 tax payment schedule</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Avg Monthly Tax</p>
            <p className="text-xl font-bold text-accent">
              ₹{formatIndianCurrency(taxData?.oldRegimeTax / 12)}
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="tax" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Monthly Tax"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">₹{formatIndianCurrency(taxData?.oldRegimeTax / 4)}</p>
            <p className="text-sm text-muted-foreground">Quarterly Tax</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">₹{formatIndianCurrency(taxData?.oldRegimeTax / 2)}</p>
            <p className="text-sm text-muted-foreground">Half-yearly Tax</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">₹{formatIndianCurrency(taxData?.totalDeductions)}</p>
            <p className="text-sm text-muted-foreground">Total Deductions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{((taxData?.oldRegimeTax / taxData?.grossIncome) * 100)?.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxVisualization;