export type Company = {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export type JobType =
  | "Full_Time"
  | "Part_Time"
  | "Contract"
  | "Internship";


export type Job = {
  id: number;
  title: string;
  type: JobType; 
  description: string; 
  salary: string;      
  location: string;
  companyId: number;  
  company: Company; 
};

export type Pagination = {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}