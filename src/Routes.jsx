import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TaxCalculator from './pages/tax-calculator';
import FinancialReports from './pages/financial-reports';
import Dashboard from './pages/dashboard';
import DocumentUpload from './pages/document-upload';
import ProfileSettings from './pages/profile-settings';
import CreditScoreAnalysis from './pages/credit-score-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreditScoreAnalysis />} />
        <Route path="/tax-calculator" element={<TaxCalculator />} />
        <Route path="/financial-reports" element={<FinancialReports />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/credit-score-analysis" element={<CreditScoreAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
