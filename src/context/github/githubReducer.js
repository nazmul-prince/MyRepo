import {
    SERARCH_USERS,
    CLEAR_USERS,
    GET_REPOS,
    GET_USERS,
    REMOVE_ALERT,
    SET_ALERT,
    SET_LOADING
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SERARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}