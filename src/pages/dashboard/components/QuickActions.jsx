import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ className = '' }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Upload Documents",
      description: "Add bank statements, salary slips, and investment proofs",
      icon: "Upload",
      color: "primary",
      path: "/document-upload",
      badge: "New"
    },
    {
      id: 2,
      title: "Calculate Tax",
      description: "Compare old vs new regime and optimize your tax liability",
      icon: "Calculator",
      color: "success",
      path: "/tax-calculator",
      badge: null
    },
    {
      id: 3,
      title: "Credit Analysis",
      description: "Check CIBIL score and get improvement recommendations",
      icon: "TrendingUp",
      color: "warning",
      path: "/credit-score-analysis",
      badge: "Updated"
    },
    {
      id: 4,
      title: "Generate Reports",
      description: "Download tax summary and financial reports",
      icon: "FileText",
      color: "secondary",
      path: "/financial-reports",
      badge: null
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Access key features and tools</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={() => handleActionClick(action?.path)}
            className="relative group cursor-pointer p-4 border border-border rounded-lg hover:shadow-elevated transition-smooth bg-card hover:bg-muted/20"
          >
            {action?.badge && (
              <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                {action?.badge}
              </span>
            )}
            
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg border transition-smooth ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {action?.description}
                </p>
                
                <div className="flex items-center mt-3 text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  <span className="text-sm font-medium">Get Started</span>
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Settings"
            onClick={() => navigate('/profile-settings')}
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;


// done - Norvin