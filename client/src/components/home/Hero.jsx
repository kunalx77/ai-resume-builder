import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  User,
  Send,
  TrendingUp,
} from "lucide-react";


const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      {/* NAVBAR */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <Link to="/">
          <img
            src="/logo.svg"
            alt="AI Resume Builder logo"
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-800">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#testimonials" className="hover:text-green-600 transition">
            Testimonials
          </a>
          <a href="#cta" className="hover:text-green-600 transition">
            Contact
          </a>
        </div>

        <div className="hidden md:flex gap-2">
          {!user && (
            <>
              <Link
                to="/app?state=register"
                className="px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition rounded-full text-white"
              >
                Get started
              </Link>

              <Link
                to="/app?state=login"
                className="px-6 py-2 border rounded-full text-slate-700 hover:bg-slate-50 transition"
              >
                Login
              </Link>
            </>
          )}

          {user && (
            <Link
              to="/app"
              className="px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition rounded-full text-white"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 text-lg md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#features" className="text-white">
          Features
        </a>
        <a href="#testimonials" className="text-white">
          Testimonials
        </a>
        <a href="#cta" className="text-white">
          Contact
        </a>

        <button
          onClick={() => setMenuOpen(false)}
          className="size-10 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-40 text-black">
        {/* Glow */}
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 bg-green-300 blur-[100px] opacity-30" />

        {/* Social proof */}
        <div className="flex items-center mt-24 gap-3">
          <div className="flex -space-x-3">
            {[
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
              "https://randomuser.me/api/portraits/men/75.jpg",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="User avatar"
                className="size-8 rounded-full border-2 border-white"
              />
            ))}
          </div>

          <div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-green-600">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700">Used by 10,000+ users</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-6 leading-tight">
          Land Your Dream Job With{" "}
          <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Resumes.
        </h1>

        <p className="max-w-md text-center text-base my-7 text-slate-700">
          Create, edit, and download professional resumes with AI-powered
          assistance.
        </p>

        {/* CTA */}
        <Link
          to="/app"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 ring-1 ring-green-400 flex items-center gap-2 transition"
        >
          Get started →
        </Link>

        {/* Job-related icons */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-14 text-green-600 opacity-90">
          <Briefcase className="size-12 hover:scale-110 transition-transform duration-300" />
          <FileText className="size-12 hover:scale-110 transition-transform duration-300" />
          <User className="size-12 hover:scale-110 transition-transform duration-300" />
          <Send className="size-12 hover:scale-110 transition-transform duration-300" />
          <TrendingUp className="size-12 hover:scale-110 transition-transform duration-300" />
          </div>
      </section>
    </div>
  );
};

export default Hero;
