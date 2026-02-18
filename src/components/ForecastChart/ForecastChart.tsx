import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import type { Forecast } from "../../types/ForecastTypes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


type Props = {
  forecast: Forecast | undefined;
  isLoading: boolean;
  isError: boolean;
};

function dayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("hu-HU", { weekday: "short" }); // H, K, Sze...
}

const ForecastChart: FC<Props> = ({ forecast, isLoading, isError }) => {
  if (isLoading) {
    return (
      <Box sx={{ color: "#fff", mt: 3 }}>
        <Typography sx={{ mt: 1 }} fontSize={12}>Betöltés...</Typography>
      </Box>
    );
  }

  const daily = forecast?.daily;
  const temps = daily?.temperature_2m_max;

  if (isError || !daily || !Array.isArray(daily.time) || !temps || temps.length === 0) {
    return (
      <Box sx={{ color: "#fff", mt: 3 }}>
        <Typography sx={{ mt: 1 }} fontSize={12}>Nem elérhető</Typography>
      </Box>
    );
  }

  const data = daily.time.map((t, i) => ({
    day: dayLabel(t),
    max: temps[i],
  }));

  return (
    <Box sx={{ color: "#fff", mt: 2 }}>
      <Box
        sx={{
          mt: 2,
          height: 250,
          borderRadius: 5,
          border: "2px solid rgb(255, 255, 255)",
          backgroundColor: "transparent",
          p: 1.5,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#fff" strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="day" tick={{ fill: "#fff", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} tick={{ fill: "#fff", fontSize: 12 }} axisLine={false} />
            <Tooltip
              formatter={(value) => [`${Math.round(Number(value))}°C`, "Max"]}
              labelFormatter={(label) => `Nap: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="max"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ForecastChart;
