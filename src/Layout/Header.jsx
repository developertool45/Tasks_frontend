import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import apiClient from "../../service/ApiClient";
import "./Layout.css";

export default function Header() {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();
  // login check
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      console.log("user not logged in");
    }
    if (!user) {
      apiClient.getProfile().then((res) => {
        if (res.success) {
          setUser(res.data);
        }
      });
    }
  }, []);
  // logout
  const handleLogout = async () => {
    await apiClient.logout();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar-menu">
        <ul className="nav-items ">
          <li>
            <NavLink to="/">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>Home</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-projects">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>
                  All Projects
                </span>
              )}
            </NavLink>
          </li>
          {user && (
            <>
              {/* <li>
                <NavLink to="/create-project">
                  {({ isActive }) => (
                    <span className={isActive ? "nav-active" : ""}>
                      Add New Project
                    </span>
                  )}
                </NavLink>
              </li> */}

              <li>
                <NavLink to="/project-reports">
                  {({ isActive }) => (
                    <span className={isActive ? "nav-active" : ""}>
                      Project Reports
                    </span>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="nav-items ">
          {user ? (
            <>
              <li>
                <NavLink to="/profile">
                  {({ isActive }) => (
                    <span className={isActive ? "nav-active" : ""}>
                      Profile
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">
                  {({ isActive }) => (
                    <span className={isActive ? "nav-active" : ""}>Signup</span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  {({ isActive }) => (
                    <span className={isActive ? "nav-active" : ""}>Login</span>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
