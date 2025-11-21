import { useQuery } from "@tanstack/react-query";
import {  getForecast } from "../api/weatherApi";
import type {  Coordinates } from "../api/weatherApi";

export const useForecast = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ["forecast", coords?.lat, coords?.lon],
    queryFn: () => getForecast(coords!),
    enabled: !!coords,
  });
};
