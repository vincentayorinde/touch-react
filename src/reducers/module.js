import {
    GET_MODULES,
    UPDATE_MODULE,
    DELETE_MODULE,
    ADD_MODULE,
    LOADING
} from '../actions/types';

const initialState = {
    modules: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MODULES:
            return {
                ...state,
                modules: action.payload,
            };
        case UPDATE_MODULE:
            return {
                ...state,
                modules: action.payload,
            };
        case DELETE_MODULE:
            return {
                ...state,
                modules: action.payload,
            };
        case ADD_MODULE:
            return {
                ...state,
                modules: action.payload,
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
