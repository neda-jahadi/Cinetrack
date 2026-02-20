import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Company, Job, JobType } from "../../types";
import type { JobSort } from "./constants";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type ApiDeleteResponse = {
  success: boolean;
  message: string;
}

type JobParams = {
    limit?: number;
    sort?: JobSort;
}

export type CreateJobInput = {
  title: string;
  type: JobType;
  description: string;
  salary: string;
  location: string;
  company: Company;
};

const fetchJobs = async (params?: JobParams): Promise<Job[]> => {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.sort) qs.set("sort", params.sort);


  const url = qs.toString() ? `/api/jobs?${qs}` : "/api/jobs";
  const response = await fetch(url);

  if (!response.ok) throw new Error("Error fetching jobs");
  const json: ApiResponse<Job[]> = await response.json();
  return json.data;
};

export function useJobs(params?: JobParams) {
  const getJobsQuery =  useQuery({
    queryKey: ["fetchJobs", params ?? {}],
    queryFn: () => fetchJobs(params),
  });
  return getJobsQuery;
}

const fetchJobById = async (id: string): Promise<Job> => {
  if (!id) throw new Response("Missing job id", { status: 400 });
 const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Response("Job not found", { status: 404 });
  const json = await res.json();
  return json.data;
}

export function useJob(id?: string) {
  const getJobQuery =  useQuery({
    queryKey: ["fetchJobById", id ?? null],
    queryFn: () => fetchJobById(id as string),
    enabled: !!id,
  });
  return getJobQuery;
}

const postJob = async (payload: CreateJobInput): Promise<Job> => {
 const res = await fetch('/api/jobs/', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
 });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || "Failed to create job");
  }
  const json: ApiResponse<Job> = await res.json();
  return json.data as Job;
}

export function useAddJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

const deleteJob = async (id: string): Promise<boolean> => {
 const res = await fetch(`/api/jobs/${id}`, {
  method: "DELETE"
 });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || "Failed to delete job");
  }
  const json: ApiDeleteResponse = await res.json();
  return json.success;
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}