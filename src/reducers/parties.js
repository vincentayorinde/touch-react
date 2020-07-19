import {
    GET_PARTIES,
    UPDATE_PARTY,
    DELETE_PARTY,
    ADD_PARTY,
    LOADING
} from '../actions/types';

const initialState = {
    parties: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PARTIES:
            return {
                ...state,
                parties: action.payload,
            };
        case UPDATE_PARTY:
            return {
                ...state,
                parties: action.payload,
            };
        case DELETE_PARTY:
            return {
                ...state,
                parties: action.payload,
            };
        case ADD_PARTY:
            return {
                ...state,
                parties: action.payload,
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
