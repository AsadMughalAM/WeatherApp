import type { CurrentWeather } from "../api/weatherApi";
import { Card } from "./ui/card";
import { Thermometer, Wind, Droplet } from "lucide-react";
import { WeatherIcon } from "@/lib/weatherIcons";

interface WeatherCardProps {
  data: CurrentWeather;
}


export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const description = data?.weather?.[0]?.description ?? "No description";
  const temp = data?.main?.temp ?? "--";
  const feelsLike = data?.main?.feels_like ?? "--";
  const humidity = data?.main?.humidity ?? "--";
  const windSpeed = data?.wind?.speed ?? "--";
  

  return (
    <Card className="p-6 bg-linear-to-r from-white to-slate-50 shadow-lg">
      <div className="flex items-center gap-6">
        <div className="shrink-0">
          <div className="w-28 h-28 flex items-center justify-center">
            <WeatherIcon description={description} className="size-20 animate-weather-icon text-primary" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-4">
            <h2 className="text-4xl font-extrabold">{temp}°C</h2>
            <div className="text-sm text-muted-foreground">Feels like {feelsLike}°C</div>
          </div>

          <div className="mt-2 text-lg font-medium">{data?.name ?? "Unknown location"}</div>
          <div className="mt-1 text-sm text-muted-foreground capitalize">{description}</div>
        </div>

        <div className="text-sm text-muted-foreground text-right space-y-2">
          <div className="flex items-center gap-2 justify-end">
            <Droplet className="size-4 text-muted-foreground" />
            <span>Humidity:</span>
            <span className="font-medium">{humidity}%</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Wind className="size-4 text-muted-foreground" />
            <span>Wind:</span>
            <span className="font-medium">{windSpeed} m/s</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Thermometer className="size-4 text-muted-foreground" />
            <span>Feels:</span>
            <span className="font-medium">{feelsLike}°C</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
