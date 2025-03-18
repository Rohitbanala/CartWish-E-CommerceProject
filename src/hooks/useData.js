import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";
export default function useData(
  endpoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) {
  async function fetchFunction() {
    return apiClient.get(endpoint, customConfig).then((res) => res.data);
  }
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime,
  });
}
