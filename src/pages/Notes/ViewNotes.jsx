import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Pencil, Trash2, User } from "lucide-react";
import apiClient from "../../../service/ApiClient";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Context";
function ViewNotes() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  /* ---------------------------------- state --------------------------------- */
  const [notes, setNotes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    // controlled form (create + update)
    name: "",
    content: "",
  });

  const [editId, setEditId] = useState(null);

  /* --------------------------- fetch all notes --------------------------- */
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getAllNotes(projectId); // 🔗 make sure api exists
      if (res.success) setNotes(res.data);
      else toast.error(res.message);
    } catch (err) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* ------------------------- create / update note ------------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Note name required");
    if (!formData.content.trim()) return toast.error("Note content required");

    try {
      let res = null;
      if (editId) {
        res = await apiClient.updateNote(projectId, editId, formData);
      } else {
        res = await apiClient.createNote(projectId, formData);
      }

      if (res.success) {
        toast.success(res.message);
        setFormData({ name: "", content: "" });
        setEditId(null);
        fetchNotes();
      } else toast.error(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ------------------------------- edit note ------------------------------ */
  const loadEdit = (note) => {
    setEditId(note._id);
    setFormData({ name: note.name, content: note.content });
  };

  /* ------------------------------ delete note ----------------------------- */
  const handleDelete = async (id) => {
    try {
      const res = await apiClient.deleteNote(projectId, id);
      if (res.success) {
        toast.success(res.message);
        setNotes((prev) => prev.filter((n) => n._id !== id));
      } else toast.error(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ----------------------------------------------------------------------- */
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📒 <span>Project Notes</span>
      </h1>

      {/* ======================== Form (Create / Update) ======================== */}
      {user.role === "admin" || user.role === "project_admin" ? (
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Note title"
            className="w-full border rounded p-2 py-3 text-sm font-semibold"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full border rounded p-2 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              {editId ? "Update Note" : "Create Note"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({ name: "", content: "" });
                }}
                className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
              type="button"
              onClick={() => navigate(-1)}
            >
              {" "}
              Go Back
            </button>
          </div>
        </form>
      ):""}
      {/* ============================ Notes list ============================= */}
      {loading ? (
        <p className="text-center text-blue-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-6">
          {notes.map((note, idx) => (
            <li
              key={note._id}
              className="flex flex-col sm:flex-row justify-between gap-4 border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {idx + 1}. {note.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">{note.content}</p>
              </div>
              {/* buttons */}
              <div className="flex gap-2 items-start sm:items-center">
                <div className="text-sm text-gray-600 sm:text-center">
                  <p className="font-medium flex items-center gap-1">
                    <User size={16} /> {note.createdBy?.fname || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => loadEdit(note)}
                  className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  <Pencil size={18} color="gray" />
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  <Trash2 size={18} color="#4b5563" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewNotes;
