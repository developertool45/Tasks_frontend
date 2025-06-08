import React from 'react'
import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Header() {
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
          <li>
            <NavLink to="/add-project">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>
                  Add New Project
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/project-reports">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>
                  Project Reports
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        <ul className="nav-items ">
          <li>
            <NavLink to="/login">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>LogIn</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              {({ isActive }) => (
                <span className={isActive ? "nav-active" : ""}>SignUp</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
