import { combineReducers } from 'redux';
import recipeReducer from './recipe';
import authReducer from './auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    recipe: recipeReducer,
    form: formReducer
})