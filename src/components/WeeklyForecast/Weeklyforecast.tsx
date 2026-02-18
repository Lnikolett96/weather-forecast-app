import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { weatherCodeToIcon } from "./WeatherIcons";

type DailyForecast = {
  time: string[];
  weather_code?: number[];
  precipitation_probability_max?: number[];
  temperature_2m_min?: number[];
  temperature_2m_max?: number[];
};

type Forecast = {
  daily?: DailyForecast;
};

type Props = {
  forecast: Forecast | undefined;
  isLoading: boolean;
  isError: boolean;
};

function dayName(dateStr: string) {
  const d = new Date(dateStr);
  const name = d.toLocaleDateString("hu-HU", { weekday: "long" });
  return name.charAt(0).toUpperCase() + name.slice(1).toUpperCase();
}

const WeeklyForecast: FC<Props> = ({ forecast, isLoading, isError }) => {
  if (isLoading) {
    return (
      <Box sx={{ color: "#fff" }}>
        <Typography fontSize={12} fontFamily="inter">7 napos Előrejelzés</Typography>
        <Typography sx={{ mt: 2 }} fontSize={12}>Betöltés...</Typography>
      </Box>
    );
  }

  const daily = forecast?.daily;
  if (isError || !daily?.time) {
    return (
      <Box sx={{ color: "#fff" }}>
        <Typography fontSize={12} fontFamily="inter">7 napos Előrejelzés</Typography>
        <Typography sx={{ mt: 2 }} fontSize={12}>Nem elérhető</Typography>
      </Box>
    );
  }

  const rows = daily.time.map((t: string, i: number) => ({
    day: dayName(t).toUpperCase(),
    code: daily.weather_code?.[i],
    precip: daily.precipitation_probability_max?.[i],
    min: daily.temperature_2m_min?.[i],
    max: daily.temperature_2m_max?.[i],
  }));

  return (
    <Box sx={{ color: "#fff" }}>
      <Typography fontSize={12} fontFamily="inter" sx={{ opacity: 0.9 }}>
        7 napos Előrejelzés
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
        {rows.map((r, idx) => {
          

          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "center",
                px: 0,
                py: 1.6,
              }}
            >
              {/* Bal blokk: nap + állapot */}
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.2, minWidth: 0, flex: 1 }}>
                <Typography
                  fontFamily="inter"
                  fontSize={14}
                  sx={{ fontWeight: 400 }}
                >
                  {r.day}
                </Typography>

               
              </Box>

              {/* Ikon */}
              <Box sx={{ display: "flex", justifyContent: "left", gap: 1, textAlign:"left" }}>
                {weatherCodeToIcon(r.code, { sx: { fontSize: 18 } })}
                  <Typography
                  fontFamily="inter"
                  fontSize={14}
                  sx={{ width: 56, textAlign: "left", fontWeight: 400 }}
                >
                  {r.precip != null ? `${r.precip}%` : "—"}
                </Typography>
              </Box>

              {/* Csapadék */}
              

              {/* Min/Max */}
              <Typography
                fontFamily="inter"
                fontSize={14}
                sx={{ width: 86, textAlign: "right", opacity: 0.95 }}
              >
                {r.min != null && r.max != null
                  ? `${Math.round(r.min)}° / ${Math.round(r.max)}°`
                  : "—"}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeeklyForecast;
