import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FinancialPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    taxRegime: 'new',
    investmentCategories: ['elss', 'ppf', 'nsc'],
    notificationPreferences: {
      taxDeadlines: true,
      creditScoreChanges: true,
      investmentReminders: false,
      monthlyReports: true
    },
    reportFrequency: 'monthly',
    defaultCurrency: 'inr'
  });

  const [isSaving, setIsSaving] = useState(false);

  const taxRegimeOptions = [
    { 
      value: 'old', 
      label: 'Old Tax Regime',
      description: 'Higher tax rates with deductions and exemptions'
    },
    { 
      value: 'new', 
      label: 'New Tax Regime',
      description: 'Lower tax rates with limited deductions'
    }
  ];

  const investmentOptions = [
    { value: 'elss', label: 'ELSS Mutual Funds', description: 'Equity Linked Savings Scheme' },
    { value: 'ppf', label: 'Public Provident Fund', description: '15-year lock-in period' },
    { value: 'nsc', label: 'National Savings Certificate', description: '5-year investment' },
    { value: 'fd', label: 'Fixed Deposits', description: 'Bank fixed deposits' },
    { value: 'ulip', label: 'ULIP', description: 'Unit Linked Insurance Plans' },
    { value: 'lic', label: 'Life Insurance Premium', description: 'Life insurance policies' }
  ];

  const reportFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'never', label: 'Never' }
  ];

  const handlePreferenceChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setPreferences(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleInvestmentChange = (category, checked) => {
    setPreferences(prev => ({
      ...prev,
      investmentCategories: checked
        ? [...prev?.investmentCategories, category]
        : prev?.investmentCategories?.filter(c => c !== category)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Financial Preferences</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your tax and investment preferences for personalized recommendations
          </p>
        </div>
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
      {/* Tax Regime Preference */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Tax Regime Preference</h4>
        <div className="space-y-4">
          <Select
            label="Default Tax Regime"
            description="Choose your preferred tax regime for calculations"
            options={taxRegimeOptions}
            value={preferences?.taxRegime}
            onChange={(value) => handlePreferenceChange('taxRegime', value)}
          />
          
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Tax Regime Comparison</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll automatically compare both regimes and recommend the most beneficial option for your financial situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Investment Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Investment Preferences</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred investment categories for Section 80C recommendations
        </p>
        
        <CheckboxGroup label="Preferred Investment Categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {investmentOptions?.map((option) => (
              <div key={option?.value} className="border border-border rounded-lg p-3">
                <Checkbox
                  label={option?.label}
                  description={option?.description}
                  checked={preferences?.investmentCategories?.includes(option?.value)}
                  onChange={(e) => handleInvestmentChange(option?.value, e?.target?.checked)}
                />
              </div>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Notification Preferences</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Choose what notifications you'd like to receive
        </p>
        
        <div className="space-y-4">
          <Checkbox
            label="Tax Deadline Reminders"
            description="Get notified about upcoming tax filing deadlines"
            checked={preferences?.notificationPreferences?.taxDeadlines}
            onChange={(e) => handlePreferenceChange('notificationPreferences.taxDeadlines', e?.target?.checked)}
          />
          
          <Checkbox
            label="Credit Score Changes"
            description="Receive alerts when your CIBIL score changes"
            checked={preferences?.notificationPreferences?.creditScoreChanges}
            onChange={(e) => handlePreferenceChange('notificationPreferences.creditScoreChanges', e?.target?.checked)}
          />
          
          <Checkbox
            label="Investment Reminders"
            description="Get reminded about investment opportunities and renewals"
            checked={preferences?.notificationPreferences?.investmentReminders}
            onChange={(e) => handlePreferenceChange('notificationPreferences.investmentReminders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Monthly Financial Reports"
            description="Receive monthly summaries of your financial health"
            checked={preferences?.notificationPreferences?.monthlyReports}
            onChange={(e) => handlePreferenceChange('notificationPreferences.monthlyReports', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Report Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Report Settings</h4>
        <div className="space-y-4">
          <Select
            label="Report Frequency"
            description="How often would you like to receive financial reports?"
            options={reportFrequencyOptions}
            value={preferences?.reportFrequency}
            onChange={(value) => handlePreferenceChange('reportFrequency', value)}
          />
          
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-generate Tax Reports</p>
                <p className="text-sm text-muted-foreground">
                  Automatically generate tax reports before filing deadlines
                </p>
              </div>
              <Checkbox
                checked
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Financial Goals */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Financial Goals</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Set your financial goals for personalized recommendations
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Target" size={20} color="var(--color-primary)" />
              <h5 className="font-medium text-foreground">Tax Saving Goal</h5>
            </div>
            <p className="text-2xl font-semibold text-foreground">₹1,50,000</p>
            <p className="text-sm text-muted-foreground">Annual target for Section 80C</p>
            <Button variant="outline" size="sm" className="mt-3" iconName="Edit">
              Update Goal
            </Button>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="TrendingUp" size={20} color="var(--color-success)" />
              <h5 className="font-medium text-foreground">Credit Score Target</h5>
            </div>
            <p className="text-2xl font-semibold text-foreground">750+</p>
            <p className="text-sm text-muted-foreground">Target CIBIL score</p>
            <Button variant="outline" size="sm" className="mt-3" iconName="Edit">
              Update Target
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPreferencesTab;