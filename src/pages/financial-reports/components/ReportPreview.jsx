import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ReportPreview = ({ report, onClose, onDownload }) => {
  const [taxData, setTaxData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [creditTrendData, setCreditTrendData] = useState([]);

  useEffect(() => {
    Papa.parse('/reportData.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const tax = [];
        const spending = [];
        const credit = [];

        results.data.forEach((row) => {
          const type = row.type?.trim();
          if (type === 'tax') {
            tax.push({ category: row.category, amount: Number(row.amount) });
          } else if (type === 'spending') {
            spending.push({ category: row.category, amount: Number(row.amount), color: row.color });
          } else if (type === 'credit') {
            credit.push({ month: row.month, score: Number(row.amount) });
          }
        });

        setTaxData(tax);
        setSpendingData(spending);
        setCreditTrendData(credit);
      }
    });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(value);
  };

  // The rest of your component (renderTaxSummary, renderSpendingAnalysis, renderCreditInsights, renderContent)
  // stays the same but replace hardcoded arrays with taxData, spendingData, creditTrendData

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
              <BarChart data={taxData?.filter(item => item?.category !== 'Taxable Income')}>
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
      {/* Total Tax Saved, Final Tax, Effective Rate stays hardcoded unless you want to calculate */}
    </div>
  );

  // renderSpendingAnalysis and renderCreditInsights remain the same but use spendingData and creditTrendData arrays

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
