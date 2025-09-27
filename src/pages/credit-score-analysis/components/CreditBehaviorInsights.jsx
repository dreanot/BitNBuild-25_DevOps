import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const CreditBehaviorInsights = ({ behaviorData, spendingPatterns }) => {
  const COLORS = ['#1E40AF', '#059669', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-primary">
            Amount: <span className="font-semibold">₹{payload?.[0]?.value?.toLocaleString('en-IN')}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getBehaviorIcon = (type) => {
    switch (type) {
      case 'payment_history': return 'Clock';
      case 'utilization': return 'CreditCard';
      case 'account_mix': return 'Layers';
      case 'credit_age': return 'Calendar';
      case 'new_credit': return 'Plus';
      default: return 'BarChart3';
    }
  };

  const getBehaviorColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Behavior Analysis */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Credit Behavior Analysis</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span>Based on transaction patterns</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {behaviorData?.map((behavior, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-background rounded-full">
                    <Icon name={getBehaviorIcon(behavior?.type)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{behavior?.title}</h3>
                    <p className="text-sm text-muted-foreground">{behavior?.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className={`font-semibold ${getBehaviorColor(behavior?.score)}`}>
                    {behavior?.score}/100
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      behavior?.score >= 80 ? 'bg-success' : 
                      behavior?.score >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${behavior?.score}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 p-3 bg-background rounded border-l-4 border-l-primary">
                <p className="text-sm text-foreground">{behavior?.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Spending Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Monthly Spending Trend</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingPatterns?.monthly}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground text-sm"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground text-sm"
                  tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="rgb(30, 64, 175)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Spending by Category</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingPatterns?.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {spendingPatterns?.categories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {spendingPatterns?.categories?.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <span className="text-sm text-muted-foreground">{category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Key Behavioral Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="font-medium text-success">Positive Patterns</span>
            </div>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Consistent monthly payments for 18 months</li>
              <li>• Credit utilization below 30% for 6 months</li>
              <li>• No missed payments in the last 24 months</li>
              <li>• Diverse credit account portfolio</li>
            </ul>
          </div>

          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="font-medium text-warning">Areas for Improvement</span>
            </div>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• High credit utilization in Dec 2023 (45%)</li>
              <li>• Multiple credit inquiries in Q1 2024</li>
              <li>• Irregular payment amounts on credit cards</li>
              <li>• Limited credit history (3.2 years average)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditBehaviorInsights;