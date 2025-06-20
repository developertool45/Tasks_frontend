import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import apiClient from "../../service/ApiClient";
import { toast } from "react-toastify";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      console.log("User not logged in");
    }
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
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-700 tracking-wide">
        <NavLink to="/">Task Manager</NavLink>
      </div>

      <nav className="flex gap-6 items-center">
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
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

        <ul className="flex gap-4 border-l pl-4 ml-4">
          {user ? (
            <>
              <li>
                <NavLink
                  to="/profile"
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
                  onClick={handleLogout}
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
