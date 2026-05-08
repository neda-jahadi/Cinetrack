import { Navigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../context/AuthContext";
import ButtonLink from "../components/ui/ButtonLink";
import PendingCompanyNotice from "../components/business/PendingCompanyNotice";
import ContinueAsUserCard from "../components/business/ContinueAsUserCard";
import LoginForm from "../components/forms/LoginForm";

const BusinessAccountPage = () => {
  const {
    isAuthenticated,
    user,
    company,
    isApprovedCompany,
    isLoading,
    isAdmin,
  } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (isApprovedCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (company && !isApprovedCompany) {
    return <PendingCompanyNotice company={company} />;
  }

  if (isAuthenticated && !isAdmin && user) {
    return <ContinueAsUserCard name={user?.name} />;
  }

  return (
    <section>
      <Container size="narrow">
        <div className="text-center">
          <h1 className="section-title"> Create a business account</h1>
          <p>
            Enter here to access CineTrack Ads Manager, Business Center and
            CineTrack One.
          </p>
          <p>
            Don't have an account yet?
            <ButtonLink
              to="/business/signup"
              variant="nude"
              size="sm"
              className="hover:underline"
            >
              Sign up now
            </ButtonLink>
          </p>
        </div>
        <LoginForm onSuccessRedirect="/business/register-company" />
      </Container>
    </section>
  );
};

export default BusinessAccountPage;
