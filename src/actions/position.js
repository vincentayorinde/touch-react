
import { axiosCall, setErrors } from '../utils';

import {
    GET_POSITIONS,
    UPDATE_POSITION,
    DELETE_POSITION,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getPositions = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/position', payload: null, method: 'get' });
        
        dispatch({
            type: GET_POSITIONS,
            payload: result,
        });
      } catch (error) {
        console.log('the errrrrr', error)

        dispatch(setErrors(error));
      }
};

export const updatePosition = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `position/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_POSITION,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deletePosition = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `position/${id}`, payload: null, method: 'delete', });
     
        dispatch({
            type: DELETE_POSITION,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addPosition = (position) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const positionData = new FormData();
    Object.keys(position).map(async (key) => {
        positionData.append(key, position[key]);
    });
    try {
        const result = await axiosCall({ path: 'position/add', payload: positionData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
