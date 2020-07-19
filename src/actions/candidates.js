
import { axiosCall, setErrors } from '../utils';

import {
    GET_CANDIDATES,
    UPDATE_CANDITATE,
    DELETE_CANDIDATE,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getCandidates = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/api/v1/candidates', payload: null, method: 'get' });
       
        dispatch({
            type: GET_CANDIDATES,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateCanditate = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/candidates/${id}`, payload: updateData, method: 'put', });
      
        dispatch({
            type: UPDATE_CANDITATE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deleteCandidate = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/candidates/${id}`, payload: null, method: 'delete', });
       
        dispatch({
            type: DELETE_CANDIDATE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addCandidate = (candidate) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const candidateData = new FormData();
    Object.keys(candidate).map(async (key) => {
        candidateData.append(key, candidate[key]);
    });
    try {
        const result = await axiosCall({ path: '/api/v1/candidates/add', payload: candidateData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
