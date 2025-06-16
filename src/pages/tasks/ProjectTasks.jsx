import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Context";
import apiClient from "../../../service/ApiClient";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "todo",
  });
	const [message, setMessage] = useState("");
	const [assignedTo, setAssignedTo] = useState(null);
	
	const fetchTasks = async () => {
	setMessage("");
    try {
		const res = await apiClient.getProjectTasks(projectId);
		console.log("all tasks : ", res);
		
		if (res.success) {
			if (res.data.length === 0) return setMessage("No tasks found");
			return setTasks(res.data);
		}
    } catch (err) {
		setMessage("Error loading tasks",);
		console.log("Error loading tasks", err);
		
    }
  };
  const fetchProjectMembers = async () => {
    try {
      const res = await apiClient.getProjectMembers(projectId);
      if (res.success) {
        setMembers(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch members");
    }
  };
  useEffect(() => {
	  fetchTasks();
	  fetchProjectMembers();
  }, [projectId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
	  e.preventDefault();
	  setMessage("");
    try {
      const options = {
        ...formData,        
		projectId: projectId,
		assignedTo: assignedTo
      };
      const res = await apiClient.createTask(options);
      if (res.success) {
        setMessage("Task created!");
        fetchTasks(); // Refresh list
        setFormData({
          title: "",
          description: "",
          assignedTo: "",
          status: "todo",
        });
      } else {
        setMessage(res.message);
      }
    } catch (err) {
		setMessage("Task creation failed!");
		console.log(err);
		
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Left - Form */}
      <div className="w-1/3 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Create Task</h2>
        {message && <p className="text-sm text-blue-600 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <label className="block mb-1">Assign To</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option key={member.user._id} value={member.user._id}>
                {member.user.fname} ({member.user.email})
              </option>
            ))}
          </select>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="todo">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Right - Tasks List */}
      <div className="w-2/3 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">All Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={task._id} className="border p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2 text-xl text-blue-600">
                  {index + 1}. {task.title}
                </h3>
                <p className="text-md text-gray-600 ">
                  Description :{" "}
                  <span className="text-gray-500">{task.description}</span>
                </p>
                <p className="text-sm py-4">
                  <span className="text-gray-600 bg-gray-200 px-2 py-1 rounded">
                    Assigned To :{" "}
                    <span className="text-gray-600 font-semibold">
                      {task.assignedTo?.fname || "N/A"}
                    </span>
                  </span>{" "}
                  |{" "}
                  <span className="text-gray-700 px-2 py-1 rounded text-[18px]">
                    {" "}
                    Status : <span className={` px-2 py-1 rounded ${task.status === "done" ? " bg-green-200" : " bg-orange-200"}`}>{task.status}</span>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
