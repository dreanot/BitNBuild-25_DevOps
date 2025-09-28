import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import TransactionSummary from './components/TransactionSummary';
import TaxDeadlines from './components/TaxDeadlines';
import SpendingChart from './components/SpendingChart';
import TaxRegimeComparison from './components/TaxRegimeComparison';
import QuickActions from './components/QuickActions';
import AIInsights from './components/AIInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../components/AuthProvider';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, logout } = useAuth();
  const userName = user?.profile?.firstName || user?.email || "User";

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // need to add working data here

  const keyMetrics = [
    {
      title: "Estimated Tax Liability",
      value: "₹1,24,500",
      subtitle: "FY 2024-25 (Old Regime)",
      icon: "Calculator",
      trend: "down",
      trendValue: "12%",
      color: "primary",
      onClick: () => navigate('/tax-calculator')
    },
    {
      title: "CIBIL Score",
      value: "742",
      subtitle: "Good • Updated 3 days ago",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+18",
      color: "success",
      onClick: () => navigate('/credit-score-analysis')
    },
    {
      title: "Total Deductions",
      value: "₹2,00,000",
      subtitle: "80C: ₹1.5L • 80D: ₹25K • Others: ₹25K",
      icon: "PiggyBank",
      trend: "up",
      trendValue: "₹50K",
      color: "warning",
      onClick: () => navigate('/tax-calculator')
    },
    {
      title: "Potential Savings",
      value: "₹18,500",
      subtitle: "AI-identified opportunities",
      icon: "Lightbulb",
      trend: "up",
      trendValue: "New",
      color: "secondary",
      onClick: () => navigate('/dashboard')
    }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {getGreeting()}, {userName}! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  {formatDate(currentTime)} • Here's your financial overview
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Financial Charts */}
              <SpendingChart />
              
              {/* Tax Regime Comparison */}
              <TaxRegimeComparison />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-8">
              {/* AI Insights */}
              <AIInsights />
              
              {/* Quick Actions */}
              <QuickActions />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <TransactionSummary />
            
            {/* Tax Deadlines */}
            <TaxDeadlines />
          </div>

          {/* Financial Health Summary */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Financial Health Summary</h3>
              <Button variant="outline" size="sm" iconName="TrendingUp">
                View Detailed Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h4 className="font-medium text-foreground">Tax Compliance</h4>
                <p className="text-2xl font-bold text-success mt-1">95%</p>
                <p className="text-xs text-muted-foreground">Excellent</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <h4 className="font-medium text-foreground">Savings Rate</h4>
                <p className="text-2xl font-bold text-primary mt-1">26%</p>
                <p className="text-xs text-muted-foreground">Above Average</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="CreditCard" size={24} className="text-warning" />
                </div>
                <h4 className="font-medium text-foreground">Credit Health</h4>
                <p className="text-2xl font-bold text-warning mt-1">Good</p>
                <p className="text-xs text-muted-foreground">742 CIBIL Score</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="BarChart3" size={24} className="text-secondary" />
                </div>
                <h4 className="font-medium text-foreground">Investment Mix</h4>
                <p className="text-2xl font-bold text-secondary mt-1">Balanced</p>
                <p className="text-xs text-muted-foreground">70% Equity, 30% Debt</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


// done ~ norvin
