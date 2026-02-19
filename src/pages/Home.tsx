import type { City } from '../types/City'
import { Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import WeeklyForecast from '../components/WeeklyForecast/WeeklyForecast'
import ForecastChart from "../components/ForecastChart/ForecastChart";
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { useForecast } from '../hooks/useForecast'

const STORAGE_KEY = "selectedCity";

const Home = () => {
  const [selectedCity, setSelectedCity] = useLocalStorageState<City | null>(STORAGE_KEY, null);

   const { data, isLoading, isError } = useForecast(
    selectedCity?.latitude,
    selectedCity?.longitude
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #7CB9E8 0%, #A3D4FA 100%)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 4, md: 6 },
          px: { xs: 8, md: 2 },
        }}
      >
        {/* Felső rész */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
             <CurrentWeather
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              data={data}
              isLoading={isLoading}
              isError={isError}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
            <Box sx={{ color: '#fff' }}>
              <WeeklyForecast
              forecast={data}
              isLoading={isLoading}
              isError={isError}
              />
            </Box>
            <Box sx={{ color: '#fff' }}>
              <ForecastChart forecast={data} isLoading={isLoading} isError={isError} />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 'auto',
            color: '#fff',
            pt: 4,
          }}
        >
          <Typography fontSize={12}>
            Lisóczki Nikolett
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Home