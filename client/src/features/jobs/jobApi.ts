import { api } from "../../lib/api";
import type { CreateJobInput, Job } from "../../types/jobTypes";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type UpdateJobInput = {
  id: string,
  jobToEdit: CreateJobInput
}


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
        throw new Error( error.response?.data?.message || "Failed to add a job")
    }
}