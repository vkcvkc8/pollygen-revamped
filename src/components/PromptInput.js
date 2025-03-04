import React, { useState } from "react";

function PromptInput({
  prompt,
  setPrompt,
  enhancePrompt,
  generateImages,
  model,
  setModel,
  imageCount,
  setImageCount,
  referenceImage,
  setReferenceImage,
  presets,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const validateDimension = (value) => {
    let num = parseInt(value);
    if (num < 64) num = 64;
    else if (num > 2048) num = 2048;
    return Math.round(num / 64) * 64 || "";
  };

  const handleAspectRatio = (widthVal, heightVal) => {
    setWidth(widthVal);
    setHeight(heightVal);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setReferenceImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
      <textarea
        id="promptInput"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            generateImages();
          } else if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            enhancePrompt();
          }
        }}
        className="w-full bg-black/30 text-white rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none border border-white/10"
        rows="3"
        placeholder="Describe your imagination in vivid detail..."
      />
      <div className="mb-6">
        <label className="text-sm text-gray-400 ml-1 mb-2 block font-medium">Style Presets</label>
        <div id="presets" className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([name, suffix]) => (
            <button
              key={name}
              className="preset-btn px-4 py-2 rounded-lg text-sm capitalize"
              onClick={() => setPrompt(prompt ? `${prompt}, ${suffix}` : suffix)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400 ml-1 font-medium">AI Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-black/30 text-white rounded-xl p-4 border border-white/10"
          >
            <option value="flux">Flux (Default)</option>
            <option value="turbo">Turbo</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400 ml-1 font-medium">Image Count</label>
          <select
            value={imageCount}
            onChange={(e) => setImageCount(parseInt(e.target.value))}
            className="w-full bg-black/30 text-white rounded-xl p-4 border border-white/10"
          >
            <option value={1}>1 Image</option>
            <option value={2}>2 Images</option>
            <option value={4}>4 Images</option>
            <option value={6}>6 Images</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <svg
            className={`w-4 h-4 transform transition-transform ${isAdvancedOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          Advanced Configuration
        </button>
        {isAdvancedOpen && (
          <div className="mt-4 space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1 font-medium">Reference Image</label>
              <div className="flex items-center gap-4">
                <input type="file" id="referenceImage" accept="image/*" className="hidden" onChange={handleFileUpload} />
                {!referenceImage ? (
                  <button
                    onClick={() => document.getElementById("referenceImage").click()}
                    className="bg-black/30 text-white rounded-xl p-4 border border-white/10 hover:bg-black/40 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Upload Reference Image
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      src={referenceImage}
                      alt="Selected image"
                      className="w-16 h-16 object-cover rounded-lg cursor-zoom-in hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => setReferenceImage(null)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1 font-medium">Common Aspect Ratios</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  className="aspect-ratio-btn px-3 py-2 rounded-lg text-sm"
                  onClick={() => handleAspectRatio(1024, 1024)}
                >
                  1:1 Square
                </button>
                <button
                  className="aspect-ratio-btn px-3 py-2 rounded-lg text-sm"
                  onClick={() => handleAspectRatio(1536, 1024)}
                >
                  3:2 Landscape
                </button>
                <button
                  className="aspect-ratio-btn px-3 py-2 rounded-lg text-sm"
                  onClick={() => handleAspectRatio(1024, 1536)}
                >
                  2:3 Portrait
                </button>
                <button
                  className="aspect-ratio-btn px-3 py-2 rounded-lg text-sm"
                  onClick={() => handleAspectRatio(1920, 1080)}
                >
                  16:9 Widescreen
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1 font-medium">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  onBlur={() => setWidth(validateDimension(width))}
                  placeholder="Width (multiple of 64)"
                  min="64"
                  step="64"
                  className="w-full bg-black/30 text-white rounded-xl p-4 border border-white/10 text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1 font-medium">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={() => setHeight(validateDimension(height))}
                  placeholder="Height (multiple of 64)"
                  min="64"
                  step="64"
                  className="w-full bg-black/30 text-white rounded-xl p-4 border border-white/10 text-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={enhancePrompt}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 min-w-[200px]"
        >
          <svg className="w-5 h-5 enhance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Enhance Prompt</span>
        </button>
        <button
          onClick={generateImages}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 min-w-[200px]"
        >
          <svg className="w-5 h-5 generate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Generate Images</span>
        </button>
      </div>PromptInput.js
    </div>
  );
}

export default PromptInput;