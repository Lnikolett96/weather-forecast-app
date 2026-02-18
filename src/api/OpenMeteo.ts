export async function fetchGeocoding(query: string, signal?: AbortSignal) {
    const url: URL = new  URL(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`);
    url.searchParams.set("name", query);
    url.searchParams.set("count", "10");
    url.searchParams.set("language", "hu");
    url.searchParams.set("format", "json");

    const res = await fetch(url.toString(), { signal });
    if (!res.ok) throw new Error(`Geocoding error: ${res.status}`);
    return res.json();

}

export async function fetchForecast(lat: number, lon: number, signal?: AbortSignal) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("timezone", "auto");

  // aktuális állapot
  url.searchParams.set("current", "temperature_2m,weather_code");

  // 7 napos előrejelzéshez
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
  );
  url.searchParams.set("forecast_days", "7");

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`Forecast error: ${res.status}`);
  return res.json();
}