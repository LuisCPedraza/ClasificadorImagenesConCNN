import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryImportExport = ({ 
  categories, 
  onImport, 
  onExport,
  isVisible = false,
  onClose 
}) => {
  const [importFile, setImportFile] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('export');

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (importFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e?.target?.result);
          onImport(data);
          setImportFile(null);
          onClose();
        } catch (error) {
          alert('Error al importar el archivo. Verifica que sea un JSON válido.');
        }
      };
      reader?.readAsText(importFile);
    }
  };

  const handleExport = () => {
    const categoriesToExport = selectedCategories?.length > 0 
      ? categories?.filter(cat => selectedCategories?.includes(cat?.id))
      : categories;
    
    onExport(categoriesToExport, exportFormat);
    onClose();
  };

  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories(prev => 
      prev?.includes(categoryId)
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories?.map(cat => cat?.id));
  };

  const clearSelection = () => {
    setSelectedCategories([]);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden elevation-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            Importar/Exportar Categorías
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

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'export'
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Download" size={16} className="mr-2 inline" />
            Exportar
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'import' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Upload" size={16} className="mr-2 inline" />
            Importar
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Seleccionar Categorías
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllCategories}
                  >
                    Seleccionar Todas
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                  >
                    Limpiar Selección
                  </Button>
                  <span className="text-sm text-text-secondary">
                    {selectedCategories?.length} de {categories?.length} seleccionadas
                  </span>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto border border-border rounded-lg p-3">
                  {categories?.map((category) => (
                    <label
                      key={category?.id}
                      className="flex items-center p-2 rounded hover:bg-muted cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories?.includes(category?.id)}
                        onChange={() => toggleCategorySelection(category?.id)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-text-primary">
                          {category?.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {category?.totalClassifications} clasificaciones
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Formato de Exportación
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e?.target?.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-text-primary">JSON</div>
                      <div className="text-sm text-text-secondary">
                        Formato completo con toda la configuración
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e?.target?.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-text-primary">CSV</div>
                      <div className="text-sm text-text-secondary">
                        Solo información básica para análisis
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Seleccionar Archivo
                </h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Icon name="Upload" size={32} className="mx-auto mb-3 text-text-secondary" />
                  <p className="text-sm text-text-primary mb-2">
                    Selecciona un archivo JSON de categorías
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="import-file"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('import-file')?.click()}
                  >
                    Seleccionar Archivo
                  </Button>
                  {importFile && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center">
                        <Icon name="File" size={16} className="mr-2 text-text-secondary" />
                        <span className="text-sm text-text-primary">
                          {importFile?.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon name="AlertTriangle" size={20} className="text-warning mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">
                      Importante
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Las categorías importadas se añadirán a las existentes</li>
                      <li>• Si existe una categoría con el mismo nombre, se creará una nueva versión</li>
                      <li>• Las imágenes de muestra no se importarán, solo la configuración</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          {activeTab === 'export' ? (
            <Button
              onClick={handleExport}
              disabled={selectedCategories?.length === 0 && categories?.length > 0}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Exportar
            </Button>
          ) : (
            <Button
              onClick={handleImport}
              disabled={!importFile}
            >
              <Icon name="Upload" size={16} className="mr-2" />
              Importar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryImportExport;
