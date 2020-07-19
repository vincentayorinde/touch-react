import {
    GET_ELECTORAL_AREAS,
    UPDATE_ELECTORAL_AREA,
    DELETE_ELECTORAL_AREA,
    ADD_ELECTORAL_AREA,
    LOADING
} from '../actions/types';

const initialState = {
    electoralAreas: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ELECTORAL_AREAS:
            return {
                ...state,
                electoralAreas: action.payload,
            };
        case UPDATE_ELECTORAL_AREA:
            return {
                ...state,
                electoralAreas: action.payload,
            };
        case DELETE_ELECTORAL_AREA:
            return {
                ...state,
                electoralAreas: action.payload,
            };
        case ADD_ELECTORAL_AREA:
            return {
                ...state,
                electoralAreas: action.payload,
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
