import React from 'react';
import Icon from '../../../components/AppIcon';

const ScoreFactors = ({ factors }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      case 'neutral': return 'Minus';
      default: return 'Minus';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'positive': return 'bg-success/10';
      case 'negative': return 'bg-error/10';
      case 'neutral': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Score Factors</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Impact Analysis</span>
        </div>
      </div>
      <div className="space-y-4">
        {factors?.map((factor, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getImpactBg(factor?.impact)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getImpactBg(factor?.impact)}`}>
                  <Icon name={factor?.icon} size={20} className={getImpactColor(factor?.impact)} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{factor?.title}</h3>
                  <p className="text-sm text-muted-foreground">{factor?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getImpactIcon(factor?.impact)} 
                  size={16} 
                  className={getImpactColor(factor?.impact)} 
                />
                <span className={`text-sm font-medium ${getImpactColor(factor?.impact)}`}>
                  {factor?.impactText}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Current Status</span>
              <span className="text-sm text-muted-foreground">{factor?.currentValue}</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${
                  factor?.impact === 'positive' ? 'bg-success' : 
                  factor?.impact === 'negative' ? 'bg-error' : 'bg-muted-foreground'
                }`}
                style={{ width: `${factor?.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Weight: {factor?.weight}%</span>
              <span className="text-muted-foreground">Target: {factor?.target}</span>
            </div>

            {factor?.recommendation && (
              <div className="mt-3 p-3 bg-background rounded border-l-4 border-l-primary">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                  <p className="text-sm text-foreground">{factor?.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreFactors;