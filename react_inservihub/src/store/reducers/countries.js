import {
    GET_ALL_COUNTRIES_REQUEST,
    GET_ALL_COUNTRIES_SUCCESS,
    GET_ALL_COUNTRIES_FAIL,
} from '../actions/countries';

const initialState = {
    allCountries: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_ALL_COUNTRIES_SUCCESS: {
            return {
                ...state,
                allCountries: action.payload.data?.countries,
                status: 'Success',
            };
        }
        case GET_ALL_COUNTRIES_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        default: {
            return state;
        }
    }
}
