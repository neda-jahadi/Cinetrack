import type { MunicipalityApiResponse, Region } from '@/types/locationTypes';
import { api } from '../../lib/api';

export const fetchMunicipalities = async (): Promise<
  MunicipalityApiResponse[]
> => {
  try {
    const res = await api.get('/api/locations/municipalities');
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to get all municipalities',
    );
  }
};

export const fetchRegions = async (): Promise<Region[]> => {
  try {
    const res = await api.get('/api/locations/regions');
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to get all regions',
    );
  }
};
