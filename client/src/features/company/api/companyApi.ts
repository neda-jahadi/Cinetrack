import { api } from '../../../lib/api/axios';
import axios from 'axios';

import type { CompanyInput, AddCompanyResponse } from '../types/companyTypes';

export const register = async (
  company: CompanyInput,
): Promise<AddCompanyResponse> => {
  try {
    const res = await api.post('/api/companies', company);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Company register failed',
      );
    }
    throw new Error('Company register failed');
  }
};

export const getAllCompanies = async () => {
  try {
    const res = await api.get('/api/companies/all');
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch companies',
      );
    }
    throw new Error('Failed to fetch companies');
  }
};
