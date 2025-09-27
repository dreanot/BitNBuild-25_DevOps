import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionSummary = ({ className = '' }) => {
  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Salary Credit - TechCorp Ltd",
      amount: "₹85,000",
      date: "25 Sep 2025",
      category: "Salary",
      icon: "Banknote"
    },
    {
      id: 2,
      type: "expense",
      description: "Home Loan EMI - HDFC Bank",
      amount: "₹32,500",
      date: "24 Sep 2025",
      category: "EMI",
      icon: "Home"
    },
    {
      id: 3,
      type: "investment",
      description: "SIP - Mutual Fund",
      amount: "₹15,000",
      date: "23 Sep 2025",
      category: "Investment",
      icon: "TrendingUp"
    },
    {
      id: 4,
      type: "expense",
      description: "Credit Card Payment",
      amount: "₹8,750",
      date: "22 Sep 2025",
      category: "Credit Card",
      icon: "CreditCard"
    },
    {
      id: 5,
      type: "expense",
      description: "Life Insurance Premium",
      amount: "₹12,000",
      date: "21 Sep 2025",
      category: "Insurance",
      icon: "Shield"
    }
  ];

  const getTransactionColor = (type) => {
    switch (type) {
      case 'income':
        return 'text-success';
      case 'expense':
        return 'text-error';
      case 'investment':
        return 'text-primary';
      default:
        return 'text-foreground';
    }
  };

  const getTransactionBg = (type) => {
    switch (type) {
      case 'income':
        return 'bg-success/10';
      case 'expense':
        return 'bg-error/10';
      case 'investment':
        return 'bg-primary/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {recentTransactions?.map((transaction) => (
          <div key={transaction?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`p-2 rounded-lg ${getTransactionBg(transaction?.type)}`}>
              <Icon name={transaction?.icon} size={20} className={getTransactionColor(transaction?.type)} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {transaction?.description}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{transaction?.date}</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                  {transaction?.category}
                </span>
              </div>
            </div>
            
            <div className={`text-sm font-semibold ${getTransactionColor(transaction?.type)}`}>
              {transaction?.type === 'income' ? '+' : '-'}{transaction?.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSummary;