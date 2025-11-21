import { api } from "./axios"
import { API_CONFIG } from "./config";
import type { CurrentWeather } from "@/types/weather";

export async function getWeather(lat:number,lon:number):Promise<CurrentWeather | null>{
    const response =await api.get(`${API_CONFIG.WEATHER_BASE_URL}/weather`,{
        params:{
            lat,
            lon,
        }
    })

    return response.data
}