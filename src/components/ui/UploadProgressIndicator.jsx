import React from 'react';
import Icon from '../AppIcon';

const UploadProgressIndicator = ({ 
  isVisible = false, 
  progress = 0, 
  stage = 'uploading', 
  fileName = '',
  onCancel 
}) => {
  const stages = {
    uploading: {
      label: 'Subiendo imagen...',
      icon: 'Upload',
      color: 'text-secondary'
    },
    processing: {
      label: 'Procesando con IA...',
      icon: 'Brain',
      color: 'text-primary'
    },
    analyzing: {
      label: 'Analizando resultados...',
      icon: 'Search',
      color: 'text-accent'
    },
    complete: {
      label: 'Clasificación completa',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    error: {
      label: 'Error en el procesamiento',
      icon: 'AlertCircle',
      color: 'text-error'
    }
  };

  const currentStage = stages?.[stage] || stages?.uploading;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg p-6 w-full max-w-md elevation-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`${currentStage?.color} mr-3`}>
              <Icon 
                name={currentStage?.icon} 
                size={24} 
                className={stage === 'processing' ? 'animate-spin' : ''} 
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-text-primary">
                {currentStage?.label}
              </h3>
              {fileName && (
                <p className="text-sm text-text-secondary truncate">
                  {fileName}
                </p>
              )}
            </div>
          </div>
          
          {onCancel && stage !== 'complete' && stage !== 'error' && (
            <button
              onClick={onCancel}
              className="text-text-secondary hover:text-text-primary transition-colors duration-150 btn-scale"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Progreso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                stage === 'error' ? 'bg-error' : 'bg-primary'
              } ${stage === 'processing' ? 'progress-pulse' : ''}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="flex justify-between items-center text-xs">
          {Object.entries(stages)?.slice(0, 4)?.map(([key, stageInfo], index) => {
            const isActive = key === stage;
            const isCompleted = ['uploading', 'processing', 'analyzing']?.indexOf(stage) > index;
            
            return (
              <div 
                key={key}
                className={`flex flex-col items-center ${
                  isActive ? currentStage?.color : 
                  isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-1 ${
                  isActive ? 'border-current bg-current bg-opacity-10' :
                  isCompleted ? 'border-success bg-success bg-opacity-10' : 'border-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={12} />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="text-center leading-tight">
                  {stageInfo?.label?.split(' ')?.[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons for Complete/Error States */}
        {(stage === 'complete' || stage === 'error') && (
          <div className="mt-6 flex justify-end space-x-3">
            {stage === 'error' && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 btn-scale"
              >
                Reintentar
              </button>
            )}
            <button
              onClick={onCancel}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 btn-scale ${
                stage === 'complete' 
                  ? 'bg-success text-success-foreground hover:bg-success/90' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {stage === 'complete' ? 'Ver Resultados' : 'Cerrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgressIndicator;
