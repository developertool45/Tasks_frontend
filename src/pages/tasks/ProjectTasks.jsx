import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import apiClient from "../../../service/ApiClient";
import { toast } from "react-toastify";

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
  const [subtasks, setSubtasks] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
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
      setMessage("Error loading tasks");
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
  }, [refresh]);

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
      toast.error("Task creation failed!");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setMessage("");
    try {
      const res = await apiClient.deleteTask(projectId, id);
      if (res.success) {
        setMessage("Task deleted!");
        fetchTasks();
        toast.success(res.message);
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        setMessage(res.message);
      }
    } catch (err) {
      setMessage("Task deletion failed!");
      toast.error("Task deletion failed!");
      console.log(err);
    }
  };
  //leave right now
  const fetchSubtasks = async (id) => {
    try {
      const res = await apiClient.getSubTasks(projectId, id);
      if (res.success) {
        console.log("subtasks : ", res);
        setSubtasks(res.data);
      }
    } catch (err) {
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
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
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
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Create Task
          </button>
        </form>
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>

      {/* Right - Tasks List */}
      <div className="w-2/3 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">📋 All Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          <ul className="space-y-6">
            {tasks.map((task, index) => (
              <li
                key={task._id}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start gap-4">
                  {/* 🧾 Task Info */}
                  <div className="w-3/4">
                    <h3 className="text-xl font-semibold text-blue-600 mb-1">
                      {index + 1}. {task.title}
                    </h3>

                    <p className="text-gray-700 mb-1">
                      <span className=" text-gray-800">Description :</span>{" "}
                      {task.description}
                    </p>

                    <p className="text-sm text-gray-700 mb-1">
                      <span>Assigned To :</span>{" "}
                      <span className="font-medium uppercase">
                        {task.assignedTo?.fname || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded text-white text-xs ${
                          task.status === "done" || task.status === "completed"
                            ? "bg-green-500"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>

                    <div className="border-[1.2px] border-gray-300 rounded-md bg-gray-50 p-4 w-fit mt-4">
                      <p className="text-sm text-gray-500">
                        Created :{" "}
                        <span className="font-medium">
                          {new Date(task.createdAt).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Last Updated :{" "}
                        <span className="font-medium">
                          {new Date(task.updatedAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 🛠️ Action Buttons */}
                  <div className="w-25 flex flex-col items-end space-y-2 gap-2">
                    <Link
                      to={`/tasks/${projectId}/${task._id}`}
                      className="w-full text-center bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600 transition"
                    >
                      👁️ View
                    </Link>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="w-full text-center bg-orange-500 text-white text-sm py-1 px-3 rounded hover:bg-orange-600 transition"
                    >
                      🗑️ Delete
                    </button>

                    <Link
                      to={`/tasks/${projectId}/${task._id}/subtasks`}
                      className="w-full text-center bg-gray-400 text-white text-sm py-1 px-3 rounded hover:bg-gray-500 transition"
                    >
                      🧩 Subtasks
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
