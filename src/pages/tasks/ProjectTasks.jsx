import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import apiClient from "../../../service/ApiClient";
import { toast } from "react-toastify";
import { Eye, Trash2, Puzzle, User } from "lucide-react";
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
        {message && <p className="text-sm text-blue-600 mb-2">{message}</p>}
        <>
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
        </>
      </div>

      {/* Right - Tasks List */}
      <div
        className={`${
          user.role === "member" ? "w-full" : "md:w-2/3 "
        } w-full bg-white p-6 rounded-xl shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <Puzzle size={24} className="text-blue-700" />
          <span>All Tasks</span>
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          <ul className="space-y-6">
            {tasks.map((task, index) => (
              <li
                key={task._id}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  {/* LEFT - Task Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-600 mb-1">
                      {index + 1}. {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium ">Description:</span>{" "}
                      {task.description}
                    </p>
                    <p className="text-sm text-gray-700 mb-1 flex items-center gap-1 =">
                      <User size={16} />
                      <span className="font-medium">Assigned To:</span>{" "}
                      <span className="uppercase font-semibold">
                        {task.assignedTo?.fname || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 mb-2 mt-2">
                      <span className="font-medium">Status :</span>
                      <span
                        className={`inline-block px-2 py-1 rounded text-gray-500  font-semibold text-sm uppercase ${
                          task.status === "done"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                    <div className="w-fit bg-gray-50 border rounded p-3 text-sm text-gray-600">
                      <p>
                        📅 Created: {new Date(task.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-2">
                        🕒 Updated: {new Date(task.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT - Action Buttons */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-40">
                    <Link
                      to={`/tasks/${projectId}/${task._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex justify-center items-center gap-1"
                    >
                      <Eye size={16} /> View
                    </Link>
                    <Link
                      to={`/tasks/${projectId}/${task._id}/subtasks`}
                      className="bg-gray-400 hover:bg-gray-500 text-white text-sm py-2 px-3 rounded flex justify-center items-center gap-1"
                    >
                      <Puzzle size={16} /> Subtasks
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex justify-center items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
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
