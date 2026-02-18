export const queryKeys = {
  geocoding: (q: string) => ["geocoding", q] as const,
  forecast: (lat: number, lon: number) => ["forecast", lat, lon] as const,
};