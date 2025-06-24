import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../../service/ApiClient";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await apiClient.getUser();

      if (!res.success && res.statusCode === 401) {
        console.log("Access token expired, trying refresh...");
        const refreshRes = await apiClient.refreshAccessToken();

        if (refreshRes.success && refreshRes.data) {
          setUser(refreshRes.data);
          setRefresh((prev) => !prev); // trigger another fetch if needed
          return;
        } else {
          setUser(null);
          return;
        }
      }

      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth fetch error", error);
      toast.error(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUser();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser: fetchUser, setRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
