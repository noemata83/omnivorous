import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchShoppingLists = (user) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`/api/shopping`)
            .then( res => {
                dispatch(fetchSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchFail(error));
            });
    }
}

const fetchStart = () => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_START
    }
}

const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_FAIL,
        error
    }
}

const fetchSuccess = (lists) => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_SUCCESS,
        lists
    }
}

export const updateList = (id, list) => {
    return {
        type: actionTypes.UPDATE_SHOPPING_LIST,
        list
    }
}

export const addShoppingList = (user, list) => {
    return dispatch => {
        dispatch(addShoppingListStart());
        axios.post(`/api/shopping`, {...list})
            .then(res => {
                console.log(res);
                dispatch(addShoppingListSuccess(res.data));
            })
            .catch(error => {
                dispatch(addShoppingListFail(error));
            });
    }
}

const addShoppingListStart = () => {
    return {
        type: actionTypes.ADD_SHOPPING_LIST_START
    }
}

const addShoppingListFail = (error) => {
    return {
        type: actionTypes.ADD_SHOPPING_LIST_FAIL,
        error
    }
}

const addShoppingListSuccess = (list) => {
    return {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        list
    }
}

export const displayShoppingList = (list) => {
    return {
        type: actionTypes.DISPLAY_SHOPPING_LIST,
        list
    }
}

export const addListItem = (item) => {
    return {
        type: actionTypes.ADD_LIST_ITEM,
        item,
    }
}

export const editListItem = (itemId, item) => {
    return {
        type: actionTypes.EDIT_SHOPPING_LIST_ITEM,
        itemId,
        item
    }
}