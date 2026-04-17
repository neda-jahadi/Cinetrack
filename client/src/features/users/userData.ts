import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../lib/api/user";

const jobKeys = {
  all: ["users"] as const,
};

export function useUsers() {
  const getJobsQuery =  useQuery({
    queryKey: jobKeys.all,
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  return getJobsQuery;
}
