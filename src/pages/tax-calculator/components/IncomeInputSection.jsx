import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const IncomeInputSection = ({ incomeData, onIncomeChange, isLoading }) => {
  const incomeCategories = [
    {
      id: 'salary',
      label: 'Salary Income',
      icon: 'Briefcase',
      description: 'Basic salary, HRA, allowances',
      placeholder: 'Enter annual salary'
    },
    {
      id: 'business',
      label: 'Business Income',
      icon: 'Building2',
      description: 'Professional fees, business profits',
      placeholder: 'Enter business income'
    },
    {
      id: 'rental',
      label: 'Rental Income',
      icon: 'Home',
      description: 'Property rental income',
      placeholder: 'Enter rental income'
    },
    {
      id: 'capital_gains',
      label: 'Capital Gains',
      icon: 'TrendingUp',
      description: 'STCG, LTCG from investments',
      placeholder: 'Enter capital gains'
    },
    {
      id: 'other',
      label: 'Other Income',
      icon: 'Plus',
      description: 'Interest, dividends, other sources',
      placeholder: 'Enter other income'
    }
  ];

  const formatIndianCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN')?.format(value);
  };

  const handleInputChange = (categoryId, value) => {
    const numericValue = value?.replace(/[^0-9]/g, '');
    onIncomeChange(categoryId, numericValue);
  };

  const totalIncome = Object.values(incomeData)?.reduce((sum, value) => sum + (parseInt(value) || 0), 0);

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Income Details</h3>
            <p className="text-sm text-muted-foreground">Enter your annual income from all sources</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-xl font-bold text-primary">₹{formatIndianCurrency(totalIncome)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incomeCategories?.map((category) => (
          <div key={category?.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={category?.icon} size={16} color="var(--color-muted-foreground)" />
              <label className="text-sm font-medium text-foreground">{category?.label}</label>
            </div>
            <Input
              type="text"
              placeholder={category?.placeholder}
              description={category?.description}
              value={incomeData?.[category?.id] ? formatIndianCurrency(incomeData?.[category?.id]) : ''}
              onChange={(e) => handleInputChange(category?.id, e?.target?.value)}
              disabled={isLoading}
              className="font-mono"
            />
          </div>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">AI Recommendations</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Consider HRA exemption if paying rent</li>
          <li>• LTA can be claimed for travel expenses</li>
          <li>• Professional tax is deductible from salary</li>
        </ul>
      </div>
    </div>
  );
};

export default IncomeInputSection;