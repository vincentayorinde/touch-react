import { GET_SUCCESS, CLEAN_UP } from '../actions/types';

const initialState = {
    message: {},
    status: null,
    success: false,
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUCCESS:
            return {
                message: action.payload.message,
                status: action.payload.status,
                success: true,
            };
        case CLEAN_UP:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
