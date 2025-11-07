import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsHeader = ({ 
  onClassifyAnother, 
  onExportResults, 
  processingTime = 0,
  modelAccuracy = 0 
}) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-2 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mr-4">
            <Icon name="CheckCircle" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-text-primary mb-1">
              Clasificación Completada
            </h1>
            <p className="text-text-secondary">
              Análisis procesado con IA en {processingTime}ms • Precisión del modelo: {modelAccuracy}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExportResults}
            className="btn-scale"
          >
            Exportar
          </Button>
          <Button
            variant="default"
            iconName="Upload"
            iconPosition="left"
            onClick={onClassifyAnother}
            className="btn-scale"
          >
            Clasificar Otra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
