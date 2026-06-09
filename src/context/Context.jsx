import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../../service/ApiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const res = await apiClient.getUser();

      if (res?.success) {
        setUser(res.data);
      } else {
        setUser(null);
      }

      return res;
    } catch (error) {
      console.error("Fetch User Error:", error);
      setUser(null);

      return {
        success: false,
        message: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    refreshUser,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
