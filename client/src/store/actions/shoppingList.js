import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchShoppingLists = (user) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`/api/shopping`)
            .then( res => {
                dispatch(fetchSuccess(res.data));
                dispatch(displayShoppingList(res.data[0]));
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

export const createShoppingList = (list) => {
    return dispatch => {
        axios.post(`api/shopping`, {...list})
            .then(res => {
                dispatch(createShoppingListSuccess(res.data));
            })
            .catch(err => {
                dispatch(createShoppingListFail(err));
            });
    }
}

export const createShoppingListSuccess = (list) => {
    return {
        type: actionTypes.CREATE_SHOPPING_LIST_SUCCESS,
        list
    }
}

export const createShoppingListFail = (error) => {
    return {
        type: actionTypes.CREATE_SHOPPING_LIST_FAIL,
        error
    }
}

// export const saveShoppingList = (user, list) => {
//     return dispatch => {
//         dispatch(saveShoppingListStart());
//         axios.post(`/api/shopping`, {...list})
//             .then(res => {
//                 console.log(res);
//                 dispatch(saveShoppingListSuccess(res.data));
//             })
//             .catch(error => {
//                 dispatch(saveShoppingListFail(error));
//             });
//     }
// }

// const saveShoppingListStart = () => {
//     return {
//         type: actionTypes.SAVE_SHOPPING_LIST_START
//     }
// }

// const saveShoppingListFail = (error) => {
//     return {
//         type: actionTypes.SAVE_SHOPPING_LIST_FAIL,
//         error
//     }
// }

// const saveShoppingListSuccess = (list) => {
//     return {
//         type: actionTypes.SAVE_SHOPPING_LIST_SUCCESS,
//         list
//     }
// }

export const getShoppingList = (id) => {
    return dispatch => {
        axios.get(`/api/shopping/${id}`)
            .then(res => {
                dispatch(displayShoppingList(res.data))
            })
            .catch(error => {
                console.log(error);
            });
        }
}

const displayShoppingList = (list) => {
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

export const deleteListItem = (itemId) => {
    return {
        type: actionTypes.DELETE_SHOPPING_LIST_ITEM,
        itemId
    }
}