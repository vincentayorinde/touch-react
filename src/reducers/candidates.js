import {
    GET_CANDIDATES,
    UPDATE_CANDITATE,
    DELETE_CANDIDATE,
    ADD_CANDIDATE,
    LOADING
} from '../actions/types';

const initialState = {
    candidates: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CANDIDATES:
            return {
                ...state,
                candidates: action.payload,
            };
        case UPDATE_CANDITATE:
            return {
                ...state,
                candidates: action.payload,
            };
        case DELETE_CANDIDATE:
            return {
                ...state,
                candidates: action.payload,
            };
        case ADD_CANDIDATE:
            return {
                ...state,
                candidates: action.payload,
                isLoading: false
            };
            case LOADING:
                return {
                    ...state,
                    isLoading: true
                };
        default:
            return {
                ...state,
                isLoading: false
            };
    }
}
