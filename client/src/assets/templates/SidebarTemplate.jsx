import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const SidebarBoldTemplate = ({ data = {}, accentColor = "#2563eb" }) => {

  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 grid grid-cols-3">

      {/*  LEFT SIDEBAR  */}
      <aside
        className="col-span-1 p-6 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-2xl font-semibold mb-1">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm opacity-90 mb-6">
          {data.personal_info?.profession || "Profession"}
        </p>

        {/* CONTACT */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
            Contact
          </h2>

          <div className="space-y-2 text-sm">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span className="break-all">{data.personal_info.email}</span>
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
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 break-all hover:underline"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            )}

            {data.personal_info?.website && (
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 break-all hover:underline"
              >
                <Globe size={14} />
                <span>Website</span>
              </a>
            )}
          </div>
        </section>

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3 opacity-80">
              Skills
            </h2>

            <ul className="space-y-1 text-sm list-disc list-inside">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/*  MAIN CONTENT  */}
      <main className="col-span-2 p-8">

        {/* SUMMARY */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold mb-3 uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold mb-4 uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-sm" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>

                    <span className="text-sm text-gray-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold mb-4 uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            <div className="space-y-4">
              {data.projects.map((proj, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">
                    {proj.name}
                  </h3>

                  {proj.description && (
                    <p className="text-gray-700 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <section>
            <h2
              className="text-lg font-semibold mb-4 uppercase tracking-widest"
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
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-gray-600">
                      {edu.institution}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
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

export default SidebarBoldTemplate;
