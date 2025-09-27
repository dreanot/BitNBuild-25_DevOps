import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegimeComparison = ({ oldRegimeTax, newRegimeTax, totalIncome, totalDeductions }) => {
  const formatIndianCurrency = (value) => {
    return new Intl.NumberFormat('en-IN')?.format(value || 0);
  };

  const savings = oldRegimeTax - newRegimeTax;
  const recommendedRegime = oldRegimeTax < newRegimeTax ? 'old' : 'new';

  const oldRegimeSlabs = [
    { range: '₹0 - ₹2.5L', rate: '0%', tax: 0 },
    { range: '₹2.5L - ₹5L', rate: '5%', tax: Math.min(Math.max(totalIncome - 250000, 0), 250000) * 0.05 },
    { range: '₹5L - ₹10L', rate: '20%', tax: Math.min(Math.max(totalIncome - 500000, 0), 500000) * 0.20 },
    { range: '₹10L+', rate: '30%', tax: Math.max(totalIncome - 1000000, 0) * 0.30 }
  ];

  const newRegimeSlabs = [
    { range: '₹0 - ₹3L', rate: '0%', tax: 0 },
    { range: '₹3L - ₹6L', rate: '5%', tax: Math.min(Math.max(totalIncome - 300000, 0), 300000) * 0.05 },
    { range: '₹6L - ₹9L', rate: '10%', tax: Math.min(Math.max(totalIncome - 600000, 0), 300000) * 0.10 },
    { range: '₹9L - ₹12L', rate: '15%', tax: Math.min(Math.max(totalIncome - 900000, 0), 300000) * 0.15 },
    { range: '₹12L - ₹15L', rate: '20%', tax: Math.min(Math.max(totalIncome - 1200000, 0), 300000) * 0.20 },
    { range: '₹15L+', rate: '30%', tax: Math.max(totalIncome - 1500000, 0) * 0.30 }
  ];

  const RegimeCard = ({ title, tax, regime, slabs, isRecommended }) => (
    <div className={`relative bg-card rounded-lg border-2 p-6 transition-smooth ${
      isRecommended ? 'border-primary bg-primary/5' : 'border-border'
    }`}>
      {isRecommended && (
        <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">₹{formatIndianCurrency(tax)}</p>
          <p className="text-sm text-muted-foreground">Annual Tax</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {slabs?.map((slab, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{slab?.range}</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{slab?.rate}</span>
              <span className="text-muted-foreground">₹{formatIndianCurrency(slab?.tax)}</span>
            </div>
          </div>
        ))}
      </div>

      {regime === 'old' && (
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Deductions Applied: ₹{formatIndianCurrency(totalDeductions)}
          </p>
        </div>
      )}

      {regime === 'new' && (
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Lower tax rates, no deductions allowed
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Scale" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tax Regime Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare old vs new tax regime benefits</p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Potential Savings</p>
          <p className={`text-xl font-bold ${savings > 0 ? 'text-success' : 'text-error'}`}>
            {savings > 0 ? '+' : ''}₹{formatIndianCurrency(Math.abs(savings))}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegimeCard
          title="Old Tax Regime"
          tax={oldRegimeTax}
          regime="old"
          slabs={oldRegimeSlabs}
          isRecommended={recommendedRegime === 'old'}
        />
        
        <RegimeCard
          title="New Tax Regime"
          tax={newRegimeTax}
          regime="new"
          slabs={newRegimeSlabs}
          isRecommended={recommendedRegime === 'new'}
        />
      </div>
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">AI Recommendation</h4>
            <p className="text-sm text-muted-foreground">
              {recommendedRegime === 'old' 
                ? `The old tax regime saves you ₹${formatIndianCurrency(savings)} annually due to your deduction profile. Consider maximizing 80C investments.`
                : `The new tax regime saves you ₹${formatIndianCurrency(Math.abs(savings))} annually with simplified tax structure. No deductions needed.`
              }
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="outline" size="sm" iconName="Download">
                Download Comparison
              </Button>
              <Button variant="ghost" size="sm" iconName="Share">
                Share Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">₹{formatIndianCurrency(Math.round(oldRegimeTax / 12))}</p>
          <p className="text-sm text-muted-foreground">Old Regime/Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">₹{formatIndianCurrency(Math.round(newRegimeTax / 12))}</p>
          <p className="text-sm text-muted-foreground">New Regime/Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{((oldRegimeTax / totalIncome) * 100)?.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">Old Tax Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{((newRegimeTax / totalIncome) * 100)?.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">New Tax Rate</p>
        </div>
      </div>
    </div>
  );
};

export default RegimeComparison;