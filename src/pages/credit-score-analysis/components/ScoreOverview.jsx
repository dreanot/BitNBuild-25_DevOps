import React from 'react';
import Icon from '../../../components/AppIcon';

const ScoreOverview = ({ score, trend, percentile, lastUpdated }) => {
  const getScoreColor = (score) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-warning';
    return 'text-error';
  };

  const getScoreRing = (score) => {
    if (score >= 750) return 'stroke-success';
    if (score >= 650) return 'stroke-warning';
    return 'stroke-error';
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 900) * circumference;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">CIBIL Score Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Updated {lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`${getScoreRing(score)} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-sm text-muted-foreground">out of 900</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-lg font-semibold ${getScoreColor(score)} mb-1`}>
              {getScoreCategory(score)}
            </div>
            <div className="text-sm text-muted-foreground">
              Better than {percentile}% of Indians
            </div>
          </div>
        </div>

        {/* Score Details */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${trend > 0 ? 'bg-success' : trend < 0 ? 'bg-error' : 'bg-muted-foreground'}`} />
              <span className="font-medium text-foreground">Score Trend</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={trend > 0 ? "TrendingUp" : trend < 0 ? "TrendingDown" : "Minus"} 
                size={16} 
                className={trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground'} 
              />
              <span className={`font-semibold ${trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground'}`}>
                {trend > 0 ? '+' : ''}{trend} points
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground mb-1">₹12.5L</div>
              <div className="text-sm text-muted-foreground">Credit Limit</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground mb-1">8</div>
              <div className="text-sm text-muted-foreground">Active Accounts</div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Credit Utilization</span>
              <span className="text-sm text-muted-foreground">32%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: '32%' }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Recommended: Keep below 30%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreOverview;