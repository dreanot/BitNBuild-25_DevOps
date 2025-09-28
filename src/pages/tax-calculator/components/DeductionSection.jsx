import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeductionSection = ({ deductionData, onDeductionChange, isLoading }) => {
  const deductionCategories = [
    {
      id: '80c',
      label: 'Section 80C',
      icon: 'Shield',
      description: 'ELSS, PPF, EPF, NSC, Life Insurance',
      maxLimit: 150000,
      placeholder: 'Enter 80C deductions'
    },
    {
      id: '80d',
      label: 'Section 80D',
      icon: 'Heart',
      description: 'Health insurance premium',
      maxLimit: 25000,
      placeholder: 'Enter health insurance premium'
    },
    {
      id: '80e',
      label: 'Section 80E',
      icon: 'GraduationCap',
      description: 'Education loan interest',
      maxLimit: 0,
      placeholder: 'Enter education loan interest'
    },
    {
      id: '80g',
      label: 'Section 80G',
      icon: 'HandHeart',
      description: 'Donations to charity',
      maxLimit: 0,
      placeholder: 'Enter charitable donations'
    },
    {
      id: '80t',
      label: 'Section 80TTA',
      icon: 'PiggyBank',
      description: 'Interest on savings account',
      maxLimit: 10000,
      placeholder: 'Enter savings interest'
    },
    {
      id: 'hra',
      label: 'HRA',
      icon: 'Home',
      description: 'House rent allowance',
      maxLimit: 0,
      placeholder: 'Enter HRA amount'
    },
    {
      id: 'lta',
      label: 'LTA',
      icon: 'Plane',
      description: 'Leave travel allowance',
      maxLimit: 0,
      placeholder: 'Enter LTA amount'
    },
    {
      id: 'professional_tax',
      label: 'Professional Tax',
      icon: 'Briefcase',
      description: 'Professional tax paid',
      maxLimit: 2500,
      placeholder: 'Enter professional tax'
    }
  ];

  const formatIndianCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN')?.format(value);
  };

  const handleInputChange = (categoryId, value) => {
    const numericValue = value?.replace(/[^0-9]/g, '');
    onDeductionChange(categoryId, numericValue);
  };

  const totalDeductions = Object.values(deductionData)?.reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  const total80CLimit = deductionCategories
    ?.filter(cat => cat?.id === '80c')
    ?.reduce((sum, cat) => sum + (parseInt(deductionData?.[cat?.id]) || 0), 0);

  const is80COverLimit = total80CLimit > 150000;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tax Deductions</h3>
            <p className="text-sm text-muted-foreground">Maximize your tax savings with eligible deductions</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Deductions</p>
          <p className="text-xl font-bold text-success">₹{formatIndianCurrency(totalDeductions)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deductionCategories?.map((category) => (
          <div key={category?.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={category?.icon} size={16} color="var(--color-muted-foreground)" />
                <label className="text-sm font-medium text-foreground">{category?.label}</label>
              </div>
              {category?.maxLimit > 0 && (
                <span className="text-xs text-muted-foreground">Max: ₹{formatIndianCurrency(category?.maxLimit)}</span>
              )}
            </div>
            <Input
              type="text"
              placeholder={category?.placeholder}
              description={category?.description}
              value={deductionData?.[category?.id] ? formatIndianCurrency(deductionData?.[category?.id]) : ''}
              onChange={(e) => handleInputChange(category?.id, e?.target?.value)}
              disabled={isLoading}
              className="font-mono"
            />
            {category?.id === '80c' && is80COverLimit && (
              <p className="text-xs text-warning">⚠️ Exceeds 80C limit of ₹1.5L</p>
            )}
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">AI Tax Optimization Tips</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Maximize 80C (₹1.5L limit)</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Invest in ELSS mutual funds</li>
              <li>• Contribute to PPF/EPF</li>
              <li>• Buy NSC or life insurance</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Other Key Deductions</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Health insurance: ₹25K (₹50K for senior citizens)</li>
              <li>• HRA: Based on rent paid and salary</li>
              <li>• Professional tax: Up to ₹2,500</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Calculator"
          onClick={() => {
            // Auto-calculate optimal deductions
            const optimalDeductions = {
              '80c': '150000',
              '80d': '25000',
              'professional_tax': '2500'
            };
            Object.keys(optimalDeductions).forEach(key => {
              onDeductionChange(key, optimalDeductions[key]);
            });
          }}
        >
          Auto-Fill Optimal
        </Button>
      </div>
    </div>
  );
};

export default DeductionSection;

