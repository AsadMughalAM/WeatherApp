import axios from "axios";
import { API_CONFIG } from "./config";

export const api = axios.create({
    baseURL: "https://api.openweathermap.org",
    params: API_CONFIG.DEFAULT_PARAMS,
});
