import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageDisplayCard = ({ 
  imageUrl, 
  imageAlt, 
  fileName, 
  fileSize, 
  dimensions,
  onImageClick 
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden elevation-2">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="Image" size={20} className="text-primary mr-2" />
              <h3 className="text-lg font-medium text-text-primary">Imagen Analizada</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="Maximize2"
              onClick={() => setIsImageExpanded(true)}
              className="btn-scale"
            />
          </div>
        </div>

        <div className="p-6">
          <div 
            className="relative bg-muted rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIsImageExpanded(true)}
          >
            <div className="aspect-video w-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-surface rounded-full p-3 elevation-3">
                  <Icon name="Maximize2" size={20} className="text-text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Nombre del archivo:</span>
              <span className="text-text-primary font-medium truncate ml-2">{fileName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Tamaño:</span>
              <span className="text-text-primary font-medium">{formatFileSize(fileSize)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Dimensiones:</span>
              <span className="text-text-primary font-medium">{dimensions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Expansion Modal */}
      {isImageExpanded && (
        <div className="fixed inset-0 z-200 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={() => setIsImageExpanded(false)}
              className="absolute -top-12 right-0 text-white hover:bg-white hover:bg-opacity-20 btn-scale"
            />
            <div className="bg-surface rounded-lg overflow-hidden elevation-4">
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDisplayCard;
