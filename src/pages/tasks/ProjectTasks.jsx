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
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRes = await apiClient.getProjectTasks(projectId);
        const memberRes = await apiClient.getProjectMembers(projectId);

        if (taskRes.success) setTasks(taskRes.data);
        if (memberRes.success) setMembers(memberRes.data);
      } catch (err) {
        setMessage("Error loading data");
      }
    };
    fetchData();
  }, [refresh]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const options = { ...formData, projectId };
      const res = await apiClient.createTask(options);
      if (res.success) {
        toast.success("Task created!");
        setFormData({
          title: "",
          description: "",
          assignedTo: "",
          status: "todo",
        });
        setRefresh((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Task creation failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiClient.deleteTask(projectId, id);
      if (res.success) {
        toast.success("Task deleted!");
        setRefresh((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Task deletion failed!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
      {/* Left - Form */}
      <div className="md:w-1/3 w-full bg-white p-4 rounded shadow">
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
      <div className="md:w-2/3 w-full bg-white p-6 rounded-xl shadow-lg">
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
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="w-full sm:w-3/4">
                    <h3 className="text-xl font-semibold text-blue-600 mb-1">
                      {index + 1}. {task.title}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      Description: {task.description}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Assigned To:{" "}
                      <span className="font-medium uppercase">
                        {task.assignedTo?.fname || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Status:{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded text-white text-xs ${
                          task.status === "done"
                            ? "bg-green-500"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                    <div className="border border-gray-300 bg-gray-50 p-4 rounded mt-2 text-sm">
                      <p>
                        Created: {new Date(task.createdAt).toLocaleString()}
                      </p>
                      <p>
                        Last Updated:{" "}
                        {new Date(task.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/4 flex sm:flex-col gap-2">
                    <Link
                      to={`/tasks/${projectId}/${task._id}`}
                      className="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600 text-center w-full"
                    >
                      👁️ View
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-orange-500 text-white text-sm py-1 px-3 rounded hover:bg-orange-600 text-center w-full"
                    >
                      🗑️ Delete
                    </button>
                    <Link
                      to={`/tasks/${projectId}/${task._id}/subtasks`}
                      className="bg-gray-400 text-white text-sm py-1 px-3 rounded hover:bg-gray-500 text-center w-full"
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
