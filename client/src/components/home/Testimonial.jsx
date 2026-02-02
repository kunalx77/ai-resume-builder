import React, { useRef, useState } from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    title: "Frontend Developer",
    message:
      "Integrating this component into our resume was seamless and saved us countless hours of building resume. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    name: "Jane Smith",
    title: "Full Stack Engineer",
    message:
      "This resume-builder not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    name: "Bonnie Green",
    title: "UX Designer",
    message:
      "I was impressed with how intuitive and flexible the design was. It allowed us to rapidly make resumes with confidence.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  },
];

const Testimonial = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const bounds = cardRefs.current[index]?.getBoundingClientRect();
    if (!bounds) return;

    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: testimonials[index].name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      {/*  HEADER  */}
      <section
        id="testimonials"
        className="flex flex-col items-center my-10 scroll-mt-12"
        aria-label="User testimonials"
      >
        <div className="flex items-center gap-2 border border-green-200 rounded-full px-6 py-1.5 text-sm text-green-600 bg-green-50">
          <span className="size-1.5 rounded-full bg-green-500" />
          <BookUserIcon className="size-4.5 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="Don’t just take our word for it. Experience it firsthand."
          description="See what our users are saying. We’re constantly improving, and your positive experience can help others—leave a review."
        />
      </section>

      {/*  CARDS  */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-16">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.name}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            className="relative border border-gray-200 rounded-lg max-w-sm
                       hover:border-green-400 hover:shadow-green-100
                       hover:shadow-lg transition-all duration-300"
          >
            {/* Tooltip */}
            {tooltip.visible && tooltip.text === testimonial.name && (
              <span
                className="absolute z-10 px-2.5 py-1 text-sm rounded
                           bg-green-500 text-white pointer-events-none"
                style={{ top: tooltip.y + 8, left: tooltip.x + 8 }}
              >
                {tooltip.text}
              </span>
            )}

            <div className="flex flex-col items-center p-8 text-center">
              <p className="my-4 text-sm line-clamp-3 text-gray-600">
                {testimonial.message}
              </p>

              <div className="flex items-center mt-4">
                <img
                  className="rounded-full w-9 h-9 object-cover"
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  loading="lazy"
                />
                <div className="ml-3 text-left">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Testimonial;
