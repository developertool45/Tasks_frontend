import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { UserRolesEnum } from "../../utils/Constant.js";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner

  // ❌ not logged in → kick to login
  if (!user) return <Navigate to="/login" replace />;

  // ❌ logged in but not admin → unauthorized page
	if (user.role !== UserRolesEnum.ADMIN) {
		return <Navigate to="/unauthorized" replace />;  
	  }
  return <Outlet />;
};

export default AdminRoute;
