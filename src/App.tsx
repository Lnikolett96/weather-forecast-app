import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Home from './pages/Home'


const theme = createTheme({
  palette: {
    primary: {
      main: '#A3D4FA',
      dark: '#7CB9E8',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
    </ThemeProvider>
  )
}

export default App