export type CompanyInput = {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
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
    createdAt: string;
    updatedAt: string;
}