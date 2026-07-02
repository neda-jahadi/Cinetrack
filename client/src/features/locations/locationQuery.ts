import { useQuery } from '@tanstack/react-query';
import { fetchMunicipalities, fetchRegions } from './locationApi';

export function useMunicipalities() {
  const getMunicipalitiesQuery = useQuery({
    queryKey: ['municipalities'],
    queryFn: () => fetchMunicipalities(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return getMunicipalitiesQuery;
}

export function useRegions() {
  const getRegionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: () => fetchRegions(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return getRegionsQuery;
}
