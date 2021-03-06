import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "rgba(32, 1, 34, 0.87)",
      secondary: "rgba(32, 1, 34, 0.54)",
      disabled: "rgba(32, 1, 34, 0.38)",
      hint: "rgba(32, 1, 34, 0.38)"
    },
    primary: {
      main: '#F9A639',
      light: '#f7cc94',
      contrastText: '#222'
    },
    secondary: {
      main: '#ba3b1f',
      dark: '#6f0000'
    },
    common: {
      white: '#f7cc94',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
}, ptBR);

export default theme;