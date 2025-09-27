import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ScoreTrend = ({ trendData, timeframe, onTimeframeChange }) => {
  const timeframes = [
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' },
    { value: '5y', label: '5 Years' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-primary">
            Score: <span className="font-semibold">{payload?.[0]?.value}</span>
          </p>
          {payload?.[0]?.payload?.change && (
            <p className={`text-xs ${payload?.[0]?.payload?.change > 0 ? 'text-success' : 'text-error'}`}>
              Change: {payload?.[0]?.payload?.change > 0 ? '+' : ''}{payload?.[0]?.payload?.change} points
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Score Trend</h2>
        <div className="flex items-center space-x-2">
          {timeframes?.map((tf) => (
            <button
              key={tf?.value}
              onClick={() => onTimeframeChange(tf?.value)}
              className={`px-3 py-1 text-sm rounded-md transition-smooth ${
                timeframe === tf?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tf?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground text-sm"
            />
            <YAxis 
              domain={[300, 900]}
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="rgb(30, 64, 175)" 
              strokeWidth={3}
              dot={{ fill: 'rgb(30, 64, 175)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'rgb(30, 64, 175)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Highest</span>
          </div>
          <div className="text-xl font-bold text-success">758</div>
          <div className="text-xs text-muted-foreground">Mar 2024</div>
        </div>

        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-error" />
            <span className="text-sm font-medium text-foreground">Lowest</span>
          </div>
          <div className="text-xl font-bold text-error">682</div>
          <div className="text-xs text-muted-foreground">Aug 2023</div>
        </div>

        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Average</span>
          </div>
          <div className="text-xl font-bold text-primary">721</div>
          <div className="text-xs text-muted-foreground">12 months</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreTrend;