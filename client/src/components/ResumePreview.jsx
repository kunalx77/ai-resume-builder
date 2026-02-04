import React, { useEffect, useRef } from "react";

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

const A4_HEIGHT_PX = 1122; // safe printable height

const ResumePreview = ({
  data,
  template = "classic",
  accentColor,
  classes = "",
}) => {
  const SelectedTemplate = TEMPLATE_MAP[template] || ClassicTemplate;
  const previewRef = useRef(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // reset scale
    el.style.transform = "scale(1)";
    el.style.transformOrigin = "top center";

    const contentHeight = el.scrollHeight;

    if (contentHeight > A4_HEIGHT_PX) {
      const scale = A4_HEIGHT_PX / contentHeight;
      el.style.transform = `scale(${scale})`;
    }
  }, [data, template]);

  return (
    <div className="resume-print-root">
      <div
        id="resume-preview"
        ref={previewRef}
        className={`resume-page bg-white ${classes}`}
      >
        <SelectedTemplate data={data} accentColor={accentColor} />
      </div>

      {/* PRINT RULES */}
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
              min-height: 297mm;
              overflow: hidden;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
