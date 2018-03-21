import * as actionTypes from '../actions/actionTypes';

const initialState = {
    lists: [
        { name: 'Grocery List', id: "adjiafjaiefaijfoasnda"}
    ],
    currentList: {
        name: 'Grocery List',
        categories: ['Dairy', 'Canned Goods', 'Uncategorized'],
        items: [
            { itemId: 0, name: 'Milk', quantity: 1, unit: 'quart', purchased: false, category: 'Dairy'},
            { itemId: 1, name: 'Tomatoes, diced', quantity: 2, unit: 'cups', purchased: false, category: 'Canned Goods'},
        ],
        nextId: 2
    },
    loading: false,
    error: null
}

const reducer = (state = {...initialState}, action) => {
    switch(action.type) {
        case(actionTypes.FETCH_SHOPPING_LISTS_START):
            return {
                ...state,
                loading: true,
                error: null
            }
        case(actionTypes.FETCH_SHOPPING_LISTS_FAIL):
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case(actionTypes.FETCH_SHOPPING_LISTS_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                lists: action.lists
            }
        case(actionTypes.EDIT_SHOPPING_LIST):
            const lists = [...state.lists];
            const updatedLists = lists.map( (list, index) => {
                if (list.id === action.id) {
                    return { ...action.updatedList,
                             _id: action.id }
                }
                return list;
            });
            return {
                ...state,
                lists: updatedLists
            }
        case(actionTypes.DELETE_RECIPE):
            const oldLists = [...state.lists];
            const targetIndex = oldLists.map(list => list._id).indexOf(action.id);
            const newLists = oldLists.filter( (list, index) => index !== targetIndex);
            return {
                ...state,
                lists: newLists,
                currentList: newLists[0] || null
            }
        case(actionTypes.ADD_LIST_ITEM):
            const { item } = action;
            const items = state.currentList.items.concat(item);
            const nextId = state.currentList.nextId + 1;
            const updatedCurrentList = { ...state.currentList, items, nextId};
            return {
                ...state,
                currentList: updatedCurrentList
            }
        default:
            return state;
    }
}

export default reducer;