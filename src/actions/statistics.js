
import { axiosCall, setErrors } from '../utils';

import {
    GET_STATS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getStats = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    try {
        const result = await axiosCall({ path: '/api/v1/stats', payload: null, method: 'get' });
        dispatch({
            type: GET_STATS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

