import Hero from "../components/sections/Hero";
import CtaCard from "../components/sections/HomeCTAs/CtaCard";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import ButtonLink from "../components/ui/ButtonLink";
import { useJobs } from "../features/jobs/jobData";
import Spinner from "../components/ui/Spinner";

const HomePage = () => {
  const { data: jobs = [], isLoading, isError } = useJobs();
  return (
    <>
      <Hero
        title="Become a React Dev"
        subtitle="Find the React job that fits your skills and needs"
      />
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <CtaCard
              title="For Developers"
              description="Browse our React jobs and start your career today"
              to="/browse-job"
              ctaLabel="Browse Jobs"
              variant="tint"
            />
            <CtaCard
              title="For Employers"
              description="List your job to find the perfect developer for the role"
              to="/ad-job"
              ctaLabel="Add Job"
              variant="light"
            />
          </div>
        </Container>
      </section>

      <section className="bg-blue-50 px-4 py-12">
        <Container size="full">
          <h2 className="text-3xl font-bold text-brand mb-6 text-center">
            Recent Jobs
          </h2>
          {isLoading && <Spinner loading={true} />}
          {isError && <p>Could not load jobs</p>}
          {!isLoading && !isError && <JobPreview jobs={jobs} limit={3} />}
        </Container>
      </section>

      <section className="px-4 py-12 text-center">
        <Container>
          <div>
            <ButtonLink
              variant="dark"
              size="lg"
              to="/jobs"
              aria-label="View All Jobs"
              className="w-full max-w-md"
            >
              View All Jobs
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
