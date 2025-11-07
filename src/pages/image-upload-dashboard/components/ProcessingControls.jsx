import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProcessingControls = ({ 
  selectedFiles = [], 
  selectedCategory = '', 
  onStartClassification, 
  onClearSelection,
  isProcessing = false,
  processingOptions = {},
  onProcessingOptionsChange
}) => {
  const defaultOptions = {
    batchProcessing: true,
    highAccuracy: false,
    saveToHistory: true,
    generateReport: false,
    compressImages: true
  };

  const options = { ...defaultOptions, ...processingOptions };

  const canStartProcessing = selectedFiles?.length > 0 && selectedCategory && !isProcessing;

  const handleOptionChange = (optionKey, value) => {
    onProcessingOptionsChange({
      ...options,
      [optionKey]: value
    });
  };

  const getProcessingTime = () => {
    const baseTime = selectedFiles?.length * (options?.highAccuracy ? 8 : 3);
    const batchBonus = options?.batchProcessing && selectedFiles?.length > 1 ? 0.7 : 1;
    return Math.ceil(baseTime * batchBonus);
  };

  const getEstimatedCost = () => {
    // Mock cost calculation
    const baseCost = selectedFiles?.length * 0.02;
    const accuracyMultiplier = options?.highAccuracy ? 1.5 : 1;
    return (baseCost * accuracyMultiplier)?.toFixed(2);
  };

  return (
    <div className="w-full space-y-6">
      {/* Processing Summary */}
      <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Resumen de Procesamiento
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Images" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Imágenes</p>
              <p className="font-semibold text-text-primary">{selectedFiles?.length}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Tiempo estimado</p>
              <p className="font-semibold text-text-primary">{getProcessingTime()}s</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Costo estimado</p>
              <p className="font-semibold text-text-primary">${getEstimatedCost()}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Processing Options */}
      <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
        <h4 className="font-medium text-text-primary mb-4">
          Opciones de Procesamiento
        </h4>
        
        <div className="space-y-4">
          <Checkbox
            label="Procesamiento por lotes"
            description="Procesa múltiples imágenes simultáneamente para mayor eficiencia"
            checked={options?.batchProcessing}
            onChange={(e) => handleOptionChange('batchProcessing', e?.target?.checked)}
            disabled={selectedFiles?.length <= 1 || isProcessing}
          />

          <Checkbox
            label="Alta precisión"
            description="Utiliza modelos más avanzados para mayor exactitud (tiempo adicional)"
            checked={options?.highAccuracy}
            onChange={(e) => handleOptionChange('highAccuracy', e?.target?.checked)}
            disabled={isProcessing}
          />

          <Checkbox
            label="Guardar en historial"
            description="Almacena los resultados para consulta posterior"
            checked={options?.saveToHistory}
            onChange={(e) => handleOptionChange('saveToHistory', e?.target?.checked)}
            disabled={isProcessing}
          />

          <Checkbox
            label="Generar reporte detallado"
            description="Crea un informe completo con métricas y análisis"
            checked={options?.generateReport}
            onChange={(e) => handleOptionChange('generateReport', e?.target?.checked)}
            disabled={isProcessing}
          />

          <Checkbox
            label="Comprimir imágenes"
            description="Optimiza el tamaño de las imágenes para procesamiento más rápido"
            checked={options?.compressImages}
            onChange={(e) => handleOptionChange('compressImages', e?.target?.checked)}
            disabled={isProcessing}
          />
        </div>
      </div>
      {/* Queue Management */}
      {selectedFiles?.length > 1 && options?.batchProcessing && (
        <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
          <h4 className="font-medium text-text-primary mb-3">
            Gestión de Cola de Procesamiento
          </h4>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-text-secondary">
              <Icon name="List" size={16} className="mr-2" />
              <span>Orden de procesamiento: Secuencial</span>
            </div>
            <div className="flex items-center text-primary">
              <Icon name="Zap" size={16} className="mr-1" />
              <span>Paralelización: {Math.min(selectedFiles?.length, 4)} hilos</span>
            </div>
          </div>
          
          <div className="mt-3 w-full bg-muted rounded-full h-2">
            <div className="h-2 bg-primary rounded-full w-0 transition-all duration-300" />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={onStartClassification}
          disabled={!canStartProcessing}
          loading={isProcessing}
          iconName="Brain"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          {isProcessing ? 'Clasificando...' : 'Iniciar Clasificación'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onClearSelection}
          disabled={isProcessing || selectedFiles?.length === 0}
          iconName="Trash2"
          iconPosition="left"
          className="sm:w-auto"
        >
          Limpiar Selección
        </Button>
      </div>
      {/* Processing Warnings */}
      {!canStartProcessing && selectedFiles?.length > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-warning mb-1">
                Acción requerida
              </h5>
              <p className="text-xs text-warning/80">
                {!selectedCategory 
                  ? 'Selecciona una categoría de clasificación antes de continuar.'
                  : 'Verifica que todos los archivos sean válidos y que hayas seleccionado una categoría.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Processing Tips */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          Consejos para mejores resultados
        </h5>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>• Utiliza imágenes con buena iluminación y enfoque nítido</li>
          <li>• Asegúrate de que el objeto principal sea claramente visible</li>
          <li>• Evita imágenes con múltiples objetos principales para mayor precisión</li>
          <li>• Las imágenes de alta resolución proporcionan mejores resultados</li>
        </ul>
      </div>
    </div>
  );
};

export default ProcessingControls;
