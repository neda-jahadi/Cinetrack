import type { UserRole } from "../types/authtypes";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

type ProtectedRouteProps = {
  allowedUser?: UserRole | "AUTHENTICATED";
};
export const ProtectedRoute = ({ allowedUser }: ProtectedRouteProps) => {
  const { isCompany, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (allowedUser === "COMPANY" && !isCompany) {
    return <Navigate to="/business" replace />;
  }

  if (allowedUser === "USER" && isAuthenticated && isCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (allowedUser === "USER" && !isAuthenticated) {
    return <Navigate to="/business" replace />;
  }

  if (!allowedUser && isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  if (allowedUser === "AUTHENTICATED" && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
