import { GET_ERRORS, CLEAN_UP } from '../actions/types';

const initialState = {
    message: {},
    status: null,
    error: false,

};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload.status,
                error: true
            };
            case CLEAN_UP:
                return {
                    ...initialState,
                };
        default:
            return state;
    }
}
