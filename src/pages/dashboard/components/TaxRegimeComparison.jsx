import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaxRegimeComparison = ({ className = '' }) => {
  const [selectedIncome, setSelectedIncome] = useState(1000000);

  const incomeSlabs = [
    { label: '₹10 Lakh', value: 1000000 },
    { label: '₹15 Lakh', value: 1500000 },
    { label: '₹20 Lakh', value: 2000000 },
    { label: '₹25 Lakh', value: 2500000 }
  ];


  // need to fix all this and add manaual adding of the values maybe it will be inputted by the user somewhere

  const calculateTax = (income, regime) => {
    if (regime === 'old') {
      // Old regime with standard deduction and 80C
      const taxableIncome = Math.max(0, income - 50000 - 150000); // Standard deduction + 80C
      let tax = 0;
      
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.3;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.2;
      if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      
      return Math.round(tax);
    } else {
      // New regime
      let tax = 0;
      
      if (income > 1500000) tax += (income - 1500000) * 0.3;
      if (income > 1200000) tax += Math.min(income - 1200000, 300000) * 0.2;
      if (income > 900000) tax += Math.min(income - 900000, 300000) * 0.15;
      if (income > 600000) tax += Math.min(income - 600000, 300000) * 0.1;
      if (income > 300000) tax += Math.min(income - 300000, 300000) * 0.05;
      
      return Math.round(tax);
    }
  };

  const comparisonData = incomeSlabs?.map(slab => ({
    income: slab?.label,
    oldRegime: calculateTax(slab?.value, 'old'),
    newRegime: calculateTax(slab?.value, 'new'),
    savings: calculateTax(slab?.value, 'old') - calculateTax(slab?.value, 'new')
  }));

  const currentComparison = {
    oldRegime: calculateTax(selectedIncome, 'old'),
    newRegime: calculateTax(selectedIncome, 'new'),
    savings: calculateTax(selectedIncome, 'old') - calculateTax(selectedIncome, 'new')
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Income: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ₹${entry?.value?.toLocaleString('en-IN')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Tax Regime Comparison</h3>
          <p className="text-sm text-muted-foreground">Compare old vs new tax regime for different income levels</p>
        </div>
        <Button variant="outline" size="sm" iconName="Calculator">
          Detailed Calculator
        </Button>
{/* nned to fix the abce button and need to make it work */}
        
      </div>
      {/* Income Selector need to add a manaul selectorand calculator */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Select Annual Income</label>
        <div className="flex flex-wrap gap-2">
          {incomeSlabs?.map((slab) => (
            <button
              key={slab?.value}
              onClick={() => setSelectedIncome(slab?.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                selectedIncome === slab?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {slab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Current Selection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calculator" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Old Regime</span>
          </div>
          <p className="text-xl font-bold text-foreground">₹{currentComparison?.oldRegime?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">With deductions</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">New Regime</span>
          </div>
          <p className="text-xl font-bold text-foreground">₹{currentComparison?.newRegime?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">Lower rates</p>
        </div>

        <div className={`rounded-lg p-4 ${
          currentComparison?.savings > 0 ? 'bg-success/10' : 'bg-error/10'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={currentComparison?.savings > 0 ? "TrendingDown" : "TrendingUp"} 
              size={16} 
              className={currentComparison?.savings > 0 ? "text-success" : "text-error"} 
            />
            <span className="text-sm font-medium text-foreground">
              {currentComparison?.savings > 0 ? 'Savings' : 'Extra Cost'}
            </span>
          </div>
          <p className={`text-xl font-bold ${
            currentComparison?.savings > 0 ? 'text-success' : 'text-error'
          }`}>
            ₹{Math.abs(currentComparison?.savings)?.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-muted-foreground">
            {currentComparison?.savings > 0 ? 'Choose old regime' : 'Choose new regime'}
          </p>
        </div>
      </div>
      {/* Comparison Chart we need to fix it and convert it into a pie chart */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Tax Comparison Across Income Levels</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="income" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value/1000)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="oldRegime" 
                fill="var(--color-warning)" 
                name="Old Regime" 
                radius={[2, 2, 0, 0]} 
              />
              <Bar 
                dataKey="newRegime" 
                fill="var(--color-primary)" 
                name="New Regime" 
                radius={[2, 2, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1"> Recommendation</h4>
            <p className="text-sm text-muted-foreground">
              {currentComparison?.savings > 0 
                ? `For your income level of ₹${(selectedIncome / 100000)?.toFixed(0)} lakh, the old regime saves you ₹${currentComparison?.savings?.toLocaleString('en-IN')}. Consider maximizing 80C deductions.`
                : `The new regime is better for your income level, saving ₹${Math.abs(currentComparison?.savings)?.toLocaleString('en-IN')} without requiring any deductions.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxRegimeComparison;

//needs some more fixing ~ Norvin