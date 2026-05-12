import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
