import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "../api/OpenMeteo";
import { queryKeys } from "../api/QueryKeys";

export function useForecast(lat?: number, lon?: number) {
  return useQuery({
    queryKey: lat != null && lon != null ? queryKeys.forecast(lat, lon) : ["forecast", "none"],
    queryFn: ({ signal }) => fetchForecast(lat!, lon!, signal),
    enabled: lat != null && lon != null,
    staleTime: 1000 * 60 * 5, // 5 perc, időjárás gyorsabban avul
  });
}