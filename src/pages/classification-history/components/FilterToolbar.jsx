import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  filters, 
  onFiltersChange, 
  totalCount, 
  filteredCount,
  onClearFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'animals', label: 'Animales' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'objects', label: 'Objetos' },
    { value: 'food', label: 'Comida' },
    { value: 'vehicles', label: 'Vehículos' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Más reciente primero' },
    { value: 'date-asc', label: 'Más antiguo primero' },
    { value: 'confidence-desc', label: 'Mayor confianza' },
    { value: 'confidence-asc', label: 'Menor confianza' },
    { value: 'filename-asc', label: 'Nombre A-Z' },
    { value: 'filename-desc', label: 'Nombre Z-A' }
  ];

  const confidenceOptions = [
    { value: 'all', label: 'Cualquier confianza' },
    { value: 'high', label: 'Alta (≥80%)' },
    { value: 'medium', label: 'Media (60-79%)' },
    { value: 'low', label: 'Baja (<60%)' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters?.search || 
           filters?.category !== 'all' || 
           filters?.confidence !== 'all' ||
           filters?.dateFrom || 
           filters?.dateTo;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search and Primary Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
          <div className="flex-1 max-w-xs">
            <Input
              type="search"
              placeholder="Buscar por nombre o categoría..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          <Select
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Categoría"
            className="w-full sm:w-48"
          />

          <Select
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            placeholder="Ordenar por"
            className="w-full sm:w-48"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Filtros avanzados
          </Button>

          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              type="date"
              label="Fecha desde"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />

            <Input
              type="date"
              label="Fecha hasta"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />

            <Select
              label="Nivel de confianza"
              options={confidenceOptions}
              value={filters?.confidence}
              onChange={(value) => handleFilterChange('confidence', value)}
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                className="w-full"
              >
                Exportar filtrados
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Results Summary */}
      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>
            Mostrando {filteredCount?.toLocaleString('es-ES')} de {totalCount?.toLocaleString('es-ES')} clasificaciones
          </span>
          {hasActiveFilters() && (
            <div className="flex items-center space-x-1">
              <Icon name="Filter" size={14} />
              <span>Filtros activos</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} />
          <span>Actualizado: {new Date()?.toLocaleTimeString('es-ES')}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
