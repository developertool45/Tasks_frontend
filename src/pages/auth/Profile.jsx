import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import { toast } from "react-toastify";
function Profile() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    username: "",
    email: "",
    role: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.getProfile();
        setUser(res.data);
        setFormData({
          fname: res.data.fname,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setFormData({ ...formData, [name]: value });
    } else {
      setPasswordData({ ...passwordData, [name]: value });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await apiClient.updateProfile(user._id, formData);
      setUser(res.data);
      setEditMode(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const res = await apiClient.changePassword(passwordData);
      if (res.success) {
        toast.success(res.message);
      }
      setPasswordMode(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await apiClient.uploadAvatar(user._id, formData);
      if (res.success) {
        setUser((prev) => ({
          ...prev,
          avatar: { url: res.data.avatar.url }, // Fixed
        }));
        setRefresh((prev) => !prev);
        toast.success(res.message);
      } else {
        console.error(res.message);
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.message || "Upload failed");
      console.error("Upload error", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">
        User Profile
      </h2>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 👤 Left: Profile Info */}
          <div className="border-r pr-6">
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              style={{ display: "none" }}
            />

            <label htmlFor="avatarInput">
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-28 h-28 mb-4 rounded-full border shadow cursor-pointer"
              />
            </label>

            <p>
              <strong>Name:</strong> {user.fname.toUpperCase()}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role.toUpperCase()}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setEditMode(true);
                  setPasswordMode(false);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={() => {
                  setPasswordMode(true);
                  setEditMode(false);
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded"
              >
                🔒 Change Password
              </button>
            </div>
          </div>

          {/* ✏️ OR 🔒 Right: Edit / Password Form */}
          <div className="space-y-4">
            {editMode && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Edit Profile
                </h3>
                <input
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Full Name"
                />
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Username"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Email"
                  disabled
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="member">User</option>
                </select>
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {passwordMode && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Change Password
                </h3>
                <input
                  name="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Old Password"
                />
                <input
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="New Password"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleChangePassword}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setPasswordMode(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
