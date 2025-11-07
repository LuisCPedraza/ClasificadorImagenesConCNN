import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbContextHelper from '../../components/ui/BreadcrumbContextHelper';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Import components
import CategoryCard from './components/CategoryCard';
import CategoryForm from './components/CategoryForm';
import CategoryStats from './components/CategoryStats';
import CategoryImportExport from './components/CategoryImportExport';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Mock data
  useEffect(() => {
    const mockCategories = [
    {
      id: 1,
      name: "Animales Domésticos",
      description: "Clasificación de perros, gatos y otros animales domésticos comunes",
      type: "animals",
      status: "active",
      confidenceThreshold: 85,
      totalClassifications: 1247,
      accuracy: 94,
      lastUpdated: "2 nov 2025",
      sampleImages: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1635212756445-609dd132a8d7",
        alt: "Golden retriever sentado en césped verde con lengua afuera"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1719947811208-5bf7e9c20dd5",
        alt: "Gatito naranja y blanco acostado en superficie suave"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1627110914806-708eb65b082f",
        alt: "Conejo blanco con orejas largas en jardín"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1727940642108-02345bdd9fb9",
        alt: "Hámster dorado comiendo semillas en jaula"
      }]

    },
    {
      id: 2,
      name: "Ropa y Accesorios",
      description: "Identificación de prendas de vestir, zapatos y accesorios de moda",
      type: "clothing",
      status: "active",
      confidenceThreshold: 78,
      totalClassifications: 892,
      accuracy: 89,
      lastUpdated: "1 nov 2025",
      sampleImages: [
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1666358063213-9b7785eb71a9",
        alt: "Camiseta azul colgada en percha de madera"
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1697065687034-39a38a4e2382",
        alt: "Par de zapatillas deportivas blancas sobre fondo gris"
      },
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1713880442898-0f151fba5e16",
        alt: "Jeans azules doblados sobre superficie blanca"
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1581859852030-493e6238ff38",
        alt: "Reloj de pulsera plateado con correa de cuero negro"
      }]

    },
    {
      id: 3,
      name: "Vehículos Urbanos",
      description: "Clasificación de automóviles, motocicletas y transporte urbano",
      type: "vehicles",
      status: "training",
      confidenceThreshold: 82,
      totalClassifications: 456,
      accuracy: 87,
      lastUpdated: "31 oct 2025",
      sampleImages: [
      {
        id: 9,
        url: "https://images.unsplash.com/photo-1665116583037-0e4f7070e42c",
        alt: "Automóvil sedan rojo estacionado en calle urbana"
      },
      {
        id: 10,
        url: "https://images.unsplash.com/photo-1700025771709-f94583e80a5c",
        alt: "Motocicleta deportiva negra en estacionamiento"
      },
      {
        id: 11,
        url: "https://images.unsplash.com/photo-1645650343005-e8779e9181e2",
        alt: "Autobús público azul en parada de transporte"
      }]

    },
    {
      id: 4,
      name: "Comida Casera",
      description: "Reconocimiento de platos caseros y comida tradicional",
      type: "food",
      status: "inactive",
      confidenceThreshold: 75,
      totalClassifications: 234,
      accuracy: 82,
      lastUpdated: "28 oct 2025",
      sampleImages: [
      {
        id: 12,
        url: "https://images.unsplash.com/photo-1504864555732-86fdac4a83a8",
        alt: "Plato de pasta con salsa de tomate y albahaca fresca"
      },
      {
        id: 13,
        url: "https://images.unsplash.com/photo-1723682859507-248951637e0d",
        alt: "Pizza casera con queso derretido y vegetales"
      },
      {
        id: 14,
        url: "https://images.unsplash.com/photo-1627062815571-01d12fb35f91",
        alt: "Ensalada verde con tomates cherry y aderezo"
      }]

    },
    {
      id: 5,
      name: "Flores y Plantas",
      description: "Identificación de especies de flores y plantas ornamentales",
      type: "custom",
      status: "active",
      confidenceThreshold: 88,
      totalClassifications: 678,
      accuracy: 91,
      lastUpdated: "30 oct 2025",
      sampleImages: [
      {
        id: 15,
        url: "https://images.unsplash.com/photo-1664353386122-ee5d9d2b2e99",
        alt: "Rosa roja en plena floración con pétalos aterciopelados"
      },
      {
        id: 16,
        url: "https://images.unsplash.com/photo-1632583957552-2aea93882203",
        alt: "Girasol amarillo grande con centro oscuro"
      },
      {
        id: 17,
        url: "https://images.unsplash.com/photo-1664463237081-7d51f1d19b09",
        alt: "Tulipanes morados en jardín primaveral"
      },
      {
        id: 18,
        url: "https://images.unsplash.com/photo-1614597408719-725367979df7",
        alt: "Planta suculenta verde en maceta de terracota"
      }]

    }];


    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = categories;

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter((category) =>
      category?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      category?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered?.filter((category) => category?.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered?.filter((category) => category?.status === filterStatus);
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'accuracy':
          return b?.accuracy - a?.accuracy;
        case 'classifications':
          return b?.totalClassifications - a?.totalClassifications;
        case 'updated':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return 0;
      }
    });

    setFilteredCategories(filtered);
  }, [categories, searchTerm, filterType, filterStatus, sortBy]);

  const typeOptions = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'animals', label: 'Animales' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'food', label: 'Comida' },
  { value: 'vehicles', label: 'Vehículos' },
  { value: 'custom', label: 'Personalizada' }];


  const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'training', label: 'Entrenando' }];


  const sortOptions = [
  { value: 'name', label: 'Nombre' },
  { value: 'accuracy', label: 'Precisión' },
  { value: 'classifications', label: 'Clasificaciones' },
  { value: 'updated', label: 'Última actualización' }];


  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDuplicateCategory = (category) => {
    const duplicatedCategory = {
      ...category,
      id: Date.now(),
      name: `${category?.name} (Copia)`,
      totalClassifications: 0,
      lastUpdated: new Date()?.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };
    setCategories((prev) => [...prev, duplicatedCategory]);
  };

  const handleDeleteCategory = (category) => {
    setDeleteCategory(category);
  };

  const confirmDelete = (category) => {
    setCategories((prev) => prev?.filter((cat) => cat?.id !== category?.id));
    setDeleteCategory(null);
  };

  const handleToggleStatus = (category) => {
    const newStatus = category?.status === 'active' ? 'inactive' : 'active';
    setCategories((prev) =>
    prev?.map((cat) =>
    cat?.id === category?.id ?
    { ...cat, status: newStatus } :
    cat
    )
    );
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
      prev?.map((cat) =>
      cat?.id === editingCategory?.id ?
      {
        ...cat,
        ...categoryData,
        lastUpdated: new Date()?.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      } :
      cat
      )
      );
    } else {
      // Create new category
      const newCategory = {
        ...categoryData,
        id: Date.now(),
        totalClassifications: 0,
        accuracy: 0,
        lastUpdated: new Date()?.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleImportCategories = (importedData) => {
    const newCategories = importedData?.map((cat) => ({
      ...cat,
      id: Date.now() + Math.random(),
      totalClassifications: 0,
      lastUpdated: new Date()?.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }));
    setCategories((prev) => [...prev, ...newCategories]);
  };

  const handleExportCategories = (categoriesToExport, format) => {
    const dataStr = format === 'json' ?
    JSON.stringify(categoriesToExport, null, 2) :
    categoriesToExport?.map((cat) =>
    `${cat?.name},${cat?.type},${cat?.status},${cat?.accuracy},${cat?.totalClassifications}`
    )?.join('\n');

    const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `categorias_${new Date()?.toISOString()?.split('T')?.[0]}.${format}`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbContextHelper
            customBreadcrumbs={[
            { label: 'Inicio', path: '/image-upload-dashboard', icon: 'Home' },
            { label: 'Gestión de Categorías', icon: 'Grid3X3' }]
            } />


          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Gestión de Categorías
              </h1>
              <p className="text-text-secondary">
                Configura y personaliza las categorías de clasificación para tus necesidades específicas
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsImportExportOpen(true)}
                iconName="Download"
                iconPosition="left">

                Importar/Exportar
              </Button>
              <Button
                variant="default"
                onClick={handleCreateCategory}
                iconName="Plus"
                iconPosition="left">

                Nueva Categoría
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <CategoryStats categories={categories} />

          {/* Filters and Search */}
          <div className="bg-surface border border-border rounded-lg p-6 mb-6 elevation-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <Input
                type="search"
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="lg:col-span-2" />

              
              <Select
                options={typeOptions}
                value={filterType}
                onChange={setFilterType}
                placeholder="Filtrar por tipo" />

              
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="Filtrar por estado" />

              
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Ordenar por" />

            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">
                  {filteredCategories?.length} de {categories?.length} categorías
                </span>
                {(searchTerm || filterType !== 'all' || filterStatus !== 'all') &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterStatus('all');
                  }}
                  iconName="X"
                  iconPosition="left">

                    Limpiar filtros
                  </Button>
                }
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}>

                  <Icon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}>

                  <Icon name="List" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Categories Grid/List */}
          {filteredCategories?.length === 0 ?
          <div className="bg-surface border border-border rounded-lg p-12 text-center elevation-1">
              <Icon name="Grid3X3" size={48} className="mx-auto mb-4 text-text-secondary" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No se encontraron categorías
              </h3>
              <p className="text-text-secondary mb-6">
                {searchTerm || filterType !== 'all' || filterStatus !== 'all' ? 'Intenta ajustar los filtros de búsqueda' : 'Comienza creando tu primera categoría de clasificación'
              }
              </p>
              {!searchTerm && filterType === 'all' && filterStatus === 'all' &&
            <Button
              variant="default"
              onClick={handleCreateCategory}
              iconName="Plus"
              iconPosition="left">

                  Crear Primera Categoría
                </Button>
            }
            </div> :

          <div className={
          viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
          }>
              {filteredCategories?.map((category) =>
            <CategoryCard
              key={category?.id}
              category={category}
              onEdit={handleEditCategory}
              onDuplicate={handleDuplicateCategory}
              onDelete={handleDeleteCategory}
              onToggleStatus={handleToggleStatus} />

            )}
            </div>
          }
        </div>
      </main>
      {/* Modals */}
      <CategoryForm
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory} />

      <CategoryImportExport
        categories={categories}
        isVisible={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        onImport={handleImportCategories}
        onExport={handleExportCategories} />

      <DeleteConfirmationDialog
        isOpen={!!deleteCategory}
        category={deleteCategory}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteCategory(null)} />

      <QuickActionFloatingButton />
    </div>);

};

export default CategoryManagement;
