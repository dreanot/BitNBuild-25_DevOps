import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportSection = ({ taxData, incomeData, deductionData, onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const formatIndianCurrency = (value) => {
    return new Intl.NumberFormat('en-IN')?.format(value || 0);
  };

  const exportOptions = [
    {
      id: 'tax_summary',
      title: 'Tax Summary Report',
      description: 'Complete tax calculation with regime comparison',
      icon: 'FileText',
      format: 'PDF',
      size: '2.3 MB'
    },
    {
      id: 'deduction_proof',
      title: 'Deduction Proof',
      description: 'Investment proofs for tax filing',
      icon: 'Receipt',
      format: 'PDF',
      size: '1.8 MB'
    },
    {
      id: 'excel_data',
      title: 'Excel Workbook',
      description: 'Editable calculations and projections',
      icon: 'Table',
      format: 'XLSX',
      size: '856 KB'
    },
    {
      id: 'itr_ready',
      title: 'ITR Ready Format',
      description: 'Pre-filled data for ITR filing',
      icon: 'Download',
      format: 'JSON',
      size: '124 KB'
    }
  ];

  const handleExport = async (optionId) => {
    setIsExporting(true);
    setExportType(optionId);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock download
      const exportData = {
        type: optionId,
        timestamp: new Date()?.toISOString(),
        taxData,
        incomeData,
        deductionData
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `taxwise-${optionId}-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
      
      onExport?.(optionId);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const quickStats = [
    {
      label: 'Total Income',
      value: `₹${formatIndianCurrency(taxData?.grossIncome)}`,
      icon: 'TrendingUp',
      color: 'text-primary'
    },
    {
      label: 'Tax Liability',
      value: `₹${formatIndianCurrency(taxData?.oldRegimeTax)}`,
      icon: 'Calculator',
      color: 'text-error'
    },
    {
      label: 'Total Deductions',
      value: `₹${formatIndianCurrency(taxData?.totalDeductions)}`,
      icon: 'Minus',
      color: 'text-success'
    },
    {
      label: 'Tax Saved',
      value: `₹${formatIndianCurrency(taxData?.taxSaved)}`,
      icon: 'PiggyBank',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Download" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export & Download</h3>
          <p className="text-sm text-muted-foreground">Generate reports for tax filing and record keeping</p>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
        {quickStats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat?.icon} size={18} color="var(--color-muted-foreground)" />
            </div>
            <p className={`text-lg font-bold ${stat?.color}`}>{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exportOptions?.map((option) => (
          <div key={option?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={option?.icon} size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{option?.title}</h4>
                  <p className="text-sm text-muted-foreground">{option?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs bg-muted px-2 py-1 rounded">{option?.format}</span>
                <p className="text-xs text-muted-foreground mt-1">{option?.size}</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport(option?.id)}
              disabled={isExporting}
              loading={isExporting && exportType === option?.id}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              {isExporting && exportType === option?.id ? 'Generating...' : 'Download'}
            </Button>
          </div>
        ))}
      </div>
      {/* Bulk Export */}
      <div className="border-t border-border pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={() => handleExport('all')}
            disabled={isExporting}
            loading={isExporting && exportType === 'all'}
            iconName="Package"
            iconPosition="left"
            className="flex-1"
          >
            Download All Reports
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: 'TaxWise Tax Calculator Results',
                  text: `My tax calculation: ₹${formatIndianCurrency(taxData?.oldRegimeTax)} liability with ₹${formatIndianCurrency(taxData?.totalDeductions)} deductions`,
                  url: window.location?.href
                });
              }
            }}
            iconName="Share"
            iconPosition="left"
          >
            Share Results
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.print()}
            iconName="Printer"
            iconPosition="left"
          >
            Print
          </Button>
        </div>
      </div>
      {/* Export History */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-foreground">Recent Exports</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax Summary - Sep 27, 2024</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Deduction Proof - Sep 25, 2024</span>
          </div>
        </div>
      </div>
      {/* Help Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Need Help with Tax Filing?</h4>
            <p className="text-sm text-muted-foreground">
              Our exported reports are compatible with popular tax filing software and CA requirements.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="xs" iconName="ExternalLink">
                Filing Guide
              </Button>
              <Button variant="ghost" size="xs" iconName="MessageCircle">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;