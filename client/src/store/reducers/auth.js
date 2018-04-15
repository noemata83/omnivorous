import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    loading: true,
    displayName: ''
}

const reducer = (state = {...initialState}, action) => {
    switch(action.type) {
        case(actionTypes.FETCH_USER):
            return {
                ...state,
                userId: action.user.userId,
                displayName: action.user.displayName,
                loading: false,
            };
        default:
            return state;
    }
}

export default reducer;