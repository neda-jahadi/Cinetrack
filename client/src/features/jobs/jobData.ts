import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Company, Job, JobType } from "../../types";
import type { JobSort } from "./constants";
 import { toast } from 'react-toastify';

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

type UpdateJobInput = {
  id: string,
  jobToEdit: CreateJobInput
}

// Get all jobs
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

// Get single job
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

// Create job
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
      toast.success("Job added successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

// Delete job
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
      toast.success("Job deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

// Edit job
const editJob = async ({id, jobToEdit}: UpdateJobInput): Promise<Job> => {
 const res = await fetch(`/api/jobs/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(jobToEdit),
 });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || "Failed to edit the job");
  }
  const json: ApiResponse<Job> = await res.json();
  return json.data as Job;
}

export function useEditJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editJob,
    onSuccess: (_, variables) => {
      toast.success("Job Editet successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] });
    },
  });
}