import {
    GET_VOTERS,
    UPDATE_VOTER,
    DELETE_VOTER,
    ADD_VOTER,
    LOADING,
} from '../actions/types';

const initialState = {
    voters: [],
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VOTERS:
            return {
                ...state,
                voters: action.payload,
            };
        case UPDATE_VOTER:
            return {
                ...state,
                voters: action.payload,
            };
        case DELETE_VOTER:
            return {
                ...state,
                voters: action.payload,
            };
        case ADD_VOTER:
            return {
                ...state,
                voters: action.payload,
                isLoading: false,
            };
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return {
                ...state,
                isLoading: false,
            };
    }
}
