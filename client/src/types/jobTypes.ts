import type { JOB_SORT, JOB_TYPES } from "../constants/job";
import type { Company } from "./companyTypes";

export type JobType = (typeof JOB_TYPES)[number];
export type JobSort = (typeof JOB_SORT)[keyof typeof JOB_SORT];


export type Job = {
  id: number;
  title: string;
  type: JobType; 
  description: string; 
  salary: string;      
  location: string;
  companyId: number;  
};

export type Pagination = {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type SingleJob = Job & {
  company: Company
}


export type CreateJobInput = {
  title: string;
  type: JobType;
  description: string;
  salary: string;
  location: string;
};
