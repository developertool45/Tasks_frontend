import { createContext, useContext, useEffect, useState } from "react";
import  apiClient  from '../../service/ApiClient'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiClient.getUser();
        if (user.successCode !== 200) {
          setUser(null);
        }
        console.log("context", user);
        setUser(user.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
