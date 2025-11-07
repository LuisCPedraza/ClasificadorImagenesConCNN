import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtonsPanel = ({ 
  onClassifyAnother, 
  onSaveResult, 
  onShareResult, 
  onViewHistory,
  onExportResult 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExportResult(format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveResult();
    } finally {
      setIsSaving(false);
    }
  };

  const exportFormats = [
    { id: 'json', label: 'JSON', icon: 'FileText' },
    { id: 'csv', label: 'CSV', icon: 'Table' },
    { id: 'pdf', label: 'PDF', icon: 'FileDown' },
    { id: 'png', label: 'Imagen', icon: 'Image' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden elevation-2">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Icon name="Zap" size={20} className="text-primary mr-2" />
          <h3 className="text-lg font-medium text-text-primary">Acciones Rápidas</h3>
        </div>
      </div>
      <div className="p-6">
        {/* Primary Actions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Acciones Principales</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              onClick={onClassifyAnother}
              fullWidth
              className="btn-scale"
            >
              Clasificar Otra Imagen
            </Button>
            
            <Button
              variant="outline"
              iconName="Clock"
              iconPosition="left"
              onClick={onViewHistory}
              fullWidth
              className="btn-scale"
            >
              Ver Historial
            </Button>
          </div>
        </div>

        {/* Save and Share */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Guardar y Compartir</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="secondary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
              loading={isSaving}
              fullWidth
              className="btn-scale"
            >
              Guardar Resultado
            </Button>
            
            <Button
              variant="outline"
              iconName="Share2"
              iconPosition="left"
              onClick={onShareResult}
              fullWidth
              className="btn-scale"
            >
              Compartir
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Exportar Como</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {exportFormats?.map((format) => (
              <Button
                key={format?.id}
                variant="ghost"
                size="sm"
                iconName={format?.icon}
                iconPosition="left"
                onClick={() => handleExport(format?.id)}
                loading={isExporting}
                fullWidth
                className="btn-scale text-xs"
              >
                {format?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="text-primary mr-2 mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="mb-1">
                <strong className="text-text-primary">Consejo:</strong> Los resultados se guardan automáticamente en tu historial.
              </p>
              <p>
                Puedes exportar los datos en diferentes formatos para análisis posterior o compartir con tu equipo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtonsPanel;
