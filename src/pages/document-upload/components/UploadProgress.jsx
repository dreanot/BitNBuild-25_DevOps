import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ files }) => {
  if (!files || files?.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Icon name="Loader2" size={16} className="animate-spin text-primary" />;
      case 'processing':
        return <Icon name="Zap" size={16} className="text-warning" />;
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'AI Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      case 'processing':
        return 'bg-warning';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Activity" size={20} className="mr-2" />
        Upload Progress
      </h3>
      <div className="space-y-4">
        {files?.map((file) => (
          <div key={file?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(file?.status)}
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-48">
                    {file?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                file?.status === 'completed' ? 'bg-success/10 text-success' :
                file?.status === 'error' ? 'bg-error/10 text-error' :
                file?.status === 'processing'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
              }`}>
                {getStatusText(file?.status)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(file?.status)}`}
                style={{ width: `${file?.progress || 0}%` }}
              />
            </div>

            {/* Processing Details */}
            {file?.status === 'processing' && file?.processingStage && (
              <div className="mt-2 text-xs text-muted-foreground">
                <Icon name="Cpu" size={12} className="inline mr-1" />
                {file?.processingStage}
              </div>
            )}

            {/* Error Message */}
            {file?.status === 'error' && file?.error && (
              <div className="mt-2 text-xs text-error flex items-center">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                {file?.error}
              </div>
            )}

            {/* Success Details */}
            {file?.status === 'completed' && file?.insights && (
              <div className="mt-2 text-xs text-success flex items-center">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                {file?.insights} transactions categorized
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProgress;