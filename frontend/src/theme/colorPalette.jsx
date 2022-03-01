import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      light: '#99d066',
      main: '#689f38',
      dark: '#387002',
      contrastText: '#000000'
    },
    secondary: {
      light: '#4ebaaa',
      main: '#00897b',
      dark: '#005b4f',
      contrastText: '#fff'
    }
  }
});

export default theme;
