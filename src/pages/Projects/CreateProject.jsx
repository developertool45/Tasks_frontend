import React, { useState } from 'react'
import apiClient from '../../../service/ApiClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Context';
import "../auth/style.css";
import { toast } from "react-toastify";
function CreateProject({ setRefresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0] || ""
  );
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const { user } = useAuth();

  const handleProject = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");
    if (!name || !description || !date)
      return setError("all fields are required !");
    if (user && (user.role == "member" || user.role == "user")) {
      toast.error("You are not authorized to create a project!");
      return setError("You are not authorized to create a project!");
    }
    try {
      const res = await apiClient.createProject(name, description, date);
      if (res.success) {
        setRefresh((prev) => !prev);
        toast.success(res.message);
        return setSuccessMsg(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      {" "}
      {user ? (
        <div className="w-full bg-white p-6 rounded-xl shadow-md border">
          <form
            onSubmit={user && handleProject}
            className="flex flex-col space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-800">
              Create a Project
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
              name="dueDate"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
            {successMsg && (
              <p className="text-sm text-green-500">{successMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Create Project
            </button>

            <div className="pt-4 text-sm text-center text-gray-600 space-y-2">
              <p>
                See all projects:{" "}
                <Link
                  to="/all-projects"
                  className="text-blue-600 hover:underline"
                >
                  All Projects
                </Link>
              </p>
              <p>
                Go To Home:{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                  Click Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default CreateProject