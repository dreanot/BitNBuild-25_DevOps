import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ insights, onViewDetails }) => {
  if (!insights || Object.keys(insights).length === 0) return null;

  // Calculate percentage change for tax savings
  const savingsChangePercent = insights.potentialSavingsLastYear
    ? (((insights.potentialSavings - insights.potentialSavingsLastYear) / insights.potentialSavingsLastYear) * 100).toFixed(1)
    : 0;

  // Determine Investment rating
  const getInvestmentRating = (score) => {
    if (!score) return 'B+';
    if (score >= 90) return 'A+';
    if (score >= 75) return 'B+';
    if (score >= 60) return 'B';
    return 'C';
  };

  // Determine credit health label
  const getCreditHealthLabel = (score) => {
    if (!score) return '750+';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const insightCards = [
    {
      title: 'Tax Savings Identified',
      value: `₹${insights.potentialSavings?.toLocaleString('en-IN') || '0'}`,
      description: 'Potential deductions under 80C, 80D',
      icon: 'TrendingDown',
      color: 'text-success bg-success/10',
      change: `${savingsChangePercent}% from last year`
    },
    {
      title: 'Monthly Expenses',
      value: `₹${insights.monthlyExpenses?.toLocaleString('en-IN') || '0'}`,
      description: 'Average monthly spending pattern',
      icon: 'CreditCard',
      color: 'text-primary bg-primary/10',
      change: 'Within budget range'
    },
    {
      title: 'Investment Opportunities',
      value: getInvestmentRating(insights.investmentScore),
      description: 'Based on spending and income analysis',
      icon: 'TrendingUp',
      color: 'text-warning bg-warning/10',
      change: insights.investmentScore >= 75 ? 'Good' : 'Room for improvement'
    },
    {
      title: 'Credit Health',
      value: insights.creditScore || '750+',
      description: 'Estimated CIBIL score range',
      icon: 'Shield',
      color: 'text-success bg-success/10',
      change: getCreditHealthLabel(insights.creditScore)
    }
  ];

  const categoryBreakdown = insights.categories?.map(cat => ({
    ...cat,
    percentage: Math.round((cat.amount / insights.categories.reduce((a, b) => a + b.amount, 0)) * 100)
  })) || [];

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Brain" size={20} className="mr-2 text-primary" />
            Financial Insights
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View Detailed Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insightCards.map((card, idx) => (
            <div key={idx} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon name={card.icon} size={16} />
                </div>
                <span className="text-xs text-muted-foreground">{card.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{card.title}</div>
              <div className="text-xs text-muted-foreground">{card.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryBreakdown.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="PieChart" size={20} className="mr-2" />
            Spending Categories
          </h4>

          <div className="space-y-4">
            {categoryBreakdown.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      ₹{category.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                  </div>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="Calculator" iconPosition="left">
          Calculate Tax
        </Button>
        <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left">
          Check Credit Score
        </Button>
        <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default AIInsights;
