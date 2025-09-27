import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScoreOverview from './components/ScoreOverview';
import ScoreFactors from './components/ScoreFactors';
import ScoreTrend from './components/ScoreTrend';
import RecommendationCards from './components/RecommendationCards';
import WhatIfSimulator from './components/WhatIfSimulator';
import CreditBehaviorInsights from './components/CreditBehaviorInsights';
import ProgressTracking from './components/ProgressTracking';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CreditScoreAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1y');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const scoreData = {
    score: 742,
    trend: 18,
    percentile: 78,
    lastUpdated: "2 days ago"
  };

  const scoreFactors = [
    {
      title: "Payment History",
      description: "Your track record of making payments on time",
      icon: "Clock",
      impact: "positive",
      impactText: "Excellent",
      currentValue: "100% on-time payments",
      percentage: 95,
      weight: 35,
      target: "Maintain 100%",
      recommendation: "Continue making all payments on time to maintain this excellent score factor."
    },
    {
      title: "Credit Utilization",
      description: "How much of your available credit you\'re using",
      icon: "CreditCard",
      impact: "neutral",
      impactText: "Good",
      currentValue: "32% utilization",
      percentage: 68,
      weight: 30,
      target: "Below 30%",
      recommendation: "Reduce utilization to below 30% by paying down balances or requesting credit limit increases."
    },
    {
      title: "Credit History Length",
      description: "How long you\'ve been using credit",
      icon: "Calendar",
      impact: "negative",
      impactText: "Fair",
      currentValue: "3.2 years average",
      percentage: 45,
      weight: 15,
      target: "5+ years",
      recommendation: "Keep older accounts open and avoid closing your oldest credit cards to improve this factor."
    },
    {
      title: "Credit Mix",
      description: "Variety of credit accounts you have",
      icon: "Layers",
      impact: "positive",
      impactText: "Good",
      currentValue: "5 different types",
      percentage: 80,
      weight: 10,
      target: "Diverse mix",
      recommendation: "Your credit mix is good with various account types including cards, loans, and mortgages."
    },
    {
      title: "New Credit Inquiries",
      description: "Recent applications for new credit",
      icon: "Plus",
      impact: "negative",
      impactText: "High",
      currentValue: "4 inquiries (6 months)",
      percentage: 25,
      weight: 10,
      target: "2 or fewer",
      recommendation: "Avoid applying for new credit for the next 6 months to let recent inquiries age."
    }
  ];

  const trendData = [
    { month: "Jul \'23", score: 698, change: 5 },
    { month: "Aug \'23", score: 682, change: -16 },
    { month: "Sep \'23", score: 695, change: 13 },
    { month: "Oct \'23", score: 708, change: 13 },
    { month: "Nov \'23", score: 715, change: 7 },
    { month: "Dec \'23", score: 703, change: -12 },
    { month: "Jan \'24", score: 718, change: 15 },
    { month: "Feb \'24", score: 725, change: 7 },
    { month: "Mar \'24", score: 738, change: 13 },
    { month: "Apr \'24", score: 745, change: 7 },
    { month: "May \'24", score: 758, change: 13 },
    { month: "Jun \'24", score: 742, change: -16 }
  ];

  const recommendations = [
    {
      title: "Reduce Credit Card Utilization",
      description: "Your current utilization is 32%. Reducing it to below 30% could improve your score significantly.",
      icon: "CreditCard",
      priority: "high",
      impact: 25,
      timeline: "1-2 months",
      progress: 40,
      difficulty: "Easy",
      cost: "Free",
      steps: [
        "Pay down ₹15,000 on your HDFC credit card",
        "Request credit limit increase on SBI card",
        "Set up automatic payments for minimum balances"
      ]
    },
    {
      title: "Optimize Payment Timing",
      description: "Making payments before statement generation can further reduce reported utilization.",
      icon: "Clock",
      priority: "medium",
      impact: 15,
      timeline: "Immediate",
      progress: 0,
      difficulty: "Easy",
      cost: "Free",
      steps: [
        "Set payment dates 3-5 days before statement date",
        "Monitor statement generation dates",
        "Use mobile banking for quick payments"
      ]
    },
    {
      title: "Diversify Credit Portfolio",
      description: "Adding a secured loan could improve your credit mix and demonstrate responsible borrowing.",
      icon: "Layers",
      priority: "low",
      impact: 12,
      timeline: "3-6 months",
      progress: 20,
      difficulty: "Medium",
      cost: "Interest charges",
      steps: [
        "Research gold loan or fixed deposit loan options",
        "Compare interest rates across banks",
        "Apply for a small secured loan amount"
      ]
    }
  ];

  const behaviorData = [
    {
      type: "payment_history",
      title: "Payment Consistency",
      description: "On-time payment patterns",
      score: 95,
      insight: "Excellent payment history with 100% on-time payments for the last 18 months."
    },
    {
      type: "utilization",
      title: "Credit Usage",
      description: "How you manage available credit",
      score: 68,
      insight: "Generally good utilization, but occasional spikes above 40% impact your score."
    },
    {
      type: "account_mix",
      title: "Account Diversity",
      description: "Variety in credit products",
      score: 82,
      insight: "Good mix of credit cards, personal loan, and home loan showing responsible credit management."
    }
  ];

  const spendingPatterns = {
    monthly: [
      { month: "Jan", amount: 45000 },
      { month: "Feb", amount: 52000 },
      { month: "Mar", amount: 48000 },
      { month: "Apr", amount: 55000 },
      { month: "May", amount: 42000 },
      { month: "Jun", amount: 58000 }
    ],
    categories: [
      { name: "Food & Dining", amount: 18000 },
      { name: "Shopping", amount: 15000 },
      { name: "Transportation", amount: 12000 },
      { name: "Bills & Utilities", amount: 8000 },
      { name: "Entertainment", amount: 5000 },
      { name: "Others", amount: 7000 }
    ]
  };

  const goals = [
    {
      title: "Reach 750 CIBIL Score",
      description: "Improve score by 8 points through utilization optimization",
      current: 742,
      target: 750,
      progress: 75,
      status: "in_progress",
      deadline: "2024-08-15"
    },
    {
      title: "Reduce Credit Utilization",
      description: "Bring utilization below 30% across all cards",
      current: 32,
      target: 25,
      progress: 60,
      status: "in_progress",
      deadline: "2024-07-30"
    },
    {
      title: "Zero Late Payments",
      description: "Maintain perfect payment history for 24 months",
      current: 18,
      target: 24,
      progress: 90,
      status: "in_progress",
      deadline: "2025-01-15"
    }
  ];

  const achievements = [
    {
      title: "Payment Streak Master",
      description: "18 months of on-time payments",
      icon: "Award",
      date: "2024-06-15",
      impact: 15
    },
    {
      title: "Utilization Optimizer",
      description: "Reduced utilization from 45% to 32%",
      icon: "TrendingDown",
      date: "2024-05-20",
      impact: 12
    },
    {
      title: "Credit Mix Champion",
      description: "Successfully diversified credit portfolio",
      icon: "Layers",
      date: "2024-04-10",
      impact: 8
    },
    {
      title: "Score Milestone",
      description: "Crossed 740 CIBIL score threshold",
      icon: "Target",
      date: "2024-03-25",
      impact: 20
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'factors', label: 'Score Factors', icon: 'Layers' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'simulator', label: 'What-If', icon: 'Calculator' },
    { id: 'behavior', label: 'Behavior', icon: 'Activity' },
    { id: 'progress', label: 'Progress', icon: 'Target' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ScoreOverview {...scoreData} />;
      case 'factors':
        return <ScoreFactors factors={scoreFactors} />;
      case 'trends':
        return <ScoreTrend trendData={trendData} timeframe={timeframe} onTimeframeChange={setTimeframe} />;
      case 'recommendations':
        return <RecommendationCards recommendations={recommendations} />;
      case 'simulator':
        return <WhatIfSimulator />;
      case 'behavior':
        return <CreditBehaviorInsights behaviorData={behaviorData} spendingPatterns={spendingPatterns} />;
      case 'progress':
        return <ProgressTracking goals={goals} achievements={achievements} />;
      default:
        return <ScoreOverview {...scoreData} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing your credit profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Credit Score Analysis - TaxWise</title>
        <meta name="description" content="Comprehensive CIBIL score analysis with AI-powered recommendations and improvement strategies" />
      </Helmet>
      <Header />
      <div className="pt-20 px-4 lg:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Credit Score Analysis</h1>
                <p className="text-muted-foreground">
                  Comprehensive CIBIL score insights and improvement recommendations
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-success">742</div>
                <div className="text-sm text-muted-foreground">Current Score</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-primary">+18</div>
                <div className="text-sm text-muted-foreground">Monthly Change</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-warning">78%</div>
                <div className="text-sm text-muted-foreground">Percentile</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Active Goals</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
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
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Download"
              iconPosition="left"
            >
              Download Credit Report
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Share"
              iconPosition="left"
            >
              Share Analysis
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreAnalysis;