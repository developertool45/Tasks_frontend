import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../service/ApiClient";


const AddMemberToProject = () => {
  const {projectId: id } = useParams(); // project id from route
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
	const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
		const res = await apiClient.addMembertoProject(id, email);
		if(!res.success) return console.log(res.message);
      setMessage({ text: res.message, type: "success" });
      setEmail("");
    } catch (err) {
		console.log(err);
	  setMessage({ text: err.message, type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Member to Project</h2>

      {message.text && (
        <div
          className={`p-2 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Member Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter member's email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Member
			</button>
		<button
		  type="button"
		  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
		  onClick={() => navigate(-1)}
		>
		  Go Back
		</button>
      </form>
    </div>
  );
};

export default AddMemberToProject;
