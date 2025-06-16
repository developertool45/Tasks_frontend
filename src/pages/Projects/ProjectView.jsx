import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient"

const ViewProject = () => {
  const { projectId: id } = useParams();
	const [project, setProject] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
  const [projectMember, setProjectMember] = useState([]);
 
	 useEffect(() => {
     try { 
		 const fetchProject = async () => {        
      const getprojectMember = async (id) => {
        const res = await apiClient.getProjectMembers(id);
        if (!res.success) return setError(res.message);
        console.log(res);
        setProjectMember(res.data);
        setSuccessMsg(res.message);
      };
      getprojectMember(id);
       const res = await apiClient.getProject(id);
				if (!res.success) return setError(res.message);
				console.log(res);			
			 setProject(res.data);
			 setSuccessMsg(res.message);
       };
      
		    fetchProject();
	   } catch (error) {
		 console.log(error);
		 setError(error.message);
	   }finally{
		 setLoading(false);
	   }
	  }, [id]);


  if (!project) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📁 Project Details
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-3">
          <p className="text-xl">
            <span className="font-semibold text-gray-600">Name:</span>{" "}
            <span className="text-orange-500 font-medium">{project.name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Description:</span>{" "}
            <span className="text-gray-700">{project.description}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Managed By:</span>{" "}
            {project.createdBy?.fname || "Unknown"}
          </p>
        </div>

        {/* Right Info Box */}
        <div className="bg-gray-50 rounded-lg shadow p-4 space-y-2 text-sm w-full md:w-1/3">
          <p>
            <span className="font-semibold text-gray-600">Created At : </span>{" "}
            <span className="font-semibold text-gray-800">
              {new Date(project.createdAt).toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Last Updated :</span>{" "}
            <span className="font-semibold text-gray-800">
              {new Date(project.updatedAt).toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Status:</span>{" "}
            <span
              className={`font-bold ${
                project.status === "completed"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {project.status || "Not set"}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Members:</span>{" "}
            {projectMember?.length}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <Link to={`/projects/${id}/tasks`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm">
            View Tasks
          </button>
        </Link>
        <Link to={`/projects/${id}/edit`}>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm">
            Edit Project
          </button>
        </Link>
        <Link to={`/projects/${id}/add-member`}>
          <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-sm">
            Add Member
          </button>
        </Link>
        <Link to={`/projects/${id}/members`}>
          <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md shadow-sm">
            View Members
          </button>
        </Link>
      </div>
    </div>
  );
};


export default ViewProject