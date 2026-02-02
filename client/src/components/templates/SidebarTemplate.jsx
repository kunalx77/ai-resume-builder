import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ElegantSidebarTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 grid grid-cols-3">

      {/* LEFT SIDEBAR */}
      <aside
        className="col-span-1 p-6 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-2xl font-bold mb-1">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <p className="text-sm opacity-90 mb-6">
          {data.personal_info?.profession || "Professional Title"}
        </p>

        {/* Contact */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
            Contact
          </h2>

          <div className="space-y-2 text-sm">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>{data.personal_info.email}</span>
              </div>
            )}

            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}

            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{data.personal_info.location}</span>
              </div>
            )}

            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} />
                <span className="break-all text-xs">
                  {data.personal_info.linkedin}
                </span>
              </div>
            )}

            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span className="break-all text-xs">
                  {data.personal_info.website}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
              Skills
            </h2>
            <ul className="space-y-1 text-sm">
              {data.skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* RIGHT CONTENT */}
      <main className="col-span-2 p-8">

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-3"
              style={{ color: accentColor }}
            >
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-4"
              style={{ color: accentColor }}
            >
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p
                    className="text-sm font-medium"
                    style={{ color: accentColor }}
                  >
                    {exp.company}
                  </p>

                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {Array.isArray(data.project) && data.project.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-4"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            <div className="space-y-4">
              {data.project.map((proj, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-sm text-gray-700">
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
          <section>
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-4"
              style={{ color: accentColor }}
            >
              Education
            </h2>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-500">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default ElegantSidebarTemplate;
