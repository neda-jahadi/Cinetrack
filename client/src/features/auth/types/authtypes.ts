import type { CompanyStatus } from '../../company/types/companyTypes';

export type loginType = {
  email: string;
  password: string;
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

export type UserRole = 'USER' | 'COMPANY' | 'ADMIN';

export type AuthCompany = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  region: string;
  municipality: string;
  status: CompanyStatus;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthMeApiResponse = {
  user: AuthUser;
  company: AuthCompany | null;
};
