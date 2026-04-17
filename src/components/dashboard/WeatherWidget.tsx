import { Card, CardContent } from "@/components/ui/card";
import { HiSun, HiFire, HiCloud, HiBeaker } from "react-icons/hi2";
import { averageWeather, plantWeatherHistory } from "@/data/mock-data";

export function WeatherWidget({ plantId, dateFilter }: { plantId: string; dateFilter: string }) {
  let weather;

  if (dateFilter.toLowerCase() === "7d") {
    weather = averageWeather(plantWeatherHistory[plantId].slice(-7));
  } else if (dateFilter.toLowerCase() === "30d") {
    weather = averageWeather(plantWeatherHistory[plantId].slice(-30));
  } else {
    weather = plantWeatherHistory[plantId]?.[plantWeatherHistory[plantId].length - 1]; // latest day
  }

  if (!weather) return <p>No weather data available</p>;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <HiSun className="h-5 w-5 text-warning" />
          <div>
            <div className="text-xs font-medium text-foreground">{weather.condition}</div>
            <div className="text-[10px] text-muted-foreground">
              ☀ {weather.sunrise} — 🌙 {weather.sunset}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <HiFire className="h-3.5 w-3.5 text-destructive" />
            <span className="text-muted-foreground">Temp</span>
            <span className="ml-auto font-semibold text-foreground">{weather.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <HiBeaker className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Hum.</span>
            <span className="ml-auto font-semibold text-foreground">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <HiCloud className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Wind</span>
            <span className="ml-auto font-semibold text-foreground">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <HiSun className="h-3.5 w-3.5 text-warning" />
            <span className="text-muted-foreground">GHI</span>
            <span className="ml-auto font-semibold text-foreground">{weather.irradiance} W/m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
