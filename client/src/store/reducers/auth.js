import * as actionTypes from '../actions/actionTypes';

const reducer = (state = null, action) => {
    switch(action.type) {
        case(actionTypes.FETCH_USER):
            return action.user || null;
        default:
            return state;
    }
}

export default reducer;