
import { axiosCall, setErrors } from '../utils';

import {
    GET_DUES,
    UPDATE_DUES,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PEOPLE
export const getDues = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/dues', payload: null, method: 'get' });
        
        dispatch({
            type: GET_DUES,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateDues = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `dues/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_DUES,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};


export const addDues = (dues) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const duesData = new FormData();
    Object.keys(dues).map(async (key) => {
        duesData.append(key, dues[key]);
    });
    try {
        const result = await axiosCall({ path: 'dues/add', payload: duesData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
