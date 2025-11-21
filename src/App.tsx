import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { useCoordinates } from "./hooks/useCoordinates";
import { useWeather } from "./hooks/useWeather";
import { useForecast } from "./hooks/useForecast";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastList } from "./components/ForecastList";

function App() {
  const [city, setCity] = useState("");
  const {
    data: coords,
    isLoading: coordsLoading,
    error: coordsError,
  } = useCoordinates(city);

  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useWeather(coords || null);

  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast(coords || null);

  const handleSearch = (newCity: string) => {
    setCity(newCity); // triggers useCoordinates
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-b from-white via-slate-50 to-slate-100 flex items-start">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Weather • Forecast</h1>
            <p className="text-sm text-muted-foreground">Enter a city to get current conditions and a short forecast</p>
          </div>
        </header>

        <div className="space-y-6">
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>

          {coordsLoading && <p className="text-sm text-muted-foreground">Fetching coordinates...</p>}
          {coordsError && <p className="text-sm text-destructive">{(coordsError as Error).message}</p>}

          {weatherLoading && <p className="text-sm text-muted-foreground">Loading weather...</p>}
          {weatherError && <p className="text-sm text-destructive">{(weatherError as Error).message}</p>}

          {weather && <WeatherCard data={weather} />}

          {forecastLoading && <p className="text-sm text-muted-foreground">Loading forecast...</p>}
          {forecastError && <p className="text-sm text-destructive">{(forecastError as Error).message}</p>}

          {forecast && <ForecastList data={forecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;
