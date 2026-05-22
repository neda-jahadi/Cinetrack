import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const RequireAdmin = () => {
  const { isLoading, isAdmin, isAuthenticated } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (!isAdmin && isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
