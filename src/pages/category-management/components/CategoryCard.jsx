import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onToggleStatus 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    onEdit(category);
    setShowActions(false);
  };

  const handleDuplicate = () => {
    onDuplicate(category);
    setShowActions(false);
  };

  const handleDelete = () => {
    onDelete(category);
    setShowActions(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'training': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'inactive': return 'Pause';
      case 'training': return 'Clock';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-text-primary mr-3">
              {category?.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category?.status)}`}>
              <Icon name={getStatusIcon(category?.status)} size={12} className="mr-1" />
              {category?.status === 'active' ? 'Activo' : 
               category?.status === 'inactive' ? 'Inactivo' : 'Entrenando'}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            {category?.description}
          </p>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActions(!showActions)}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {showActions && (
            <div className="absolute right-0 top-8 bg-surface border border-border rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
              <button
                onClick={handleEdit}
                className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-150"
              >
                <Icon name="Edit" size={14} className="mr-2" />
                Editar
              </button>
              <button
                onClick={handleDuplicate}
                className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-150"
              >
                <Icon name="Copy" size={14} className="mr-2" />
                Duplicar
              </button>
              <button
                onClick={() => onToggleStatus(category)}
                className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-150"
              >
                <Icon name={category?.status === 'active' ? 'Pause' : 'Play'} size={14} className="mr-2" />
                {category?.status === 'active' ? 'Desactivar' : 'Activar'}
              </button>
              <hr className="my-1 border-border" />
              <button
                onClick={handleDelete}
                className="w-full flex items-center px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150"
              >
                <Icon name="Trash2" size={14} className="mr-2" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Sample Images */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Icon name="Image" size={16} className="mr-2 text-text-secondary" />
          <span className="text-sm font-medium text-text-secondary">
            Imágenes de muestra ({category?.sampleImages?.length})
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {category?.sampleImages?.slice(0, 4)?.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {category?.sampleImages?.length > 4 && (
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-text-secondary">
                +{category?.sampleImages?.length - 4}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">
            {category?.totalClassifications}
          </div>
          <div className="text-xs text-text-secondary">
            Clasificaciones
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">
            {category?.accuracy}%
          </div>
          <div className="text-xs text-text-secondary">
            Precisión
          </div>
        </div>
      </div>
      {/* Confidence Threshold */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Umbral de confianza
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {category?.confidenceThreshold}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${category?.confidenceThreshold}%` }}
          />
        </div>
      </div>
      {/* Last Updated */}
      <div className="flex items-center text-xs text-text-secondary">
        <Icon name="Clock" size={12} className="mr-1" />
        Actualizado: {category?.lastUpdated}
      </div>
    </div>
  );
};

export default CategoryCard;
