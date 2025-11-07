import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ExportSettingsSection = ({ exportSettings, onUpdateSettings, onExportData }) => {
  const [formData, setFormData] = useState({
    defaultFormat: exportSettings?.defaultFormat || 'json',
    filenamePattern: exportSettings?.filenamePattern || 'clasificacion_{date}_{time}',
    includeImages: exportSettings?.includeImages || false,
    includeMetadata: exportSettings?.includeMetadata || true,
    autoExportThreshold: exportSettings?.autoExportThreshold || 0,
    compressionLevel: exportSettings?.compressionLevel || 'medium',
    dateFormat: exportSettings?.dateFormat || 'dd/mm/yyyy'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);

  const formatOptions = [
    { 
      value: 'json', 
      label: 'JSON', 
      description: 'Formato estructurado para desarrollo' 
    },
    { 
      value: 'csv', 
      label: 'CSV', 
      description: 'Compatible con Excel y hojas de cálculo' 
    },
    { 
      value: 'pdf', 
      label: 'PDF', 
      description: 'Documento formateado para impresión' 
    },
    { 
      value: 'xml', 
      label: 'XML', 
      description: 'Formato estándar para intercambio de datos' 
    }
  ];

  const compressionOptions = [
    { value: 'none', label: 'Sin compresión', description: 'Archivos originales' },
    { value: 'low', label: 'Compresión baja', description: 'Calidad alta, archivos grandes' },
    { value: 'medium', label: 'Compresión media', description: 'Balance calidad-tamaño' },
    { value: 'high', label: 'Compresión alta', description: 'Archivos pequeños, calidad reducida' }
  ];

  const dateFormatOptions = [
    { value: 'dd/mm/yyyy', label: 'DD/MM/AAAA (Español)' },
    { value: 'mm/dd/yyyy', label: 'MM/DD/AAAA (Americano)' },
    { value: 'yyyy-mm-dd', label: 'AAAA-MM-DD (ISO)' },
    { value: 'dd-mm-yyyy', label: 'DD-MM-AAAA (Guiones)' }
  ];

  const thresholdOptions = [
    { value: 0, label: 'Deshabilitado', description: 'No exportar automáticamente' },
    { value: 10, label: '10 clasificaciones', description: 'Exportar cada 10 resultados' },
    { value: 25, label: '25 clasificaciones', description: 'Exportar cada 25 resultados' },
    { value: 50, label: '50 clasificaciones', description: 'Exportar cada 50 resultados' },
    { value: 100, label: '100 clasificaciones', description: 'Exportar cada 100 resultados' }
  ];

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (field, value) => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateSettings(formData);
    } catch (error) {
      console.error('Error saving export settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (exportType) => {
    setExportProgress({ type: exportType, progress: 0 });
    
    try {
      // Simulate export progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setExportProgress({ type: exportType, progress: i });
      }
      
      onExportData(exportType, formData);
      setExportProgress(null);
    } catch (error) {
      console.error('Export error:', error);
      setExportProgress(null);
    }
  };

  const generatePreviewFilename = () => {
    const now = new Date();
    const dateStr = formData?.dateFormat === 'dd/mm/yyyy' 
      ? `${now?.getDate()?.toString()?.padStart(2, '0')}-${(now?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${now?.getFullYear()}`
      : formData?.dateFormat === 'mm/dd/yyyy'
      ? `${(now?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${now?.getDate()?.toString()?.padStart(2, '0')}-${now?.getFullYear()}`
      : `${now?.getFullYear()}-${(now?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${now?.getDate()?.toString()?.padStart(2, '0')}`;
    
    const timeStr = `${now?.getHours()?.toString()?.padStart(2, '0')}-${now?.getMinutes()?.toString()?.padStart(2, '0')}`;
    
    return formData?.filenamePattern?.replace('{date}', dateStr)?.replace('{time}', timeStr) + `.${formData?.defaultFormat}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="Download" size={24} className="text-primary mr-3" />
        <h3 className="text-lg font-semibold text-text-primary">
          Configuración de Exportación
        </h3>
      </div>
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <Select
            label="Formato por Defecto"
            description="Formato de archivo para exportaciones"
            options={formatOptions}
            value={formData?.defaultFormat}
            onChange={(value) => handleSelectChange('defaultFormat', value)}
          />
        </div>

        {/* Filename Pattern */}
        <div>
          <Input
            label="Patrón de Nombre de Archivo"
            type="text"
            placeholder="clasificacion_{date}_{time}"
            value={formData?.filenamePattern}
            onChange={(e) => handleInputChange('filenamePattern', e?.target?.value)}
            description="Usa {date} y {time} como marcadores de posición"
          />
          <div className="mt-2 p-2 bg-muted rounded text-sm text-text-secondary">
            <strong>Vista previa:</strong> {generatePreviewFilename()}
          </div>
        </div>

        {/* Date Format */}
        <div>
          <Select
            label="Formato de Fecha"
            description="Formato para fechas en nombres de archivo y exportaciones"
            options={dateFormatOptions}
            value={formData?.dateFormat}
            onChange={(value) => handleSelectChange('dateFormat', value)}
          />
        </div>

        {/* Export Options */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Opciones de Contenido
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Incluir Imágenes"
              description="Adjuntar imágenes originales en la exportación"
              checked={formData?.includeImages}
              onChange={(e) => handleCheckboxChange('includeImages', e?.target?.checked)}
            />

            <Checkbox
              label="Incluir Metadatos"
              description="Agregar información técnica y timestamps"
              checked={formData?.includeMetadata}
              onChange={(e) => handleCheckboxChange('includeMetadata', e?.target?.checked)}
            />
          </div>

          {formData?.includeImages && (
            <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
              <Select
                label="Nivel de Compresión"
                description="Calidad de las imágenes incluidas"
                options={compressionOptions}
                value={formData?.compressionLevel}
                onChange={(value) => handleSelectChange('compressionLevel', value)}
              />
            </div>
          )}
        </div>

        {/* Auto Export */}
        <div className="border-t border-border pt-6">
          <Select
            label="Exportación Automática"
            description="Exportar automáticamente después de cierto número de clasificaciones"
            options={thresholdOptions}
            value={formData?.autoExportThreshold}
            onChange={(value) => handleSelectChange('autoExportThreshold', value)}
          />
        </div>

        {/* Export Actions */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Exportar Datos Actuales
          </h4>
          
          {exportProgress && (
            <div className="mb-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">
                  Exportando {exportProgress?.type}...
                </span>
                <span className="text-sm text-text-secondary">
                  {exportProgress?.progress}%
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="h-2 bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress?.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('historial')}
              iconName="Clock"
              iconPosition="left"
              disabled={!!exportProgress}
              fullWidth
            >
              Historial
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('configuracion')}
              iconName="Settings"
              iconPosition="left"
              disabled={!!exportProgress}
              fullWidth
            >
              Configuración
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('estadisticas')}
              iconName="BarChart3"
              iconPosition="left"
              disabled={!!exportProgress}
              fullWidth
            >
              Estadísticas
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleExport('completo')}
              iconName="Download"
              iconPosition="left"
              disabled={!!exportProgress}
              fullWidth
            >
              Todo
            </Button>
          </div>
        </div>

        {/* Save Settings */}
        <div className="flex justify-end pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSettingsSection;
