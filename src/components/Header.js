import React from "react";

function Header({ apiStatus }) {
  return (
    <header className="py-6 px-4 backdrop-blur-xl bg-black/40 fixed w-full z-10 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/20">
            <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient text-transparent bg-clip-text">
              ZEN AI
            </h1>
            <p className="text-xs text-gray-400">Made by Vaibhav Chopra</p>
          </div>
        </div>
        <div className="flex items-center gap-2" id="apiStatus">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded-full border border-white/10">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                apiStatus === "APIs Online" ? "bg-green-500" : apiStatus === "APIs Offline" ? "bg-red-500" : "bg-gray-500"
              }`}
              id="apiStatusDot"
            ></div>
            <span className="text-sm text-gray-400" id="apiStatusText">
              {apiStatus}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;