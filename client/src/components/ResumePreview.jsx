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
    margin: 8mm;
  }

  @media print {
    html,
    body {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      overflow: hidden;
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
      height: 297mm;
      padding: 0;
      margin: 0;
      overflow: hidden; 
      box-shadow: none !important;
      border: none !important;
    }

    /* Prevent accidental breaks */
    section,
    div {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
`}
</style>
    </div>
  );
};

export default ResumePreview;
