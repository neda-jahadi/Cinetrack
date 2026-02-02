import { mockJobs } from "../components/sections/Job/JobListing";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";

const JobsPage = () => {
  return (
    <>
      <section className="px-4 py-10">
        <Container>
          <JobPreview jobs={mockJobs} />
        </Container>
      </section>
    </>
  );
};

export default JobsPage;
