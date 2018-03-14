import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchRecipe = (user, recipe) => {
    return dispatch => {
        axios.get(`/api/recipes/${recipe._id}`)
            .then(res => {
                dispatch(displayRecipe(res.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const displayRecipe = (recipe) => {
    return {
        type: actionTypes.DISPLAY_RECIPE,
        recipe: recipe
    }
};

export const addRecipe = (user, recipe) => {
    return dispatch => {
        dispatch(addRecipeStart());
        axios.post(`/api/recipes`, {...recipe})
            .then(res => {
                console.log(res);
                dispatch(addRecipeSuccess(res.data));
            })
            .catch(error => {
                dispatch(addRecipeFail(error));
            })    
    }
}

export const addRecipeStart = () => {
    return {
        type: actionTypes.ADD_RECIPE_START
    }
}

export const addRecipeFail = (error) => {
    return {
        type: actionTypes.ADD_RECIPE_FAIL,
        error
    }
}

export const addRecipeSuccess = (recipe) => {
    return {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        recipe
    }
}

export const newRecipe = () => {
    return {
        type: actionTypes.NEW_RECIPE
    }
}

export const updateRecipe = (user, recipeId, recipe) => {
	return dispatch => {
		axios.put(`/api/recipes/${recipeId}`, recipe)
		.then(res => {
			dispatch(editRecipe(recipeId, res.data));
			dispatch(displayRecipe(res.data));
		});
	}
}

export const editRecipe = (id, recipe) => {
    return {
        type: actionTypes.EDIT_RECIPE,
        id: id,
        updatedRecipe: recipe
    }
}

export const destroyRecipe = (user, recipeId) => {
    return dispatch => {
        axios.delete(`/api/recipes/${recipeId}`)
        .then(res => dispatch(deleteRecipe(recipeId)));
    }
}

export const deleteRecipe = recipeId => {
    return {
        type: actionTypes.DELETE_RECIPE,
        id: recipeId
    }
}

export const fetchRecipes = (user) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`/api/recipes`)
        .then(response => {
            dispatch(fetchSuccess(response.data))
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFail(error));
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
