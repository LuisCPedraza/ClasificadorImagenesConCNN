import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentClassifications = ({
  isVisible = true,
  maxItems = 5
}) => {
  const navigate = useNavigate();

  const recentClassifications = [
  {
    id: 'cls_001',
    fileName: 'golden_retriever.jpg',
    imageUrl: "https://images.unsplash.com/photo-1682122061022-8794ffae3b13",
    imageAlt: 'Golden retriever dog sitting on grass with tongue out in sunny park',
    category: 'animals',
    categoryLabel: 'Animales',
    result: 'Golden Retriever',
    confidence: 96.8,
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    status: 'completed'
  },
  {
    id: 'cls_002',
    fileName: 'red_dress.jpg',
    imageUrl: "https://images.unsplash.com/photo-1631268447861-b8ae16e35bbb",
    imageAlt: 'Woman wearing elegant red evening dress standing against white background',
    category: 'clothing',
    categoryLabel: 'Ropa y Accesorios',
    result: 'Vestido de Noche',
    confidence: 94.2,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'completed'
  },
  {
    id: 'cls_003',
    fileName: 'sports_car.jpg',
    imageUrl: "https://images.unsplash.com/photo-1707778846622-357589e7c72b",
    imageAlt: 'Red sports car parked on city street with modern buildings in background',
    category: 'vehicles',
    categoryLabel: 'Vehículos',
    result: 'Automóvil Deportivo',
    confidence: 98.5,
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    status: 'completed'
  },
  {
    id: 'cls_004',
    fileName: 'apple_fruit.jpg',
    imageUrl: "https://images.unsplash.com/photo-1674769304190-daeebc972216",
    imageAlt: 'Fresh red apple with green leaf on wooden table with natural lighting',
    category: 'food',
    categoryLabel: 'Alimentos',
    result: 'Manzana Roja',
    confidence: 92.1,
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    status: 'completed'
  },
  {
    id: 'cls_005',
    fileName: 'mountain_landscape.jpg',
    imageUrl: "https://images.unsplash.com/photo-1694799007407-71b2e6b62807",
    imageAlt: 'Snow-capped mountain peaks with blue sky and white clouds in alpine landscape',
    category: 'nature',
    categoryLabel: 'Naturaleza',
    result: 'Paisaje Montañoso',
    confidence: 89.7,
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    status: 'completed'
  }];


  const getCategoryIcon = (category) => {
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
    return iconMap?.[category] || 'Grid3X3';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'text-success';
    if (confidence >= 85) return 'text-accent';
    if (confidence >= 75) return 'text-warning';
    return 'text-error';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `hace ${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays}d`;
  };

  const handleViewResult = (classificationId) => {
    navigate(`/classification-results?id=${classificationId}`);
  };

  const handleViewAllHistory = () => {
    navigate('/classification-history');
  };

  if (!isVisible || recentClassifications?.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Clasificaciones Recientes
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAllHistory}
          iconName="ArrowRight"
          iconPosition="right">

          Ver todo
        </Button>
      </div>
      <div className="space-y-3">
        {recentClassifications?.slice(0, maxItems)?.map((classification) =>
        <div
          key={classification?.id}
          className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-150 cursor-pointer elevation-1 btn-scale"
          onClick={() => handleViewResult(classification?.id)}>

            <div className="flex items-center space-x-4">
              {/* Image Thumbnail */}
              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                src={classification?.imageUrl}
                alt={classification?.imageAlt}
                className="w-full h-full object-cover" />

              </div>

              {/* Classification Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon
                  name={getCategoryIcon(classification?.category)}
                  size={14}
                  className="text-primary flex-shrink-0" />

                  <span className="text-xs text-text-secondary">
                    {classification?.categoryLabel}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-text-secondary">
                    {formatTimeAgo(classification?.timestamp)}
                  </span>
                </div>

                <h4 className="font-medium text-text-primary truncate mb-1">
                  {classification?.result}
                </h4>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-secondary truncate">
                    {classification?.fileName}
                  </p>
                  <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    <Icon name="Target" size={12} className={getConfidenceColor(classification?.confidence)} />
                    <span className={`text-xs font-medium ${getConfidenceColor(classification?.confidence)}`}>
                      {classification?.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Icon */}
              <div className="flex-shrink-0">
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleViewAllHistory}
          iconName="Clock"
          iconPosition="left"
          fullWidth>

          Ver Historial Completo
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/classification-results')}
          iconName="BarChart3"
          iconPosition="left"
          fullWidth>

          Análisis de Resultados
        </Button>
      </div>
      {/* Statistics Summary */}
      <div className="mt-4 bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-text-secondary">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span>Precisión promedio: 94.3%</span>
          </div>
          <div className="flex items-center text-text-secondary">
            <Icon name="Clock" size={14} className="mr-1" />
            <span>Tiempo promedio: 4.2s</span>
          </div>
        </div>
      </div>
    </div>);

};

export default RecentClassifications;
