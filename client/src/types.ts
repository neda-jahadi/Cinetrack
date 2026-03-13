export type Company = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export type JobType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship";


export type Job = {
  _id: string;
  title: string;
  type: JobType; 
  description: string; 
  salary: string;      
  location: string;  
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