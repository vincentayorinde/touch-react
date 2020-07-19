import { GET_RESULTS, CLEAN_UP, LOADING } from '../actions/types';

const initialState = {
    results: {},
    isLoading: false,
    loaded: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESULTS:
            return {
                ...state,
                results: action.payload,
                isLoading: false,
                loaded: true
            };
        case LOADING:
            return {
                ...state,
                isLoading: true,
                loaded: false
            };
        case CLEAN_UP:
            return {
                ...state,
                isLoading: false,
                loaded: false
            };
        default:
            return {
                ...state,
                isLoading: false,
                loaded: false
            };
    }
}
