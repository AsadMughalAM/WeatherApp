// React import not required with new JSX transform
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Moon,
  Wind,
} from "lucide-react";

export function pickWeatherIcon(description?: string, isNight?: boolean) {
  const d = (description || "").toLowerCase();

  if (d.includes("thunder") || d.includes("storm") || d.includes("lightning")) return CloudLightning;
  if (d.includes("drizzle")) return CloudDrizzle;
  if (d.includes("rain")) return CloudRain;
  if (d.includes("snow")) return CloudSnow;
  if (d.includes("fog") || d.includes("mist") || d.includes("haze") || d.includes("smoke")) return CloudFog;
  if (d.includes("clear") || d.includes("sun") || d.includes("sunny")) return isNight ? Moon : Sun;
  if (d.includes("cloud")) return Cloud;
  if (d.includes("wind")) return Wind;

  // default
  return isNight ? Moon : Sun;
}

export function WeatherIcon({ description, isNight, className = "size-10 text-primary" }: { description?: string; isNight?: boolean; className?: string }) {
  const Icon = pickWeatherIcon(description, isNight);
  return <Icon className={className} />;
}
