import type { LoaderFunctionArgs } from "react-router-dom";
import { mockJobs } from "./JobListing";

const jobDetailsLoader = ({ params }: LoaderFunctionArgs) => {
  const jobId = params.id;
  const job = mockJobs.find((job) => job.id === jobId);
  if (!job) {
    throw new Response("Job not found", { status: 404 });
  }
  return { job };
};

export default jobDetailsLoader;
