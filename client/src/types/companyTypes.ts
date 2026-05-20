export type Company = {
  id: number;
  userId: number;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  regionId: number;
  municipality: number;
}

export type CompanyInput = {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    regionId: number;
    municipality: number;
}

export type CompanyStatus = "PENDING" | "REJECTED" | "APPROVED";

export type AddCompanyResponse = {
    id: number;
    userId: number;
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    status: string;
    regionId: number;
    municipalityId: number;
    createdAt: string;
    updatedAt: string;
}