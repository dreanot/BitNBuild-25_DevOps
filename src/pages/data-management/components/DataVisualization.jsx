import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataVisualization = ({ currentData, dataTypes }) => {
  const [selectedVisualization, setSelectedVisualization] = useState('overview');

  const getDataTypeInfo = (typeId) => {
    return dataTypes.find(dt => dt.id === typeId);
  };

  const getDataSummary = () => {
    const summary = {};
    Object.keys(currentData).forEach(key => {
      const data = currentData[key];
      if (data && data.length > 0) {
        summary[key] = {
          count: data.length,
          columns: Object.keys(data[0]).length,
          lastUpdated: new Date().toLocaleDateString()
        };
      }
    });
    return summary;
  };

  const getCreditScoreData = () => {
    const data = currentData.credit_score || [];
    if (data.length === 0) return null;
    
    return {
      currentScore: data[0]?.score || 0,
      trend: data[0]?.trend || 0,
      percentile: data[0]?.percentile || 0
    };
  };

  const getMonthlyFinancesData = () => {
    const data = currentData.monthly_finances || [];
    if (data.length === 0) return null;
    
    return data.map(month => ({
      month: month.month,
      income: parseInt(month.income) || 0,
      expenses: parseInt(month.expenses) || 0,
      savings: parseInt(month.savings) || 0
    }));
  };

  const getScoreFactorsData = () => {
    const data = currentData.score_factors || [];
    if (data.length === 0) return null;
    
    return data.map(factor => ({
      title: factor.title,
      impact: factor.impact,
      percentage: parseInt(factor.percentage) || 0,
      weight: parseInt(factor.weight) || 0
    }));
  };

  const getScoreTrendsData = () => {
    const data = currentData.score_trends || [];
    if (data.length === 0) return null;
    
    return data.map(trend => ({
      month: trend.month,
      score: parseInt(trend.score) || 0,
      change: parseInt(trend.change) || 0
    }));
  };

  const visualizations = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'credit', name: 'Credit Score', icon: 'TrendingUp' },
    { id: 'finances', name: 'Monthly Finances', icon: 'PiggyBank' },
    { id: 'factors', name: 'Score Factors', icon: 'Layers' },
    { id: 'trends', name: 'Score Trends', icon: 'Activity' }
  ];

  const renderOverview = () => {
    const summary = getDataSummary();
    const creditData = getCreditScoreData();
    const monthlyData = getMonthlyFinancesData();

    return (
      <div className="space-y-6">
        {/* Data Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(summary).map(([key, data]) => {
            const dataType = getDataTypeInfo(key);
            return (
              <div key={key} className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={dataType?.icon || 'Database'} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{dataType?.name || key}</div>
                    <div className="text-sm text-muted-foreground">{data.count} records</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        {creditData && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Credit Score Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{creditData.currentScore}</div>
                <div className="text-sm text-muted-foreground">Current Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">+{creditData.trend}</div>
                <div className="text-sm text-muted-foreground">Recent Change</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">{creditData.percentile}%</div>
                <div className="text-sm text-muted-foreground">Percentile</div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Finances Chart */}
        {monthlyData && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Finances Trend</h3>
            <div className="space-y-4">
              {monthlyData.slice(0, 6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm font-medium text-foreground">{month.month}</div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-success">₹{month.income.toLocaleString()}</div>
                    <div className="text-sm text-error">₹{month.expenses.toLocaleString()}</div>
                    <div className="text-sm text-primary">₹{month.savings.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCreditScore = () => {
    const creditData = getCreditScoreData();
    const factorsData = getScoreFactorsData();

    if (!creditData) {
      return (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="TrendingUp" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Credit Score Data</h3>
          <p className="text-muted-foreground">Upload credit score data to view visualizations.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Credit Score Gauge */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Credit Score</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-muted)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-primary)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(creditData.currentScore / 900) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{creditData.currentScore}</div>
                  <div className="text-sm text-muted-foreground">CIBIL Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Factors */}
        {factorsData && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Score Factors</h3>
            <div className="space-y-4">
              {factorsData.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{factor.title}</span>
                    <span className="text-sm text-muted-foreground">{factor.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.impact === 'positive' ? 'bg-success' :
                        factor.impact === 'negative' ? 'bg-error' : 'bg-warning'
                      }`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMonthlyFinances = () => {
    const monthlyData = getMonthlyFinancesData();

    if (!monthlyData) {
      return (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="PiggyBank" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Monthly Finance Data</h3>
          <p className="text-muted-foreground">Upload monthly finance data to view visualizations.</p>
        </div>
      );
    }

    const maxValue = Math.max(...monthlyData.map(m => Math.max(m.income, m.expenses, m.savings)));

    return (
      <div className="space-y-6">
        {/* Monthly Finances Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Finances</h3>
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{month.month}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-success">Income: ₹{month.income.toLocaleString()}</span>
                    <span className="text-error">Expenses: ₹{month.expenses.toLocaleString()}</span>
                    <span className="text-primary">Savings: ₹{month.savings.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className="h-4 bg-success rounded-l"
                    style={{ width: `${(month.income / maxValue) * 100}%` }}
                  />
                  <div
                    className="h-4 bg-error"
                    style={{ width: `${(month.expenses / maxValue) * 100}%` }}
                  />
                  <div
                    className="h-4 bg-primary rounded-r"
                    style={{ width: `${(month.savings / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderScoreFactors = () => {
    const factorsData = getScoreFactorsData();

    if (!factorsData) {
      return (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="Layers" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Score Factors Data</h3>
          <p className="text-muted-foreground">Upload score factors data to view visualizations.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Credit Score Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factorsData.map((factor, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{factor.title}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    factor.impact === 'positive' ? 'bg-success/10 text-success' :
                    factor.impact === 'negative' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-medium">{factor.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.impact === 'positive' ? 'bg-success' :
                        factor.impact === 'negative' ? 'bg-error' : 'bg-warning'
                      }`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">{factor.weight}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderScoreTrends = () => {
    const trendsData = getScoreTrendsData();

    if (!trendsData) {
      return (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Icon name="Activity" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Score Trends Data</h3>
          <p className="text-muted-foreground">Upload score trends data to view visualizations.</p>
        </div>
      );
    }

    const minScore = Math.min(...trendsData.map(t => t.score));
    const maxScore = Math.max(...trendsData.map(t => t.score));

    return (
      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Score Trends</h3>
          <div className="space-y-4">
            {trendsData.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{trend.month}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-primary">Score: {trend.score}</span>
                    <span className={`${trend.change >= 0 ? 'text-success' : 'text-error'}`}>
                      {trend.change >= 0 ? '+' : ''}{trend.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${((trend.score - minScore) / (maxScore - minScore)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    switch (selectedVisualization) {
      case 'overview':
        return renderOverview();
      case 'credit':
        return renderCreditScore();
      case 'finances':
        return renderMonthlyFinances();
      case 'factors':
        return renderScoreFactors();
      case 'trends':
        return renderScoreTrends();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Visualization Selector */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Data Visualizations
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {visualizations.map((viz) => (
            <Button
              key={viz.id}
              variant={selectedVisualization === viz.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedVisualization(viz.id)}
              iconName={viz.icon}
              iconPosition="left"
            >
              {viz.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Visualization Content */}
      {renderVisualization()}
    </div>
  );
};

export default DataVisualization;
