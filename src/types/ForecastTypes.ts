export type DailyForecast = {
  time: string[];
  temperature_2m_max?: number[];
};

export type Forecast = {
  daily?: DailyForecast;
};
