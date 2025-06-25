import { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient"; // adjust path
import { toast } from "react-toastify";

const AppMembers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all users on mount
  useEffect(() => {
    apiClient
      .getAllUsers() // ➡️ create this endpoint on back-end
      .then((res) => {
        if (res.success) setUsers(res.data);
        else toast.error(res.message);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const promoteToAdmin = (id) => {
    apiClient
      .promoteToAdmin(id) // you’ll expose this API
      .then((res) => {
        toast.success(res.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
        );
      })
      .catch((err) => toast.error(err.message));
  };
  const promoteToUser = (id) => {
    apiClient
      .promoteUser(id) // you’ll expose this API
      .then((res) => {
        toast.success(res.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "member" } : u))
        );
      })
      .catch((err) => toast.error(err.message));
  };

  const removeMember = (id) => {
    apiClient
      .removeMember(id) // you’ll expose this API
      .then((res) => {
        toast.success(res.message);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) return <p className="text-center mt-10">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700">
        👥 Team Members
      </h1>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Promote
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Demote
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-blue-50 transition-all">
                <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {u.fname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                <td className="px-4 py-3 text-sm capitalize text-gray-700">
                  {u.role}
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    disabled={u.role === "admin"}
                    onClick={() => promoteToAdmin(u._id)}
                    className={`px-3 py-1 text-sm rounded font-medium 
                  ${
                    u.role === "admin"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  >
                    {u.role !== "admin" ? "Make Admin" : "Admin"}
                  </button>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    disabled={u.role === "member"}
                    onClick={() => promoteToUser(u._id)}
                    className={`px-3 py-1 text-sm rounded font-medium 
                  ${
                    u.role === "member"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  >
                    {u.role !== "member" ? "Make Member" : "Member"}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    disabled={u.role === "admin"} // e.g., can’t remove global admins
                    onClick={() => removeMember(u._id)}
                    className="px-3 py-1 text-sm rounded font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppMembers;
