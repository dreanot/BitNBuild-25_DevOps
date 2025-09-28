import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentTable = ({ documents, onDelete, onReprocess }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { color: 'text-success bg-success/10', icon: 'CheckCircle', text: 'Processed' },
      'processing': { color: 'text-warning bg-warning/10', icon: 'Loader2', text: 'Processing' },
      'error': { color: 'text-error bg-error/10', icon: 'XCircle', text: 'Failed' },
      'pending': { color: 'text-muted-foreground bg-muted', icon: 'Clock', text: 'Pending' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className={`mr-1 ${status === 'processing' ? 'animate-spin' : ''}`} />
        {config?.text}
      </span>
    );
  };

  const getDocumentIcon = (type) => {
    const iconMap = {
      'pdf': 'FileText',
      'csv': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet',
      'xls': 'FileSpreadsheet',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image'
    };
    return iconMap?.[type?.toLowerCase()] || 'File';
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedDocs(documents?.map(doc => doc?.id));
    } else {
      setSelectedDocs([]);
    }
  };

  const handleSelectDoc = (docId, checked) => {
    if (checked) {
      setSelectedDocs([...selectedDocs, docId]);
    } else {
      setSelectedDocs(selectedDocs?.filter(id => id !== docId));
    }
  };

  const handleBulkDelete = () => {
    selectedDocs?.forEach(docId => onDelete(docId));
    setSelectedDocs([]);
  };

  if (!documents || documents?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Documents Uploaded</h3>
        <p className="text-muted-foreground">Upload your first document to get started with AI-powered analysis</p>
      </div>
    );
  }
// uploaded documents part
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="FolderOpen" size={20} className="mr-2" />
            Uploaded Documents ({documents?.length}) {/* uploaded doc length var */}
          </h3>
          {selectedDocs?.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              iconName="Trash2"
              iconPosition="left"   
            >
              Delete Selected ({selectedDocs?.length})
            </Button>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedDocs?.length === documents?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Insights
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents?.map((doc) => (
              <tr key={doc?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedDocs?.includes(doc?.id)}
                    onChange={(e) => handleSelectDoc(doc?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Icon name={getDocumentIcon(doc?.type)} size={20} className="mr-3 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground truncate max-w-48">
                        {doc?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatFileSize(doc?.size)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground uppercase">
                    {doc?.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(doc?.status)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {formatDate(doc?.uploadedAt)}
                </td>
                <td className="px-6 py-4">
                  {doc?.insights && (
                    <div className="text-sm">
                      <div className="text-foreground font-medium">
                        ₹{doc?.insights?.totalAmount?.toLocaleString('en-IN') || '0'}
                      </div>
                      <div className="text-muted-foreground">
                        {doc?.insights?.transactionCount || 0} transactions
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {doc?.status === 'error' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReprocess(doc?.id)}
                        iconName="RefreshCw"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(doc?.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {documents?.map((doc) => (
          <div key={doc?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedDocs?.includes(doc?.id)}
                  onChange={(e) => handleSelectDoc(doc?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <Icon name={getDocumentIcon(doc?.type)} size={20} className="text-muted-foreground mt-1" />
                <div>
                  <div className="text-sm font-medium text-foreground truncate max-w-40">
                    {doc?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(doc?.size)} • {doc?.type?.toUpperCase()}
                  </div>
                </div>
              </div>
              {getStatusBadge(doc?.status)}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{formatDate(doc?.uploadedAt)}</span>
              {doc?.insights && (
                <span className="font-medium">
                  ₹{doc?.insights?.totalAmount?.toLocaleString('en-IN')} • {doc?.insights?.transactionCount} txns
                </span>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2">
              {doc?.status === 'error' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReprocess(doc?.id)}
                  iconName="RefreshCw"
                />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(doc?.id)}
                iconName="Trash2"
                className="text-error hover:text-error"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTable;


// done - Norvin