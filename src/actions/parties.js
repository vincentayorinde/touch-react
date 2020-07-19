
import { axiosCall, setErrors } from '../utils';

import {
    GET_PARTIES,
    UPDATE_PARTY,
    DELETE_PARTY,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getParties = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/api/v1/parties', payload: null, method: 'get' });
        
        dispatch({
            type: GET_PARTIES,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateParty = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/parties/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_PARTY,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deleteParty = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/parties/${id}`, payload: null, method: 'delete', });
     
        dispatch({
            type: DELETE_PARTY,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addParty = (party) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const partyData = new FormData();
    Object.keys(party).map(async (key) => {
        partyData.append(key, party[key]);
    });
    try {
        const result = await axiosCall({ path: '/api/v1/parties/add', payload: partyData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
