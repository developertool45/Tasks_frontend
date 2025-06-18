import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";

const ProjectAdmin = () => {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait for context to load

    if (!user) {
      navigate("/login", { replace: true });
    } else if (user.role !== "project_admin" && user.role !== "admin") {
      navigate("/unauthorized", { replace: true });
    } else {
      setReady(true); // user is valid and has access
    }
  }, [user, loading, navigate]);

  if (loading || !ready) {
    return <div className="text-center mt-10">Loading...</div>; // Don't flash wrong route
  }

  return <Outlet />;
};

export default ProjectAdmin;
