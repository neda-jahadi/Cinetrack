import type {
  MunicipalityApiResponse,
  Region,
} from '@/features/locations/types/locationTypes';
import { api } from '@/lib/api/axios';
import axios from 'axios';

export const fetchMunicipalities = async (): Promise<
  MunicipalityApiResponse[]
> => {
  try {
    const res = await api.get('/api/locations/municipalities');
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to get all municipalities',
      );
    }
    throw new Error('Failed to get all municipalities');
  }
};

export const fetchRegions = async (): Promise<Region[]> => {
  try {
    const res = await api.get('/api/locations/regions');
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to get all regions',
      );
    }
    throw new Error('Failed to get all regions');
  }
};
