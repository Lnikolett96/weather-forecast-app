import { useQuery } from "@tanstack/react-query";
import { fetchGeocoding } from "../api/OpenMeteo";
import { queryKeys } from "../api/QueryKeys";

export function useCitySearch(q: string) {
  const trimmed = q.trim();

  return useQuery({
    queryKey: queryKeys.geocoding(trimmed.toLowerCase()),
    queryFn: ({ signal }) => fetchGeocoding(trimmed, signal),
    enabled: trimmed.length >= 2,
    staleTime: 1000 * 60 * 60,
  });
}