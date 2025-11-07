import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CategoryForm = ({ 
  category = null, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'custom',
    confidenceThreshold: 75,
    sampleImages: [],
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category?.name,
        description: category?.description,
        type: category?.type,
        confidenceThreshold: category?.confidenceThreshold,
        sampleImages: category?.sampleImages,
        status: category?.status
      });
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'custom',
        confidenceThreshold: 75,
        sampleImages: [],
        status: 'active'
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const categoryTypes = [
    { value: 'animals', label: 'Animales' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'food', label: 'Comida' },
    { value: 'vehicles', label: 'Vehículos' },
    { value: 'custom', label: 'Personalizada' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData?.name?.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (formData?.sampleImages?.length < 3) {
      newErrors.sampleImages = 'Se requieren al menos 3 imágenes de muestra';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      alt: `Imagen de muestra ${formData?.sampleImages?.length + index + 1} para categoría ${formData?.name}`,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      sampleImages: [...prev?.sampleImages, ...newImages]
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleImageUpload(e?.dataTransfer?.files);
    }
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      sampleImages: prev?.sampleImages?.filter(img => img?.id !== imageId)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto elevation-4">
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              {category ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">
              Información Básica
            </h3>
            
            <Input
              label="Nombre de la categoría"
              type="text"
              value={formData?.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e?.target?.value }))}
              error={errors?.name}
              placeholder="Ej: Animales domésticos"
              required
            />
            
            <Input
              label="Descripción"
              type="text"
              value={formData?.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
              error={errors?.description}
              placeholder="Describe qué tipo de imágenes clasificará esta categoría"
              required
            />
            
            <Select
              label="Tipo de categoría"
              options={categoryTypes}
              value={formData?.type}
              onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              placeholder="Selecciona el tipo"
            />
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">
              Configuración
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Umbral de confianza: {formData?.confidenceThreshold}%
              </label>
              <input
                type="range"
                min="50"
                max="95"
                value={formData?.confidenceThreshold}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  confidenceThreshold: parseInt(e?.target?.value) 
                }))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>50% (Menos estricto)</span>
                <span>95% (Más estricto)</span>
              </div>
            </div>
          </div>

          {/* Sample Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-text-primary">
                Imágenes de Muestra
              </h3>
              <span className="text-sm text-text-secondary">
                {formData?.sampleImages?.length} imágenes
              </span>
            </div>
            
            {errors?.sampleImages && (
              <p className="text-sm text-destructive">{errors?.sampleImages}</p>
            )}
            
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={32} className="mx-auto mb-3 text-text-secondary" />
              <p className="text-sm text-text-primary mb-2">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-text-secondary mb-4">
                PNG, JPG, WebP hasta 10MB cada una
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e?.target?.files)}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Seleccionar Imágenes
              </Button>
            </div>
            
            {/* Image Grid */}
            {formData?.sampleImages?.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {formData?.sampleImages?.map((image) => (
                  <div key={image?.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={image?.url}
                        alt={image?.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(image?.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 btn-scale"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              {category ? 'Actualizar' : 'Crear'} Categoría
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
