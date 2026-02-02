import React from "react";

const Title = ({ title, description, align = "center" }) => {
  return (
    <header
      className={`mt-6 px-4 text-slate-700 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h2 className="text-3xl sm:text-4xl font-medium">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl mx-auto mt-4 text-slate-500">
          {description}
        </p>
      )}
    </header>
  );
};

export default Title;
