import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full bg-white text-gray-800 leading-relaxed px-6 py-6 text-sm">

      {/* HEADER */}
      <header
        className="text-center mb-5 pb-3 border-b-2 break-inside-avoid"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
          {data.personal_info?.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-3" />
              {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1 break-all">
              <Linkedin className="size-3" />
              {data.personal_info.linkedin}
            </span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1 break-all">
              <Globe className="size-3" />
              {data.personal_info.website}
            </span>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <section className="mb-4 break-inside-avoid">
          <h2 className="font-semibold mb-1" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="pl-3 border-l break-inside-avoid"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {exp.position}
                    </p>
                    <p className="font-medium text-gray-700">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-gray-700">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {Array.isArray(data.project) && data.project.length > 0 && (
        <section className="mb-4 break-inside-avoid">
          <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
            PROJECTS
          </h2>

          <ul className="space-y-2">
            {data.project.map((proj, index) => (
              <li
                key={index}
                className="pl-3 border-l"
                style={{ borderColor: accentColor }}
              >
                <p className="font-semibold text-gray-800">
                  {proj.name}
                </p>
                {proj.description && (
                  <p className="text-gray-600">{proj.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* EDUCATION */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mb-4 break-inside-avoid">
          <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
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

      {/* SKILLS */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section className="break-inside-avoid">
          <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          {/* NO FLEX BUGS — pure wrap */}
          <div className="leading-relaxed text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index} className="mr-2">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
