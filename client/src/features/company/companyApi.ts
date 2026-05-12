import { api } from "../../lib/api"
import type { CompanyInput, AddCompanyResponse } from "../../types/companyTypes";

export const register = async (company: CompanyInput): Promise<AddCompanyResponse> => {
    try {
        const res = await api.post('/api/companies', company);
        return res.data.data;
    } catch (error:any) {
        throw new Error(
            error.response?.data?.message || "Company register failed"
        );
    }
}