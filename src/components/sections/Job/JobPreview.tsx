import type { Job } from "../../../types";
import JobCard from "./JobCard";

type JobProps = {
  jobs: Job[];
  limit?: number;
};

const JobPreview = ({ jobs, limit }: JobProps) => {
  const visibleJobs = limit ? jobs.slice(0, limit) : jobs;
  if (!visibleJobs?.length) {
    return (
      <div className="text-center">
        <p className="mt-4 text-gray-700">No Jobs found right now.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleJobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
};

export default JobPreview;
