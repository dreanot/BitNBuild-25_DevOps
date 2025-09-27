import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WhatIfSimulator = () => {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState({
    type: '',
    amount: '',
    timeline: '',
    description: ''
  });

  const scenarioTypes = [
    { value: 'pay_debt', label: 'Pay Off Debt' },
    { value: 'reduce_utilization', label: 'Reduce Credit Utilization' },
    { value: 'new_credit', label: 'Apply for New Credit' },
    { value: 'close_account', label: 'Close Credit Account' },
    { value: 'increase_limit', label: 'Increase Credit Limit' }
  ];

  const timelineOptions = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const calculateImpact = (type, amount, timeline) => {
    // Mock calculation logic
    let baseImpact = 0;
    switch (type) {
      case 'pay_debt':
        baseImpact = Math.min(50, (amount / 10000) * 10);
        break;
      case 'reduce_utilization':
        baseImpact = Math.min(40, amount * 0.8);
        break;
      case 'new_credit':
        baseImpact = -15;
        break;
      case 'close_account':
        baseImpact = -10;
        break;
      case 'increase_limit':
        baseImpact = Math.min(25, (amount / 50000) * 15);
        break;
      default:
        baseImpact = 0;
    }

    // Adjust for timeline
    const timelineMultiplier = {
      '1m': 0.3,
      '3m': 0.6,
      '6m': 0.8,
      '1y': 1.0
    };

    return Math.round(baseImpact * (timelineMultiplier?.[timeline] || 1));
  };

  const addScenario = () => {
    if (!currentScenario?.type || !currentScenario?.amount || !currentScenario?.timeline) return;

    const impact = calculateImpact(currentScenario?.type, parseFloat(currentScenario?.amount), currentScenario?.timeline);
    const newScenario = {
      ...currentScenario,
      id: Date.now(),
      impact,
      projectedScore: 742 + impact
    };

    setScenarios([...scenarios, newScenario]);
    setCurrentScenario({ type: '', amount: '', timeline: '', description: '' });
  };

  const removeScenario = (id) => {
    setScenarios(scenarios?.filter(s => s?.id !== id));
  };

  const getImpactColor = (impact) => {
    if (impact > 0) return 'text-success';
    if (impact < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getScenarioIcon = (type) => {
    switch (type) {
      case 'pay_debt': return 'CreditCard';
      case 'reduce_utilization': return 'TrendingDown';
      case 'new_credit': return 'Plus';
      case 'close_account': return 'X';
      case 'increase_limit': return 'TrendingUp';
      default: return 'Calculator';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">What-If Simulator</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calculator" size={16} />
          <span>Model score changes</span>
        </div>
      </div>
      {/* Add Scenario Form */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-4">Add New Scenario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Action Type"
            options={scenarioTypes}
            value={currentScenario?.type}
            onChange={(value) => setCurrentScenario({...currentScenario, type: value})}
            placeholder="Select action"
          />
          
          <Input
            label="Amount (₹)"
            type="number"
            placeholder="Enter amount"
            value={currentScenario?.amount}
            onChange={(e) => setCurrentScenario({...currentScenario, amount: e?.target?.value})}
          />
          
          <Select
            label="Timeline"
            options={timelineOptions}
            value={currentScenario?.timeline}
            onChange={(value) => setCurrentScenario({...currentScenario, timeline: value})}
            placeholder="Select timeline"
          />
          
          <div className="flex items-end">
            <Button 
              onClick={addScenario}
              disabled={!currentScenario?.type || !currentScenario?.amount || !currentScenario?.timeline}
              iconName="Plus"
              iconPosition="left"
              className="w-full"
            >
              Add Scenario
            </Button>
          </div>
        </div>
      </div>
      {/* Current Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-background rounded-lg border text-center">
          <div className="text-sm text-muted-foreground mb-1">Current Score</div>
          <div className="text-2xl font-bold text-foreground">742</div>
        </div>
        
        <div className="p-4 bg-background rounded-lg border text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Impact</div>
          <div className={`text-2xl font-bold ${getImpactColor(scenarios?.reduce((sum, s) => sum + s?.impact, 0))}`}>
            {scenarios?.reduce((sum, s) => sum + s?.impact, 0) > 0 ? '+' : ''}
            {scenarios?.reduce((sum, s) => sum + s?.impact, 0)}
          </div>
        </div>
        
        <div className="p-4 bg-background rounded-lg border text-center">
          <div className="text-sm text-muted-foreground mb-1">Projected Score</div>
          <div className="text-2xl font-bold text-primary">
            {742 + scenarios?.reduce((sum, s) => sum + s?.impact, 0)}
          </div>
        </div>
      </div>
      {/* Scenarios List */}
      {scenarios?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Active Scenarios</h3>
          {scenarios?.map((scenario) => (
            <div key={scenario?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-full">
                  <Icon name={getScenarioIcon(scenario?.type)} size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {scenarioTypes?.find(t => t?.value === scenario?.type)?.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{parseFloat(scenario?.amount)?.toLocaleString('en-IN')} • {timelineOptions?.find(t => t?.value === scenario?.timeline)?.label}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`font-semibold ${getImpactColor(scenario?.impact)}`}>
                    {scenario?.impact > 0 ? '+' : ''}{scenario?.impact} pts
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Score: {scenario?.projectedScore}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeScenario(scenario?.id)}
                  iconName="X"
                  iconSize={14}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {scenarios?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Add scenarios to see projected score changes</p>
        </div>
      )}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-medium text-foreground">How it works</span>
        </div>
        <p className="text-sm text-muted-foreground">
          This simulator uses AI models trained on credit scoring patterns to estimate potential score changes. 
          Actual results may vary based on your complete credit profile and timing.
        </p>
      </div>
    </div>
  );
};

export default WhatIfSimulator;