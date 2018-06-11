import axios from 'axios';
import * as actionTypes from './actionTypes';

export const displayRecipe = recipe => ({
  type: actionTypes.DISPLAY_RECIPE,
  recipe,
});
export const addRecipeStart = () => ({
  type: actionTypes.ADD_RECIPE_START,
});

export const addRecipeFail = error => ({
  type: actionTypes.ADD_RECIPE_FAIL,
  error,
});

export const addRecipeSuccess = recipe => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  recipe,
});
export const fetchRecipe = (user, recipe) => dispatch =>
  axios
    .get(`/api/recipes/${recipe._id}`)
    .then(res => dispatch(displayRecipe(res.data)))
    .catch(error => console.log(error));

export const addRecipe = (user, recipe) =>
  (dispatch) => {
    dispatch(addRecipeStart());
    axios
      .post('/api/recipes', { ...recipe })
      .then(res => dispatch(addRecipeSuccess(res.data)))
      .catch(error => dispatch(addRecipeFail(error)));
  };


export const newRecipe = () => ({
  type: actionTypes.NEW_RECIPE,
});

export const editRecipe = (id, recipe) => ({
  type: actionTypes.EDIT_RECIPE,
  id,
  updatedRecipe: recipe,
});

export const updateRecipe = (user, recipeId, recipe) =>
  dispatch =>
    axios.put(`/api/recipes/${recipeId}`, recipe).then((res) => {
      dispatch(editRecipe(recipeId, res.data));
      dispatch(displayRecipe(res.data));
    });


export const deleteRecipe = recipeId => ({
  type: actionTypes.DELETE_RECIPE,
  id: recipeId,
});

export const destroyRecipe = (user, recipeId) =>
  dispatch =>
    axios
      .delete(`/api/recipes/${recipeId}`)
      .then(() => dispatch(deleteRecipe(recipeId)));

export const fetchStart = () =>
  ({
    type: actionTypes.FETCH_START,
  });

export const fetchFail = error =>
  ({
    type: actionTypes.FETCH_FAIL,
    error,
  });

export const fetchSuccess = recipes => ({
  type: actionTypes.FETCH_SUCCESS,
  recipes,
});

export const fetchRecipes = () => (dispatch) => {
  dispatch(fetchStart());
  axios
    .get('/api/recipes')
    .then(response => dispatch(fetchSuccess(response.data)))
    .catch((error) => {
      console.log(error);
      dispatch(fetchFail(error));
    });
};
