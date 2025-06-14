import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { Link } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

const allProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your API URL
    apiClient
      .getAllProjects()
      .then((res) => {
        console.log(res);
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await apiClient.deleteProject(id);

      if (!res.success) return console.log(res.message);

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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 All Projects</h2>

      {projects.length === 0 ? (
        <div>
          <p className="text-gray-500">No projects found.</p>
          <Link
            to="/create-project"
            className="text-blue-600 hover:underline mt-2"
          >
            Create a new project{" "}
          </Link>
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
                  {project.name}
                </h3>
                <p className="text-gray-600 mt-1">{project.description}</p>
                <div className="text-sm text-gray-400 mt-2">
                  Created by: {project.createdBy?.fname || "Unknown"} •{" "}
                  {new Date(project.createdAt).toLocaleString()}
                </div>
              </div>
              <div className=" w-1/4 flex flex-col items-end">
                <Link
                  to={`/projects/${project._id}`}
                  className=" bg-blue-100 px-2 py-1 text-blue-600 hover:bg-blue-200 hover:underline"
                >
                  View
                </Link>
                <Link
                  to={`/projects/${project._id}/edit`}
                  className="text-blue-600 hover:underline mt-2 bg"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:underline ml-2"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default allProjects;
