import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor = "#2563eb" }) => {

  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">

      {/*  HEADER  */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">

          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:underline"
              >
                {data.personal_info.linkedin}
              </a>
            </div>
          )}

          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:underline"
              >
                {data.personal_info.website}
              </a>
            </div>
          )}

        </div>
      </header>

      {/*  SUMMARY  */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/*  EXPERIENCE  */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>

                {exp.description && (
                  <p className="text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/*  PROJECTS  */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROJECTS
          </h2>

          <ul className="space-y-3">
            {data.projects.map((proj, index) => (
              <li
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <p className="font-semibold text-gray-800">
                  {proj.name}
                </p>
                {proj.description && (
                  <p className="text-gray-600 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*  SKILLS  */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-gray-700">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/*  EDUCATION  */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ClassicTemplate;
