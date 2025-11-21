import { useQuery } from "@tanstack/react-query";
import { getCoordinates } from "../api/weatherApi";

export const useCoordinates = (city: string) => {
  return useQuery({
    queryKey: ["coordinates", city],
    queryFn: () => getCoordinates(city),
    enabled: !!city, 
  });
};
