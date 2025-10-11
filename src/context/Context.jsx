import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../../service/ApiClient";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getUser();
      if (res.success) {
        return setUser(res.data);
      }

      if (res.statusCode === 401 && res.success === false) {
        const refreshToken = await apiClient.refreshAccessToken();
        if (refreshToken.success) {
          fetchUser();
        } else {
          toast.error(res.message);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Auth fetch error", error);
      toast.error(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser: fetchUser,}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

