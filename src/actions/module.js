
import { axiosCall, setErrors } from '../utils';

import {
    GET_MODULES,
    UPDATE_MODULE,
    DELETE_MODULE,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getModules = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/module', payload: null, method: 'get' });
        
        dispatch({
            type: GET_MODULES,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateModule = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `module/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_MODULE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deleteModule = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `module/${id}`, payload: null, method: 'delete', });
     
        dispatch({
            type: DELETE_MODULE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addModule = (module) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const moduleData = new FormData();
    Object.keys(module).map(async (key) => {
        moduleData.append(key, module[key]);
    });
    try {
        const result = await axiosCall({ path: 'module/add', payload: moduleData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
