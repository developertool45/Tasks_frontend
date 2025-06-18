
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";


const EditProject = () => {
  const { projectId: id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await apiClient.getProject(id);
        console.log(res);
        setFormData({
          name: res.data.name,
          description: res.data.description,
          status: res.data.status || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.updateProject(
        id,
        formData.name,
        formData.description,
        formData.status
      );
      if (!res.success) return console.log(res.message);
      console.log("Project updated successfully!", formData);

      navigate(`/projects/${id}`);
    } catch (error) {
      console.log(error, error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            rows="4"
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-2 space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Project
          </button>
          <button
            onClick={() => navigate(`/projects/${id}`)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;


