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
    <div className="resume-print-root">
      <div
        id="resume-preview"
        className={`resume-page bg-white ${classes}`}
      >
        <SelectedTemplate
          data={data}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
};

export default ResumePreview;
