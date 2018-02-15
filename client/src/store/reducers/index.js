import { combineReducers } from 'redux';
import recipeReducer from './recipe';
import authReducer from './auth';

export default combineReducers({
    auth: authReducer,
    recipe: recipeReducer
})