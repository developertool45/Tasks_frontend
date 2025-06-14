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
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Details</h1>
      <div className="flex justify-between ">
        <div>
          <p className=" text-2xl ">
            <span className="font-semibold text-gray-600">Name:</span>{" "}
            <span className="text-orange-500 ">{project.name}</span>
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            <span className="text-gray-600">{project.description}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600"> Managed By:</span>{" "}
            {project.createdBy.fname}
          </p>
        </div>
        <div className="shadow-lg rounded-sm p-6">
          <p>
            <span className="font-semibold text-gray-600">Created At:</span>{" "}
            {new Date(project.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-600 ">Status:</span>{" "}
            <span
              className={
                project.status === "completed"
                  ? "text-green-600 font-bold"
                  : "text-orange-600 font-bold"
              }
            >
              {project.status || "Not set"}
            </span>
          </p>
          <p className="font-semibold text-gray-600">Members: {projectMember.length}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <Link to={`/projects/${id}/tasks`}>
          {" "}
          <button className="bg-blue-300 hover:bg-blue-400  py-2 px-4 rounded ">
            View Tasks
          </button>{" "}
        </Link>
        <Link to={`/projects/${id}/edit`}>
          {" "}
          <button className="bg-yellow-300 hover:bg-yellow-400  py-2 px-4 rounded ">
            Edit Project
          </button>{" "}
        </Link>
        <Link to={`/projects/${id}/add-member`}>
          {" "}
          <button className="bg-gray-300 hover:bg-gray-600  py-2 px-4 rounded hover:text-white ">
            Add member
          </button>{" "}
        </Link>
        <Link to={`/projects/${id}/members`}>
          {" "}
          <button className="bg-red-300 hover:bg-red-400  py-2 px-4 rounded hover:text-white">
            view members
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};


export default ViewProject