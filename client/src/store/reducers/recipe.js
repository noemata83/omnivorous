import * as actionTypes from '../actions/actionTypes';

const initialState = {
  recipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        recipes: action.recipes,
      };
    case actionTypes.DISPLAY_RECIPE:
      return {
        ...state,
        currentRecipe: action.recipe,
      };
    case actionTypes.ADD_RECIPE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_RECIPE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.concat(action.recipe),
        loading: false,
        error: null,
        currentRecipe: action.recipe,
      };
    case actionTypes.NEW_RECIPE:
      return {
        ...state,
        currentRecipe: null,
      };
    case actionTypes.EDIT_RECIPE: {
      const recipes = [...state.recipes];
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe._id === action.id) {
          return {
            ...action.updatedRecipe,
            _id: action.id,
          };
        }
        return recipe;
      });
      return {
        ...state,
        recipes: updatedRecipes,
      };
    }
    case actionTypes.DELETE_RECIPE: {
      const recipeList = [...state.recipes];
      const targetIndex = recipeList
        .map(recipe => recipe._id)
        .indexOf(action.id);
      const updatedRecipeList = recipeList.filter((recipe, index) => index !== targetIndex);
      return {
        ...state,
        recipes: updatedRecipeList,
        currentRecipe: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
