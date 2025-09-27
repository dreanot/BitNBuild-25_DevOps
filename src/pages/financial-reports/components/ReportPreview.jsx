import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ReportPreview = ({ report, onClose, onDownload }) => {
  const taxData = [
    { category: 'Salary Income', amount: 1200000 },
    { category: 'Section 80C', amount: -150000 },
    { category: 'Section 80D', amount: -25000 },
    { category: 'HRA Exemption', amount: -180000 },
    { category: 'Taxable Income', amount: 845000 }
  ];

  const spendingData = [
    { category: 'Housing', amount: 480000, color: '#1E40AF' },
    { category: 'Transportation', amount: 120000, color: '#059669' },
    { category: 'Food & Dining', amount: 96000, color: '#F59E0B' },
    { category: 'Healthcare', amount: 48000, color: '#EF4444' },
    { category: 'Entertainment', amount: 36000, color: '#8B5CF6' },
    { category: 'Others', amount: 60000, color: '#6B7280' }
  ];

  const creditTrendData = [
    { month: 'Apr', score: 720 },
    { month: 'May', score: 725 },
    { month: 'Jun', score: 730 },
    { month: 'Jul', score: 735 },
    { month: 'Aug', score: 742 },
    { month: 'Sep', score: 748 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(value);
  };

  const renderTaxSummary = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-foreground mb-4">Tax Calculation Summary - FY 2023-24</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-foreground mb-3">Income & Deductions</h5>
            <div className="space-y-2">
              {taxData?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item?.category}</span>
                  <span className={`text-sm font-medium ${item?.amount < 0 ? 'text-success' : 'text-foreground'}`}>
                    {formatCurrency(Math.abs(item?.amount))}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taxData?.filter(item => item?.amount !== 845000)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => formatCurrency(Math.abs(value))} />
                <Bar dataKey="amount" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <h5 className="text-sm font-medium text-success mb-1">Total Tax Saved</h5>
          <p className="text-2xl font-bold text-success">₹89,250</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h5 className="text-sm font-medium text-primary mb-1">Final Tax Liability</h5>
          <p className="text-2xl font-bold text-primary">₹1,12,750</p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <h5 className="text-sm font-medium text-warning mb-1">Effective Tax Rate</h5>
          <p className="text-2xl font-bold text-warning">13.3%</p>
        </div>
      </div>
    </div>
  );

  const renderSpendingAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-foreground mb-4">Annual Spending Analysis - FY 2023-24</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, percent }) => `${category} ${(percent * 100)?.toFixed(0)}%`}
                >
                  {spendingData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-3">Category Breakdown</h5>
            <div className="space-y-3">
              {spendingData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item?.color }}></div>
                    <span className="text-sm text-muted-foreground">{item?.category}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(item?.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Total Annual Spending</h5>
          <p className="text-2xl font-bold text-foreground">₹8,40,000</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Average Monthly Spending</h5>
          <p className="text-2xl font-bold text-foreground">₹70,000</p>
        </div>
      </div>
    </div>
  );

  const renderCreditInsights = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-foreground mb-4">Credit Score Improvement Tracking</h4>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={creditTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <h5 className="text-sm font-medium text-success mb-1">Score Improvement</h5>
            <p className="text-2xl font-bold text-success">+28 Points</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h5 className="text-sm font-medium text-primary mb-1">Current Score</h5>
            <p className="text-2xl font-bold text-primary">748</p>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h5 className="text-sm font-medium text-warning mb-1">Credit Utilization</h5>
            <p className="text-2xl font-bold text-warning">23%</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (report?.type) {
      case 'tax-summary':
        return renderTaxSummary();
      case 'spending-analysis':
        return renderSpendingAnalysis();
      case 'credit-insights':
        return renderCreditInsights();
      default:
        return (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} color="var(--color-muted-foreground)" />
            <p className="text-muted-foreground mt-4">Report preview not available</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{report?.title}</h3>
            <p className="text-sm text-muted-foreground">{report?.period}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(report)}
              iconName="Download"
              iconSize={16}
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={16}
            />
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;