import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import apiClient from "../../service/ApiClient";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // icon package like lucide or use emoji/svg

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      apiClient.getProfile().then((res) => {
        if (res.success) {
          setUser(res.data);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    const res = await apiClient.logout();
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-sm">
      <NavLink to="/" className="text-2xl font-bold text-blue-700">
        Task Manager
      </NavLink>

      <div className="lg:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white border-t py-4 px-6 lg:border-0 lg:static lg:flex lg:items-center lg:justify-end lg:w-auto lg:space-x-8`}
      >
        <ul className="flex flex-col gap-3 lg:flex-row lg:gap-6">
          <li>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-projects"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              All Projects
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/task-summary"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                Project Reports
              </NavLink>
            </li>
          )}
        </ul>

        <ul className="mt-4 lg:mt-0 flex flex-col gap-3 lg:flex-row lg:gap-4 lg:ml-6 lg:pl-6 lg:border-l">
          {user ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-500"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-500"
                  }
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-500"
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
