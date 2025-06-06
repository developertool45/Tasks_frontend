import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Context.js";

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(user.role)) return <p>Unauthorized</p>;
  return children;
};

export default PrivateRoute;
