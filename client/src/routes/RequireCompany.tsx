import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const RequireCompany = () => {
  const { isLoading, isApprovedCompany } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (!isApprovedCompany) {
    return <Navigate to="/business" replace />;
  }

  return <Outlet />;
};

export default RequireCompany;
