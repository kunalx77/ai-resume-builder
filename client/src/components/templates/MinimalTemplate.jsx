const MinimalTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full bg-white text-gray-900 font-light px-6 py-6 text-sm">

      {/* Header */}
      <header className="mb-8 break-inside-avoid">
        <h1 className="text-4xl font-thin mb-3 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-8 break-inside-avoid">
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-8">
          <h2
            className="uppercase tracking-widest mb-4 font-medium text-xs"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-base">
                    {exp.position}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <p className="text-gray-600 mb-1">
                  {exp.company}
                </p>

                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {Array.isArray(data.project) && data.project.length > 0 && (
        <section className="mb-8 break-inside-avoid">
          <h2
            className="uppercase tracking-widest mb-4 font-medium text-xs"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">
            {data.project.map((proj, index) => (
              <div key={index}>
                <h3 className="font-medium text-base">
                  {proj.name}
                </h3>
                {proj.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mb-8 break-inside-avoid">
          <h2
            className="uppercase tracking-widest mb-4 font-medium text-xs"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline"
              >
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-500">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills — SAFE & NEVER CUT */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section className="break-inside-avoid">
          <h2
            className="uppercase tracking-widest mb-3 font-medium text-xs"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
