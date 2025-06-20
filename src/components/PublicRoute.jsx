import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Context";

const PublicRoute = () => {
  const { user } = useAuth();

  return user ? (
    user.isEmailVerified ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/email-verification" replace />
    )
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
