
import { axiosCall, setErrors } from '../utils';

import {
    GET_RESULTS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getResults = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    try {
        const result = await axiosCall({ path: '/api/v1/vote/result', payload: null, method: 'get' });
        dispatch({
            type: GET_RESULTS,
            payload: result,
        });
        dispatch({
            type: CLEAN_UP,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

