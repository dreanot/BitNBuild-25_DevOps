import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHistory = ({ history, onDownload, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tax-summary':
        return 'Calculator';
      case 'spending-analysis':
        return 'PieChart';
      case 'credit-insights':
        return 'TrendingUp';
      case 'financial-comparison':
        return 'BarChart3';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'tax-summary':
        return 'text-primary bg-primary/10';
      case 'spending-analysis':
        return 'text-success bg-success/10';
      case 'credit-insights':
        return 'text-warning bg-warning/10';
      case 'financial-comparison':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (history?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Archive" size={48} color="var(--color-muted-foreground)" />
        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">No Report History</h3>
        <p className="text-muted-foreground">
          Your downloaded reports will appear here for easy access and re-download.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Report History</h3>
        <p className="text-sm text-muted-foreground">Previously generated and downloaded reports</p>
      </div>
      <div className="divide-y divide-border">
        {history?.map((item) => (
          <div key={item?.id} className="p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item?.type)}`}>
                  <Icon name={getTypeIcon(item?.type)} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{item?.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Generated: {formatDate(item?.generatedDate)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Period: {item?.period}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Size: {item?.size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDownload(item)}
                  iconName="Download"
                  iconSize={14}
                >
                  Re-download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item?.id)}
                  iconName="Trash2"
                  iconSize={14}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportHistory;