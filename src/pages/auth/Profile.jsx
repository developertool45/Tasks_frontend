import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import apiClient from "../../../service/ApiClient";
import "./style.css";

function Profile() {
  // const { user, setUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiClient.getProfile();
        setUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl border">
        <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">
          User Profile
        </h2>

        {user && (
          <div className="flex items-center gap-6">
            <img
              src={user.avatar.url}
              alt="User Avatar"
              className="w-24 h-24 rounded border-2 border-orange-300 object-cover"
            />

            <div className="w-full text-gray-700 space-y-2 shadow p-4 rounded">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {user.fname.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {user.role.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
