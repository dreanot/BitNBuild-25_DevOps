import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ className = '' }) => {
  const [moneyData, setMoneyData] = useState({});
  const [activeInsight, setActiveInsight] = useState(0);

  // ---- Static non-money text stays here ----
  const baseInsights = [
    {
      id: 1,
      type: "tax_optimization",
      title: "Tax Saving Opportunity Detected",
      description:
        `Based on your spending patterns, you can save more taxes by investing ₹50,000 in ELSS mutual funds under Section 80C.\n\nThis will also help improve your long-term wealth creation goals.`,
      impact: "High",
      action: "Invest in ELSS",
      icon: "TrendingDown",
      color: "success",
      priority: 1
    },
    {
      id: 2,
      type: "credit_improvement",
      title: "Credit Score Enhancement Tip",
      description:
        `Your credit utilization is at 67% across cards. Reducing it to below 30% could improve your CIBIL score.\n\nConsider paying down ₹15,000 on your HDFC card.`,
      impact: "Medium",
      action: "Reduce Credit Usage",
      icon: "TrendingUp",
      color: "warning",
      priority: 2
    },
    {
      id: 3,
      type: "expense_optimization",
      title: "Spending Pattern Analysis",
      description:
        `Your dining expenses increased by 35% this month. Consider setting a monthly budget of ₹8,000 for food & dining.`,
      impact: "Medium",
      action: "Set Budget Alert",
      icon: "PieChart",
      color: "primary",
      priority: 3
    },
    {
      id: 4,
      type: "investment_suggestion",
      title: "Investment Diversification",
      description:
        `Your portfolio is heavily weighted towards equity (85%). Consider adding debt instruments for better risk management.\n\nTarget allocation: 70% equity, 30% debt.`,
      impact: "Low",
      action: "Rebalance Portfolio",
      icon: "BarChart3",
      color: "secondary",
      priority: 4
    }
  ];

  // ---- Load only the money numbers ----
  useEffect(() => {
    Papa.parse('/data/money.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // turn into {id: {savings, improvement}}
        const map = {};
        result.data.forEach(row => {
          map[row.id] = {
            savings: row.savings || null,
            improvement: row.improvement || null
          };
        });
        setMoneyData(map);
      },
      error: (err) => console.error('CSV parse error', err),
    });
  }, []);

  const insights = baseInsights.map(item => ({
    ...item,
    ...moneyData[item.id] // overlay money fields if present
  }));

  if (!Object.keys(moneyData).length) {
    return <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <p className="text-muted-foreground">Loading money data…</p>
    </div>;
  }

  const current = insights[activeInsight];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Low': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'success': return 'bg-success/10 text-success';
      case 'warning': return 'bg-warning/10 text-warning';
      case 'secondary': return 'bg-secondary/10 text-secondary';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Insights</h3>
            <p className="text-sm text-muted-foreground">Personalized recommendations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {activeInsight + 1} of {insights.length}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveInsight(Math.max(0, activeInsight - 1))}
              disabled={activeInsight === 0}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setActiveInsight(Math.min(insights.length - 1, activeInsight + 1))}
              disabled={activeInsight === insights.length - 1}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Insight Body */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${getColorClasses(current.color)}`}>
            <Icon name={current.icon} size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-medium text-foreground">{current.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImpactColor(current.impact)}`}>
                {current.impact} Impact
              </span>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Money metrics from CSV */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-6">
            {current.savings && (
              <div>
                <p className="text-xs text-muted-foreground">Potential Savings</p>
                <p className="font-semibold text-success">{current.savings}</p>
              </div>
            )}
            {current.improvement && (
              <div>
                <p className="text-xs text-muted-foreground">Expected Improvement</p>
                <p className="font-semibold text-primary">{current.improvement}</p>
              </div>
            )}
          </div>
          <Button variant="default" size="sm" iconName="ArrowRight">
            {current.action}
          </Button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {insights.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveInsight(i)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              i === activeInsight ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AIInsights;


// csv done
