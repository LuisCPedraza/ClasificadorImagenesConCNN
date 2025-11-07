import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadZone = ({ 
  onFilesSelected, 
  selectedFiles = [], 
  isProcessing = false,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);

  const validateFile = (file) => {
    const errors = [];
    
    if (!acceptedFormats?.includes(file?.type)) {
      errors?.push(`Formato no válido: ${file?.name}. Solo se permiten JPEG, PNG y WebP.`);
    }
    
    if (file?.size > maxFileSize) {
      errors?.push(`Archivo muy grande: ${file?.name}. Máximo 10MB permitido.`);
    }
    
    return errors;
  };

  const processFiles = (files) => {
    const fileArray = Array.from(files);
    const allErrors = [];
    const validFiles = [];

    fileArray?.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors?.length > 0) {
        allErrors?.push(...fileErrors);
      } else {
        validFiles?.push(file);
      }
    });

    setUploadErrors(allErrors);
    
    if (validFiles?.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      processFiles(files);
    }
  }, []);

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      processFiles(files);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles?.filter((_, i) => i !== index);
    onFilesSelected(updatedFiles);
  };

  const clearAllFiles = () => {
    onFilesSelected([]);
    setUploadErrors([]);
  };

  return (
    <div className="w-full">
      {/* Main Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ease-out
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept={acceptedFormats?.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          `}>
            <Icon 
              name={isDragOver ? 'Upload' : 'ImagePlus'} 
              size={32} 
              className={isDragOver ? 'animate-bounce' : ''} 
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {isDragOver ? '¡Suelta las imágenes aquí!' : 'Arrastra y suelta tus imágenes'}
            </h3>
            <p className="text-sm text-text-secondary">
              o <span className="text-primary font-medium">haz clic para seleccionar archivos</span>
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center">
              <Icon name="FileImage" size={14} className="mr-1" />
              <span>JPEG, PNG, WebP</span>
            </div>
            <div className="flex items-center">
              <Icon name="HardDrive" size={14} className="mr-1" />
              <span>Máximo 10MB</span>
            </div>
            <div className="flex items-center">
              <Icon name="Layers" size={14} className="mr-1" />
              <span>Múltiples archivos</span>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-surface/80 rounded-lg flex items-center justify-center">
            <div className="flex items-center space-x-2 text-primary">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="text-sm font-medium">Procesando...</span>
            </div>
          </div>
        )}
      </div>
      {/* Upload Errors */}
      {uploadErrors?.length > 0 && (
        <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-error mb-1">
                Errores de validación:
              </h4>
              <ul className="text-xs text-error/80 space-y-1">
                {uploadErrors?.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Selected Files Preview */}
      {selectedFiles?.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-text-primary">
              Archivos seleccionados ({selectedFiles?.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFiles}
              iconName="Trash2"
              iconPosition="left"
              disabled={isProcessing}
            >
              Limpiar todo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedFiles?.map((file, index) => (
              <div key={index} className="relative bg-surface border border-border rounded-lg p-3 elevation-1">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Vista previa de ${file?.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate" title={file?.name}>
                      {file?.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                    </p>
                    <div className="flex items-center mt-1">
                      <Icon name="CheckCircle" size={12} className="text-success mr-1" />
                      <span className="text-xs text-success">Válido</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      removeFile(index);
                    }}
                    className="text-text-secondary hover:text-error transition-colors duration-150 btn-scale"
                    disabled={isProcessing}
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Alternative Upload Methods */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-input')?.click()}
          iconName="FolderOpen"
          iconPosition="left"
          disabled={isProcessing}
          className="flex-1"
        >
          Explorar archivos
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            // Mock camera functionality
            console.log('Camera functionality would be implemented here');
          }}
          iconName="Camera"
          iconPosition="left"
          disabled={isProcessing}
          className="flex-1 sm:hidden"
        >
          Usar cámara
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadZone;
