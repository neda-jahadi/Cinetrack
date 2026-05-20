import { useQuery } from "@tanstack/react-query";
import { fetchMunicipalities } from "./locationApi";

export function useMunicipalities() {
  const getMunicipalitiesQuery =  useQuery({
    queryKey: ["municipalities"] ,
    queryFn: () => fetchMunicipalities(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return getMunicipalitiesQuery;
}
