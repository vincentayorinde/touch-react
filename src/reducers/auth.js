import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    CLEAN_UP_AUTH
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: localStorage.getItem('user'),
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.user.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                user:action.payload.user,
                token: action.payload.user.token,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case CLEAN_UP_AUTH:
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false
                };
        default:
            return state;
    }
}
