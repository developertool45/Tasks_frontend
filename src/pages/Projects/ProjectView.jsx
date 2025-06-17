import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";

const ViewProject = () => {
  const { projectId: id } = useParams();
  const [project, setProject] = useState(null);
  const [projectMember, setProjectMember] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const memberRes = await apiClient.getProjectMembers(id);
        if (!memberRes.success) return setError(memberRes.message);
        setProjectMember(memberRes.data);

        const projectRes = await apiClient.getProject(id);
        if (!projectRes.success) return setError(projectRes.message);
        setProject(projectRes.data);
      } catch (error) {
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!project) return null;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📁 <span>Project Details</span>
      </h1>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Left */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Project Name</p>
            <p className="text-xl font-semibold text-orange-500">
              {project.name}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Description</p>
            <p className="text-gray-700">{project.description}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Managed By</p>
            <p className="text-gray-800 font-semibold">
              {project.createdBy?.fname || "Unknown"}
            </p>
          </div>
        </div>

        {/* Right Info Box */}
        <div className=" bg-gray-50 border rounded-lg p-5 space-y-3 shadow-sm">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Created At:</span>
            <span className="text-gray-800">
              {new Date(project.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Last Updated:</span>
            <span className="text-gray-800">
              {new Date(project.updatedAt).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Status:</span>
            <span
              className={`font-bold ${
                project.status === "completed"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {project.status || "Not set"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Members:</span>
            <span className="text-blue-600 font-semibold">
              {projectMember?.length}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to={`/projects/${id}/tasks`}>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              🧾 View Tasks
            </button>
          </Link>
          <Link to={`/projects/${id}/edit`}>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
              ✏️ Edit Project
            </button>
          </Link>
          <Link to={`/projects/${id}/add-member`}>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
              👤 Add Member
            </button>
          </Link>
          <Link to={`/projects/${id}/members`}>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              📋 View Members
            </button>
          </Link>
          <Link to={`/projects/${id}/summary`}>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              📊 Task Summary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
