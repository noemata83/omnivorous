import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import 'font-awesome/css/font-awesome.min.css';
import thunk from 'redux-thunk';

import reducers from './store/reducers';
import { lightGreenA400, cyan400, grey400, grey100, grey500, darkBlack, white, grey300, green600 } from 'material-ui/styles/colors';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: green600,
        primary2Color: lightGreenA400,
        primary3Color: grey400,
        accent1Color: cyan400,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        borderColor: grey300,
    }
})

const app = (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>);

ReactDOM.render(app, document.getElementById('root'));
