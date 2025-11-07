import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BreadcrumbContextHelper from '../../components/ui/BreadcrumbContextHelper';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import HistoryCard from './components/HistoryCard';
import FilterToolbar from './components/FilterToolbar';
import BulkActions from './components/BulkActions';
import StatisticsPanel from './components/StatisticsPanel';
import PaginationControls from './components/PaginationControls';

const ClassificationHistory = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    confidence: 'all',
    sortBy: 'date-desc',
    dateFrom: '',
    dateTo: ''
  });

  // Mock classification history data
  const mockHistoryData = [
  {
    id: 1,
    filename: "perro_golden_retriever.jpg",
    image: "https://images.unsplash.com/photo-1682122061022-8794ffae3b13",
    imageAlt: "Golden retriever dog sitting on grass in sunny park with tongue out",
    predictedCategory: "Perro",
    confidence: 0.94,
    categoryType: "Animales",
    processedAt: new Date(2025, 10, 7, 10, 30),
    processingTime: 1250
  },
  {
    id: 2,
    filename: "camiseta_azul_casual.jpg",
    image: "https://images.unsplash.com/photo-1697912184338-15919f458f9a",
    imageAlt: "Blue casual t-shirt laid flat on white background",
    predictedCategory: "Camiseta",
    confidence: 0.87,
    categoryType: "Ropa",
    processedAt: new Date(2025, 10, 7, 9, 15),
    processingTime: 980
  },
  {
    id: 3,
    filename: "gato_persa_blanco.jpg",
    image: "https://images.unsplash.com/photo-1523988992-11248dcba996",
    imageAlt: "White Persian cat with blue eyes sitting on soft cushion",
    predictedCategory: "Gato",
    confidence: 0.91,
    categoryType: "Animales",
    processedAt: new Date(2025, 10, 6, 16, 45),
    processingTime: 1100
  },
  {
    id: 4,
    filename: "pizza_margherita.jpg",
    image: "https://images.unsplash.com/photo-1723132266836-d069029f861b",
    imageAlt: "Fresh margherita pizza with basil leaves on wooden table",
    predictedCategory: "Pizza",
    confidence: 0.89,
    categoryType: "Comida",
    processedAt: new Date(2025, 10, 6, 14, 20),
    processingTime: 1350
  },
  {
    id: 5,
    filename: "coche_sedan_rojo.jpg",
    image: "https://images.unsplash.com/photo-1708908864692-1a408142902b",
    imageAlt: "Red sedan car parked on city street during daytime",
    predictedCategory: "Automóvil",
    confidence: 0.76,
    categoryType: "Vehículos",
    processedAt: new Date(2025, 10, 5, 11, 30),
    processingTime: 1450
  },
  {
    id: 6,
    filename: "zapatos_deportivos.jpg",
    image: "https://images.unsplash.com/photo-1591852699151-6791979ae0a0",
    imageAlt: "White athletic sneakers with blue accents on wooden floor",
    predictedCategory: "Calzado Deportivo",
    confidence: 0.83,
    categoryType: "Ropa",
    processedAt: new Date(2025, 10, 5, 8, 45),
    processingTime: 1180
  },
  {
    id: 7,
    filename: "hamburguesa_completa.jpg",
    image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b",
    imageAlt: "Gourmet burger with lettuce, tomato and cheese on sesame bun",
    predictedCategory: "Hamburguesa",
    confidence: 0.92,
    categoryType: "Comida",
    processedAt: new Date(2025, 10, 4, 19, 15),
    processingTime: 1050
  },
  {
    id: 8,
    filename: "pájaro_canario.jpg",
    image: "https://images.unsplash.com/photo-1697122056964-70cd3ae380a1",
    imageAlt: "Yellow canary bird perched on thin branch with green background",
    predictedCategory: "Pájaro",
    confidence: 0.88,
    categoryType: "Animales",
    processedAt: new Date(2025, 10, 4, 15, 30),
    processingTime: 1200
  },
  {
    id: 9,
    filename: "chaqueta_cuero_negra.jpg",
    image: "https://images.unsplash.com/photo-1543202955-e0eda1061132",
    imageAlt: "Black leather jacket hanging on wooden hanger against white wall",
    predictedCategory: "Chaqueta",
    confidence: 0.79,
    categoryType: "Ropa",
    processedAt: new Date(2025, 10, 3, 12, 10),
    processingTime: 1380
  },
  {
    id: 10,
    filename: "motocicleta_deportiva.jpg",
    image: "https://images.unsplash.com/photo-1705460899165-c7d3804fd37f",
    imageAlt: "Blue sport motorcycle parked on asphalt road with mountain background",
    predictedCategory: "Motocicleta",
    confidence: 0.85,
    categoryType: "Vehículos",
    processedAt: new Date(2025, 10, 3, 9, 25),
    processingTime: 1320
  }];


  // Mock statistics data
  const mockStatistics = {
    totalClassifications: 247,
    averageAccuracy: 0.86,
    averageProcessingTime: 1180,
    thisWeekCount: 23,
    categoryDistribution: [
    { name: "Animales", count: 89, percentage: 36, color: "bg-primary" },
    { name: "Ropa", count: 67, percentage: 27, color: "bg-secondary" },
    { name: "Comida", count: 45, percentage: 18, color: "bg-accent" },
    { name: "Vehículos", count: 32, percentage: 13, color: "bg-warning" },
    { name: "Objetos", count: 14, percentage: 6, color: "bg-success" }],

    accuracyTrend: [
    { day: "Lun", accuracy: 0.84 },
    { day: "Mar", accuracy: 0.87 },
    { day: "Mié", accuracy: 0.85 },
    { day: "Jue", accuracy: 0.89 },
    { day: "Vie", accuracy: 0.91 },
    { day: "Sáb", accuracy: 0.88 },
    { day: "Dom", accuracy: 0.86 }],

    recentActivity: [
    {
      type: "classification",
      description: "Clasificación de perro_golden_retriever.jpg completada",
      time: "Hace 2 horas"
    },
    {
      type: "export",
      description: "Exportación de 15 resultados realizada",
      time: "Hace 4 horas"
    },
    {
      type: "classification",
      description: "Clasificación por lotes de 8 imágenes completada",
      time: "Ayer"
    }]

  };

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...mockHistoryData];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((item) =>
      item?.filename?.toLowerCase()?.includes(searchTerm) ||
      item?.predictedCategory?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((item) =>
      item?.categoryType?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    // Apply confidence filter
    if (filters?.confidence !== 'all') {
      filtered = filtered?.filter((item) => {
        switch (filters?.confidence) {
          case 'high':
            return item?.confidence >= 0.8;
          case 'medium':
            return item?.confidence >= 0.6 && item?.confidence < 0.8;
          case 'low':
            return item?.confidence < 0.6;
          default:
            return true;
        }
      });
    }

    // Apply date filters
    if (filters?.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered?.filter((item) => item?.processedAt >= fromDate);
    }

    if (filters?.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate?.setHours(23, 59, 59, 999);
      filtered = filtered?.filter((item) => item?.processedAt <= toDate);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'date-desc':
          return b?.processedAt - a?.processedAt;
        case 'date-asc':
          return a?.processedAt - b?.processedAt;
        case 'confidence-desc':
          return b?.confidence - a?.confidence;
        case 'confidence-asc':
          return a?.confidence - b?.confidence;
        case 'filename-asc':
          return a?.filename?.localeCompare(b?.filename);
        case 'filename-desc':
          return b?.filename?.localeCompare(a?.filename);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Update bulk actions visibility
  useEffect(() => {
    setShowBulkActions(selectedItems?.length > 0);
  }, [selectedItems]);

  const handleSelectItem = (itemId, isSelected) => {
    if (isSelected) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev?.filter((id) => id !== itemId));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(paginatedData?.map((item) => item?.id));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleViewItem = (item) => {
    navigate('/classification-results', {
      state: {
        classificationData: {
          image: item?.image,
          imageAlt: item?.imageAlt,
          filename: item?.filename,
          results: [
          {
            category: item?.predictedCategory,
            confidence: item?.confidence,
            isTopPrediction: true
          }],

          processingTime: item?.processingTime,
          categoryType: item?.categoryType
        }
      }
    });
  };

  const handleExportItem = (item) => {
    console.log('Exporting item:', item?.filename);
    // Mock export functionality
  };

  const handleDeleteItem = (item) => {
    console.log('Deleting item:', item?.filename);
    // Mock delete functionality
  };

  const handleBulkExport = (items) => {
    console.log('Bulk exporting items:', items);
    // Mock bulk export functionality
  };

  const handleBulkDelete = (items) => {
    console.log('Bulk deleting items:', items);
    setSelectedItems([]);
    // Mock bulk delete functionality
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      confidence: 'all',
      sortBy: 'date-desc',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <BreadcrumbContextHelper />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary flex items-center">
                <Icon name="Clock" size={32} className="mr-3 text-primary" />
                Historial de Clasificaciones
              </h1>
              <p className="text-text-secondary mt-2">
                Revisa y gestiona tus clasificaciones anteriores
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant={showStatistics ? "default" : "outline"}
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => setShowStatistics(!showStatistics)}>

                Estadísticas
              </Button>
              
              <Button
                variant="default"
                iconName="Upload"
                iconPosition="left"
                onClick={() => navigate('/image-upload-dashboard')}>

                Nueva Clasificación
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mb-6">
            <BulkActions
              selectedItems={selectedItems}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkExport={handleBulkExport}
              onBulkDelete={handleBulkDelete}
              totalItems={paginatedData?.length}
              isVisible={showBulkActions} />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filter Toolbar */}
              <FilterToolbar
                filters={filters}
                onFiltersChange={setFilters}
                totalCount={mockHistoryData?.length}
                filteredCount={filteredData?.length}
                onClearFilters={handleClearFilters} />


              {/* History List */}
              <div className="space-y-4">
                {paginatedData?.length > 0 ?
                paginatedData?.map((item) =>
                <HistoryCard
                  key={item?.id}
                  item={item}
                  isSelected={selectedItems?.includes(item?.id)}
                  onSelect={handleSelectItem}
                  onView={handleViewItem}
                  onExport={handleExportItem}
                  onDelete={handleDeleteItem}
                  showCheckbox={showBulkActions} />

                ) :

                <div className="bg-surface border border-border rounded-lg p-12 text-center elevation-1">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Intenta ajustar los filtros o realizar una nueva búsqueda
                    </p>
                    <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleClearFilters}>

                      Limpiar filtros
                    </Button>
                  </div>
                }
              </div>

              {/* Pagination */}
              {filteredData?.length > 0 &&
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredData?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage} />

              }
            </div>

            {/* Statistics Panel */}
            {showStatistics &&
            <div className="xl:col-span-1">
                <StatisticsPanel statistics={mockStatistics} />
              </div>
            }
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <QuickActionFloatingButton />
    </div>);

};

export default ClassificationHistory;
