import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DataManagementTab = () => {
  const [exportLoading, setExportLoading] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const dataCategories = [
    {
      id: 'financial-data',
      title: 'Financial Data',
      description: 'Bank statements, transactions, and financial records',
      size: '2.4 MB',
      lastUpdated: '2 days ago',
      icon: 'CreditCard'
    },
    {
      id: 'tax-documents',
      title: 'Tax Documents',
      description: 'Tax returns, calculations, and related documents',
      size: '1.8 MB',
      lastUpdated: '1 week ago',
      icon: 'FileText'
    },
    {
      id: 'credit-reports',
      title: 'Credit Reports',
      description: 'CIBIL reports and credit score history',
      size: '856 KB',
      lastUpdated: '3 days ago',
      icon: 'TrendingUp'
    },
    {
      id: 'profile-data',
      title: 'Profile Information',
      description: 'Personal details, preferences, and settings',
      size: '124 KB',
      lastUpdated: '5 hours ago',
      icon: 'User'
    }
  ];

  const privacySettings = [
    {
      id: 'ai-analysis',
      title: 'AI Analysis Consent',
      description: 'Allow AI to analyze your financial data for personalized insights',
      enabled: true
    },
    {
      id: 'data-sharing',
      title: 'Third-party Data Sharing',
      description: 'Share anonymized data with financial partners for better services',
      enabled: false
    },
    {
      id: 'marketing-consent',
      title: 'Marketing Communications',
      description: 'Receive promotional emails and product updates',
      enabled: true
    },
    {
      id: 'analytics',
      title: 'Usage Analytics',
      description: 'Help improve our service by sharing usage analytics',
      enabled: true
    }
  ];

  const handleExport = async (categoryId) => {
    setExportLoading(prev => ({ ...prev, [categoryId]: true }));
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExportLoading(prev => ({ ...prev, [categoryId]: false }));
    
    // In a real app, this would trigger a download
    console.log(`Exporting ${categoryId} data...`);
  };

  const handleExportAll = async () => {
    setExportLoading(prev => ({ ...prev, 'all': true }));
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setExportLoading(prev => ({ ...prev, 'all': false }));
    
    console.log('Exporting all data...');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE MY ACCOUNT') {
      console.log('Account deletion initiated...');
      setShowDeleteDialog(false);
      setDeleteConfirmation('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Export your data, manage privacy settings, and control your account
        </p>
      </div>
      {/* Data Export */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-foreground">Export Your Data</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Download your data in JSON format for backup or migration
            </p>
          </div>
          <Button
            variant="default"
            onClick={handleExportAll}
            loading={exportLoading?.all}
            iconName="Download"
            iconPosition="left"
          >
            Export All Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataCategories?.map((category) => (
            <div key={category?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{category?.title}</h5>
                    <p className="text-sm text-muted-foreground">{category?.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>Size: {category?.size}</span>
                <span>Updated: {category?.lastUpdated}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport(category?.id)}
                loading={exportLoading?.[category?.id]}
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Export
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Privacy Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Privacy Controls</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Manage how your data is used and shared
        </p>
        
        <div className="space-y-4">
          {privacySettings?.map((setting) => (
            <div key={setting?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{setting?.title}</h5>
                <p className="text-sm text-muted-foreground mt-1">{setting?.description}</p>
              </div>
              <Checkbox
                checked={setting?.enabled}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Data Protection Compliance</p>
              <p className="text-sm text-muted-foreground mt-1">
                We comply with Indian data protection laws and RBI guidelines. Your financial data is encrypted and stored securely.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Data Retention */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Data Retention</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h5 className="font-medium text-foreground">Financial Data</h5>
              <p className="text-sm text-muted-foreground">Retained for 7 years as per tax regulations</p>
            </div>
            <span className="text-sm font-medium text-muted-foreground">7 years</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h5 className="font-medium text-foreground">Credit Reports</h5>
              <p className="text-sm text-muted-foreground">Retained for analysis and tracking</p>
            </div>
            <span className="text-sm font-medium text-muted-foreground">5 years</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h5 className="font-medium text-foreground">Profile Data</h5>
              <p className="text-sm text-muted-foreground">Retained until account deletion</p>
            </div>
            <span className="text-sm font-medium text-muted-foreground">Until deleted</span>
          </div>
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-card border border-error/20 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-error">Delete Account</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>
        
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-4">
          <h5 className="font-medium text-error mb-2">Before you delete your account:</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Export any data you want to keep</li>
            <li>• Cancel any active subscriptions</li>
            <li>• This action cannot be undone</li>
            <li>• All your financial data will be permanently deleted</li>
          </ul>
        </div>
        
        {!showDeleteDialog ? (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete My Account
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border border-error/20 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">
                Type "DELETE MY ACCOUNT" to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm"
                placeholder="DELETE MY ACCOUNT"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
                iconName="Trash2"
                iconPosition="left"
              >
                Confirm Deletion
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmation('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagementTab;