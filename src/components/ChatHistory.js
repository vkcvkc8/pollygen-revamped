import React from "react";

function ChatHistory({ chatHistory }) {
  return (
    <div
      id="chatHistory"
      className={`space-y-4 transition-all ${chatHistory.length > 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
        >
          <div className="text-gray-400 mb-2">Original: {msg.role === "user" ? msg.content : ""}</div>
          <div className="text-green-400">Enhanced: {msg.role === "assistant" ? msg.content : ""}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;