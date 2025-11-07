import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryStats = ({ categories }) => {
  const totalCategories = categories?.length;
  const activeCategories = categories?.filter(cat => cat?.status === 'active')?.length;
  const totalClassifications = categories?.reduce((sum, cat) => sum + cat?.totalClassifications, 0);
  const averageAccuracy = categories?.length > 0 
    ? Math.round(categories?.reduce((sum, cat) => sum + cat?.accuracy, 0) / categories?.length)
    : 0;

  const stats = [
    {
      label: 'Total de Categorías',
      value: totalCategories,
      icon: 'Grid3X3',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Categorías Activas',
      value: activeCategories,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Clasificaciones Totales',
      value: totalClassifications?.toLocaleString(),
      icon: 'BarChart3',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Precisión Promedio',
      value: `${averageAccuracy}%`,
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center mr-3`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">
                {stat?.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat?.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;
