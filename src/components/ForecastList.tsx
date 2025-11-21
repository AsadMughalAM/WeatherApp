import React from "react";
import type { ForecastData } from "../api/weatherApi";
import { Card } from "./ui/card";
import { Sun } from "lucide-react";
import { WeatherIcon } from "@/lib/weatherIcons";

interface ForecastListProps {
  data: ForecastData;
}

export const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  const items = data?.list?.slice(0, 5) ?? [];

  return (
    <div className="flex overflow-x-auto gap-4 py-2">
      {items.map((item, idx) => {
        const date = item?.dt ? new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', hour: 'numeric' }) : "-";
        const description = item?.weather?.[0]?.description ?? "-";
        const temp = item?.main?.temp ?? "--";
        const icon = item?.weather?.[0]?.icon;

        return (
          <Card key={idx} className="min-w-[140px] p-3 bg-white/80 shadow-sm">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-xs text-muted-foreground">{date}</div>
              {icon ? (
                <WeatherIcon description={description} className="size-12 animate-weather-icon text-primary" />
              ) : (
                <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                  <Sun className="size-5 text-muted-foreground" />
                </div>
              )}
              <div className="text-sm font-medium">{Math.round(Number(temp))}°C</div>
              <div className="text-xs text-muted-foreground capitalize">{description}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
