# Weather App (React + TypeScript)

Egyszerű időjárás-előrejelző web app, amely az **Open-Meteo** API-kat használja város kereséshez (Geocoding) és időjárás adatok lekéréséhez (Forecast).

## Funkciók

### Város kiválasztása
- A városnévre kattintva megnyílik egy **modal**.
- A modalban található kereső az **Open-Meteo Geocoding API**-t használja.
- Több találat esetén a felhasználó listából választhat.
- Első megnyitáskor (ha nincs kiválasztott város) a modal automatikusan megjelenik.
- A kiválasztott város adatai **localStorage**-ba mentésre kerülnek.

Geocoding API:  
- Open-Meteo Geocoding: https://open-meteo.com/en/docs/geocoding-api

### Adatok megjelenítése
- Aktuális hőmérséklet és időjárás állapot (pl. tiszta idő, eső, stb.)
- **7 napos előrejelzés**, amely tartalmazza:
  - nap neve
  - állapot ikon
  - csapadék valószínűség
  - minimum / maximum hőmérséklet

Forecast API:  
- Open-Meteo Forecast: https://open-meteo.com/en/docs/

### Grafikon
- Az előrejelzés alatt grafikonon megjelenik a napokra vonatkozó **legmagasabb (max) hőmérséklet**.

### Design
- A felület a megadott Figma design alapján készült:
  - https://www.figma.com/file/zMVbPAOqbBfJ7vPwZct9WX/Id%C5%91j%C3%A1r%C3%A1s?type=design&node-id=0%3A1&mode=design&t=cqhWcADlq7Tg0gUH-1

## Tech stack
- **React**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **TanStack Query** (adatlekérés, cache, request state kezelés)
- **Recharts** (grafikon)

## Telepítés és futtatás

### Követelmények
- Node.js (ajánlott: 18+)

### Telepítés
```bash
npm install
```
### Inditás
``` bash
npm run dev
```
## Architektúra megközelítés

- Az API hívások külön `api/` mappában találhatók.
- TanStack Query kezeli az adatlekérést, cache-elést és loading/error state-et.
- A város keresés debounced módon történik.
- A localStorage kezelés egy dedikált custom hook segítségével történik.
- A komponensek feature-alapú bontásban vannak szervezve.

src/
│
├── api/
│ ├── OpenMeteo.ts # API hívások (geocoding, forecast)
│ └── QueryKeys.ts # TanStack query key factory
│
├── components/
│ ├── CitySelectorModal/
│ │ ├── CitySearch.tsx
│ │ └── CitySelectorModal.tsx
│ │
│ ├── CurrentWeather/
│ │ └── CurrentWeather.tsx
│ │
│ ├── WeeklyForecast/
│ │ ├── WeeklyForecast.tsx
│ │ └── WeatherIcons.tsx
│ │
│ └── ForecastChart/
│ └── ForecastChart.tsx
│
├── hooks/
│ ├── useCitySearch.ts
│ ├── useDebouncedValue.ts
│ ├── useForecast.ts
│ └── useLocalStorageState.ts
│
├── pages/
│ └── Home.tsx
│
├── Providers/
│ └── QueryProvider.tsx
│
├── types/
│ ├── City.ts
│ └── ForecastTypes.ts
│
├── utils/
│ └── WeatherCode.ts
│
└── App.tsx

## Megjegyzés

Bár a feladatkiírás nem írta elő a TypeScript használatát, a projektet tudatosan TypeScript-tel készítettem el.

Ennek célja:
- a típusbiztonság növelése
- a jobb karbantarthatóság
- az API válaszok strukturált kezelése
- valamint a fejlesztői élmény javítása

A teljes alkalmazás természetesen megvalósítható lett volna tisztán React használatával is, azonban a TypeScript alkalmazásával szerettem volna demonstrálni hogyha szükséges azt is ismerem.

*Lisóczki Nikolett*