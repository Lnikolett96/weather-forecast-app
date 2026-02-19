export type DailyForecast = {
  time: string[];
  weather_code?: number[];
  precipitation_probability_max?: number[];
  temperature_2m_min?: number[];
  temperature_2m_max?: number[];
};

export type Forecast = {
  daily?: DailyForecast;
};