import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ className = '' }) => {
  const [activeInsight, setActiveInsight] = useState(0);

  const insights = [
    {
      id: 1,
      type: "tax_optimization",
      title: "Tax Saving Opportunity Detected",
      description: `Based on your spending patterns, you can save ₹18,500 in taxes by investing ₹50,000 more in ELSS mutual funds under Section 80C.\n\nThis will also help improve your long-term wealth creation goals.`,
      impact: "High",
      savings: "₹18,500",
      action: "Invest in ELSS",
      icon: "TrendingDown",
      color: "success",
      priority: 1
    },
    {
      id: 2,
      type: "credit_improvement",
      title: "Credit Score Enhancement Tip",
      description: `Your credit utilization is at 68% across cards. Reducing it to below 30% could improve your CIBIL score by 25-40 points.\n\nConsider paying down ₹15,000 on your HDFC card.`,
      impact: "Medium",
      improvement: "+30 points",
      action: "Reduce Credit Usage",
      icon: "TrendingUp",
      color: "warning",
      priority: 2
    },
    {
      id: 3,
      type: "expense_optimization",
      title: "Spending Pattern Analysis",
      description: `Your dining expenses increased by 35% this month. Consider setting a monthly budget of ₹8,000 for food & dining.\n\nThis could save you ₹4,200 monthly.`,
      impact: "Medium",
      savings: "₹4,200/month",
      action: "Set Budget Alert",
      icon: "PieChart",
      color: "primary",
      priority: 3
    },
    {
      id: 4,
      type: "investment_suggestion",
      title: "Investment Diversification",
      description: `Your portfolio is heavily weighted towards equity (85%). Consider adding debt instruments for better risk management.\n\nTarget allocation: 70% equity, 30% debt.`,
      impact: "Low",
      improvement: "Better Risk Profile",
      action: "Rebalance Portfolio",
      icon: "BarChart3",
      color: "secondary",
      priority: 4
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'bg-success/10 text-success border-success/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'secondary':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const currentInsight = insights?.[activeInsight];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Personalized recommendations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {activeInsight + 1} of {insights?.length}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveInsight(Math.max(0, activeInsight - 1))}
              disabled={activeInsight === 0}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setActiveInsight(Math.min(insights?.length - 1, activeInsight + 1))}
              disabled={activeInsight === insights?.length - 1}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Current Insight */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${getColorClasses(currentInsight?.color)}`}>
            <Icon name={currentInsight?.icon} size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-medium text-foreground">{currentInsight?.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImpactColor(currentInsight?.impact)}`}>
                {currentInsight?.impact} Impact
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {currentInsight?.description}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-6">
            {currentInsight?.savings && (
              <div>
                <p className="text-xs text-muted-foreground">Potential Savings</p>
                <p className="font-semibold text-success">{currentInsight?.savings}</p>
              </div>
            )}
            {currentInsight?.improvement && (
              <div>
                <p className="text-xs text-muted-foreground">Expected Improvement</p>
                <p className="font-semibold text-primary">{currentInsight?.improvement}</p>
              </div>
            )}
          </div>
          
          <Button variant="default" size="sm" iconName="ArrowRight">
            {currentInsight?.action}
          </Button>
        </div>
      </div>
      {/* Insight Indicators */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {insights?.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveInsight(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === activeInsight ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Active Insights</p>
          </div>
          <div>
            <p className="text-lg font-bold text-success">₹22,700</p>
            <p className="text-xs text-muted-foreground">Potential Savings</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">85%</p>
            <p className="text-xs text-muted-foreground">Optimization Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;