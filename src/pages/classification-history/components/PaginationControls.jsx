import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const itemsPerPageOptions = [
    { value: 10, label: '10 por página' },
    { value: 25, label: '25 por página' },
    { value: 50, label: '50 por página' },
    { value: 100, label: '100 por página' }
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Items Info */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            Mostrando {startItem?.toLocaleString('es-ES')} - {endItem?.toLocaleString('es-ES')} de {totalItems?.toLocaleString('es-ES')} resultados
          </span>
          
          <Select
            options={itemsPerPageOptions}
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="w-40"
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Anterior
          </Button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {getVisiblePages()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-text-secondary">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 btn-scale
                      ${page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }
                    `}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden flex items-center px-3 py-2 bg-muted rounded-lg">
            <span className="text-sm text-text-primary">
              {currentPage} / {totalPages}
            </span>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>

        {/* Quick Jump */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronsLeft"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            title="Primera página"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronsRight"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            title="Última página"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
