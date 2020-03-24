import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#F9A639'
    },
    primary: {
      main: '#F9A639',
      light: '#f7cc94',
      dark: '#7A4500',
      contrastText: '#222'
    },
    secondary: {
      main: '#ba3b1f',
      light: '#C67B6B',
      dark: '#872C17'
    },
    common: {
      white: '#f7cc94',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
}, ptBR);

export default theme;