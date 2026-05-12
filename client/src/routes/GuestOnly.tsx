import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const GuestOnly = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default GuestOnly;
