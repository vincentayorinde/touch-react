import { CAST_VOTE, LOADING, CHECK_VOTER } from '../actions/types';

const initialState = {
    vote: null,
    isLoading: false,
    voter: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CAST_VOTE:
            return {
                ...state,
                vote: action.payload,
                isLoading: false
            };
        case CHECK_VOTER:
            return {
                ...state,
                voter: action.payload,
                isLoading: false
            };
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return {
                ...state,
                isLoading: false,
            };
    }
}
