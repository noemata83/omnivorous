import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipeReducer from './recipe';
import authReducer from './auth';
import shoppingListReducer from './shoppingList';

export default combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
  form: formReducer,
  shoppingList: shoppingListReducer,
});
