import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const LanguageLocalizationSection = ({ localizationSettings, onUpdateSettings }) => {
  const [formData, setFormData] = useState({
    language: localizationSettings?.language || 'es',
    region: localizationSettings?.region || 'ES',
    dateFormat: localizationSettings?.dateFormat || 'dd/mm/yyyy',
    timeFormat: localizationSettings?.timeFormat || '24h',
    numberFormat: localizationSettings?.numberFormat || 'european',
    currency: localizationSettings?.currency || 'EUR',
    timezone: localizationSettings?.timezone || 'Europe/Madrid',
    autoDetectLocation: localizationSettings?.autoDetectLocation || false,
    rtlSupport: localizationSettings?.rtlSupport || false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('app-language') || 'es';
    setCurrentLanguage(savedLanguage);
    setFormData(prev => ({ ...prev, language: savedLanguage }));
  }, []);

  const languageOptions = [
    { 
      value: 'es', 
      label: 'Español', 
      description: 'Idioma principal de la aplicación' 
    },
    { 
      value: 'en', 
      label: 'English', 
      description: 'English language interface' 
    },
    { 
      value: 'fr', 
      label: 'Français', 
      description: 'Interface en français' 
    },
    { 
      value: 'de', 
      label: 'Deutsch', 
      description: 'Deutsche Benutzeroberfläche' 
    },
    { 
      value: 'it', 
      label: 'Italiano', 
      description: 'Interfaccia in italiano' 
    }
  ];

  const regionOptions = {
    es: [
      { value: 'ES', label: 'España' },
      { value: 'MX', label: 'México' },
      { value: 'AR', label: 'Argentina' },
      { value: 'CO', label: 'Colombia' },
      { value: 'CL', label: 'Chile' }
    ],
    en: [
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'CA', label: 'Canada' },
      { value: 'AU', label: 'Australia' }
    ],
    fr: [
      { value: 'FR', label: 'France' },
      { value: 'CA', label: 'Canada (Français)' },
      { value: 'BE', label: 'Belgique' }
    ],
    de: [
      { value: 'DE', label: 'Deutschland' },
      { value: 'AT', label: 'Österreich' },
      { value: 'CH', label: 'Schweiz' }
    ],
    it: [
      { value: 'IT', label: 'Italia' },
      { value: 'CH', label: 'Svizzera' }
    ]
  };

  const dateFormatOptions = [
    { value: 'dd/mm/yyyy', label: 'DD/MM/AAAA (31/12/2024)' },
    { value: 'mm/dd/yyyy', label: 'MM/DD/AAAA (12/31/2024)' },
    { value: 'yyyy-mm-dd', label: 'AAAA-MM-DD (2024-12-31)' },
    { value: 'dd-mm-yyyy', label: 'DD-MM-AAAA (31-12-2024)' }
  ];

  const timeFormatOptions = [
    { value: '24h', label: '24 horas (14:30)' },
    { value: '12h', label: '12 horas (2:30 PM)' }
  ];

  const numberFormatOptions = [
    { value: 'european', label: 'Europeo (1.234,56)', description: 'Punto para miles, coma para decimales' },
    { value: 'american', label: 'Americano (1,234.56)', description: 'Coma para miles, punto para decimales' },
    { value: 'space', label: 'Espacios (1 234,56)', description: 'Espacios para miles, coma para decimales' }
  ];

  const currencyOptions = [
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'USD', label: 'Dólar Americano ($)' },
    { value: 'GBP', label: 'Libra Esterlina (£)' },
    { value: 'MXN', label: 'Peso Mexicano ($)' },
    { value: 'ARS', label: 'Peso Argentino ($)' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)' },
    { value: 'America/Mexico_City', label: 'Ciudad de México (CST)' },
    { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART)' },
    { value: 'America/Bogota', label: 'Bogotá (COT)' },
    { value: 'America/Santiago', label: 'Santiago (CLT)' },
    { value: 'UTC', label: 'UTC (Tiempo Universal)' }
  ];

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update language immediately and save to localStorage
    if (field === 'language') {
      setCurrentLanguage(value);
      localStorage.setItem('app-language', value);
      
      // Reset region when language changes
      const defaultRegion = regionOptions?.[value]?.[0]?.value || 'ES';
      setFormData(prev => ({
        ...prev,
        region: defaultRegion
      }));
    }
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
      
      // Save to localStorage
      localStorage.setItem('app-language', formData?.language);
      localStorage.setItem('app-localization', JSON.stringify(formData));
      
      onUpdateSettings(formData);
    } catch (error) {
      console.error('Error saving localization settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPreviewText = () => {
    const now = new Date();
    const sampleNumber = 1234.56;
    
    const datePreview = formData?.dateFormat === 'dd/mm/yyyy' ? now?.toLocaleDateString('es-ES')
      : formData?.dateFormat === 'mm/dd/yyyy' ? now?.toLocaleDateString('en-US')
      : now?.toISOString()?.split('T')?.[0];
    
    const timePreview = formData?.timeFormat === '24h' ? now?.toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit' })
      : now?.toLocaleTimeString('es-ES', { hour12: true });
    
    const numberPreview = formData?.numberFormat === 'european' ? sampleNumber?.toLocaleString('es-ES')
      : formData?.numberFormat === 'american' ? sampleNumber?.toLocaleString('en-US')
      : sampleNumber?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')?.replace('.', ',');

    return {
      date: datePreview,
      time: timePreview,
      number: numberPreview
    };
  };

  const preview = getPreviewText();

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="Globe" size={24} className="text-primary mr-3" />
        <h3 className="text-lg font-semibold text-text-primary">
          Idioma y Localización
        </h3>
      </div>
      <div className="space-y-6">
        {/* Language Selection */}
        <div>
          <Select
            label="Idioma de la Interfaz"
            description="Selecciona el idioma principal de la aplicación"
            options={languageOptions}
            value={formData?.language}
            onChange={(value) => handleSelectChange('language', value)}
          />
        </div>

        {/* Region Selection */}
        <div>
          <Select
            label="Región"
            description="Configuración regional específica"
            options={regionOptions?.[formData?.language] || regionOptions?.es}
            value={formData?.region}
            onChange={(value) => handleSelectChange('region', value)}
          />
        </div>

        {/* Format Settings */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Formatos de Visualización
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Formato de Fecha"
              options={dateFormatOptions}
              value={formData?.dateFormat}
              onChange={(value) => handleSelectChange('dateFormat', value)}
            />

            <Select
              label="Formato de Hora"
              options={timeFormatOptions}
              value={formData?.timeFormat}
              onChange={(value) => handleSelectChange('timeFormat', value)}
            />
          </div>

          <div className="mt-4">
            <Select
              label="Formato de Números"
              description="Separadores para miles y decimales"
              options={numberFormatOptions}
              value={formData?.numberFormat}
              onChange={(value) => handleSelectChange('numberFormat', value)}
            />
          </div>
        </div>

        {/* Currency and Timezone */}
        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Moneda"
              description="Moneda para valores monetarios"
              options={currencyOptions}
              value={formData?.currency}
              onChange={(value) => handleSelectChange('currency', value)}
            />

            <Select
              label="Zona Horaria"
              description="Zona horaria para fechas y horas"
              options={timezoneOptions}
              value={formData?.timezone}
              onChange={(value) => handleSelectChange('timezone', value)}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Vista Previa de Formatos
          </h4>
          
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Fecha:</span>
              <span className="text-sm font-medium text-text-primary">{preview?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Hora:</span>
              <span className="text-sm font-medium text-text-primary">{preview?.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Número:</span>
              <span className="text-sm font-medium text-text-primary">{preview?.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Moneda:</span>
              <span className="text-sm font-medium text-text-primary">
                {formData?.currency === 'EUR' ? '€' : '$'}1.234,56
              </span>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-text-primary mb-4">
            Opciones Avanzadas
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Detección Automática de Ubicación"
              description="Ajustar zona horaria y región automáticamente"
              checked={formData?.autoDetectLocation}
              onChange={(e) => handleCheckboxChange('autoDetectLocation', e?.target?.checked)}
            />

            <Checkbox
              label="Soporte RTL"
              description="Habilitar soporte para idiomas de derecha a izquierda"
              checked={formData?.rtlSupport}
              onChange={(e) => handleCheckboxChange('rtlSupport', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Aplicar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageLocalizationSection;
