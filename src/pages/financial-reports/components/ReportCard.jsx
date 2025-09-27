import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onPreview, onDownload }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'text-success bg-success/10';
      case 'generating':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return 'CheckCircle';
      case 'generating':
        return 'Clock';
      case 'error':
        return 'AlertCircle';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={report?.icon} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{report?.title}</h3>
            <p className="text-sm text-muted-foreground">{report?.description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
          <Icon name={getStatusIcon(report?.status)} size={12} />
          <span className="capitalize">{report?.status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Coverage Period</p>
          <p className="text-sm font-medium text-foreground">{report?.period}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
          <p className="text-sm font-medium text-foreground">{report?.lastUpdated}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Size:</span>
          <span className="text-xs font-medium text-foreground">{report?.size}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(report)}
            disabled={report?.status !== 'ready'}
            iconName="Eye"
            iconSize={14}
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownload(report)}
            disabled={report?.status !== 'ready'}
            iconName="Download"
            iconSize={14}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;