import { GET_STATS, CLEAN_UP, LOADING } from '../actions/types';

const initialState = {
    stats: {},
    isLoading: false,
    loaded: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATS:
            return {
                ...state,
                stats: action.payload,
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
