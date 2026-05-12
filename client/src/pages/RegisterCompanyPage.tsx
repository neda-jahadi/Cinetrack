import { Navigate } from "react-router-dom";
import RegisterCompanyForm from "../components/forms/RegisterCompanyForm";
import Container from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";

const RegisterCompanyPage = () => {
  const { company, isApprovedCompany } = useAuth();

  if (isApprovedCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (company && company.status !== "APPROVED") {
    return <Navigate to="/business" replace />;
  }

  return (
    <>
      <section>
        <Container size="narrow">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <RegisterCompanyForm onSuccessRedirect="/profile" />
          </div>
        </Container>
      </section>
    </>
  );
};

export default RegisterCompanyPage;
