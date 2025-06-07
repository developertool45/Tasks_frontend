import React from 'react'
import {  NavLink} from 'react-router-dom'

export default function Header() {
  return (
    <>
      <nav className=" bg-blue-500 py-2 h-screen px-4 d-flex flex-col text-white text-xl ">
        <ul className="flex flex-col align-center gap-1 ">
          <li>
            <NavLink to="/register">
              {({ isActive }) => (
                <span className={isActive ? "text-yellow-500" : ""}>
                  Signup
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              {({ isActive }) => (
                <span className={isActive ? "text-yellow-500" : ""}>Login</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">
              {({ isActive }) => (
                <span className={isActive ? "text-yellow-500" : ""}>Home</span>
              )}
            </NavLink>
          </li>
        </ul>

        <ul>
          <li>
            <NavLink to="/listings">Listings</NavLink>
          </li>
          <li>
            <NavLink to="/listings">Listings</NavLink>
          </li>
          <li>
            <NavLink to="/listings">Listings</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
