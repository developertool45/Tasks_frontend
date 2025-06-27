import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import {
  BookmarkCheck,
  ChartNoAxesColumn,
  FolderOpenDot,
  Pencil,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
const ViewProject = () => {
  const navigate = useNavigate();
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
      <h1 className="text-3xl font-semibold text-gray-500 mb-6 flex items-center gap-2">
        <FolderOpenDot color="#f59e0b" /> <span>Project Details</span>
      </h1>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Left */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 font-medium text-sm">Project Name :-</p>
            <p className="text-xl font-semibold text-blue-500 ps-4">
              {project.name}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-sm">Description :-</p>
            <p className="text-gray-400 text-sm ps-4">{project.description}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-sm">Managed By :-</p>
            <p className="text-gray-400 font-medium text-sm ps-4">
              {project.createdBy?.fname || "user"}
            </p>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="  border rounded-lg p-5 space-y-3 shadow-sm">
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
              className={`font-semibold uppercase  ${
                project.status === "completed"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {project.status || "Not set"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Due Date:</span>
            <span className="text-orange-700 font-semibold">
              {project.dueDate.split("T")[0].toLocaleString() || "Not set"}
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
        <div className="flex gap-3 flex-wrap ">
          <Link to={`/projects/${id}/tasks`}>
            <button className="w-fit text-sm  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <BookmarkCheck size={16} /> View Tasks
            </button>
          </Link>
          <Link to={`/projects/${id}/edit`}>
            <button className="flex items-center gap-2 w-fit text-sm  bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
              <Pencil size={16} /> Edit Project
            </button>
          </Link>
          <Link to={`/projects/${id}/members`}>
            <button className="flex items-center gap-2 w-fit text-sm  bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              <UserRound size={16} /> View Members
            </button>
          </Link>
          <Link to={`/projects/${id}/report`}>
            <button className=" flex items-center gap-2 w-fit text-sm  bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              <ChartNoAxesColumn size={16} /> Task Summary
            </button>
          </Link>
          <Link
            to={`/all-projects`}
            className=" w-fit text-sm  bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
