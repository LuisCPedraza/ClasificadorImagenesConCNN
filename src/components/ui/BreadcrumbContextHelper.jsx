import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbContextHelper = ({ 
  isVisible = true, 
  currentStep = null,
  customBreadcrumbs = null 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/image-upload-dashboard': {
      label: 'Clasificar',
      icon: 'Upload',
      step: 1
    },
    '/classification-results': {
      label: 'Resultados',
      icon: 'BarChart3',
      step: 2
    },
    '/classification-history': {
      label: 'Historial',
      icon: 'Clock',
      step: null
    },
    '/category-management': {
      label: 'Categorías',
      icon: 'Grid3X3',
      step: null
    },
    '/user-profile-settings': {
      label: 'Perfil',
      icon: 'User',
      step: null
    }
  };

  const workflowSteps = [
    {
      path: '/image-upload-dashboard',
      label: 'Subir Imagen',
      icon: 'Upload',
      description: 'Selecciona una imagen para clasificar'
    },
    {
      path: '/classification-results',
      label: 'Ver Resultados',
      icon: 'BarChart3',
      description: 'Analiza los resultados de la clasificación'
    },
    {
      path: '/classification-history',
      label: 'Revisar Historial',
      icon: 'Clock',
      description: 'Consulta clasificaciones anteriores'
    }
  ];

  const currentRoute = routeMap?.[location?.pathname];
  const isWorkflowPath = currentRoute && currentRoute?.step !== null;

  if (!isVisible || (!isWorkflowPath && !customBreadcrumbs)) {
    return null;
  }

  const handleStepClick = (path) => {
    navigate(path);
  };

  const renderWorkflowBreadcrumb = () => {
    const activeStep = currentStep || currentRoute?.step || 1;

    return (
      <div className="bg-surface border border-border rounded-lg px-4 py-3 elevation-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Workflow" size={16} className="mr-2" />
              <span>Flujo de Clasificación</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2">
              {workflowSteps?.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === activeStep;
                const isCompleted = stepNumber < activeStep;
                const isClickable = stepNumber <= activeStep;

                return (
                  <React.Fragment key={step?.path}>
                    <button
                      onClick={() => isClickable && handleStepClick(step?.path)}
                      disabled={!isClickable}
                      className={`
                        flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ease-out
                        ${isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : isCompleted 
                            ? 'bg-success text-success-foreground hover:bg-success/90 btn-scale' 
                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }
                        ${isClickable && !isActive ? 'btn-scale' : ''}
                      `}
                      title={step?.description}
                    >
                      <Icon 
                        name={isCompleted ? 'CheckCircle' : step?.icon} 
                        size={14} 
                        className="mr-1.5" 
                      />
                      <span className="hidden md:inline">{step?.label}</span>
                      <span className="md:hidden">{stepNumber}</span>
                    </button>
                    {index < workflowSteps?.length - 1 && (
                      <Icon 
                        name="ChevronRight" 
                        size={14} 
                        className="text-muted-foreground" 
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Indicator */}
          <div className="sm:hidden flex items-center text-sm">
            <span className="text-text-secondary mr-2">Paso</span>
            <span className="font-medium text-primary">
              {activeStep} de {workflowSteps?.length}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            {activeStep > 1 && (
              <button
                onClick={() => handleStepClick(workflowSteps?.[activeStep - 2]?.path)}
                className="flex items-center px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors duration-150 btn-scale"
                title="Paso anterior"
              >
                <Icon name="ChevronLeft" size={14} className="mr-1" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
            )}
            
            {activeStep < workflowSteps?.length && (
              <button
                onClick={() => handleStepClick(workflowSteps?.[activeStep]?.path)}
                className="flex items-center px-2 py-1 text-xs text-primary hover:text-primary/80 transition-colors duration-150 btn-scale"
                title="Siguiente paso"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <Icon name="ChevronRight" size={14} className="ml-1" />
              </button>
            )}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="h-1.5 bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(activeStep / workflowSteps?.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCustomBreadcrumb = () => {
    if (!customBreadcrumbs) return null;

    return (
      <div className="bg-surface border border-border rounded-lg px-4 py-2 elevation-1">
        <nav className="flex items-center space-x-2 text-sm">
          {customBreadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb?.path ? (
                <button
                  onClick={() => navigate(crumb?.path)}
                  className="flex items-center text-text-secondary hover:text-text-primary transition-colors duration-150 btn-scale"
                >
                  {crumb?.icon && (
                    <Icon name={crumb?.icon} size={14} className="mr-1" />
                  )}
                  {crumb?.label}
                </button>
              ) : (
                <span className="flex items-center text-text-primary font-medium">
                  {crumb?.icon && (
                    <Icon name={crumb?.icon} size={14} className="mr-1" />
                  )}
                  {crumb?.label}
                </span>
              )}
              
              {index < customBreadcrumbs?.length - 1 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    );
  };

  return (
    <div className="mb-6">
      {customBreadcrumbs ? renderCustomBreadcrumb() : renderWorkflowBreadcrumb()}
    </div>
  );
};

export default BreadcrumbContextHelper;
