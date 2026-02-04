import { mockJobs } from "../components/sections/Job/JobListing";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";

const JobsPage = () => {
  return (
    <>
      <section className="px-4 py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          <JobPreview jobs={mockJobs} />
        </Container>
      </section>
    </>
  );
};

export default JobsPage;
