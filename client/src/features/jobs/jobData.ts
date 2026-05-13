import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobSort, Pagination, SingleJob } from "../../types/jobTypes";
import { toast } from 'react-toastify';
import { editJob, postJob } from "./jobApi";

type JobsApiResponse<T> = {
  success: boolean;
  data: T;
  pagination: Pagination;
  message?: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type ApiDeleteResponse = {
  success: boolean;
  message: string;
}

type JobParams = {
    limit?: number;
    page?: number;
    sort?: JobSort;
}

// ✅ One place for keys
const jobKeys = {
  all: ["jobs"] as const,
  list: (params: JobParams | undefined) => ["jobs", params ?? null] as const,
  detail: (id: string | undefined) => ["job", id ?? null] as const,
};

// ✅ One place for fetch + error parsing
async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json as T;
}

// Get all jobs
const fetchJobs = async (params?: JobParams) => {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.sort) qs.set("sort", params.sort);
  if (params?.page) qs.set("page", String(params.page));


  const url = qs.toString() ? `/api/jobs?${qs}` : "/api/jobs";
  const json = await apiFetch<JobsApiResponse<SingleJob[]>>(url )
  return {
    data: json.data,
    pagination: json.pagination,
  }
};

export function useJobs(params?: JobParams) {
  const getJobsQuery =  useQuery({
    queryKey: jobKeys.list(params),
    queryFn: () => fetchJobs(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  return getJobsQuery;
}

// Get single job
const fetchJobById = async (id: string): Promise<SingleJob> => {
  if (!id) throw new Response("Missing job id", { status: 400 });
  const url = `/api/jobs/${id}`;
  const json = await apiFetch<ApiResponse<SingleJob>>(url);
  return json.data;
}

export function useJob(id?: string) {
  const getJobQuery =  useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => fetchJobById(id as string),
    enabled: !!id,
  });
  return getJobQuery;
}

// Create job
export function useAddJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      toast.success("Job added successfully!");
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

// Delete job
const deleteJob = async (id: string): Promise<boolean> => {
 const json = await apiFetch<ApiDeleteResponse>(`/api/jobs/${id}`, {
  method: "DELETE"
 });
  return json.success;
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted successfully!");
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

// Edit job
export function useEditJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editJob,
    onSuccess: (_, variables) => {
      toast.success("Job Edited successfully!");
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.id)});
    },
  });
}