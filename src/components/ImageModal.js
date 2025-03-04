import React from "react";

function ImageModal({ imageSrc, onClose }) {
  return (
    <div id="imageModal" className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={imageSrc}
          className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl transform scale-95 transition-all duration-300 show"
          alt="Preview"
        />
      </div>
    </div>
  );
}

export default ImageModal;