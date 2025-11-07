import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onBulkExport, 
  onBulkDelete,
  totalItems,
  isVisible = false 
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const selectedCount = selectedItems?.length;
  const isAllSelected = selectedCount === totalItems && totalItems > 0;
  const isPartialSelected = selectedCount > 0 && selectedCount < totalItems;

  const handleBulkDelete = () => {
    if (selectedCount === 0) return;
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    onBulkDelete(selectedItems);
    setShowConfirmDelete(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-primary text-primary-foreground rounded-lg p-4 elevation-2 animate-in slide-in-from-top-2 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Selection Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isPartialSelected;
                }}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    onSelectAll();
                  } else {
                    onDeselectAll();
                  }
                }}
                className="w-4 h-4 text-primary-foreground bg-transparent border-primary-foreground rounded focus:ring-primary-foreground focus:ring-2"
              />
            </div>

            {/* Selection Info */}
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} />
              <span className="font-medium">
                {selectedCount} elemento{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => onBulkExport(selectedItems)}
              className="text-primary-foreground hover:bg-primary-foreground/10 border-primary-foreground/20"
            >
              Exportar ({selectedCount})
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleBulkDelete}
              className="text-primary-foreground hover:bg-primary-foreground/10 border-primary-foreground/20"
            >
              Eliminar ({selectedCount})
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onDeselectAll}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex items-center space-x-4 text-sm">
          <button
            onClick={onSelectAll}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150"
          >
            Seleccionar todos ({totalItems})
          </button>
          <span className="text-primary-foreground/60">•</span>
          <button
            onClick={onDeselectAll}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150"
          >
            Deseleccionar todos
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md elevation-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center mr-3">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary">
                  Confirmar eliminación
                </h3>
                <p className="text-sm text-text-secondary">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>

            <p className="text-text-secondary mb-6">
              ¿Estás seguro de que quieres eliminar {selectedCount} clasificación{selectedCount !== 1 ? 'es' : ''}? 
              Esta acción eliminará permanentemente los registros seleccionados.
            </p>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                onClick={confirmDelete}
              >
                Eliminar {selectedCount} elemento{selectedCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;
