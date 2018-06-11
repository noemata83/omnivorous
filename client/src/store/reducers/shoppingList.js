import * as actionTypes from '../actions/actionTypes';

const initialState = {
  lists: [
    {
      name: 'Default List',
      categories: ['Uncategorized'],
      items: [],
      _id: 0,
    },
  ],
  currentList: {
    name: '',
    categories: [],
    items: [],
  },
  loading: false,
  error: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOPPING_LISTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_SHOPPING_LISTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_SHOPPING_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lists: action.lists,
      };
    case actionTypes.CREATE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        lists: [
          ...state.lists,
          { name: action.list.name, id: action.list._id },
        ],
        currentList: action.list,
      };
    case actionTypes.CREATE_SHOPPING_LIST_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.DISPLAY_SHOPPING_LIST: {
      const { list } = action;
      return {
        ...state,
        currentList: list,
      };
    }
    case actionTypes.UPDATE_SHOPPING_LIST: {
      const { currentList } = action;
      return {
        ...state,
        currentList,
      };
    }
    default:
      return state;
  }
};

export default reducer;
