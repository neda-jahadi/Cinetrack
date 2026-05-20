import { JOB_SORT, JOB_TYPES, WORK_MODE } from "../constants/job";
import type { Company } from "./companyTypes";
import type { Municipality, Region } from "./locationTypes";

export type JobType = (typeof JOB_TYPES)[number];
export type JobSort = (typeof JOB_SORT)[keyof typeof JOB_SORT];
export type WorkMode = (typeof WORK_MODE)[number];


export type Job = {
  id: number;
  title: string;
  type: JobType; 
  description: string; 
  salary: string; 
  workMode:  WorkMode;    
  companyId: number; 
  regionId: number;
  municipalityId: number; 
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
  company: Company,
  region: Region,
  municipality: Municipality
}


export type CreateJobInput = {
  title: string;
  type: JobType;
  description: string;
  salary: string;
  workMode: WorkMode;
  municipalityId: number;
};
