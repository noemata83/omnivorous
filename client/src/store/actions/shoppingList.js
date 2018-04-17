import axios from 'axios';
import * as actionTypes from './actionTypes';
import defaultShoppingList from '../../components/ShoppingList/Prototype/defaultList';

export const fetchShoppingLists = (currentList=null) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`/api/shopping`)
            .then( res => {
                dispatch(fetchSuccess(res.data));
                if (!currentList && res.data.length > 0) {
                    dispatch(displayShoppingList(res.data[0]));
                }
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
    if (lists.length === 0) {
        createShoppingList(defaultShoppingList);
    }
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_SUCCESS,
        lists
    }
}

export const updateList = (currentList) => {
    return dispatch => {
        axios.put(`api/shopping/${currentList._id}`, {...currentList})
            .then(res => {
                    dispatch(fetchShoppingLists(currentList));
                    dispatch(editCurrentList(res.data));
                })
            .catch(err => console.log(err));
    }
}

const editCurrentList = (currentList) => {
    return {
        type: actionTypes.UPDATE_SHOPPING_LIST,
        currentList
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

export const addListItem = (item, currentList) => {
    const items = [...currentList.items, item];
    const nextId = currentList.nextId + 1;
    const updatedCurrentList = {...currentList, items, nextId};
    return updateCycle(updatedCurrentList);
}

export const editListItem = (itemId, item, currentList) => {
    const items = currentList.items.map(oldItem => {
        if (oldItem.itemId === itemId) {
            return {
                ...item,
                itemId,
            }
        }
        return oldItem;
    });
    const updatedCurrentList = { ...currentList, items };
    return updateCycle(updatedCurrentList);
}

export const deleteListItem = (itemId, currentList) => {
    const items = currentList.items.filter(item => item.itemId !== itemId);
    const updatedCurrentList = {...currentList, items};
    return updateCycle(updatedCurrentList);
}

export const addCategory = (category, currentList) => {
    const categories = [...currentList.categories, category];
    const updatedCurrentList = {...currentList, categories};
    return updateCycle(updatedCurrentList);
}

export const deleteCategory = (category, currentList) => {
    const items = currentList.items.map(item => {
        if (item.category === category) {
            return {
                    ...item,
                    category: 'Uncategorized'
                }
            }
        return item;
    });
    const categories = currentList.categories.filter(oldCategory => oldCategory !== category);
    const updatedCurrentList = { ...currentList, items, categories};
    return updateCycle(updatedCurrentList);
}

const updateCycle = (updatedCurrentList) => {
    return dispatch => {
        dispatch(updateList(updatedCurrentList));
        dispatch(editCurrentList(updatedCurrentList));
    }
}

export const deleteShoppingList = (id) => {
    return dispatch => {
        axios.delete(`api/shopping/${id}`)
            .then(_ => {
                dispatch(fetchShoppingLists());
            })
    }
}