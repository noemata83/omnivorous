import * as actionTypes from '../actions/actionTypes';

const initialState = {
        recipes: [],
        currentRecipe: null,
        loading: false,
        error: null
    };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_START):
            return {
                ...state,
                loading: true,
                error: null
            }
        case (actionTypes.FETCH_FAIL):
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case (actionTypes.FETCH_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                recipes: action.recipes
            }
        case (actionTypes.DISPLAY_RECIPE):
            return {
                ...state,
                currentRecipe: action.recipe
            }
        case (actionTypes.ADD_RECIPE_START):
            return {
                ...state,
                loading: true,
                error: null
            }
        case (actionTypes.ADD_RECIPE_FAIL):
            return {
                ...state,
                error: action.error
            }
        case (actionTypes.ADD_RECIPE_SUCCESS):
            return {
                ...state,
                recipes: state.recipes.concat(action.recipe),
                loading: false,
                error: null
            }
        case (actionTypes.NEW_RECIPE):
            return {
                ...state,
                currentRecipe: null,
            }
        case (actionTypes.EDIT_RECIPE):
            const recipes = [...state.recipes];
            recipes.forEach((recipe, index) => {
                if (recipe._id === action.id) {
                    recipes[index] = { ...action.updatedRecipe,
                                        _id: action.id }
                }
            });
            return {
                ...state,
                recipes: recipes
            }
        case (actionTypes.DELETE_RECIPE):
            let recipeList = [...state.recipes];
            const targetIndex = recipeList.map(recipe => recipe._id).indexOf(action.id);
            recipeList.splice(targetIndex, 1);
            return {
                ...state,
                recipes: recipeList,
                currentRecipe: null
            }
        default:
            return state;
    }
}

export default reducer;