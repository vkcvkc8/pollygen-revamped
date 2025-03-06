import React, { useState } from "react";

function TermsModal({ onAccept }) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAccept = () => {
    if (checkboxChecked) {
      localStorage.setItem("termsAccepted", "true");
      onAccept();
    }
  };

  return (
    <div id="termsModal" className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
          Welcome to ZEN AI
        </h2>

        {/* Usage Instructions */}
        <div className="terms-section mb-4">
          <button
            className="w-full flex items-center justify-between p-4 bg-black/30 rounded-xl hover:bg-black/40 transition-colors"
            onClick={() => toggleSection("usage")}
          >
            <span className="font-medium">How to Use</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections["usage"] ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`terms-content mt-4 pl-4 text-gray-300 space-y-2 ${expandedSections["usage"] ? "" : "hidden"}`}>
            <p>1. Enter a descriptive prompt for your desired image</p>
            <p>2. Click "Enhance Prompt" to add artistic details (optional)</p>
            <p>3. Select your preferred AI model and number of images</p>
            <p>4. Use advanced options to set dimensions or upload a reference image</p>
            <p>5. Click "Generate Images" to create your artwork</p>
            <p className="mt-4 text-sm text-gray-400">Tip: Use Shift + Enter to enhance, Enter to generate</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="terms-section mb-4">
          <button
            className="w-full flex items-center justify-between p-4 bg-black/30 rounded-xl hover:bg-black/40 transition-colors"
            onClick={() => toggleSection("terms")}
          >
            <span className="font-medium">Terms & Conditions</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections["terms"] ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`terms-content mt-4 pl-4 text-gray-300 space-y-2 ${expandedSections["terms"] ? "" : "hidden"}`}>
            <p>By using this service, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Not generate or attempt to generate illegal or harmful content</li>
              <li>Accept that generated images are subject to Pollinations AI's terms</li>
              <li>Use generated content responsibly and ethically</li>
              <li>Acknowledge that results may vary and aren't guaranteed</li>
            </ul>
          </div>
        </div>

        {/* Remix Policy */}
        <div className="terms-section mb-6">
          <button
            className="w-full flex items-center justify-between p-4 bg-black/30 rounded-xl hover:bg-black/40 transition-colors"
            onClick={() => toggleSection("remix")}
          >
            <span className="font-medium">Remix & Usage Rights</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections["remix"] ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`terms-content mt-4 pl-4 text-gray-300 space-y-2 ${expandedSections["remix"] ? "" : "hidden"}`}>
            <p>Generated images are provided under the following conditions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Images can be freely used and modified</li>
              <li>Commercial use is permitted</li>
              <li>Attribution is appreciated but not required</li>
              <li>You cannot claim AI-generated images as solely your own artwork</li>
            </ul>
            <p className="mt-4"><strong>About this WebSim project:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>This project is open for remixing and modification</li>
              <li>You must retain attribution to the original creator</li>
              <li>You cannot simply rename it and claim it as your own work</li>
              <li>If you make significant improvements, add your name as a contributor</li>
              <li>Share your improvements with the community to help others</li>
            </ul>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center justify-center gap-3 mb-6 py-2">
          <div className="flex items-center">
            <div className="custom-checkbox relative">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              <label 
                htmlFor="termsCheckbox" 
                className="custom-checkbox-label"
                aria-label="Accept terms and conditions"
              ></label>
            </div>
            <label htmlFor="termsCheckbox" className="text-sm ml-3 cursor-pointer select-none">
              I have read and agree to the usage guidelines, terms & conditions, and remix policy
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <button
          disabled={!checkboxChecked}
          onClick={handleAccept}
          className={`w-full bg-gradient-to-r text-white px-8 py-4 rounded-xl transition-all transform flex items-center justify-center gap-3 ${
            checkboxChecked
              ? "from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:scale-[1.02] hover:shadow-xl"
              : "from-purple-600/50 to-purple-700/50 text-white/50 cursor-not-allowed"
          }`}
        >
          <span>Continue to ZEN AI</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TermsModal;