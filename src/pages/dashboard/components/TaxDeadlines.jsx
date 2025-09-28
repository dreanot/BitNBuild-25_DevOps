import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaxDeadlines = ({ className = '' }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/tax_deadlines.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          const row = {};
          headers.forEach((h, i) => { row[h] = values[i]; });

          return {
            ...row,
            id: Number(row.id),
            daysLeft: Number(row.daysLeft) || 0,
          };
        });
        setDeadlines(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading tax_deadlines.csv:', err);
        setLoading(false);
      });
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':   return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low':    return 'text-success bg-success/10 border-success/20';
      default:       return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'available': return 'Clock';
      default:          return 'AlertCircle';
    }
  };

  const getDaysLeftText = (daysLeft) => {
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft === 0) return 'Due Today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  if (loading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <p className="text-sm text-muted-foreground">Loading deadlines…</p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Tax Deadlines & Alerts</h3>
        <Button variant="outline" size="sm" iconName="Calendar">
          View Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {deadlines.map(deadline => (
          <div key={deadline.id}
               className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
                  <Icon name={deadline.icon} size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{deadline.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{deadline.description}</p>
                </div>
              </div>
              <Icon name={getStatusIcon(deadline.status)} size={20} className="text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Due: {deadline.dueDate}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  deadline.daysLeft <= 30 ? 'bg-error/10 text-error'
                  : deadline.daysLeft <= 90 ? 'bg-warning/10 text-warning'
                  : 'bg-success/10 text-success'
                }`}>
                  {getDaysLeftText(deadline.daysLeft)}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxDeadlines;
