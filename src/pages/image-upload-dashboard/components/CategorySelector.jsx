import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const CategorySelector = ({ 
  selectedCategory, 
  onCategoryChange, 
  disabled = false 
}) => {
  const categoryOptions = [
    {
      value: 'animals',
      label: 'Animales',
      description: 'Clasificación de especies animales (perros, gatos, aves, etc.)'
    },
    {
      value: 'clothing',
      label: 'Ropa y Accesorios',
      description: 'Categorización de prendas de vestir y complementos'
    },
    {
      value: 'food',
      label: 'Alimentos',
      description: 'Identificación de tipos de comida y bebidas'
    },
    {
      value: 'vehicles',
      label: 'Vehículos',
      description: 'Clasificación de automóviles, motocicletas, bicicletas'
    },
    {
      value: 'objects',
      label: 'Objetos Cotidianos',
      description: 'Reconocimiento de objetos domésticos y herramientas'
    },
    {
      value: 'nature',
      label: 'Naturaleza',
      description: 'Paisajes, plantas, flores y elementos naturales'
    },
    {
      value: 'architecture',
      label: 'Arquitectura',
      description: 'Edificios, monumentos y estructuras arquitectónicas'
    },
    {
      value: 'sports',
      label: 'Deportes',
      description: 'Equipamiento deportivo y actividades físicas'
    }
  ];

  const getCategoryIcon = (categoryValue) => {
    const iconMap = {
      animals: 'Dog',
      clothing: 'Shirt',
      food: 'Apple',
      vehicles: 'Car',
      objects: 'Package',
      nature: 'TreePine',
      architecture: 'Building',
      sports: 'Dumbbell'
    };
    return iconMap?.[categoryValue] || 'Grid3X3';
  };

  const selectedCategoryData = categoryOptions?.find(cat => cat?.value === selectedCategory);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Seleccionar Categoría de Clasificación
        </h3>
        <p className="text-sm text-text-secondary">
          Elige el tipo de clasificación que deseas aplicar a tus imágenes
        </p>
      </div>
      <Select
        label="Categoría de Clasificación"
        description="La categoría determina qué modelo de IA se utilizará para el análisis"
        options={categoryOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder="Selecciona una categoría..."
        disabled={disabled}
        searchable
        className="mb-4"
      />
      {/* Category Preview Card */}
      {selectedCategoryData && (
        <div className="bg-surface border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getCategoryIcon(selectedCategory)} 
                size={20} 
                className="text-primary" 
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-1">
                {selectedCategoryData?.label}
              </h4>
              <p className="text-sm text-text-secondary mb-3">
                {selectedCategoryData?.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {getCategoryExamples(selectedCategory)?.map((example, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Model Information */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-text-secondary">
                <Icon name="Brain" size={14} className="mr-1" />
                <span>Modelo: CNN-{selectedCategory?.toUpperCase()}-v2.1</span>
              </div>
              <div className="flex items-center text-success">
                <Icon name="Zap" size={14} className="mr-1" />
                <span>Precisión: {getModelAccuracy(selectedCategory)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Category Grid for Mobile */}
      <div className="mt-6 md:hidden">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Selección rápida:
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions?.slice(0, 6)?.map((category) => (
            <button
              key={category?.value}
              onClick={() => onCategoryChange(category?.value)}
              disabled={disabled}
              className={`
                p-3 rounded-lg border text-left transition-all duration-150 btn-scale
                ${selectedCategory === category?.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border bg-surface text-text-secondary hover:border-primary/50 hover:text-text-primary'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getCategoryIcon(category?.value)} 
                  size={16} 
                />
                <span className="text-sm font-medium truncate">
                  {category?.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getCategoryExamples = (category) => {
  const examples = {
    animals: ['Perros', 'Gatos', 'Aves', 'Peces', 'Reptiles'],
    clothing: ['Camisetas', 'Pantalones', 'Zapatos', 'Sombreros', 'Bolsos'],
    food: ['Frutas', 'Verduras', 'Carnes', 'Postres', 'Bebidas'],
    vehicles: ['Coches', 'Motos', 'Bicicletas', 'Camiones', 'Autobuses'],
    objects: ['Muebles', 'Electrónicos', 'Herramientas', 'Juguetes', 'Libros'],
    nature: ['Árboles', 'Flores', 'Montañas', 'Océanos', 'Cielos'],
    architecture: ['Casas', 'Edificios', 'Puentes', 'Iglesias', 'Monumentos'],
    sports: ['Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Ciclismo']
  };
  return examples?.[category] || [];
};

const getModelAccuracy = (category) => {
  const accuracies = {
    animals: 94.2,
    clothing: 91.8,
    food: 89.5,
    vehicles: 96.1,
    objects: 87.3,
    nature: 92.7,
    architecture: 90.4,
    sports: 88.9
  };
  return accuracies?.[category] || 90.0;
};

export default CategorySelector;
