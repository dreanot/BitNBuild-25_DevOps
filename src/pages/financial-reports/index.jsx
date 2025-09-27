import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportCard from './components/ReportCard';
import ReportPreview from './components/ReportPreview';
import ReportFilters from './components/ReportFilters';
import ReportHistory from './components/ReportHistory';
import ScheduledReports from './components/ScheduledReports';

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState({
    reportType: 'all',
    period: 'current-fy',
    format: 'pdf',
    status: 'all'
  });

  const [reports] = useState([
    {
      id: 1,
      type: 'tax-summary',
      title: 'Tax Summary Report',
      description: 'Comprehensive tax calculation with deduction breakdowns',
      icon: 'Calculator',
      status: 'ready',
      period: 'FY 2023-24',
      lastUpdated: '27 Sep 2024',
      size: '2.4 MB'
    },
    {
      id: 2,
      type: 'spending-analysis',
      title: 'Annual Spending Analysis',
      description: 'Category-wise spending breakdown and trends',
      icon: 'PieChart',
      status: 'ready',
      period: 'FY 2023-24',
      lastUpdated: '26 Sep 2024',
      size: '1.8 MB'
    },
    {
      id: 3,
      type: 'credit-insights',
      title: 'Credit Score Insights',
      description: 'CIBIL score tracking and improvement recommendations',
      icon: 'TrendingUp',
      status: 'ready',
      period: 'Last 6 Months',
      lastUpdated: '25 Sep 2024',
      size: '1.2 MB'
    },
    {
      id: 4,
      type: 'financial-comparison',
      title: 'Multi-Year Financial Comparison',
      description: 'Year-over-year financial performance analysis',
      icon: 'BarChart3',
      status: 'generating',
      period: 'FY 2022-24',
      lastUpdated: '27 Sep 2024',
      size: 'Generating...'
    }
  ]);

  const [reportHistory, setReportHistory] = useState([
    {
      id: 1,
      type: 'tax-summary',
      title: 'Tax Summary Report - FY 2022-23',
      generatedDate: '2024-04-15',
      period: 'FY 2022-23',
      size: '2.1 MB'
    },
    {
      id: 2,
      type: 'spending-analysis',
      title: 'Annual Spending Analysis - FY 2022-23',
      generatedDate: '2024-04-10',
      period: 'FY 2022-23',
      size: '1.6 MB'
    }
  ]);

  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      reportType: 'tax-summary',
      frequency: 'monthly',
      email: 'user@example.com',
      includeCharts: true,
      format: 'pdf',
      isActive: true,
      nextRun: new Date('2024-10-01')
    }
  ]);

  const tabs = [
    { id: 'reports', label: 'Available Reports', icon: 'FileText' },
    { id: 'history', label: 'Report History', icon: 'Archive' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: 'Calendar' }
  ];

  const filteredReports = reports?.filter(report => {
    if (filters?.reportType !== 'all' && report?.type !== filters?.reportType) return false;
    if (filters?.status !== 'all' && report?.status !== filters?.status) return false;
    return true;
  });

  const handlePreview = (report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  const handleDownload = (report) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report?.title?.replace(/\s+/g, '_')}_${report?.period?.replace(/\s+/g, '_')}.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);

    // Show success message
    alert(`Downloading ${report?.title}...`);
  };

  const handleGenerateReport = () => {
    alert('Report generation feature would open a configuration dialog here.');
  };

  const handleDeleteHistory = (historyId) => {
    setReportHistory(prev => prev?.filter(item => item?.id !== historyId));
  };

  const handleAddSchedule = (schedule) => {
    setScheduledReports(prev => [...prev, schedule]);
  };

  const handleToggleSchedule = (scheduleId) => {
    setScheduledReports(prev => 
      prev?.map(schedule => 
        schedule?.id === scheduleId 
          ? { ...schedule, isActive: !schedule?.isActive }
          : schedule
      )
    );
  };

  const handleDeleteSchedule = (scheduleId) => {
    setScheduledReports(prev => prev?.filter(schedule => schedule?.id !== scheduleId));
  };

  useEffect(() => {
    document.title = 'Financial Reports - TaxWise';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
                <p className="text-muted-foreground">
                  Generate, download, and manage comprehensive financial reports
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ready Reports</p>
                    <p className="text-xl font-bold text-foreground">
                      {reports?.filter(r => r?.status === 'ready')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} color="var(--color-warning)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Generating</p>
                    <p className="text-xl font-bold text-foreground">
                      {reports?.filter(r => r?.status === 'generating')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Archive" size={16} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">History</p>
                    <p className="text-xl font-bold text-foreground">{reportHistory?.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={16} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="text-xl font-bold text-foreground">
                      {scheduledReports?.filter(s => s?.isActive)?.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <ReportFilters
                filters={filters}
                onFiltersChange={setFilters}
                onGenerateReport={handleGenerateReport}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredReports?.map((report) => (
                  <ReportCard
                    key={report?.id}
                    report={report}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                  />
                ))}
              </div>

              {filteredReports?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} color="var(--color-muted-foreground)" />
                  <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">No Reports Found</h3>
                  <p className="text-muted-foreground mb-4">
                    No reports match your current filter criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      reportType: 'all',
                      period: 'current-fy',
                      format: 'pdf',
                      status: 'all'
                    })}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <ReportHistory
              history={reportHistory}
              onDownload={handleDownload}
              onDelete={handleDeleteHistory}
            />
          )}

          {activeTab === 'scheduled' && (
            <ScheduledReports
              schedules={scheduledReports}
              onAddSchedule={handleAddSchedule}
              onToggleSchedule={handleToggleSchedule}
              onDeleteSchedule={handleDeleteSchedule}
            />
          )}
        </div>
      </main>
      {/* Report Preview Modal */}
      {showPreview && selectedReport && (
        <ReportPreview
          report={selectedReport}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default FinancialReports;