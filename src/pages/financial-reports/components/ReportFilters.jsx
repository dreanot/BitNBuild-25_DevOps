import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReportFilters = ({ filters, onFiltersChange, onGenerateReport }) => {
  const reportTypeOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'tax-summary', label: 'Tax Summary' },
    { value: 'spending-analysis', label: 'Spending Analysis' },
    { value: 'credit-insights', label: 'Credit Insights' },
    { value: 'financial-comparison', label: 'Multi-Year Comparison' }
  ];

  const periodOptions = [
    { value: 'current-fy', label: 'Current FY (2023-24)' },
    { value: 'previous-fy', label: 'Previous FY (2022-23)' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-12-months', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Format' },
    { value: 'excel', label: 'Excel Format' },
    { value: 'both', label: 'Both Formats' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'ready', label: 'Ready' },
    { value: 'generating', label: 'Generating' },
    { value: 'error', label: 'Error' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Report Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFiltersChange({
            reportType: 'all',
            period: 'current-fy',
            format: 'pdf',
            status: 'all'
          })}
          iconName="RotateCcw"
          iconSize={14}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Report Type"
          options={reportTypeOptions}
          value={filters?.reportType}
          onChange={(value) => handleFilterChange('reportType', value)}
          placeholder="Select report type"
        />

        <Select
          label="Time Period"
          options={periodOptions}
          value={filters?.period}
          onChange={(value) => handleFilterChange('period', value)}
          placeholder="Select period"
        />

        <Select
          label="Format"
          options={formatOptions}
          value={filters?.format}
          onChange={(value) => handleFilterChange('format', value)}
          placeholder="Select format"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Select status"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              Reports are generated based on your uploaded financial data
            </span>
          </div>
        </div>
        
        <Button
          variant="default"
          onClick={onGenerateReport}
          iconName="Plus"
          iconSize={16}
        >
          Generate New Report
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;