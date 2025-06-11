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
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="text-orange-700">User Profile</h2>
          {user && (
            <div className="profile-details flex gap-6 items-center">
              <img src={user.avatar.url} className="avatar" alt="User Avatar" />
              <div className="p-2 profile-info">
                <p>
                  Name: <span>{user.fname.toUpperCase()}</span>
                </p>
                <p>
                  Username: <span>{user.username}</span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p>
                  Role : <span>{user.role.toUpperCase()}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
