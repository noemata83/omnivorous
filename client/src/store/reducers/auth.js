import * as actionTypes from '../actions/actionTypes';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case(actionTypes.FETCH_USER):
            return {
                ...state,
                userId: action.user.userId,
                displayName: action.user.displayName
            };
        default:
            return state;
    }
}

export default reducer;