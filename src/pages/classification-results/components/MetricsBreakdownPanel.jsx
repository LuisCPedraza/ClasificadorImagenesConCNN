import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const MetricsBreakdownPanel = ({ 
  processingMetrics, 
  modelStats, 
  categoryBreakdown 
}) => {
  const [activeTab, setActiveTab] = useState('processing');

  const tabs = [
    { id: 'processing', label: 'Procesamiento', icon: 'Clock' },
    { id: 'model', label: 'Modelo', icon: 'Brain' },
    { id: 'categories', label: 'Categorías', icon: 'Grid3X3' }
  ];

  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000)?.toFixed(2)}s`;
  };

  const renderProcessingTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Upload" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-text-primary">Tiempo de Carga</span>
          </div>
          <span className="text-lg font-semibold text-text-primary">
            {formatDuration(processingMetrics?.uploadTime)}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Cpu" size={16} className="text-secondary mr-2" />
            <span className="text-sm font-medium text-text-primary">Procesamiento IA</span>
          </div>
          <span className="text-lg font-semibold text-text-primary">
            {formatDuration(processingMetrics?.inferenceTime)}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Zap" size={16} className="text-accent mr-2" />
            <span className="text-sm font-medium text-text-primary">Tiempo Total</span>
          </div>
          <span className="text-lg font-semibold text-text-primary">
            {formatDuration(processingMetrics?.totalTime)}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Layers" size={16} className="text-warning mr-2" />
            <span className="text-sm font-medium text-text-primary">Capas Procesadas</span>
          </div>
          <span className="text-lg font-semibold text-text-primary">
            {processingMetrics?.layersProcessed}
          </span>
        </div>
      </div>
    </div>
  );

  const renderModelTab = () => (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Información del Modelo</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Nombre:</span>
            <span className="text-text-primary font-medium">{modelStats?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Versión:</span>
            <span className="text-text-primary font-medium">{modelStats?.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Precisión General:</span>
            <span className="text-success font-medium">{modelStats?.accuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Entrenado en:</span>
            <span className="text-text-primary font-medium">{modelStats?.trainingDataset}</span>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Métricas de Rendimiento</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Precisión</span>
              <span className="text-text-primary font-medium">{modelStats?.precision}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-success rounded-full transition-all duration-500"
                style={{ width: `${modelStats?.precision}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Recall</span>
              <span className="text-text-primary font-medium">{modelStats?.recall}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${modelStats?.recall}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">F1-Score</span>
              <span className="text-text-primary font-medium">{modelStats?.f1Score}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${modelStats?.f1Score}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoriesTab = () => (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Distribución de Confianza por Categoría
        </h4>
        <div className="space-y-3">
          {categoryBreakdown?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: category?.color }}
                />
                <span className="text-sm text-text-primary">{category?.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-border rounded-full h-2 mr-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${category?.confidence}%`,
                      backgroundColor: category?.color 
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary w-12 text-right">
                  {category?.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Estadísticas de Categorías</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Total de categorías:</span>
            <div className="text-lg font-semibold text-text-primary">{categoryBreakdown?.length}</div>
          </div>
          <div>
            <span className="text-text-secondary">Confianza promedio:</span>
            <div className="text-lg font-semibold text-text-primary">
              {Math.round(categoryBreakdown?.reduce((acc, cat) => acc + cat?.confidence, 0) / categoryBreakdown?.length)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden elevation-2">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Icon name="BarChart3" size={20} className="text-primary mr-2" />
          <h3 className="text-lg font-medium text-text-primary">Métricas Detalladas</h3>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center px-4 py-3 text-sm font-medium transition-all duration-150 btn-scale
                ${activeTab === tab?.id
                  ? 'border-b-2 border-primary text-primary bg-primary bg-opacity-5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'processing' && renderProcessingTab()}
        {activeTab === 'model' && renderModelTab()}
        {activeTab === 'categories' && renderCategoriesTab()}
      </div>
    </div>
  );
};

export default MetricsBreakdownPanel;
