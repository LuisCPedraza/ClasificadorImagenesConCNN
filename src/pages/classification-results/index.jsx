import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbContextHelper from '../../components/ui/BreadcrumbContextHelper';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import ResultsHeader from './components/ResultsHeader';
import ImageDisplayCard from './components/ImageDisplayCard';
import ClassificationResultCard from './components/ClassificationResultCard';
import MetricsBreakdownPanel from './components/MetricsBreakdownPanel';
import ActionButtonsPanel from './components/ActionButtonsPanel';

const ClassificationResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Mock classification results data
  const mockResults = {
    image: {
      url: "https://images.unsplash.com/photo-1731153227312-e5d227ab4f77",
      alt: "Golden retriever dog sitting in green grass field with tongue out looking happy",
      fileName: "golden_retriever_photo.jpg",
      fileSize: 2457600, // 2.4 MB
      dimensions: "1920x1080"
    },
    classification: {
      primary: {
        category: "Perro - Golden Retriever",
        confidence: 94.7,
        description: "La imagen muestra claramente un Golden Retriever adulto con características típicas de la raza: pelaje dorado, orejas caídas y expresión amigable."
      },
      alternatives: [
      { category: "Perro - Labrador", confidence: 78.3 },
      { category: "Perro - Cocker Spaniel", confidence: 45.2 },
      { category: "Animal Doméstico", confidence: 32.1 },
      { category: "Mamífero", confidence: 28.9 }]

    },
    processing: {
      uploadTime: 1247,
      inferenceTime: 3421,
      totalTime: 4668,
      layersProcessed: 152,
      timestamp: new Date('2025-11-07T14:20:52')
    },
    model: {
      name: "ImageNet-CNN-v3",
      version: "3.2.1",
      accuracy: 92.4,
      precision: 89.7,
      recall: 91.2,
      f1Score: 90.4,
      trainingDataset: "ImageNet + Custom Pet Dataset"
    },
    categories: [
    { name: "Perro - Golden Retriever", confidence: 94.7, color: "#10B981" },
    { name: "Perro - Labrador", confidence: 78.3, color: "#3B82F6" },
    { name: "Perro - Cocker Spaniel", confidence: 45.2, color: "#8B5CF6" },
    { name: "Animal Doméstico", confidence: 32.1, color: "#F59E0B" },
    { name: "Mamífero", confidence: 28.9, color: "#EF4444" },
    { name: "Otros", confidence: 15.6, color: "#6B7280" }]

  };

  useEffect(() => {
    // Simulate loading state if coming from upload
    if (location?.state?.fromUpload) {

      // Results are already loaded in this mock implementation
    }}, [location?.state]);

  const handleClassifyAnother = () => {
    navigate('/image-upload-dashboard');
  };

  const handleExportResults = (format = 'json') => {
    const exportData = {
      timestamp: mockResults?.processing?.timestamp?.toISOString(),
      image: {
        fileName: mockResults?.image?.fileName,
        dimensions: mockResults?.image?.dimensions,
        fileSize: mockResults?.image?.fileSize
      },
      classification: mockResults?.classification,
      processing: mockResults?.processing,
      model: mockResults?.model
    };

    const dataStr = format === 'json' ?
    JSON.stringify(exportData, null, 2) :
    `Archivo,Categoría,Confianza,Tiempo de Procesamiento\n${mockResults?.image?.fileName},${mockResults?.classification?.primary?.category},${mockResults?.classification?.primary?.confidence}%,${mockResults?.processing?.totalTime}ms`;

    const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clasificacion_resultado_${Date.now()}.${format}`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleFeedback = (type) => {
    console.log(`Feedback submitted: ${type}`);
    setFeedbackSubmitted(true);

    // Show success message
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 3000);
  };

  const handleSaveResult = async () => {
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Result saved to history');
  };

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Resultado de Clasificación - ImageClassifier',
        text: `Clasificación: ${mockResults?.classification?.primary?.category} (${mockResults?.classification?.primary?.confidence}% confianza)`,
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      console.log('Link copied to clipboard');
    }
  };

  const handleViewHistory = () => {
    navigate('/classification-history');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbContextHelper currentStep={2} />
          
          <ResultsHeader
            onClassifyAnother={handleClassifyAnother}
            onExportResults={() => handleExportResults('json')}
            processingTime={mockResults?.processing?.totalTime}
            modelAccuracy={mockResults?.model?.accuracy} />


          {/* Feedback Success Message */}
          {feedbackSubmitted &&
          <div className="mb-6 p-4 bg-success bg-opacity-10 border border-success rounded-lg">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center mr-3">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-success font-medium">¡Gracias por tu feedback! Nos ayuda a mejorar el modelo.</span>
              </div>
            </div>
          }

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Results */}
            <div className="lg:col-span-2 space-y-6">
              <ImageDisplayCard
                imageUrl={mockResults?.image?.url}
                imageAlt={mockResults?.image?.alt}
                fileName={mockResults?.image?.fileName}
                fileSize={mockResults?.image?.fileSize}
                dimensions={mockResults?.image?.dimensions}
                onImageClick={() => {}} />


              <ClassificationResultCard
                primaryResult={mockResults?.classification?.primary}
                alternativeResults={mockResults?.classification?.alternatives}
                onFeedback={handleFeedback} />


              <MetricsBreakdownPanel
                processingMetrics={mockResults?.processing}
                modelStats={mockResults?.model}
                categoryBreakdown={mockResults?.categories} />

            </div>

            {/* Right Column - Actions */}
            <div className="lg:col-span-1">
              <ActionButtonsPanel
                onClassifyAnother={handleClassifyAnother}
                onSaveResult={handleSaveResult}
                onShareResult={handleShareResult}
                onViewHistory={handleViewHistory}
                onExportResult={handleExportResults} />

            </div>
          </div>
        </div>
      </main>
      <QuickActionFloatingButton />
    </div>);

};

export default ClassificationResults;
