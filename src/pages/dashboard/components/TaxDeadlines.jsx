import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaxDeadlines = ({ className = '' }) => {
  const upcomingDeadlines = [
    {
      id: 1,
      title: "ITR Filing Deadline",
      description: "File your Income Tax Return for FY 2024-25",
      dueDate: "31 Jul 2025",
      daysLeft: 307,
      priority: "high",
      status: "pending",
      icon: "FileText"
    },
    {
      id: 2,
      title: "Advance Tax Payment",
      description: "Fourth installment for current financial year",
      dueDate: "15 Mar 2025",
      daysLeft: 169,
      priority: "medium",
      status: "pending",
      icon: "CreditCard"
    },
    {
      id: 3,
      title: "TDS Certificate Download",
      description: "Form 16 available from employer",
      dueDate: "15 Jun 2025",
      daysLeft: 261,
      priority: "low",
      status: "available",
      icon: "Download"
    },
    {
      id: 4,
      title: "Investment Declaration",
      description: "Submit 80C declarations to employer",
      dueDate: "31 Mar 2025",
      daysLeft: 185,
      priority: "medium",
      status: "pending",
      icon: "PiggyBank"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'available':
        return 'Clock';
      default:
        return 'AlertCircle';
    }
  };

  const getDaysLeftText = (daysLeft) => {
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft === 0) return 'Due Today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Tax Deadlines & Alerts</h3>
        <Button variant="outline" size="sm" iconName="Calendar">
          View Calendar
        </Button>
      </div>
      <div className="space-y-4">
        {upcomingDeadlines?.map((deadline) => (
          <div key={deadline?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getPriorityColor(deadline?.priority)}`}>
                  <Icon name={deadline?.icon} size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{deadline?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{deadline?.description}</p>
                </div>
              </div>
              <Icon name={getStatusIcon(deadline?.status)} size={20} className="text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Due: {deadline?.dueDate}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  deadline?.daysLeft <= 30 ? 'bg-error/10 text-error' : 
                  deadline?.daysLeft <= 90 ? 'bg-warning/10 text-warning': 'bg-success/10 text-success'
                }`}>
                  {getDaysLeftText(deadline?.daysLeft)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {deadline?.status === 'available' && (
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                )}
                {deadline?.status === 'pending' && (
                  <Button variant="default" size="sm" iconName="ArrowRight">
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxDeadlines;