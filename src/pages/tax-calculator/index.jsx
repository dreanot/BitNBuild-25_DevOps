import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import IncomeInputSection from './components/IncomeInputSection';
import DeductionSection from './components/DeductionSection';
import RegimeComparison from './components/RegimeComparison';
import TaxVisualization from './components/TaxVisualization';
import ExportSection from './components/ExportSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TaxCalculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [incomeData, setIncomeData] = useState({
    salary: '120000067', // fanda here 
    business: '0',  // need to link all of this data with a  csv file
    rental: '033',
    capital_gains: '220',
    other: '50000'
  });

  const [deductionData, setDeductionData] = useState({
    '80C': {
      ppf: '15006700',
      elss: '0',
      life_insurance: '25000',
      home_loan_principal: '0',
      nsc: '0'
    },
    '80D': {
      self_health: '15000',
      parents_health: '0',
      preventive_checkup: '5000'
    },
    '80G': {
      pm_cares: '0',
      charitable_donations: '10000'
    },
    '24B': {
      home_loan_interest: '0'
    }
  });

  // Calculate totals
  const totalIncome = Object.values(incomeData)?.reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  
  const totalDeductions = Object.keys(deductionData)?.reduce((total, sectionId) => {
    const sectionTotal = Object.values(deductionData?.[sectionId])?.reduce((sum, value) => sum + (parseInt(value) || 0), 0);
    
    // Apply section limits
    if (sectionId === '80C') return total + Math.min(sectionTotal, 150000);
    if (sectionId === '80D') return total + Math.min(sectionTotal, 75000);
    if (sectionId === '24B') return total + Math.min(sectionTotal, 200000);
    return total + sectionTotal;
  }, 0);

  // Tax calculations
  const calculateTax = (income, deductions = 0) => {
    const taxableIncome = Math.max(income - deductions, 0);
    let tax = 0;

    if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.30;
      tax += 500000 * 0.20;
      tax += 250000 * 0.05;
    } else if (taxableIncome > 500000) {
      tax += (taxableIncome - 500000) * 0.20;
      tax += 250000 * 0.05;
    } else if (taxableIncome > 250000) {
      tax += (taxableIncome - 250000) * 0.05;
    }

    // Add cess
    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const calculateNewRegimeTax = (income) => {
    let tax = 0;

    if (income > 1500000) {
      tax += (income - 1500000) * 0.30;
      tax += 300000 * 0.20;
      tax += 300000 * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (income > 1200000) {
      tax += (income - 1200000) * 0.20;
      tax += 300000 * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (income > 900000) {
      tax += (income - 900000) * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (income > 600000) {
      tax += (income - 600000) * 0.10;
      tax += 300000 * 0.05;
    } else if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }

    // Add cess
    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const oldRegimeTax = calculateTax(totalIncome, totalDeductions);
  const newRegimeTax = calculateNewRegimeTax(totalIncome);

  const taxData = {
    grossIncome: totalIncome,
    totalDeductions: totalDeductions,
    oldRegimeTax: oldRegimeTax,
    newRegimeTax: newRegimeTax,
    incomeTax: oldRegimeTax * 0.96,
    cess: oldRegimeTax * 0.04,
    surcharge: 0,
    takeHome: totalIncome - oldRegimeTax,
    taxSaved: Math.max(0, newRegimeTax - oldRegimeTax)
  };

  const monthlyProjection = {
    income: Math.round(totalIncome / 12),
    april: Math.round(oldRegimeTax / 12),
    may: Math.round(oldRegimeTax / 12),
    june: Math.round(oldRegimeTax / 12),
    july: Math.round(oldRegimeTax / 12),
    august: Math.round(oldRegimeTax / 12),
    september: Math.round(oldRegimeTax / 12),
    october: Math.round(oldRegimeTax / 12),
    november: Math.round(oldRegimeTax / 12),
    december: Math.round(oldRegimeTax / 12),
    january: Math.round(oldRegimeTax / 12),
    february: Math.round(oldRegimeTax / 12),
    march: Math.round(oldRegimeTax / 12)
  };

  const handleIncomeChange = (categoryId, value) => {
    setIncomeData(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  const handleDeductionChange = (sectionId, itemId, value) => {
    setDeductionData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev?.[sectionId],
        [itemId]: value
      }
    }));
  };

  const handleExport = (exportType) => {
    console.log('Exporting:', exportType);
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setActiveTab('results');
  };

  const tabs = [
    { id: 'input', label: 'Income & Deductions', icon: 'Calculator' },
    { id: 'results', label: 'Tax Comparison', icon: 'Scale' },
    { id: 'visualization', label: 'Charts & Analysis', icon: 'BarChart3' },
    { id: 'export', label: 'Export & Download', icon: 'Download' }
  ];

  useEffect(() => {
    // Auto-calculate when data changes
    const timer = setTimeout(() => {
      if (totalIncome > 0) {
        // Trigger recalculation
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [incomeData, deductionData]);

  return (
    <>
      <Helmet>
        <title>Tax Calculator - TaxWise | Compare Old vs New Tax Regime</title>
        <meta name="description" content="Calculate your income tax liability, compare old vs new tax regime, and optimize deductions with AI-powered recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Tax Calculator</h1>
                  <p className="text-muted-foreground mt-2">
                    Calculate accurate tax liabilities and compare regime options with AI-powered analysis
                  </p>
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Financial Year</p>
                    <p className="text-lg font-semibold text-foreground">2024-25</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-lg font-semibold text-foreground">Sep 27, 2024</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
                    <span className="text-sm text-muted-foreground">Total Income</span>
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">
                    ₹{new Intl.NumberFormat('en-IN')?.format(totalIncome)}
                  </p>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Minus" size={16} color="var(--color-success)" />
                    <span className="text-sm text-muted-foreground">Deductions</span>
                  </div>
                  <p className="text-xl font-bold text-success mt-1">
                    ₹{new Intl.NumberFormat('en-IN')?.format(totalDeductions)}
                  </p>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calculator" size={16} color="var(--color-error)" />
                    <span className="text-sm text-muted-foreground">Tax Liability</span>
                  </div>
                  <p className="text-xl font-bold text-error mt-1">
                    ₹{new Intl.NumberFormat('en-IN')?.format(oldRegimeTax)}
                  </p>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="PiggyBank" size={16} color="var(--color-secondary)" />
                    <span className="text-sm text-muted-foreground">Potential Savings</span>
                  </div>
                  <p className="text-xl font-bold text-secondary mt-1">
                    ₹{new Intl.NumberFormat('en-IN')?.format(Math.abs(oldRegimeTax - newRegimeTax))}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'input' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <IncomeInputSection
                    incomeData={incomeData}
                    onIncomeChange={handleIncomeChange}
                    isLoading={isLoading}
                  />
                  <DeductionSection
                    deductionData={deductionData}
                    onDeductionChange={handleDeductionChange}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {activeTab === 'results' && (
                <RegimeComparison
                  oldRegimeTax={oldRegimeTax}
                  newRegimeTax={newRegimeTax}
                  totalIncome={totalIncome}
                  totalDeductions={totalDeductions}
                />
              )}

              {activeTab === 'visualization' && (
                <TaxVisualization
                  taxData={taxData}
                  incomeBreakdown={incomeData}
                  monthlyProjection={monthlyProjection}
                />
              )}

              {activeTab === 'export' && (
                <ExportSection
                  taxData={taxData}
                  incomeData={incomeData}
                  deductionData={deductionData}
                  onExport={handleExport}
                />
              )}
            </div>

            {/* Action Buttons */}
            {activeTab === 'input' && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-border">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleCalculate}
                  loading={isLoading}
                  iconName="Calculator"
                  iconPosition="left"
                  className="flex-1"
                >
                  {isLoading ? 'Calculating...' : 'Calculate Tax'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveTab('results')}
                  iconName="Scale"
                  iconPosition="left"
                >
                  View Comparison
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    setIncomeData({
                      salary: '0',
                      business: '0',
                      rental: '0',
                      capital_gains: '0',
                      other: '0'
                    });
                    setDeductionData({
                      '80C': { ppf: '0', elss: '0', life_insurance: '0', home_loan_principal: '0', nsc: '0' },
                      '80D': { self_health: '0', parents_health: '0', preventive_checkup: '0' },
                      '80G': { pm_cares: '0', charitable_donations: '0' },
                      '24B': { home_loan_interest: '0' }
                    });
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset All
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default TaxCalculator;