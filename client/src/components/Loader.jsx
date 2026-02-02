import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="w-12 h-12 border-4 border-gray-300 border-t-transparent 
                   rounded-full animate-spin"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
