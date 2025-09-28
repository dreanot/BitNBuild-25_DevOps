import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import DataUploadZone from './components/DataUploadZone';
import DataTable from './components/DataTable';
import DataVisualization from './components/DataVisualization';
import DataSummary from './components/DataSummary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Available data types that the system can handle
  const dataTypes = [
    {
      id: 'credit_score',
      name: 'Credit Score Data',
      description: 'CIBIL score, trends, and percentile information',
      icon: 'TrendingUp',
      color: 'primary',
      required: true
    },
    {
      id: 'monthly_finances',
      name: 'Monthly Finances',
      description: 'Monthly income, expenses, and savings data',
      icon: 'PiggyBank',
      color: 'success',
      required: true
    },
    {
      id: 'score_factors',
      name: 'Credit Score Factors',
      description: 'Detailed breakdown of credit score components',
      icon: 'Layers',
      color: 'warning',
      required: false
    },
    {
      id: 'score_trends',
      name: 'Score Trends',
      description: 'Historical credit score changes over time',
      icon: 'BarChart3',
      color: 'secondary',
      required: false
    },
    {
      id: 'insights',
      name: 'Financial Insights',
      description: 'AI-generated insights and recommendations',
      icon: 'Lightbulb',
      color: 'accent',
      required: false
    },
    {
      id: 'transactions',
      name: 'Transaction Data',
      description: 'Bank statements and transaction history',
      icon: 'CreditCard',
      color: 'destructive',
      required: false
    }
  ];

  const tabs = [
    { id: 'upload', label: 'Upload Data', icon: 'Upload' },
    { id: 'manage', label: 'Manage Data', icon: 'Database' },
    { id: 'visualize', label: 'Visualize', icon: 'BarChart3' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    setIsLoading(true);
    try {
      // Load all CSV files from public folder
      const dataPromises = dataTypes.map(async (dataType) => {
        try {
          const response = await fetch(`/${dataType.id}.csv`);
          if (response.ok) {
            const csvText = await response.text();
            const parsedData = parseCSV(csvText);
            return {
              type: dataType.id,
              name: dataType.name,
              data: parsedData,
              loaded: true
            };
          }
        } catch (error) {
          console.log(`No existing data for ${dataType.id}`);
        }
        return {
          type: dataType.id,
          name: dataType.name,
          data: [],
          loaded: false
        };
      });

      const loadedData = await Promise.all(dataPromises);
      const dataMap = {};
      loadedData.forEach(item => {
        if (item.loaded) {
          dataMap[item.type] = item.data;
        }
      });

      setCurrentData(dataMap);
      setUploadedFiles(loadedData.filter(item => item.loaded));
    } catch (error) {
      console.error('Error loading existing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(header => header.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
    
    return data;
  };

  const handleFileUpload = async (files) => {
    setIsLoading(true);
    const newFiles = [];

    for (const file of files) {
      try {
        const csvText = await file.text();
        const parsedData = parseCSV(csvText);
        
        // Try to identify the data type based on file name or content
        const dataType = identifyDataType(file.name, parsedData);
        
        const fileData = {
          type: dataType,
          name: file.name,
          data: parsedData,
          loaded: true,
          lastModified: new Date()
        };

        newFiles.push(fileData);
        
        // Update current data
        setCurrentData(prev => ({
          ...prev,
          [dataType]: parsedData
        }));
      } catch (error) {
        console.error('Error processing file:', file.name, error);
      }
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsLoading(false);
  };

  const identifyDataType = (fileName, data) => {
    const name = fileName.toLowerCase();
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    
    if (name.includes('credit') && name.includes('score')) return 'credit_score';
    if (name.includes('monthly') || name.includes('finance')) return 'monthly_finances';
    if (name.includes('factor')) return 'score_factors';
    if (name.includes('trend')) return 'score_trends';
    if (name.includes('insight')) return 'insights';
    if (name.includes('transaction') || name.includes('statement')) return 'transactions';
    
    // Fallback based on headers
    if (headers.includes('score') && headers.includes('trend')) return 'credit_score';
    if (headers.includes('month') && headers.includes('income')) return 'monthly_finances';
    if (headers.includes('title') && headers.includes('impact')) return 'score_factors';
    
    return 'transactions'; // Default fallback
  };

  const handleDataUpdate = (dataType, newData) => {
    setCurrentData(prev => ({
      ...prev,
      [dataType]: newData
    }));
  };

  const handleExportData = (dataType) => {
    const data = currentData[dataType];
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header] || '').join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType}_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getDataSummary = () => {
    const summary = {};
    Object.keys(currentData).forEach(key => {
      summary[key] = {
        count: currentData[key].length,
        lastUpdated: new Date().toLocaleDateString(),
        status: currentData[key].length > 0 ? 'Loaded' : 'Empty'
      };
    });
    return summary;
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
                <p className="text-muted-foreground">Loading your financial data...</p>
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
        <title>Data Management - TaxWise</title>
        <meta name="description" content="Upload, manage, and visualize your financial data for AI-powered tax optimization and credit score management" />
      </Helmet>
      <Header />
      
      <div className="pt-20 px-4 lg:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Database" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Financial Data Management</h1>
                <p className="text-muted-foreground">
                  Upload, manage, and visualize your financial data for comprehensive tax optimization and credit analysis
                </p>
              </div>
            </div>

            {/* Data Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {dataTypes.slice(0, 4).map((dataType) => {
                const data = currentData[dataType.id] || [];
                const isLoaded = data.length > 0;
                return (
                  <div key={dataType.id} className={`p-4 bg-card rounded-lg border border-border text-center transition-all duration-200 hover:shadow-elevated ${
                    isLoaded ? 'border-success/20 bg-success/5' : 'border-border'
                  }`}>
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                      isLoaded ? 'bg-success/10' : 'bg-muted/50'
                    }`}>
                      <Icon 
                        name={dataType.icon} 
                        size={24} 
                        className={isLoaded ? 'text-success' : 'text-muted-foreground'} 
                      />
                    </div>
                    <div className="text-lg font-bold text-foreground">{data.length}</div>
                    <div className="text-sm text-muted-foreground">{dataType.name}</div>
                    <div className={`text-xs mt-1 ${
                      isLoaded ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {isLoaded ? 'Loaded' : 'Not loaded'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted hover:bg-muted/50 rounded-t-md'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'upload' && (
              <DataUploadZone 
                dataTypes={dataTypes}
                onFileUpload={handleFileUpload}
                uploadedFiles={uploadedFiles}
              />
            )}

            {activeTab === 'manage' && (
              <DataTable 
                currentData={currentData}
                dataTypes={dataTypes}
                onDataUpdate={handleDataUpdate}
                onFileSelect={setSelectedFile}
                selectedFile={selectedFile}
              />
            )}

            {activeTab === 'visualize' && (
              <DataVisualization 
                currentData={currentData}
                dataTypes={dataTypes}
              />
            )}

            {activeTab === 'export' && (
              <div className="space-y-6">
                <DataSummary 
                  dataSummary={getDataSummary()}
                  dataTypes={dataTypes}
                />
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Export Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataTypes.map((dataType) => {
                      const data = currentData[dataType.id] || [];
                      return (
                        <div key={dataType.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon name={dataType.icon} size={20} className="text-muted-foreground" />
                            <div>
                              <div className="font-medium text-foreground">{dataType.name}</div>
                              <div className="text-sm text-muted-foreground">{data.length} records</div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExportData(dataType.id)}
                            disabled={data.length === 0}
                            iconName="Download"
                          >
                            Export
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
