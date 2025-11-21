import { api } from "./axios";
import { API_CONFIG } from "./config";
import { z } from "zod";

export interface Coordinates {
  lat: number;
  lon: number;
}
export interface CurrentWeather {
  name: string; // City name
  weather: {
    description: string;
    icon?: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind?: {
    speed: number;
  };
}
export interface ForecastData {
  list: {
    dt: number; // timestamp
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon?: string;
    }[];
  }[];
}

const WeatherItemSchema = z.object({
  description: z.string(),
  icon: z.string().optional(),
});

const CurrentWeatherSchema = z.object({
  name: z.string(),
  weather: z.array(WeatherItemSchema),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({ speed: z.number() }).optional(),
});

const ForecastItemSchema = z.object({
  dt: z.number(),
  main: z.object({ temp: z.number() }),
  weather: z.array(WeatherItemSchema),
});

const ForecastSchema = z.object({ list: z.array(ForecastItemSchema) });


export const getCoordinates = async (city: string): Promise<Coordinates> => {
  const response = await api.get("/geo/1.0/direct", {
    params: {
      q: city,
      limit: 1,
      appid: API_CONFIG.API_KEY,
    },
  });

  if (response.data.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
};


// 🌡 B) Current weather data
export const getCurrentWeather = async (
  coords: Coordinates
): Promise<CurrentWeather> => {
  const response = await api.get("/data/2.5/weather", {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      units: "metric",
      appid: API_CONFIG.API_KEY,
    },
  });
  // Validate shape
  try {
    const parsed = CurrentWeatherSchema.parse(response.data);
    return parsed;
  } catch (e) {
    // Surface a readable error for debugging
    throw new Error("Invalid current weather response: " + (e as Error).message);
  }
};

// 🔮 C) 5-day forecast
export const getForecast = async (
  coords: Coordinates
): Promise<ForecastData> => {
  const response = await api.get("/data/2.5/forecast", {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      units: "metric",
      appid: API_CONFIG.API_KEY,
    },
  });
  try {
    const parsed = ForecastSchema.parse(response.data);
    return parsed;
  } catch (e) {
    throw new Error("Invalid forecast response: " + (e as Error).message);
  }
};
