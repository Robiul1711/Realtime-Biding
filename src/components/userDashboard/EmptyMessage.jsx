import React from "react";

export const EmptyMessage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-blue-200 animate-ping opacity-75"></span>
          <div className="flex items-center justify-center w-full h-full rounded-full bg-blue-500 text-white shadow-lg relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h5m-5 4h10M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.286-.99L3 20l1.317-3.95A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Start a Chat</h2>
        <p className="text-gray-500 max-w-xs">
          Select a contact or open a conversation to begin messaging.
        </p>
      </div>
    </div>
  );
};
