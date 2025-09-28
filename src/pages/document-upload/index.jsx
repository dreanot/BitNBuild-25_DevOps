import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadZone from './components/UploadZone';
import UploadProgress from './components/UploadProgress';
import DocumentTable from './components/DocumentTable';
import AIInsights from './components/AIInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [showInsights, setShowInsights] = useState(false);

  // Mock existing documents
  useEffect(() => {
    const mockDocuments = [
      {
        id: 'doc_1',
        name: 'HDFC_Bank_Statement_Oct2024.pdf',
        type: 'pdf',
        size: 2456789,
        status: 'completed',
        uploadedAt: new Date('2024-10-15T10:30:00'),
        insights: {
          totalAmount: 125000,
          transactionCount: 47
        }
      },
      {
        id: 'doc_2',
        name: 'Credit_Card_Statement_Sep2024.pdf',
        type: 'pdf',
        size: 1234567,
        status: 'completed',
        uploadedAt: new Date('2024-10-10T14:20:00'),
        insights: {
          totalAmount: 35000,
          transactionCount: 23
        }
      },
      {
        id: 'doc_3',
        name: 'Investment_Portfolio_2024.xlsx',
        type: 'xlsx',
        size: 987654,
        status: 'processing',
        uploadedAt: new Date('2024-10-20T09:15:00'),
        processingStage: 'Analyzing investment patterns...'
      },
      {
        id: 'doc_4',
        name: 'Salary_Slips_Q3_2024.pdf',
        type: 'pdf',
        size: 3456789,
        status: 'error',
        uploadedAt: new Date('2024-10-18T16:45:00'),
        error: 'Unable to extract text from scanned document'
      }
    ];

    setDocuments(mockDocuments);

    // Mock AI insights
    const mockInsights = {
      potentialSavings: 46800,
      monthlyExpenses: 45000,
      investmentScore: 'B+',
      creditScore: '750+',
      totalDocuments: mockDocuments?.length,
      processedDocuments: mockDocuments?.filter(doc => doc?.status === 'completed')?.length
    };

    setAiInsights(mockInsights);
    setShowInsights(mockDocuments?.some(doc => doc?.status === 'completed'));
  }, []);

  const handleFilesSelected = async (files) => {
    setIsUploading(true);
    
    const newUploadingFiles = files?.map((file, index) => ({
      id: `upload_${Date.now()}_${index}`,
      name: file?.name,
      size: file?.size,
      status: 'uploading',
      progress: 0,
      file: file
    }));

    setUploadingFiles(newUploadingFiles);

    // Simulate upload and processing
    for (const uploadFile of newUploadingFiles) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadingFiles(prev => 
          prev?.map(f => 
            f?.id === uploadFile?.id 
              ? { ...f, progress, status: progress === 100 ? 'processing' : 'uploading' }
              : f
          )
        );
      }

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadingFiles(prev => 
        prev?.map(f => 
          f?.id === uploadFile?.id 
            ? { 
                ...f, 
                status: 'processing', 
                processingStage: 'Extracting transaction data...' 
              }
            : f
        )
      );

      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadingFiles(prev => 
        prev?.map(f => 
          f?.id === uploadFile?.id 
            ? { 
                ...f, 
                status: 'processing', 
                processingStage: 'Categorizing expenses...' 
              }
            : f
        )
      );

      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadingFiles(prev => 
        prev?.map(f => 
          f?.id === uploadFile?.id 
            ? { 
                ...f, 
                status: 'processing', 
                processingStage: 'Generating insights...' 
              }
            : f
        )
      );

      // Complete processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const completedDoc = {
        id: `doc_${Date.now()}_${uploadFile?.name}`,
        name: uploadFile?.name,
        type: uploadFile?.name?.split('.')?.pop(),
        size: uploadFile?.size,
        status: 'completed',
        uploadedAt: new Date(),
        insights: {
          totalAmount: Math.floor(Math.random() * 100000) + 20000,
          transactionCount: Math.floor(Math.random() * 50) + 10
        }
      };

      setDocuments(prev => [completedDoc, ...prev]);
      setUploadingFiles(prev => prev?.filter(f => f?.id !== uploadFile?.id));
    }

    setIsUploading(false);
    setShowInsights(true);
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev?.filter(doc => doc?.id !== docId));
  };

  const handleReprocessDocument = async (docId) => {
    setDocuments(prev => 
      prev?.map(doc => 
        doc?.id === docId 
          ? { ...doc, status: 'processing', processingStage: 'Reprocessing document...' }
          : doc
      )
    );

    // Simulate reprocessing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDocuments(prev => 
      prev?.map(doc => 
        doc?.id === docId 
          ? { 
              ...doc, 
              status: 'completed',
              insights: {
                totalAmount: Math.floor(Math.random() * 100000) + 20000,
                transactionCount: Math.floor(Math.random() * 50) + 10
              }
            }
          : doc
      )
    );
  };

  const handleViewDetailedReport = () => {
    navigate('/financial-reports');
  };

  const completedDocs = documents?.filter(doc => doc?.status === 'completed')?.length;
  const totalDocs = documents?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Document Upload
                </h1>
                <p className="text-muted-foreground">
                  Upload your financial documents for AI-powered tax optimization and credit analysis
                </p>
              </div>
              
              {totalDocs > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {completedDocs}/{totalDocs}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Documents Processed
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <UploadZone 
                onFilesSelected={handleFilesSelected}
                isUploading={isUploading}
              />
            </div>
            
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2" />
                  Quick Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Documents</span>
                    <span className="text-lg font-semibold text-foreground">{totalDocs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processed</span>
                    <span className="text-lg font-semibold text-success">{completedDocs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing</span>
                    <span className="text-lg font-semibold text-warning">
                      {documents?.filter(doc => doc?.status === 'processing')?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Failed</span>
                    <span className="text-lg font-semibold text-error">
                      {documents?.filter(doc => doc?.status === 'error')?.length}
                    </span>
                  </div>
                </div>

                {completedDocs > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      onClick={() => navigate('/tax-calculator')}
                      iconName="Calculator"
                      iconPosition="left"
                    >
                      Calculate Tax Savings
                    </Button>
                  </div>
                )}
              </div>

              {/* Security Notice need to fix here  */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Shield" size={20} className="mr-2 text-success" />
                  Security & Privacy
                </h3>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Lock" size={16} className="text-success" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Database" size={16} className="text-success" />
                    <span>Secure cloud storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Eye" size={16} className="text-success" />
                    <span>No human access to data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Trash2" size={16} className="text-success" />
                    <span>Auto-delete after 90 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadingFiles?.length > 0 && (
            <div className="mb-8">
              <UploadProgress files={uploadingFiles} />
            </div>
          )}

          {/* AI Insights */}
          {showInsights && aiInsights && (
            <div className="mb-8">
              <AIInsights 
                insights={aiInsights}
                onViewDetails={handleViewDetailedReport}
              />
            </div>
          )}

          {/* Document Table */}
          <DocumentTable 
            documents={documents}
            onDelete={handleDeleteDocument}
            onReprocess={handleReprocessDocument}
          />

          {/* Empty State Actions */}
          {totalDocs === 0 && (
            <div className="text-center mt-12">
              <div className="bg-card rounded-lg border border-border p-8 max-w-md mx-auto">
                <Icon name="Upload" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Get Started with TaxWise
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first document to unlock AI-powered tax optimization and credit insights
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    iconName="LayoutDashboard"
                    iconPosition="left"
                  >
                    View Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DocumentUpload;


// done - Norvin