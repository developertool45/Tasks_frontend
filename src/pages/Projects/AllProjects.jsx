import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateProject from "./CreateProject";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Context";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    apiClient
      .getAllProjects()
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const res = await apiClient.deleteProject(id);
      if (!res.success) return toast.error(res.message);
      setRefresh((prev) => !prev);
      toast.success(res.message);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600">Loading projects...</div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <CreateProject setRefresh={setRefresh} />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            📋 All Projects
          </h2>

          {projects.length === 0 ? (
            <div className="text-gray-500">
              <p>No projects found.</p>
              <p className="text-blue-600 mt-2 cursor-pointer">
                Create a new project
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="flex flex-col sm:flex-row justify-between border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
                >
                  <div className="sm:w-3/4">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                      <span>{index + 1}. </span>
                      {project.name || project.project.name}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {project.description || project.project.description}
                    </p>

                    <div className="text-xs sm:text-sm text-gray-500 mt-2">
                      {user?.role === "member"
                        ? "Assigned To: "
                        : "Created By: "}
                      {project.user?.fname || "Anonymous"} |{" "}
                      {project.project?.status !== "completed" ? (
                        <span className="text-red-500 font-medium">
                          Due:{" "}
                          {project.project?.dueDate?.split("T")[0] || "N/A"}
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:w-1/4 flex sm:flex-col gap-2 justify-end">
                    <Link
                      to={`/projects/${project.project._id}`}
                      className="bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded text-center"
                    >
                      View
                    </Link>
                    <Link
                      to={`/projects/${project.project._id}/edit`}
                      className="bg-orange-200 hover:bg-orange-300 px-3 py-1 rounded text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.project._id)}
                      className="bg-red-200 hover:bg-red-300 px-3 py-1 rounded text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
