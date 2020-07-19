import {
    GET_DUES,
    UPDATE_DUES,
    ADD_DUES,
    LOADING
} from '../actions/types';

const initialState = {
    dues: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DUES:
            return {
                ...state,
                dues: action.payload,
            };
        case UPDATE_DUES:
            return {
                ...state,
                dues: action.payload,
            };
        case ADD_DUES:
            return {
                ...state,
                dues: action.payload,
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
