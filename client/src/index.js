import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'font-awesome/css/font-awesome.min.css';

import recipeReducer from './store/reducers/recipe';

const store = createStore(recipeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = (
    <Provider store={store}>
        <App />
    </Provider>);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
