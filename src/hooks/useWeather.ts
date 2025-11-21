import { useQuery } from "@tanstack/react-query";
import  { getCurrentWeather } from "../api/weatherApi";
import type { Coordinates } from "../api/weatherApi";

export const useWeather = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ["weather", coords?.lat, coords?.lon],
    queryFn: () => getCurrentWeather(coords!),
    enabled: !!coords, 
  });
};
