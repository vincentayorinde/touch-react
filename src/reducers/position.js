import {
    GET_POSITIONS,
    UPDATE_POSITION,
    DELETE_POSITION,
    ADD_POSITION,
    LOADING
} from '../actions/types';

const initialState = {
    positions: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSITIONS:
            return {
                ...state,
                positions: action.payload,
            };
        case UPDATE_POSITION:
            return {
                ...state,
                positions: action.payload,
            };
        case DELETE_POSITION:
            return {
                ...state,
                positions: action.payload,
            };
        case ADD_POSITION:
            return {
                ...state,
                positions: action.payload,
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
