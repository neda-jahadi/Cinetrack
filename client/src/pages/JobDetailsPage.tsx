import { useLoaderData } from "react-router-dom";
import type { Job } from "../types";

const JobDetailsPage = () => {
  const { job } = useLoaderData() as { job: Job };
  return (
    <>
      <p>{job.description}</p>
    </>
  );
};

export default JobDetailsPage;
