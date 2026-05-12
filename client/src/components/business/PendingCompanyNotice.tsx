import type { AuthCompany } from "../../types/authtypes";
import Container from "../ui/Container";

type CompanyStatusProps = {
  company: AuthCompany;
};

const PendingCompanyNotice = ({ company }: CompanyStatusProps) => {
  return (
    <section>
      <Container className="text-center">
        <h1 className="card-title">
          Your registered company has {company.status.toLowerCase()} status
        </h1>
        <p>An admin needs to approve your company before you can add jobs.</p>
        <p>Please contact support for more information.</p>
      </Container>
    </section>
  );
};

export default PendingCompanyNotice;
