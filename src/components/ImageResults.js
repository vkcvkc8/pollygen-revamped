import React from "react";

function ImageResults({ images, onImageClick }) {
  return (
    <div
      id="imageResults"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 transition-all ${
        images.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {images.map((url, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800/30 group"
        >
          <img
            src={url}
            alt={`Generated image ${index + 1}`}
            className="w-full rounded-xl generated-image loaded cursor-zoom-in"
            onClick={() => onImageClick(url)}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageResults;