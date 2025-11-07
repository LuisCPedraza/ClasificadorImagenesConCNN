import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ClassificationPreferencesSection = ({ preferences, onUpdatePreferences }) => {
  const [formData, setFormData] = useState({
    defaultCategory: preferences?.defaultCategory || 'animals',
    confidenceThreshold: preferences?.confidenceThreshold || 0.7,
    autoProcess: preferences?.autoProcess || false,
    showConfidenceScores: preferences?.showConfidenceScores || true,
    enableBatchProcessing: preferences?.enableBatchProcessing || false,
    maxBatchSize: preferences?.maxBatchSize || 10,
    resultDisplayFormat: preferences?.resultDisplayFormat || 'detailed',
    saveToHistory: preferences?.saveToHistory || true
  });
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
    { value: 'animals', label: 'Animales', description: 'Clasificación de especies animales' },
    { value: 'clothing', label: 'Ropa', description: 'Categorización de prendas de vestir' },
    { value: 'food', label: 'Comida', description: 'Identificación de alimentos' },
    { value: 'vehicles', label: 'Vehículos', description: 'Clasificación de medios de transporte' },
    { value: 'objects', label: 'Objetos', description: 'Identificación de objetos generales' }
  ];

  const confidenceOptions = [
    { value: 0.5, label: '50% - Baja confianza', description: 'Acepta resultados con menor certeza' },
    { value: 0.7, label: '70% - Confianza media', description: 'Balance entre precisión y cobertura' },
    { value: 0.8, label: '80% - Alta confianza', description: 'Solo resultados muy precisos' },
    { value: 0.9, label: '90% - Máxima confianza', description: 'Resultados extremadamente precisos' }
  ];

  const displayFormatOptions = [
    { value: 'simple', label: 'Simple', description: 'Solo la categoría principal' },
    { value: 'detailed', label: 'Detallado', description: 'Categoría con puntuación de confianza' },
    { value: 'comprehensive', label: 'Completo', description: 'Todas las categorías posibles' }
  ];

  const batchSizeOptions = [
    { value: 5, label: '5 imágenes' },
    { value: 10, label: '10 imágenes' },
    { value: 20, label: '20 imágenes' },
    { value: 50, label: '50 imágenes' }
  ];

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdatePreferences(formData);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      defaultCategory: 'animals',
      confidenceThreshold: 0.7,
      autoProcess: false,
      showConfidenceScores: true,
      enableBatchProcessing: false,
      maxBatchSize: 10,
      resultDisplayFormat: 'detailed',
      saveToHistory: true
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="Settings" size={24} className="text-primary mr-3" />
        <h3 className="text-lg font-semibold text-text-primary">
          Preferencias de Clasificación
        </h3>
      </div>
      <div className="space-y-6">
        {/* Default Category */}
        <div>
          <Select
            label="Categoría por Defecto"
            description="Tipo de clasificación que se seleccionará automáticamente"
            options={categoryOptions}
            value={formData?.defaultCategory}
            onChange={(value) => handleSelectChange('defaultCategory', value)}
          />
        </div>

        {/* Confidence Threshold */}
        <div>
          <Select
            label="Umbral de Confianza"
            description="Nivel mínimo de certeza requerido para mostrar resultados"
            options={confidenceOptions}
            value={formData?.confidenceThreshold}
            onChange={(value) => handleSelectChange('confidenceThreshold', value)}
          />
        </div>

        {/* Display Format */}
        <div>
          <Select
            label="Formato de Resultados"
            description="Cómo se mostrarán los resultados de clasificación"
            options={displayFormatOptions}
            value={formData?.resultDisplayFormat}
            onChange={(value) => handleSelectChange('resultDisplayFormat', value)}
          />
        </div>

        {/* Processing Options */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Opciones de Procesamiento
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Procesamiento Automático"
              description="Iniciar clasificación automáticamente al subir imagen"
              checked={formData?.autoProcess}
              onChange={(e) => handleCheckboxChange('autoProcess', e?.target?.checked)}
            />

            <Checkbox
              label="Mostrar Puntuaciones de Confianza"
              description="Incluir porcentajes de certeza en los resultados"
              checked={formData?.showConfidenceScores}
              onChange={(e) => handleCheckboxChange('showConfidenceScores', e?.target?.checked)}
            />

            <Checkbox
              label="Guardar en Historial"
              description="Almacenar automáticamente todas las clasificaciones"
              checked={formData?.saveToHistory}
              onChange={(e) => handleCheckboxChange('saveToHistory', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Batch Processing */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-medium text-text-primary">
                Procesamiento por Lotes
              </h4>
              <p className="text-sm text-text-secondary">
                Configuración para clasificar múltiples imágenes
              </p>
            </div>
            <Checkbox
              checked={formData?.enableBatchProcessing}
              onChange={(e) => handleCheckboxChange('enableBatchProcessing', e?.target?.checked)}
            />
          </div>

          {formData?.enableBatchProcessing && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <Select
                label="Tamaño Máximo de Lote"
                description="Número máximo de imágenes a procesar simultáneamente"
                options={batchSizeOptions}
                value={formData?.maxBatchSize}
                onChange={(value) => handleSelectChange('maxBatchSize', value)}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Restablecer
          </Button>

          <Button
            variant="default"
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Guardar Preferencias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPreferencesSection;
