import { createMuiTheme } from '@material-ui/core/styles';
// import { lightGreenA400, cyan400, grey400, grey100, grey500, darkBlack, white, grey300, green600 } from '@material-ui/core/colors';
import { cyan, red, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: cyan,
        error: red,
    },
    typography: {
        fontFamily: [
            'Open Sans'
        ].join(','),
        fontSize:'1.6rem',
        htmlFontSize: 10
    },

});

export default theme;