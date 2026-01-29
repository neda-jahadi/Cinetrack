import Hero from "../components/sections/Hero";
import CtaCard from "../components/sections/HomeCTAs/CtaCard";
import JobPreview from "../components/sections/JobPreview/JobPreview";
import Container from "../components/ui/Container";
import type { Job } from "../types";

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    type: "Full-Time",
    description:
      "We are seeking a talented Front-End Developer to join our team and build modern web apps.",
    salary: "$70K - $80K / Year",
    location: "Boston, MA",
  },
  {
    id: "2",
    title: "Front-End Engineer (React)",
    type: "Part-Time",
    description:
      "Help us improve performance and accessibility across our component library and product UI.",
    salary: "$60K - $70K / Year",
    location: "Remote",
  },
  {
    id: "3",
    title: "Junior React Developer",
    type: "Contract",
    description:
      "Great opportunity for a junior developer to grow with mentorship and modern tooling.",
    salary: "$40K - $50K / Year",
    location: "New York, NY",
  },
];

const HomePage = () => {
  return (
    <>
      <Hero
        title="Become a React Dev"
        subtitle="Find the React job that fits your skills and needs"
      />
      <section className="py-4">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <CtaCard
              title="For Developers"
              description="Browse our React jobs and start your career today"
              to="/browse-job"
              ctaLabel="Browse Jobs"
              variant="light"
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

      <section className="bg-blue-50 px-4 py-10">
        <Container size="full">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Browse Jobs
          </h2>
          <JobPreview jobs={mockJobs} />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
