import * as actionTypes from './actionTypes';

export const displayRecipe = (recipe) => {
    return {
        type: actionTypes.DISPLAY_RECIPE,
        recipe: recipe
    }
};

export const addRecipe = (recipe) => {
    return {
        type: actionTypes.ADD_RECIPE,
        recipe: recipe
    }
}