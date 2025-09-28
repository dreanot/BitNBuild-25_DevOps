import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataUploadZone = ({ dataTypes, onFileUpload, uploadedFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onFileUpload(files);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const getDataTypeInfo = (typeId) => {
    return dataTypes.find(dt => dt.id === typeId);
  };

  const getUploadedFileCount = () => {
    return uploadedFiles.filter(file => file.loaded).length;
  };

  const getRequiredFilesCount = () => {
    return dataTypes.filter(dt => dt.required).length;
  };

  const getRequiredFilesStatus = () => {
    const requiredTypes = dataTypes.filter(dt => dt.required);
    const loadedRequiredTypes = requiredTypes.filter(dt => 
      uploadedFiles.some(file => file.type === dt.id && file.loaded)
    );
    return {
      loaded: loadedRequiredTypes.length,
      total: requiredTypes.length,
      complete: loadedRequiredTypes.length === requiredTypes.length
    };
  };

  const requiredStatus = getRequiredFilesStatus();

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="bg-card rounded-lg border-2 border-dashed border-border p-8 text-center transition-all duration-200 hover:border-primary/50">
        <div
          className={`relative transition-all duration-200 ${
            isDragOver ? 'scale-105 opacity-80' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Upload Icon */}
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon 
              name="Upload" 
              size={32} 
              color="var(--color-primary)"
            />
          </div>

          {/* Upload Text */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Upload Financial Data
          </h3>
          <p className="text-muted-foreground mb-6">
            Drag and drop your CSV files here, or click to browse and select multiple files
          </p>

          {/* Upload Button */}
          <Button
            variant="default"
            size="lg"
            onClick={openFileDialog}
            iconName="FolderOpen"
            iconPosition="left"
            className="mb-6"
          >
            Choose Files
          </Button>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Supported Formats */}
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>CSV Files</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="FileSpreadsheet" size={16} />
              <span>Excel Files</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Types Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Database" size={20} className="mr-2" />
          Supported Data Types
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataTypes.map((dataType) => {
            const isLoaded = uploadedFiles.some(file => file.type === dataType.id && file.loaded);
            const fileData = uploadedFiles.find(file => file.type === dataType.id);
            
            return (
              <div
                key={dataType.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isLoaded 
                    ? 'border-success/20 bg-success/5' 
                    : dataType.required 
                      ? 'border-warning/20 bg-warning/5' 
                      : 'border-border bg-muted/20'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isLoaded ? 'bg-success/10' : 'bg-muted/50'
                  }`}>
                    <Icon 
                      name={dataType.icon} 
                      size={20} 
                      className={isLoaded ? 'text-success' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{dataType.name}</h4>
                      {dataType.required && (
                        <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{dataType.description}</p>
                    {isLoaded && fileData && (
                      <div className="mt-2 text-xs text-success">
                        <div>✓ {fileData.data.length} records loaded</div>
                        <div>Updated: {fileData.lastModified?.toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Upload Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Progress */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {getUploadedFileCount()}/{dataTypes.length}
            </div>
            <div className="text-sm text-muted-foreground">Files Uploaded</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getUploadedFileCount() / dataTypes.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Required Files */}
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              requiredStatus.complete ? 'text-success' : 'text-warning'
            }`}>
              {requiredStatus.loaded}/{requiredStatus.total}
            </div>
            <div className="text-sm text-muted-foreground">Required Files</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  requiredStatus.complete ? 'bg-success' : 'bg-warning'
                }`}
                style={{ width: `${(requiredStatus.loaded / requiredStatus.total) * 100}%` }}
              />
            </div>
          </div>

          {/* System Status */}
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              requiredStatus.complete ? 'text-success' : 'text-muted-foreground'
            }`}>
              {requiredStatus.complete ? '✓' : '○'}
            </div>
            <div className="text-sm text-muted-foreground">System Ready</div>
            <div className="text-xs text-muted-foreground mt-1">
              {requiredStatus.complete 
                ? 'All required data loaded' 
                : 'Upload required files to continue'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {getUploadedFileCount() > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Zap" size={20} className="mr-2 text-primary" />
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              size="sm"
              iconName="BarChart3"
              iconPosition="left"
              onClick={() => window.location.href = '/data-management'}
            >
              View Data Visualization
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calculator"
              iconPosition="left"
              onClick={() => window.location.href = '/tax-calculator'}
            >
              Calculate Taxes
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => window.location.href = '/credit-score-analysis'}
            >
              Analyze Credit Score
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUploadZone;
