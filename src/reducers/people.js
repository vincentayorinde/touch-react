import {
    GET_PEOPLE,
    UPDATE_PEOPLE,
    DELETE_PEOPLE,
    ADD_PEOPLE,
    LOADING
} from '../actions/types';

const initialState = {
    people: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PEOPLE:
            return {
                ...state,
                people: action.payload,
            };
        case UPDATE_PEOPLE:
            return {
                ...state,
                people: action.payload,
            };
        case DELETE_PEOPLE:
            return {
                ...state,
                people: action.payload,
            };
        case ADD_PEOPLE:
            return {
                ...state,
                people: action.payload,
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
