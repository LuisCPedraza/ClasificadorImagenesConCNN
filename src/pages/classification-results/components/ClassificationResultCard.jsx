import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassificationResultCard = ({ 
  primaryResult, 
  alternativeResults = [], 
  onFeedback 
}) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBgColor = (confidence) => {
    if (confidence >= 80) return 'bg-success';
    if (confidence >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden elevation-2">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Icon name="Brain" size={20} className="text-primary mr-2" />
          <h3 className="text-lg font-medium text-text-primary">Resultado de Clasificación</h3>
        </div>
      </div>
      <div className="p-6">
        {/* Primary Result */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-semibold text-text-primary">Categoría Predicha</h4>
            <div className={`text-2xl font-bold ${getConfidenceColor(primaryResult?.confidence)}`}>
              {primaryResult?.confidence}%
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <Icon name="Tag" size={18} className="text-primary mr-2" />
              <span className="text-lg font-medium text-text-primary">{primaryResult?.category}</span>
            </div>
            <div className="w-full bg-border rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${getConfidenceBgColor(primaryResult?.confidence)}`}
                style={{ width: `${primaryResult?.confidence}%` }}
              />
            </div>
          </div>

          {primaryResult?.description && (
            <p className="text-text-secondary text-sm leading-relaxed">
              {primaryResult?.description}
            </p>
          )}
        </div>

        {/* Alternative Results */}
        {alternativeResults?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-text-primary mb-3">Predicciones Alternativas</h4>
            <div className="space-y-3">
              {alternativeResults?.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-text-primary mr-3">
                      #{index + 2}
                    </span>
                    <span className="text-text-primary">{result?.category}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-border rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceBgColor(result?.confidence)}`}
                        style={{ width: `${result?.confidence}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getConfidenceColor(result?.confidence)}`}>
                      {result?.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Section */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">¿Es correcta esta clasificación?</h4>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="ThumbsUp"
              iconPosition="left"
              onClick={() => onFeedback('positive')}
              className="btn-scale"
            >
              Correcto
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ThumbsDown"
              iconPosition="left"
              onClick={() => onFeedback('negative')}
              className="btn-scale"
            >
              Incorrecto
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => onFeedback('comment')}
              className="btn-scale"
            >
              Comentar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationResultCard;
