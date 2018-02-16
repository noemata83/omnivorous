import axios from 'axios';
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

export const newRecipe = () => {
    return {
        type: actionTypes.NEW_RECIPE
    }
}

export const editRecipe = (id, recipe) => {
    return {
        type: actionTypes.EDIT_RECIPE,
        id: id,
        updatedRecipe: recipe
    }
}

export const fetchRecipes = (user) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`/api/${user}/recipes`)
        .then(response => {
            dispatch(fetchSuccess(response.data.recipes))
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFail(error.response.data.data.error));
        })
    }
}

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    }
}

export const fetchSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        recipes
    }
}

export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error
    }
}