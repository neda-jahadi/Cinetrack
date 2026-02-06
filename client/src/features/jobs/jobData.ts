import { useQuery } from "@tanstack/react-query";
import type { Job } from "../../types";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch("/api/jobs");
  if (!response) throw new Error("Error fetching jobs");
  const json: ApiResponse<Job[]> = await response.json();
  return json.data;
};

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
}