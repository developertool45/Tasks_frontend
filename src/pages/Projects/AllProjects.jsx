import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { Link } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import CreateProject from "./CreateProject";


const allProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your API URL
    apiClient
      .getAllProjects()
      .then((res) => {
        console.log("sare projects", res);
        return setProjects(res.data);
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

      if (!res.success) return console.log(res.message);
      setRefresh((prev) => !prev);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600">Loading projects...</div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex">
        <div className="p-6 w-1/3 mx-auto">
          <CreateProject setRefresh={setRefresh} />
        </div>
        <div className="p-6 w-2/3 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📋 All Projects
          </h2>

          {projects.length === 0 ? (
            <div>
              <p className="text-gray-500">No projects found.</p>
              <p className="text-blue-600  mt-2 cursor-pointer">
                Create a new project{" "}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className=" flex justify-between border rounded-xl shadow-sm p-4 hover:shadow-md transition bg-white"
                >
                  <div className="w-3/4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      <span>{index + 1}. </span>
                      {project.name || project.project.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {project.description || project.project.description}
                    </p>
                    <div className="text-sm text-gray-400 mt-2">
                      User :{" "}
                      {project.user?.fname ? project.user.fname : "Anonymous"}
                      {""} |{" "}
                      {project.project
                        ? new Date(project.project.createdAt).toLocaleString()
                        : new Date().toLocaleString()}
                    </div>
                  </div>
                  <div className=" w-1/4 flex flex-col items-end gap-2 text-sm">
                    <Link
                      to={`/projects/${project.project._id}`}
                      className="w-16 text-center bg-blue-200 px-2 py-1 hover:bg-blue-300 rounded"
                    >
                      View
                    </Link>
                    <Link
                      to={`/projects/${project.project._id}/edit`}
                      className="w-16 text-center bg-orange-200 px-2 py-1 hover:bg-orange-300 rounded"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(project.project._id)}
                      className="w-16 text-center bg-red-200 px-2 py-1 hover:bg-red-300 rounded"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default allProjects;
