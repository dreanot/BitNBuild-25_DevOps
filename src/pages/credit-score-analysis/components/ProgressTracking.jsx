import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProgressTracking = ({ goals, achievements }) => {
  const [newGoal, setNewGoal] = useState({ title: '', target: '', deadline: '' });
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in_progress': return 'Clock';
      case 'overdue': return 'AlertTriangle';
      default: return 'Target';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in_progress': return 'text-primary';
      case 'overdue': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Goals Section */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Credit Goals</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddGoal(!showAddGoal)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Goal
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="font-medium text-foreground mb-4">Set New Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Goal Title"
                placeholder="e.g., Reach 750 CIBIL Score"
                value={newGoal?.title}
                onChange={(e) => setNewGoal({...newGoal, title: e?.target?.value})}
              />
              <Input
                label="Target Value"
                placeholder="e.g., 750"
                value={newGoal?.target}
                onChange={(e) => setNewGoal({...newGoal, target: e?.target?.value})}
              />
              <Input
                label="Deadline"
                type="date"
                value={newGoal?.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e?.target?.value})}
              />
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                iconPosition="left"
              >
                Save Goal
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddGoal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals?.map((goal, index) => (
            <div key={index} className="p-4 bg-background rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Icon name={getStatusIcon(goal?.status)} size={20} className={getStatusColor(goal?.status)} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{goal?.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {goal?.current}/{goal?.target}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getDaysRemaining(goal?.deadline) > 0 
                      ? `${getDaysRemaining(goal?.deadline)} days left`
                      : 'Overdue'
                    }
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{goal?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(goal?.progress)}`}
                    style={{ width: `${goal?.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Deadline: {formatDate(goal?.deadline)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Edit" iconSize={14} />
                  <Button variant="ghost" size="sm" iconName="Trash2" iconSize={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements Section */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Award" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Recent Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement, index) => (
            <div key={index} className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-success/20 rounded-full">
                  <Icon name={achievement?.icon} size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-success">{achievement?.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  Achieved on {formatDate(achievement?.date)}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">+{achievement?.impact} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Progress Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Calendar" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Monthly Progress</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-success mb-1">+18</div>
            <div className="text-sm text-muted-foreground">Score Improvement</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Goals Completed</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-warning mb-1">2</div>
            <div className="text-sm text-muted-foreground">Active Goals</div>
            <div className="text-xs text-muted-foreground mt-1">In progress</div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground mb-1">92%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;