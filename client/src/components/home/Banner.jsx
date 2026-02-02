import React from "react";

const Banner = ({
  text = "AI Feature Added",
  badge = "New",
  show = true,
}) => {
  if (!show) return null;

  return (
    <div
      className="w-full py-2.5 font-medium text-sm text-green-800 text-center 
                 bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF]"
      role="status"
      aria-live="polite"
    >
      <p>
        <span className="px-3 py-1 rounded-lg text-white bg-green-600 mr-2">
          {badge}
        </span>
        {text}
      </p>
    </div>
  );
};

export default Banner;
