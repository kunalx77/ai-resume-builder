import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="AI Resume Builder"
            className="h-11 w-auto"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          {user && (
            <p className="max-sm:hidden text-slate-600">
              Hi, <span className="font-medium">{user.name}</span>
            </p>
          )}

          {user && (
            <button
              onClick={logoutUser}
              className="bg-white border border-gray-300 px-6 py-1.5 
                         rounded-full hover:bg-slate-50 
                         active:scale-95 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
