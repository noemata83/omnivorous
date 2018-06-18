import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, red, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: cyan,
    error: red,
  },
  typography: {
    fontFamily: ['Open Sans'].join(','),
    fontSize: '14',
    htmlFontSize: 10,
  },
});

export default theme;
