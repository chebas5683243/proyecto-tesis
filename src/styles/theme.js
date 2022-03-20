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
  white: '#fff',
  helpColor: '#c4c4c4',
  estado1Color: '#1dbb9a',
  estado1Bg: '#c6f2e9',
  estado2Color: '#1dbb79',
  estado2Bg: '#d9efd9',
  estado3Color: '#e9ca33',
  estado3Bg: '#fcf2bc',
  estado4Color: '#f6b73e',
  estado4Bg: '#ffeaca',
  estado5Color: '#ea6364',
  estado5Bg: '#ffd9d9',
  estado6Color: '#e10000',
  estado6Bg: '#ffa7a7',
});
 
export default theme;