import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const safeLinkText = (url, remove) => {
    if (typeof url !== "string") return "";
    return url.replace(remove, "");
  };

  return (
    <div className="w-full bg-white text-gray-800 text-sm">

      {/* Header */}
      <header
        className="px-6 py-6 text-white break-inside-avoid"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-light mb-2">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              <span className="break-all text-xs">
                {safeLinkText(data.personal_info.linkedin, "https://www.")}
              </span>
            </a>
          )}

          {data.personal_info?.website && (
            <a
              href={data.personal_info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Globe className="size-4" />
              <span className="break-all text-xs">
                {safeLinkText(data.personal_info.website, "https://")}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6">

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-light mb-2 pb-1 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="pl-4 border-l border-gray-200 break-inside-avoid"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p
                        className="font-medium"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

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
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-4">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="pl-4 border-l break-inside-avoid"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="font-medium text-gray-900">
                    {p.name}
                  </h3>

                  {p.description && (
                    <p className="text-gray-700 leading-relaxed mt-1">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Education */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                Education
              </h2>

              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="break-inside-avoid">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>
                      {edu.institution}
                    </p>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
