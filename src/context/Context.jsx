import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../../service/ApiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await apiClient.getUser();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
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
