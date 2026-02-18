import CitySelectorModal from '../CitySelectorModal/CitySelectorModal';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { weatherCodeToLabel } from "../../utils/WeatherCode";
import type { City } from '../../types/City';



type ForecastData = any;

type CurrentWeatherProps = {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  data: ForecastData | undefined;
  isLoading: boolean;
  isError: boolean;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({selectedCity, setSelectedCity, data, isLoading, isError}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTemp = data?.current?.temperature_2m;       // number
  const currentCode = data?.current?.weather_code;         // number
  const currentLabel = weatherCodeToLabel(currentCode);

  useEffect(() => {
    if (!selectedCity) setIsModalOpen(true);
  }, [selectedCity]);
  
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <Box sx={{ color: '#fff' }}>
      <Typography
        fontSize={12}
        component="button"
        onClick={handleOpen}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
      >
      {selectedCity ? selectedCity.name : "Város neve"}
      </Typography>

      <Typography fontSize={48}>
        {isLoading ? "…" : isError ? "—" : `${Math.round(currentTemp)}°C`}
      </Typography>
      <Typography fontSize={12}>
        {isLoading ? "Betöltés..." : isError ? "Hiba az adatoknál" : currentLabel}
      </Typography>

      <CitySelectorModal
        open={isModalOpen}
        handleClose={handleClose}
        onSelectCity={(city) => {
          setSelectedCity(city); 
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
}; export default CurrentWeather