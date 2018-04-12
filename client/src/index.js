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
import lightGreen from 'material-ui/colors/lightGreen';
import cyan from 'material-ui/colors/cyan';
import grey from 'material-ui/colors/grey';
import common from 'material-ui/colors/common';
import green from 'material-ui/colors/green';
const lightGreenA400 = lightGreen.A400;
const cyan400 = cyan['400'];
const grey400 = grey['400'];
const grey100 = grey['100'];
const grey500 = grey['500'];
const darkBlack = common.darkBlack;
const white = common.white;
const grey300 = grey['300'];
const green600 = green['600'];

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
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>);

ReactDOM.render(app, document.getElementById('root'));
