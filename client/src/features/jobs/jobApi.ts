import { api } from "../../lib/api";
import type { CreateJobInput, Job, PaginationType, SingleJob } from "../../types/jobTypes";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type UpdateJobInput = {
  id: string,
  jobToEdit: CreateJobInput
}

type ApiDeleteResponse = {
  success: boolean;
  message: string;
}

type JobParams = {
    limit?: number;
    page?: number;
    title?: string;
    types?: string[];
    modes?: string[];
}

type JobsApiResponse<T> = {
  success: boolean;
  data: T;
  pagination: PaginationType;
  message?: string;
};





export const postJob = async (job: CreateJobInput): Promise<Job> => {
    try {
        const res = await api.post<ApiResponse<Job>>("/api/jobs", job);
        return res.data.data
    } catch (error: any) {
        throw new Error( error.response?.data?.message || "Failed to add a job")
    }
}

export const editJob = async ({id, jobToEdit}: UpdateJobInput): Promise<Job> => {
    try {
        const res = await api.put<ApiResponse<Job>>(`/api/jobs/${id}`, jobToEdit);
        return res.data.data
    } catch (error: any) {
        throw new Error( error.response?.data?.message || "Failed to edit the job")
    }
}

export const deleteJob = async (id: string): Promise<boolean> => {
    try {
        const res = await api.delete<ApiDeleteResponse>(`/api/jobs/${id}`);
        return res.data.success
    } catch (error: any) {
        throw new Error( error.response?.data?.message || "Failed to edit the job")
    }
}

// Get all jobs
export const fetchJobs = async (params?: JobParams) => {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.page) qs.set("page", String(params.page));
  if (params?.title) qs.set("title", params.title);
    params?.types?.forEach((type) => qs.append("type", type));
  params?.modes?.forEach((mode) => qs.append("mode", mode));

  const url = qs.toString() ? `/api/jobs?${qs}` : "/api/jobs";
  try {
    const res = await api.get<JobsApiResponse<SingleJob[]>>(url);
    return {
      data: res.data.data,
      pagination: res.data.pagination,
    }
  }
  catch (error: any) {
    throw new Error( error.response?.data?.message || "Failed to fetch jobs")
  }
};

