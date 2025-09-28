import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesSelected, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
// all the pdf formats that are supported
// need to change this and add an image extractor
  const supportedFormats = [
    { type: 'PDF', icon: 'FileText', description: 'Bank statements, credit card statements' },
    { type: 'CSV', icon: 'FileSpreadsheet', description: 'Transaction data, financial records' },
    { type: 'JPG/PNG', icon: 'Image', description: 'Document photos, scanned statements' },
    { type: 'Excel', icon: 'FileSpreadsheet', description: 'Financial spreadsheets, reports' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border-2 border-dashed border-border p-8 text-center transition-all duration-200 hover:border-primary/50">
      <div
        className={`relative transition-all duration-200 ${
          isDragOver ? 'scale-105 opacity-80' : ''
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Upload Icon */}
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon 
            name={isUploading ? "Loader2" : "Upload"} 
            size={32} 
            color="var(--color-primary)"
            className={isUploading ? "animate-spin" : ""}
          />
        </div>

        {/* Upload Text */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {isUploading ? 'Processing Documents...' : 'Upload Financial Documents'}
        </h3>
        <p className="text-muted-foreground mb-6">
          {isUploading 
            ? 'AI is analyzing your documents for optimal tax planning'
            : 'Drag and drop multiple files here, or click to browse and select multiple documents'
          }
        </p>

        {/* Upload Button */}
        <Button
          variant="default"
          size="lg"
          onClick={openFileDialog}
          disabled={isUploading}
          iconName="FolderOpen"
          iconPosition="left"
          className="mb-6"
        >
          {isUploading ? 'Uploading...' : 'Choose Multiple Files'}
        </Button>

        {/* Selected Files Count */}
        {selectedFiles.length > 0 && !isUploading && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center text-sm text-primary">
              <Icon name="FileText" size={16} className="mr-2" />
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        )}

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.csv,.xlsx,.xls,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Supported Formats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {supportedFormats?.map((format) => (
            <div key={format?.type} className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Icon name={format?.icon} size={24} color="var(--color-muted-foreground)" className="mb-2" />
              <span className="text-sm font-medium text-foreground">{format?.type}</span>
              <span className="text-xs text-muted-foreground text-center">{format?.description}</span>
            </div>
          ))}
        </div>

        {/* Security Notice need to fix this lie */}
        <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="mr-2" />
          <span>Bank-grade encryption ensures your documents are secure</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;

// done - Norvin