import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationDialog = ({ 
  isOpen, 
  category, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-300 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-md elevation-4">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mr-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Eliminar Categoría
              </h3>
              <p className="text-sm text-text-secondary">
                Esta acción no se puede deshacer
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-text-primary mb-3">
              ¿Estás seguro de que quieres eliminar la categoría{' '}
              <span className="font-semibold">"{category?.name}"</span>?
            </p>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center text-sm">
                <Icon name="BarChart3" size={16} className="mr-2 text-text-secondary" />
                <span className="text-text-secondary">Clasificaciones:</span>
                <span className="ml-auto font-medium text-text-primary">
                  {category?.totalClassifications}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Icon name="Image" size={16} className="mr-2 text-text-secondary" />
                <span className="text-text-secondary">Imágenes de muestra:</span>
                <span className="ml-auto font-medium text-text-primary">
                  {category?.sampleImages?.length || 0}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Icon name="Clock" size={16} className="mr-2 text-text-secondary" />
                <span className="text-text-secondary">Última actualización:</span>
                <span className="ml-auto font-medium text-text-primary">
                  {category?.lastUpdated}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start">
                <Icon name="AlertCircle" size={16} className="text-destructive mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="text-destructive font-medium mb-1">
                    Consecuencias de eliminar esta categoría:
                  </p>
                  <ul className="text-destructive/80 space-y-1">
                    <li>• Se perderán todas las clasificaciones asociadas</li>
                    <li>• Las imágenes de muestra se eliminarán permanentemente</li>
                    <li>• Los modelos entrenados con esta categoría quedarán obsoletos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => onConfirm(category)}
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Eliminar Categoría
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
