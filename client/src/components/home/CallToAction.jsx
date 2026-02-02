import React from "react";
import { Link } from "react-router-dom";

const CallToAction = ({
  heading = "Build a professional resume designed to showcase your skills and secure the job you want.",
  buttonText = "Get Started",
  link = "/app?state=register",
}) => {
  return (
    <section
      id="cta"
      className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-20"
      aria-label="Call to action"
    >
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
        
        <p className="text-xl font-medium max-w-md text-slate-800">
          {heading}
        </p>

        <Link
          to={link}
          className="inline-flex items-center gap-2 rounded py-3 px-8 
                     bg-green-600 hover:bg-green-700 transition 
                     text-white font-medium focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <span>{buttonText}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  );
};

export default CallToAction;
