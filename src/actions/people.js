
import { axiosCall, setErrors } from '../utils';

import {
    GET_PEOPLE,
    UPDATE_PEOPLE,
    DELETE_PEOPLE,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PEOPLE
export const getPeople = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: 'people', payload: null, method: 'get' });
        
        dispatch({
            type: GET_PEOPLE,
            payload: result,
        });
        console.log('the result', result)
      } catch (error) {
        console.log('the errrrrr', error) 
        dispatch(setErrors(error));
      }
};

export const updatePeople = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `people/${id}`, payload: updateData, method: 'put', });

        dispatch({
            type: UPDATE_PEOPLE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deletePeople = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `people/${id}`, payload: null, method: 'delete', });
     
        dispatch({
            type: DELETE_PEOPLE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addPeople = (people) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    const peopleData = new FormData();
    Object.keys(people).map(async (key) => {
        peopleData.append(key, people[key]);
    });
    try {
        const result = await axiosCall({ path: 'people/add', payload: peopleData, method: 'post', contentType:'multipart/form-data' });
       
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
