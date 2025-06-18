import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../service/ApiClient";
import AddMemberToProject from "./AddMemberToProject";

const UpdateProjectMember = () => {
  const { projectId: id } = useParams(); // project ID
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await apiClient.getProjectMembers(id);
        if (!res.success)
          return setMessage({ text: res.message, type: "error" });
        console.log("fetch members", res);

        setMembers(res.data);
      } catch (err) {
        setMessage({ text: "Failed to load members", type: "error" });
      }
    };
    fetchMembers();
  }, [id, refresh]);

  const handleRoleChange = async (id, memberId, role) => {
    setMessage({ text: "", type: "" });
    try {
      const res = await apiClient.updateMemberRole(id, memberId, role);
      if (!res.success) return setMessage({ text: res.message, type: "error" });

      // Optimistic UI update
      setMembers((prev) =>
        prev.map((m) => (m._id === memberId ? { ...m, role } : m))
      );

      setRefresh((prev) => !prev);
      setMessage({ text: "Member updated successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: "Update failed!", type: "error" });
    }
  };
  const removeUser = async (id, memberId, email) => {
    try {
      const res = await apiClient.deleteMember(id, memberId, email);
      console.log("deleteMember", res);

      if (!res.success) return setMessage({ text: res.message, type: "error" });
      setRefresh((prev) => !prev);
      setMembers((prev) => prev.filter((m) => m._id !== memberId));
      setMessage({ text: "Member removed successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: "Failed to remove member", type: "error" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <AddMemberToProject projectId={id} setRefresh={setRefresh} />
      <h2 className="text-xl font-bold mb-4">Update Project Members</h2>

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

      <ul className="space-y-4">
        {members.map((member) => (
          <li
            key={member._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-semibold text-gray-800">{member.user.fname}</p>
              <p className="text-sm text-gray-500">{member.user.email}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>

            <select
              value={member.role}
              onChange={(e) =>
                handleRoleChange(id, member.user._id, e.target.value)
              }
              className="p-2 border rounded"
            >
              <option value="project_admin">Project Admin</option>
              <option value="member">member</option>
            </select>

            <button
              onClick={() => removeUser(id, member.user._id, member.user.email)}
              className="px-4 py-2 bg-red-300 rounded"
            >
              {" "}
              Remove{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateProjectMember;
