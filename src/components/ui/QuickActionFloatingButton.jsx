import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFloatingButton = ({ 
  isVisible = true,
  customAction = null,
  position = 'bottom-right' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const routeActions = {
    '/image-upload-dashboard': {
      primary: {
        label: 'Nueva Clasificación',
        icon: 'Plus',
        action: () => window.location?.reload(),
        color: 'bg-primary hover:bg-primary/90'
      },
      secondary: [
        {
          label: 'Ver Historial',
          icon: 'Clock',
          action: () => navigate('/classification-history')
        },
        {
          label: 'Gestionar Categorías',
          icon: 'Grid3X3',
          action: () => navigate('/category-management')
        }
      ]
    },
    '/classification-results': {
      primary: {
        label: 'Clasificar Otra',
        icon: 'Upload',
        action: () => navigate('/image-upload-dashboard'),
        color: 'bg-accent hover:bg-accent/90'
      },
      secondary: [
        {
          label: 'Guardar Resultado',
          icon: 'Save',
          action: () => console.log('Save result')
        },
        {
          label: 'Compartir',
          icon: 'Share2',
          action: () => console.log('Share result')
        }
      ]
    },
    '/classification-history': {
      primary: {
        label: 'Nueva Clasificación',
        icon: 'Upload',
        action: () => navigate('/image-upload-dashboard'),
        color: 'bg-primary hover:bg-primary/90'
      },
      secondary: [
        {
          label: 'Exportar Historial',
          icon: 'Download',
          action: () => console.log('Export history')
        },
        {
          label: 'Filtrar Resultados',
          icon: 'Filter',
          action: () => console.log('Filter results')
        }
      ]
    },
    '/category-management': {
      primary: {
        label: 'Nueva Categoría',
        icon: 'Plus',
        action: () => console.log('Add category'),
        color: 'bg-secondary hover:bg-secondary/90'
      },
      secondary: [
        {
          label: 'Importar Categorías',
          icon: 'Upload',
          action: () => console.log('Import categories')
        },
        {
          label: 'Clasificar Imagen',
          icon: 'Brain',
          action: () => navigate('/image-upload-dashboard')
        }
      ]
    },
    '/user-profile-settings': {
      primary: {
        label: 'Clasificar Imagen',
        icon: 'Upload',
        action: () => navigate('/image-upload-dashboard'),
        color: 'bg-primary hover:bg-primary/90'
      },
      secondary: [
        {
          label: 'Ver Historial',
          icon: 'Clock',
          action: () => navigate('/classification-history')
        }
      ]
    }
  };

  const currentActions = customAction || routeActions?.[location?.pathname];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && !event?.target?.closest('.floating-action-container')) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isExpanded]);

  useEffect(() => {
    setIsExpanded(false);
  }, [location?.pathname]);

  if (!isVisible || !currentActions) {
    return null;
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6'
  };

  const handlePrimaryAction = () => {
    if (currentActions?.secondary && currentActions?.secondary?.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      currentActions?.primary?.action();
    }
  };

  const handleSecondaryAction = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className={`fixed ${positionClasses?.[position]} z-200 floating-action-container`}>
      {/* Secondary Actions */}
      {isExpanded && currentActions?.secondary && (
        <div className="mb-4 space-y-3">
          {currentActions?.secondary?.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end animate-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`
                  mr-3 px-3 py-2 bg-surface border border-border rounded-lg shadow-lg text-sm font-medium text-text-primary
                  opacity-0 animate-in fade-in duration-200 tooltip-fade
                  ${isExpanded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 50 + 100}ms` }}
              >
                {action?.label}
              </div>
              <button
                onClick={() => handleSecondaryAction(action?.action)}
                className="w-12 h-12 bg-surface border border-border rounded-full shadow-lg flex items-center justify-center text-text-primary hover:bg-muted transition-all duration-150 btn-scale elevation-2"
                title={action?.label}
              >
                <Icon name={action?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Primary Action Button */}
      <div className="relative">
        <button
          onClick={handlePrimaryAction}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white font-medium transition-all duration-150 btn-scale elevation-3
            ${currentActions?.primary?.color || 'bg-primary hover:bg-primary/90'}
            ${isExpanded ? 'rotate-45' : 'rotate-0'}
          `}
          title={currentActions?.primary?.label}
        >
          <Icon 
            name={isExpanded && currentActions?.secondary ? 'X' : currentActions?.primary?.icon} 
            size={24} 
          />
        </button>

        {/* Tooltip */}
        {showTooltip && !isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-surface border border-border rounded-lg shadow-lg text-sm font-medium text-text-primary whitespace-nowrap tooltip-fade">
            {currentActions?.primary?.label}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        )}

        {/* Expansion Indicator */}
        {currentActions?.secondary && currentActions?.secondary?.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-accent-foreground">
              {currentActions?.secondary?.length}
            </span>
          </div>
        )}
      </div>
      {/* Background Overlay for Mobile */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-20 -z-10 md:hidden" />
      )}
    </div>
  );
};

export default QuickActionFloatingButton;
