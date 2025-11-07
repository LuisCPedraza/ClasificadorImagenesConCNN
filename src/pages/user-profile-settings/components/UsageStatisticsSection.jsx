import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageStatisticsSection = ({ statistics }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUsagePercentage = (used, total) => {
    return Math.min((used / total) * 100, 100);
  };

  const statCards = [
    {
      title: 'Clasificaciones Totales',
      value: statistics?.totalClassifications?.toLocaleString('es-ES'),
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
      change: `+${statistics?.classificationsThisMonth} este mes`
    },
    {
      title: 'Imágenes Procesadas',
      value: statistics?.totalImages?.toLocaleString('es-ES'),
      icon: 'Image',
      color: 'text-secondary',
      bgColor: 'bg-secondary bg-opacity-10',
      change: `${statistics?.averagePerDay} promedio/día`
    },
    {
      title: 'Precisión Promedio',
      value: `${(statistics?.averageAccuracy * 100)?.toFixed(1)}%`,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10',
      change: statistics?.accuracyTrend > 0 ? `+${statistics?.accuracyTrend?.toFixed(1)}% mejora` : `${statistics?.accuracyTrend?.toFixed(1)}% cambio`
    },
    {
      title: 'Tiempo Total',
      value: `${Math.floor(statistics?.totalProcessingTime / 60)}h ${statistics?.totalProcessingTime % 60}m`,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning bg-opacity-10',
      change: `${statistics?.averageProcessingTime}s promedio`
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="BarChart3" size={24} className="text-primary mr-3" />
        <h3 className="text-lg font-semibold text-text-primary">
          Estadísticas de Uso
        </h3>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-text-primary">{stat?.value}</p>
              <p className="text-sm font-medium text-text-secondary">{stat?.title}</p>
              <p className="text-xs text-text-secondary">{stat?.change}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Storage Usage */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-medium text-text-primary">Uso de Almacenamiento</h4>
          <span className="text-sm text-text-secondary">
            {formatFileSize(statistics?.storageUsed)} de {formatFileSize(statistics?.storageLimit)}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              getUsagePercentage(statistics?.storageUsed, statistics?.storageLimit) > 80 
                ? 'bg-error' 
                : getUsagePercentage(statistics?.storageUsed, statistics?.storageLimit) > 60 
                ? 'bg-warning' :'bg-success'
            }`}
            style={{ width: `${getUsagePercentage(statistics?.storageUsed, statistics?.storageLimit)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary">
          <span>0%</span>
          <span>{getUsagePercentage(statistics?.storageUsed, statistics?.storageLimit)?.toFixed(1)}% usado</span>
          <span>100%</span>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-text-primary mb-3">
          Clasificaciones por Categoría
        </h4>
        
        <div className="space-y-3">
          {statistics?.categoryBreakdown?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: category?.color }} />
                <span className="text-sm font-medium text-text-primary">{category?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(category?.count / statistics?.totalClassifications) * 100}%`,
                      backgroundColor: category?.color 
                    }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-12 text-right">
                  {category?.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <h4 className="text-md font-medium text-text-primary mb-3">
          Actividad Reciente
        </h4>
        
        <div className="space-y-3">
          {statistics?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${activity?.bgColor} flex items-center justify-center mr-3`}>
                  <Icon name={activity?.icon} size={14} className={activity?.color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{activity?.action}</p>
                  <p className="text-xs text-text-secondary">{activity?.details}</p>
                </div>
              </div>
              <span className="text-xs text-text-secondary">
                {formatDate(activity?.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Account Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-text-secondary">Cuenta creada</p>
            <p className="text-sm font-medium text-text-primary">
              {formatDate(statistics?.accountCreated)}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Último acceso</p>
            <p className="text-sm font-medium text-text-primary">
              {formatDate(statistics?.lastLogin)}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Días activos</p>
            <p className="text-sm font-medium text-text-primary">
              {statistics?.activeDays} días
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageStatisticsSection;
