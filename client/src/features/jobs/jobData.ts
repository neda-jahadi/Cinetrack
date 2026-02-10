import { useQuery } from "@tanstack/react-query";
import type { Job } from "../../types";
import type { JobSort } from "./constants";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type JobParams = {
    limit?: number;
    sort?: JobSort;
}

const fetchJobs = async (params?: JobParams): Promise<Job[]> => {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.sort) qs.set("sort", params.sort);


  const url = qs.toString() ? `/api/jobs?${qs}` : "/api/jobs";
    console.log('url is:', url)
  const response = await fetch(url);

  if (!response.ok) throw new Error("Error fetching jobs");
  const json: ApiResponse<Job[]> = await response.json();
  return json.data;
};

export function useJobs(params?: JobParams) {
  return useQuery({
    queryKey: ["jobs", params ?? {}],
    queryFn: () => fetchJobs(params),
  });
}