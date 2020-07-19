
import { axiosCall, setErrors } from '../utils';

import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAN_UP_AUTH,
    USER_LOADING,
    LOGIN_FAIL
} from './types';

export const cleanUpAuth = () => ({
    type: CLEAN_UP_AUTH,
});

// LOAD USER
export const loadUser = () => (dispatch, getState) => {
    const token = getState().auth.token;
    // If token, add to headers congig
    if (token) {
        dispatch({
            type: USER_LOADED,
            payload: getState().auth.user,
        });
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// LOGIN
export const login = (values) => async (dispatch) => {
    dispatch({
        type: USER_LOADING
    });
    try {
        const result = await axiosCall({ path: 'users/signin', payload: values, method: 'post' });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
        dispatch({
            type: LOGIN_FAIL,
        });
      }
};

// LOG OUT
export const logout = () => async (dispatch) => {
    try {
        await axiosCall({ path: 'users/signout', payload: null, method: 'post' });
        dispatch({
            type: LOGOUT_SUCCESS,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};
