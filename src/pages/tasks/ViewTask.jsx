import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../service/ApiClient";

const ViewTask = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await apiClient.getTask(projectId, taskId);
        if (res.success) {
          setTask(res.data);
          setFormData({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
          });
        }
      } catch (err) {
        console.error("Failed to load task", err);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.updateTask(projectId, taskId, formData);
      if (res.success) {
        setTask(res.data);
        setEditMode(false);
        navigate(`/tasks/${projectId}/${taskId}`);
      } else {
        console.error(res.message);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!task) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📝 Task Details</h2>

      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-blue-500"
            placeholder="Task Title"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-blue-500"
            placeholder="Task Description"
          ></textarea>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-blue-500"
          >
            <option value="">Select Status</option>
            <option value="todo">🕒 To Do</option>
            <option value="in_progress">⚙️ In Progress</option>
            <option value="done">✅ Done</option>
          </select>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">{task.title}</h3>
          <p className="text-gray-700 text-lg">{task.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 text-gray-600 text-sm">
            <p>
              <span className="font-semibold text-gray-800">📌 Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                  task.status === "done"
                    ? "bg-green-500"
                    : task.status === "in_progress"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-400"
                }`}
              >
                {task.status.replace("_", " ")}
              </span>
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                👤 Assigned To:
              </span>{" "}
              {task.assignedTo?.fname || "N/A"}
            </p>

            <p>
              <span className="font-semibold">📅 Created:</span>{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>

            <p>
              <span className="font-semibold">🔄 Last Updated:</span>{" "}
              {new Date(task.updatedAt).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg transition"
            >
              ✏️ Edit Task
            </button>
            <button
              onClick={() => navigate(`/projects/${projectId}/tasks`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              🔙 Back to Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
