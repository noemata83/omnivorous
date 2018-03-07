import axios from 'axios';

import * as actions from './actionTypes';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('api/current_user');
    dispatch({
        type: actions.FETCH_USER, 
        user: res.data});
}