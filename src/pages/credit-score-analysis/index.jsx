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
import { loadCreditScoreData } from '../../utils/csvReader';
import { useTheme } from '../../contexts/ThemeContext';

const CreditScoreAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1y');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  
  // State for CSV data
  const [scoreData, setScoreData] = useState({});
  const [scoreFactors, setScoreFactors] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [behaviorData, setBehaviorData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [spendingPatterns, setSpendingPatterns] = useState({ monthly: [], categories: [] });

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
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await loadCreditScoreData();
        
        setScoreData(data.scoreData);
        setScoreFactors(data.scoreFactors);
        setTrendData(data.trendData);
        setRecommendations(data.recommendations);
        setBehaviorData(data.behaviorData);
        setGoals(data.goals);
        setAchievements(data.achievements);
        setSpendingPatterns(data.spendingPatterns);
        
      } catch (err) {
        console.error('Error loading credit score data:', err);
        setError('Failed to load credit score data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
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
      <div className="min-h-screen bg-background transition-colors duration-200">
        <Header />
        <div className="pt-20 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your credit profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-200">
        <Header />
        <div className="pt-20 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="AlertCircle" size={24} className="text-destructive" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Data</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="default"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
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
              <div className="p-4 bg-card rounded-lg border border-border text-center transition-all duration-200 hover:shadow-elevated dark:hover:shadow-lg">
                <div className="text-2xl font-bold text-success">{scoreData.score || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Current Score</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center transition-all duration-200 hover:shadow-elevated dark:hover:shadow-lg">
                <div className="text-2xl font-bold text-primary">{scoreData.trend ? `+${scoreData.trend}` : 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Monthly Change</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center transition-all duration-200 hover:shadow-elevated dark:hover:shadow-lg">
                <div className="text-2xl font-bold text-warning">{scoreData.percentile ? `${scoreData.percentile}%` : 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Percentile</div>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center transition-all duration-200 hover:shadow-elevated dark:hover:shadow-lg">
                <div className="text-2xl font-bold text-foreground">{goals.length}</div>
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
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted hover:bg-muted/50 rounded-t-md'
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

        </div>
      </div>
    </div>
  );
};

export default CreditScoreAnalysis;