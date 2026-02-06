import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";

const JobsPage = () => {
  const { data: jobs = [], isLoading, isError } = useJobs();
  return (
    <>
      <section className="px-4 py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          {isLoading && <Spinner loading={true} />}
          {isError && <p>Job not found</p>}
          {!isError && !isLoading && <JobPreview jobs={jobs} />}
        </Container>
      </section>
    </>
  );
};

export default JobsPage;
