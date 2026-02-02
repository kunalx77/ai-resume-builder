import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-white via-green-200/60 to-white 
                 py-12 px-4 sm:px-6 lg:px-8 mt-40"
      aria-label="Footer"
    >
      <div className="w-full max-w-7xl mx-auto">

        {/*  TOP SECTION  */}
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

          {/* Logo + Description */}
          <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
            <a href="/" aria-label="AI Resume Builder Home">
              <img
                src="/logo.svg"
                alt="AI Resume Builder logo"
                className="h-11 w-auto"
              />
            </a>

            <div className="w-full max-w-52 h-px mt-8 bg-gradient-to-r from-green-400 via-green-200/60 to-green-400" />

            <p className="text-sm text-black/60 mt-6 max-w-sm leading-relaxed">
              Create modern, professional resumes effortlessly using our
              AI-powered resume builder.
            </p>
          </div>

          {/* Important Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-black font-medium">
              Important Links
            </h3>

            <nav className="flex flex-col gap-2 mt-6">
              {["Home", "About", "Portfolio", "Contact", "FAQ"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-black/60 hover:text-green-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-black font-medium">
              Social Links
            </h3>

            <div className="flex flex-col gap-2 mt-6">
              {[
                { name: "Twitter", url: "https://twitter.com" },
                { name: "Instagram", url: "https://www.instagram.com" },
                { name: "YouTube", url: "https://www.youtube.com" },
                { name: "LinkedIn", url: "https://www.linkedin.com" },
                { name: "GitHub", url: "https://github.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black/60 hover:text-green-600 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-black font-medium">
              Subscribe for news
            </h3>

            <form
              className="flex items-center gap-2 border border-black/20 
                         h-13 max-w-80 w-full rounded-full overflow-hidden mt-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full h-full pl-6 outline-none text-sm 
                           bg-transparent text-black 
                           placeholder-black/50 placeholder:text-xs"
                aria-label="Email address"
              />

              <button
                type="submit"
                className="bg-gradient-to-b from-green-500 to-green-600 
                           hover:from-green-600 hover:to-green-700 
                           active:scale-95 transition 
                           w-56 h-10 rounded-full 
                           text-sm text-white mr-1.5"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/*  DIVIDER  */}
        <div className="w-full h-px mt-16 mb-4 bg-gradient-to-r from-green-400 via-green-200/60 to-green-400" />

        {/*  BOTTOM BAR  */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/60">
            © {new Date().getFullYear()} AI Resume Builder
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-black/60 hover:text-green-600 transition-colors"
            >
              Terms & Conditions
            </a>
            <div className="w-px h-4 bg-black/20" />
            <a
              href="#"
              className="text-xs text-black/60 hover:text-green-600 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
