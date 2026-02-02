import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useMemo } from "react";

const MinimalImageTemplate = ({ data = {}, accentColor = "#16a34a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  /* Image handling (SAFE) */
  const imageUrl = useMemo(() => {
    const img = data.personal_info?.image;
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object") return URL.createObjectURL(img);
    return null;
  }, [data.personal_info?.image]);

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="w-full h-full bg-white text-zinc-800 print:min-h-[297mm]">
      <div className="grid grid-cols-3 h-full">

        {/* IMAGE COLUMN */}
        <div className="col-span-1 pt-6 pb-4 flex justify-center print:items-center print:pt-10">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full"
              style={{ background: accentColor + "70" }}
            />
          )}
        </div>

        {/* NAME + TITLE */}
        <div className="col-span-2 flex flex-col justify-center pt-6 pb-4 px-8">
          <h1 className="text-3xl font-bold tracking-widest text-zinc-700">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest mt-1">
            {data.personal_info?.profession || "Profession"}
          </p>
        </div>

        {/* LEFT SIDEBAR */}
        <aside className="col-span-1 border-r border-zinc-300 px-6 pb-6 pt-2">

          {/* CONTACT */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* EDUCATION */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-3 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="col-span-2 px-8 pb-6 pt-2">

          {/* SUMMARY */}
          {data.professional_summary && (
            <section className="mb-6">
              <h2
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed text-sm">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>

              <div className="space-y-4 mb-6">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-zinc-900 text-sm">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>

                    <p className="text-sm mb-1" style={{ color: accentColor }}>
                      {exp.company}
                    </p>

                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {Array.isArray(data.project) && data.project.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>

              <div className="space-y-3">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium text-zinc-800 mt-2">
                      {project.name}
                    </h3>

                    {project.type && (
                      <p className="text-sm mb-1" style={{ color: accentColor }}>
                        {project.type}
                      </p>
                    )}

                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
