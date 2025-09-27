import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCards = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Priority';
    }
  };

  const getImpactColor = (impact) => {
    if (impact >= 50) return 'text-success';
    if (impact >= 25) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">AI Recommendations</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} />
          <span>Personalized for you</span>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(rec?.priority)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-background rounded-full">
                  <Icon name={rec?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{rec?.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name={getPriorityIcon(rec?.priority)} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{getPriorityText(rec?.priority)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getImpactColor(rec?.impact)}`}>
                  +{rec?.impact} pts
                </div>
                <div className="text-xs text-muted-foreground">{rec?.timeline}</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{rec?.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm text-muted-foreground">{rec?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${rec?.progress}%` }}
                  />
                </div>
              </div>

              {rec?.steps && (
                <div className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Action Steps:</span>
                  <ul className="space-y-1">
                    {rec?.steps?.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-2 text-sm">
                        <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Difficulty: {rec?.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Cost: {rec?.cost}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                >
                  Start Action
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Pro Tip</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Focus on high-priority recommendations first. Small consistent actions often have more impact than major one-time changes.
        </p>
      </div>
    </div>
  );
};

export default RecommendationCards;