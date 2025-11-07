import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HistoryCard = ({ 
  item, 
  isSelected, 
  onSelect, 
  onView, 
  onExport, 
  onDelete,
  showCheckbox = false 
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-success';
    if (confidence >= 0.6) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBadgeColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-success/10 text-success border-success/20';
    if (confidence >= 0.6) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-error/10 text-error border-error/20';
  };

  return (
    <div 
      className={`
        bg-surface border border-border rounded-lg p-4 transition-all duration-150 hover:elevation-2
        ${isSelected ? 'ring-2 ring-primary border-primary' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        {showCheckbox && (
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(item?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
            />
          </div>
        )}

        {/* Image Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-text-primary truncate">
                {item?.filename}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {formatDate(item?.processedAt)}
              </p>
            </div>

            {/* Quick Actions */}
            <div className={`
              flex items-center space-x-1 transition-opacity duration-150
              ${showActions ? 'opacity-100' : 'opacity-0'}
            `}>
              <Button
                variant="ghost"
                size="xs"
                iconName="Eye"
                onClick={() => onView(item)}
                className="h-8 w-8"
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="Download"
                onClick={() => onExport(item)}
                className="h-8 w-8"
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="Trash2"
                onClick={() => onDelete(item)}
                className="h-8 w-8 text-error hover:text-error"
              />
            </div>
          </div>

          {/* Classification Results */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">
                {item?.predictedCategory}
              </span>
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium border
                ${getConfidenceBadgeColor(item?.confidence)}
              `}>
                {Math.round(item?.confidence * 100)}%
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  item?.confidence >= 0.8 ? 'bg-success' : 
                  item?.confidence >= 0.6 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${item?.confidence * 100}%` }}
              />
            </div>
          </div>

          {/* Category Type */}
          <div className="mt-2 flex items-center space-x-2">
            <Icon name="Tag" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              {item?.categoryType}
            </span>
            {item?.processingTime && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-text-secondary">
                  {item?.processingTime}ms
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;