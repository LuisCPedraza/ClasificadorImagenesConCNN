import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ClassificationResults from './pages/classification-results';
import ClassificationHistory from './pages/classification-history';
import CategoryManagement from './pages/category-management';
import ImageUploadDashboard from './pages/image-upload-dashboard';
import UserProfileSettings from './pages/user-profile-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ImageUploadDashboard />} />
        <Route path="/classification-results" element={<ClassificationResults />} />
        <Route path="/classification-history" element={<ClassificationHistory />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/image-upload-dashboard" element={<ImageUploadDashboard />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
