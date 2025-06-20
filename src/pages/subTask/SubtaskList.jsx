import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { toast } from "react-toastify";

const SubtaskList = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [subtasks, setSubtasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    remark: "",
    status: "false",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch subtasks
  const fetchSubtasks = async () => {
    setMessage({ text: "", type: "" });
    try {
      const res = await apiClient.getSubTasks(projectId, taskId);
      if (!res.success) return setMessage({ text: res.message, type: "error" });
      setSubtasks(res.data);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  // Input handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      let res;
      if (editMode) {
        res = await apiClient.updateSubTask(projectId, taskId, editId, {
          ...formData,
          status: formData.status === "true" ? true : false,
        });
      } else {
        res = await apiClient.createSubTask(projectId, taskId, {
          ...formData,
          status: formData.status === "true" ? true : false,
        });
      }
      toast.success(res.message);
      if (!res.success) {
        toast.error(res.message);
        return setMessage({ text: res.message, type: "error" });
      }
      setMessage({
        text: editMode ? "Subtask updated!" : "Subtask created!",
        type: "success",
      });

      setFormData({ title: "", status: "false", remark: "" });
      setEditMode(false);
      setEditId(null);
      fetchSubtasks();
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
      toast.error(err.message);
    }
  };

  // Load data into form for editing
  const handleEdit = (subtask) => {
    setEditMode(true);
    setEditId(subtask._id);
    setFormData({
      title: subtask.title,
      status: subtask.status,
      remark: subtask.remark,
    });
  };

  const handleDelete = (id) => {
    apiClient
      .deleteSubTask(projectId, taskId, id)
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return setMessage({ text: res.message, type: "error" });
        }
        setMessage({ text: "Subtask deleted!", type: "success" });
        fetchSubtasks();
        toast.success(res.message);
        return setMessage({ text: res.message, type: "error" });
      })
      .catch((err) => {
        setMessage({ text: err.message, type: "error" });
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-6">
      {/* ✅ LEFT: FORM */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          {editMode ? "✏️ Edit Subtask" : "➕ Create Subtask"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Subtask Title"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            placeholder="Subtask remark"
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="false">Pending</option>
            <option value="true">Done</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {editMode ? "Update Subtask" : "Create Subtask"}
          </button>

          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ title: "", status: "false" });
              }}
              className="ml-2 text-sm text-gray-500 hover:text-red-500"
            >
              Cancel Edit
            </button>
          )}
        </form>

        {message.text && (
          <div
            className={`p-2 mt-4 rounded text-sm ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* ✅ RIGHT: LIST */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📋 Subtasks
        </h3>

        {subtasks.length === 0 ? (
          <p className="text-gray-500">No subtasks found.</p>
        ) : (
          <ul className="space-y-4">
            {subtasks.map((subtask, i) => (
              <li
                key={subtask._id}
                className=" w-full p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {i + 1}. {subtask.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status :{" "}
                    <span
                      className={`font-medium text-md ${
                        subtask.isCompleted === true
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {subtask.isCompleted ? "Done" : "Pending"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Remark : {subtask.remark}
                  </p>
                </div>
                <div className="flex gap-2 w-1/5 justify-end">
                  <button
                    onClick={() => handleEdit(subtask)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subtask._id)}
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate(`/projects/${projectId}/tasks`)}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          🔙 Back to Task
        </button>
      </div>
    </div>
  );
};

export default SubtaskList;
