
import { axiosCall, setErrors } from '../utils';

import {
    CAST_VOTE,
    CLEAN_UP,
    LOADING,
    CHECK_VOTER,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});


export const checkVoter = (votersId) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        const result = await axiosCall({ path: '/api/v1/vote/check-voter', payload: votersId, method: 'post'});

        dispatch({
            type: CHECK_VOTER,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };

export const castVote = (vote) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        const result = await axiosCall({ path: '/api/v1/vote', payload: vote, method: 'post'});
        
        dispatch({
            type: CAST_VOTE,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
