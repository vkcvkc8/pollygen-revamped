import React, { useState } from "react";

function ImageResults({ images, onImageClick }) {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (url) => {
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  return (
    <div id="imageResults" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${images.length > 0 ? 'show' : ''}`}>
      {images.map((url, index) => (
        url && // Only render if URL exists (not null)
        <div 
          key={`${url}-${index}`} 
          className="image-container rounded-lg overflow-hidden"
        >
          {!loadedImages[url] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="spinner"></div>
            </div>
          )}
          <img
            src={url}
            alt={`Generated image ${index + 1}`}
            className={`generated-image ${loadedImages[url] ? 'loaded' : ''}`}
            onLoad={() => handleImageLoad(url)}
            onClick={() => onImageClick(url)}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageResults;