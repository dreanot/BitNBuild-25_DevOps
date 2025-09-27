import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ insights, onViewDetails }) => {
  if (!insights || Object.keys(insights)?.length === 0) {
    return null;
  }

  const insightCards = [
    {
      title: 'Tax Savings Identified',
      value: `₹${insights?.potentialSavings?.toLocaleString('en-IN') || '0'}`,
      description: 'Potential deductions under 80C, 80D',
      icon: 'TrendingDown',
      color: 'text-success bg-success/10',
      change: '+12% from last year'
    },
    {
      title: 'Monthly Expenses',
      value: `₹${insights?.monthlyExpenses?.toLocaleString('en-IN') || '0'}`,
      description: 'Average monthly spending pattern',
      icon: 'CreditCard',
      color: 'text-primary bg-primary/10',
      change: 'Within budget range'
    },
    {
      title: 'Investment Opportunities',
      value: insights?.investmentScore || 'B+',
      description: 'Based on spending and income analysis',
      icon: 'TrendingUp',
      color: 'text-warning bg-warning/10',
      change: 'Room for improvement'
    },
    {
      title: 'Credit Health',
      value: insights?.creditScore || '750+',
      description: 'Estimated CIBIL score range',
      icon: 'Shield',
      color: 'text-success bg-success/10',
      change: 'Excellent range'
    }
  ];

  const categoryBreakdown = [
    { name: 'Salary & Income', amount: 85000, percentage: 45, color: 'bg-success' },
    { name: 'Food & Dining', amount: 12000, percentage: 15, color: 'bg-primary' },
    { name: 'Transportation', amount: 8000, percentage: 12, color: 'bg-warning' },
    { name: 'Shopping', amount: 15000, percentage: 18, color: 'bg-error' },
    { name: 'Utilities', amount: 6000, percentage: 8, color: 'bg-secondary' },
    { name: 'Others', amount: 4000, percentage: 2, color: 'bg-muted-foreground' }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Brain" size={20} className="mr-2 text-primary" />
            AI Financial Insights
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
          {insightCards?.map((card, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${card?.color}`}>
                  <Icon name={card?.icon} size={16} />
                </div>
                <span className="text-xs text-muted-foreground">{card?.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {card?.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {card?.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {card?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="PieChart" size={20} className="mr-2" />
          Spending Categories
        </h4>

        <div className="space-y-4">
          {categoryBreakdown?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category?.color}`} />
                <span className="text-sm font-medium text-foreground">
                  {category?.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    ₹{category?.amount?.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {category?.percentage}%
                  </div>
                </div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category?.color}`}
                    style={{ width: `${category?.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
          >
            Calculate Tax
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="TrendingUp"
            iconPosition="left"
          >
            Check Credit Score
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
          >
            Generate Report
          </Button>
        </div>
      </div>
      {/* Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-warning" />
          Smart Recommendations
        </h4>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Maximize 80C Deductions
              </p>
              <p className="text-xs text-muted-foreground">
                You can save ₹46,800 more in taxes by investing ₹1,56,000 in ELSS or PPF
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                High Discretionary Spending
              </p>
              <p className="text-xs text-muted-foreground">
                Consider reducing shopping expenses by 20% to improve savings rate
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Credit Utilization Optimal
              </p>
              <p className="text-xs text-muted-foreground">
                Your credit card usage is within healthy limits. Keep it below 30%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;