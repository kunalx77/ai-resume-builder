import React from "react";
import Title from "./Title";

const Features = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12"
      aria-label="Features"
    >
      {/* Our Process badge */}
      <div className="flex items-center gap-2 border border-green-200 rounded-full px-6 py-1.5 text-sm text-green-600 bg-green-50">
        <span className="size-1.5 rounded-full bg-green-500"></span>
        <span>Our Process</span>
      </div>

      <Title
        title="Build Your Resume."
        description="Design a professional-grade resume in minutes with our streamlined, AI-driven tools."
      />

      {/* Main section */}
      <div className="max-md:px-4 mt-32">

        {/* Heading */}
        <p
          className="bg-gradient-to-r from-slate-800 to-[#4D6EA3]
                     text-transparent bg-clip-text
                     text-3xl text-center mx-auto max-w-2xl font-medium"
        >
          Trusted by world’s leading companies.
        </p>

        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center max-h-[450px] gap-6 mt-6">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-7.svg"
            alt="Resume building workflow illustration"
            loading="lazy"
            className="hover:-translate-y-1 transition-all duration-300"
          />

          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-8.svg"
            alt="AI resume builder preview"
            loading="lazy"
            className="hover:-translate-y-1 transition-all duration-300 max-md:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
