import { Navigate } from 'react-router-dom';
import RegisterCompanyForm from '../components/forms/RegisterCompanyForm';
import Container from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';
import Spinner from '@/components/ui/Spinner';
import NotFound from '@/components/sections/Job/NotFound';
import { useMunicipalities } from '@/features/locations/locationQuery';

const RegisterCompanyPage = () => {
  const { company, isApprovedCompany } = useAuth();
  const { data: municipalities, isLoading, isError } = useMunicipalities();

  if (isLoading) return <Spinner loading={true} />;
  if (isError || !municipalities) return <NotFound />;

  if (isApprovedCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (company && company.status !== 'APPROVED') {
    return <Navigate to="/business" replace />;
  }

  return (
    <>
      <section>
        <Container size="narrow">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <RegisterCompanyForm
              onSuccessRedirect="/profile"
              municipalities={municipalities}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default RegisterCompanyPage;
