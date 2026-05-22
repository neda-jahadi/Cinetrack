import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCompanies, register } from "./companyApi";
import { toast } from "react-toastify";

export const userRegisterCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success("Company added successfully!");
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            queryClient.invalidateQueries({ queryKey: ["me"] });
        }
    })
}

export function useAllCompanies() {
  const getCompaniesQuery =  useQuery({
    queryKey: ["companies"],
    queryFn: () => getAllCompanies(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  return getCompaniesQuery;
}
