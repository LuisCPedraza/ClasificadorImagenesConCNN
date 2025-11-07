import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbContextHelper from '../../components/ui/BreadcrumbContextHelper';
import UploadProgressIndicator from '../../components/ui/UploadProgressIndicator';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import ImageUploadZone from './components/ImageUploadZone';
import CategorySelector from './components/CategorySelector';
import ProcessingControls from './components/ProcessingControls';
import RecentClassifications from './components/RecentClassifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ImageUploadDashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingOptions, setProcessingOptions] = useState({
    batchProcessing: true,
    highAccuracy: false,
    saveToHistory: true,
    generateReport: false,
    compressImages: true
  });
  const [uploadProgress, setUploadProgress] = useState({
    isVisible: false,
    progress: 0,
    stage: 'uploading',
    fileName: ''
  });

  // Simulate processing workflow
  const simulateProcessing = async (files) => {
    const stages = ['uploading', 'processing', 'analyzing', 'complete'];
    const fileName = files?.length === 1 ? files?.[0]?.name : `${files?.length} archivos`;
    
    setUploadProgress({
      isVisible: true,
      progress: 0,
      stage: 'uploading',
      fileName
    });

    for (let i = 0; i < stages?.length; i++) {
      const stage = stages?.[i];
      const duration = stage === 'processing' ? 3000 : 1500;
      const steps = 20;
      
      for (let step = 0; step <= steps; step++) {
        const progress = ((i * steps + step) / (stages?.length * steps)) * 100;
        
        setUploadProgress(prev => ({
          ...prev,
          progress,
          stage
        }));
        
        await new Promise(resolve => setTimeout(resolve, duration / steps));
      }
    }

    // Hold complete state for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploadProgress(prev => ({ ...prev, isVisible: false }));
    setIsProcessing(false);
    
    // Navigate to results
    navigate('/classification-results');
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProcessingOptionsChange = (options) => {
    setProcessingOptions(options);
  };

  const handleStartClassification = async () => {
    if (selectedFiles?.length === 0 || !selectedCategory) return;
    
    setIsProcessing(true);
    await simulateProcessing(selectedFiles);
  };

  const handleClearSelection = () => {
    setSelectedFiles([]);
    setSelectedCategory('');
    setProcessingOptions({
      batchProcessing: true,
      highAccuracy: false,
      saveToHistory: true,
      generateReport: false,
      compressImages: true
    });
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setUploadProgress(prev => ({ ...prev, isVisible: false }));
  };

  // Welcome message for new users
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check if user has seen welcome message
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbContextHelper currentStep={1} />

          {/* Welcome Message */}
          {showWelcome && (
            <div className="mb-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-2">
                      ¡Bienvenido a ImageClassifier!
                    </h2>
                    <p className="text-text-secondary mb-4">
                      Utiliza inteligencia artificial avanzada para clasificar tus imágenes automáticamente. 
                      Sube una o múltiples imágenes, selecciona una categoría y obtén resultados precisos en segundos.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        ✨ Clasificación instantánea
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        🎯 Alta precisión
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        📊 Análisis detallado
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={dismissWelcome}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Upload Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Page Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Clasificación de Imágenes con IA
                </h1>
                <p className="text-lg text-text-secondary">
                  Sube tus imágenes y obtén clasificaciones precisas utilizando redes neuronales convolucionales
                </p>
              </div>

              {/* Upload Zone */}
              <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
                <ImageUploadZone
                  onFilesSelected={handleFilesSelected}
                  selectedFiles={selectedFiles}
                  isProcessing={isProcessing}
                />
              </div>

              {/* Category Selection */}
              {selectedFiles?.length > 0 && (
                <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    disabled={isProcessing}
                  />
                </div>
              )}

              {/* Processing Controls */}
              {selectedFiles?.length > 0 && selectedCategory && (
                <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
                  <ProcessingControls
                    selectedFiles={selectedFiles}
                    selectedCategory={selectedCategory}
                    onStartClassification={handleStartClassification}
                    onClearSelection={handleClearSelection}
                    isProcessing={isProcessing}
                    processingOptions={processingOptions}
                    onProcessingOptionsChange={handleProcessingOptionsChange}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Estadísticas Rápidas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Images" size={16} className="text-primary" />
                      <span className="text-sm text-text-secondary">Imágenes procesadas hoy</span>
                    </div>
                    <span className="font-semibold text-text-primary">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary">Precisión promedio</span>
                    </div>
                    <span className="font-semibold text-success">94.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-accent" />
                      <span className="text-sm text-text-secondary">Tiempo promedio</span>
                    </div>
                    <span className="font-semibold text-text-primary">4.2s</span>
                  </div>
                </div>
              </div>

              {/* Recent Classifications */}
              <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
                <RecentClassifications maxItems={4} />
              </div>

              {/* Help & Tips */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                  <Icon name="HelpCircle" size={18} className="mr-2 text-accent" />
                  Consejos Útiles
                </h4>
                <ul className="text-sm text-text-secondary space-y-2">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Usa imágenes con buena iluminación</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Asegúrate de que el objeto sea visible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Evita imágenes borrosas o pixeladas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Selecciona la categoría más específica</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Upload Progress Modal */}
      <UploadProgressIndicator
        isVisible={uploadProgress?.isVisible}
        progress={uploadProgress?.progress}
        stage={uploadProgress?.stage}
        fileName={uploadProgress?.fileName}
        onCancel={handleCancelProcessing}
      />
      {/* Floating Action Button */}
      <QuickActionFloatingButton />
    </div>
  );
};

export default ImageUploadDashboard;
