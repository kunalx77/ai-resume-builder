import React from "react";

import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  "minimal-image": MinimalImageTemplate,
  classic: ClassicTemplate,
  sidebar: SidebarTemplate,
};

const ResumePreview = ({
  data,
  template = "classic",
  accentColor,
  classes = "",
}) => {
  const SelectedTemplate = TEMPLATE_MAP[template] || ClassicTemplate;

  return (
    <div className="resume-print-root flex justify-center bg-gray-100 py-6">
      <div
        id="resume-preview"
        className={`bg-white ${classes}`}
        style={{
          width: "210mm",
          padding: "0",
        }}
      >
        <SelectedTemplate data={data} accentColor={accentColor} />
      </div>

      {/* PRINT RULES */}
      <style>
        {`
          @page {
            size: A4;
            margin: 10mm;
          }

          @media print {
            html,
            body {
              margin: 0;
              padding: 0;
              background: white;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              top: 0;
              left: 0;
              width: 210mm;
              box-shadow: none !important;
              border: none !important;
            }

            /* Prevent section cuts */
            section,
            article,
            div {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
