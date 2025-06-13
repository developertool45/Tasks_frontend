import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Context";

const PublicRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
