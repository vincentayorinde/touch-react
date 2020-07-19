
import { axiosCall, setErrors } from '../utils';

import {
    GET_ELECTORAL_AREAS,
    UPDATE_ELECTORAL_AREA,
    DELETE_ELECTORAL_AREA,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getElectoralAreas = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/electoral', payload: null, method: 'get' });
        
        dispatch({
            type: GET_ELECTORAL_AREAS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateElectoralArea = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `electoral/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_ELECTORAL_AREA,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deleteElectoralArea = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `electoral/${id}`, payload: null, method: 'delete', });
     
        dispatch({
            type: DELETE_ELECTORAL_AREA,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addElectoralArea = (electoralArea) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const electoralAreaData = new FormData();
    Object.keys(electoralArea).map(async (key) => {
        electoralAreaData.append(key, electoralArea[key]);
    });
    console.log('the electoral area data', electoralAreaData)
    try {
        const result = await axiosCall({ path: 'electoral/add', payload: electoralAreaData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
