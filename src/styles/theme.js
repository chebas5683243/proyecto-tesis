import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1ba82f',
      dark: '#3FBC20',
      light: '#18C2D3'
    },
    secondary: {
      main: '#0030A8',
      dark: '#001d65',
      light: '#001d65',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    button: {
      textTransform: 'none'
    }
  },
  inputPrimaryColor: '#001d65',
  inputSecondaryColor: '#0030A8',
  disabledColor: '#f3f3f3',
  gray: '#4F4F4F',
  gray3: '#828282',
  bgColor: '#FAFAFA',
  white: '#fff'
});
 
export default theme;