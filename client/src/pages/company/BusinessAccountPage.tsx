import { Navigate } from 'react-router-dom';
import Container from '../../components/layouts/Container';
import Spinner from '../../components/ui/Spinner';
import ButtonLink from '../../components/ui/ButtonLink';
import PendingCompanyNotice from '../../features/company/components/PendingCompanyNotice';
import ContinueAsUserCard from '../../features/company/components/ContinueAsUserCard';
import LoginForm from '../../features/auth/forms/LoginForm';
import { useAuth } from '../../context/useAuth';
import Section from '@/components/layouts/Section';

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
    <Section>
      <Container size="narrow">
        <div className="text-center">
          <h1 className="section-title"> Create a business account</h1>
          <p>
            Enter here to access CineTrack Ads Manager, Business Center and
            CineTrack One.
          </p>
          <p>
            Don't have an account yet?
            <ButtonLink to="/business/signup" size="sm" variant="link">
              Sign up now
            </ButtonLink>
          </p>
        </div>
        <LoginForm onSuccessRedirect="/business/register-company" />
      </Container>
    </Section>
  );
};

export default BusinessAccountPage;
