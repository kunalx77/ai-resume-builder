import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Login from "./Login";

import { setLoading, login } from "../app/features/authSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      // Restore auth session 
      dispatch(login({ token, user: null }));
    }

    dispatch(setLoading(false));
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
