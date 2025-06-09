import { createContext, useContext, useEffect, useState } from "react";
import  apiClient  from '../../service/ApiClient'

const AuthContext = createContext(null);

export const AuthProvider =  ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const { getUser } = apiClient;
  useEffect(() => {
	const fetchUser = async () => {
	  try {
		const user = await getUser();
		  setUser(user.data);
		  console.log(user.data);
		  
	  } catch (error) {
		setUser(null);
	  } finally {
		setLoading(false);
	  }
	};
	fetchUser();
  }, [])
 
  return (
	<AuthContext.Provider value={{ user, setUser, loading }}>
	  {children}
	</AuthContext.Provider>
  );
};
export const useAuth = () => {
 const context = useContext(AuthContext);
  if (!context) {
	throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
