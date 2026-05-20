import type { MunicipalityApiResponse } from "@/types/locationTypes";
import { api } from "../../lib/api";

export const fetchMunicipalities = async (): Promise<MunicipalityApiResponse[]> => {
    try {
        const res = await api.get("/api/locations");
        return res.data.data

    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to get all municipalities"
        );
    }
}