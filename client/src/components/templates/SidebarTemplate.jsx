import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const SidebarTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full bg-white text-gray-800 grid grid-cols-3">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className="col-span-1 p-6 text-white flex flex-col break-inside-avoid"
        style={{ backgroundColor: accentColor }}
      >
        {/* NAME */}
        <div className="mb-6 break-inside-avoid">
          <h1 className="text-2xl font-bold leading-tight">
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          <p className="text-sm opacity-90">
            {data.personal_info?.profession || "Professional Title"}
          </p>
        </div>

        {/* CONTACT */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
            Contact
          </h2>

          <div className="space-y-2 text-xs">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail size={13} />
                <span>{data.personal_info.email}</span>
              </div>
            )}

            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={13} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}

            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={13} />
                <span>{data.personal_info.location}</span>
              </div>
            )}

            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={13} />
                <span className="break-all">
                  {data.personal_info.linkedin}
                </span>
              </div>
            )}

            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe size={13} />
                <span className="break-all">
                  {data.personal_info.website}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* SKILLS — NEVER CUT */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
              Skills
            </h2>

            <ul className="space-y-1 text-xs leading-tight">
              {data.skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <main className="col-span-2 p-8 flex flex-col">

        {/* SUMMARY */}
        {data.professional_summary && (
          <section className="mb-6 break-inside-avoid">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-2"
              style={{ color: accentColor }}
            >
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-3"
              style={{ color: accentColor }}
            >
              Experience
            </h2>

            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between text-sm">
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current
                        ? "Present"
                        : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: accentColor }}
                  >
                    {exp.company}
                  </p>

                  {exp.description && (
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
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
          <section className="mb-6 break-inside-avoid">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-3"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            <div className="space-y-3">
              {data.project.map((proj, index) => (
                <div key={index} className="break-inside-avoid">
                  <h3 className="text-sm font-medium text-gray-900">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-sm uppercase tracking-widest font-semibold mb-3"
              style={{ color: accentColor }}
            >
              Education
            </h2>

            <div className="space-y-3 text-sm">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between break-inside-avoid">
                  <div>
                    <p className="font-medium text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p className="text-xs text-gray-600">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
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

export default SidebarTemplate;
