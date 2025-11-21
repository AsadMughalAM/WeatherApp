import { api } from "./axios";
import { API_CONFIG } from "./config";
import type { Coordinates } from "@/types/weather";

export async function getCoordinates(city:string):Promise<Coordinates | null>{
   const response=await api.get(`${API_CONFIG.GEO_BASE_URL}/direct`,{
    params:{
        q:city,
        limit:1,
    }
   });
   if (response.data.length===0) return null;
   return {
    lat:response.data[0].lat,
    lon:response.data[0].lon,
}
}