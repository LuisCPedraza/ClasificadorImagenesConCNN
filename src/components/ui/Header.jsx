import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Clasificar',
      path: '/image-upload-dashboard',
      icon: 'Upload',
      tooltip: 'Subir y clasificar imágenes'
    },
    {
      label: 'Resultados',
      path: '/classification-results',
      icon: 'BarChart3',
      tooltip: 'Ver resultados de clasificación'
    },
    {
      label: 'Historial',
      path: '/classification-history',
      icon: 'Clock',
      tooltip: 'Historial de clasificaciones'
    },
    {
      label: 'Categorías',
      path: '/category-management',
      icon: 'Grid3X3',
      tooltip: 'Gestionar categorías'
    }
  ];

  const secondaryItems = [
    {
      label: 'Perfil',
      path: '/user-profile-settings',
      icon: 'User',
      tooltip: 'Configuración de perfil'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer btn-scale"
      onClick={() => handleNavigation('/image-upload-dashboard')}
    >
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
        <Icon name="Brain" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-text-primary">
        ImageClassifier
      </span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border elevation-2">
      <div className="flex items-center justify-between h-16 px-6">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out btn-scale
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                className="mr-2" 
              />
              {item?.label}
            </button>
          ))}
        </nav>

        {/* Desktop Secondary Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {secondaryItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out btn-scale
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border elevation-3">
          <nav className="px-4 py-2 space-y-1">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ease-out btn-scale
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className="mr-3" 
                />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
