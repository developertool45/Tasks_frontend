import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { Link } from "react-router";


const allProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-xl shadow-sm p-4 hover:shadow-md transition bg-white"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {project.name}
              </h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
              <div className="text-sm text-gray-400 mt-2">
                Created by: {project.createdBy?.fname || "Unknown"} •{" "}
                {new Date(project.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default allProjects;
