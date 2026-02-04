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
  const SelectedTemplate =
    TEMPLATE_MAP[template] || ClassicTemplate;

  return (
    <div className="resume-print-root bg-gray-100 py-6">
      <div
        id="resume-preview"
        className={`resume-page bg-white mx-auto ${classes}`}
        style={{ maxWidth: "210mm" }}
      >
        <SelectedTemplate
          data={data}
          accentColor={accentColor}
        />
      </div>

      {/*  PRINT / PDF  */}
      <style>
        {`
        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          html,
          body {
            width: 210mm;
            height: auto;
            margin: 0;
            padding: 0;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: relative;
            width: 100%;
            min-height: auto;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
          }

          /* prevent bottom cut */
          section,
          article,
          .resume-section {
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
