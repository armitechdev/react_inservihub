import {
    GET_ALL_LISTINGS_REQUEST,
    GET_ALL_LISTINGS_SUCCESS,
    GET_ALL_LISTINGS_FAIL,
    GET_FEATURED_REQUEST,
    GET_FEATURED_SUCCESS,
    GET_FEATURED_FAIL,
    GET_SINGLE_FEATURED_REQUEST,
    GET_SINGLE_FEATURED_SUCCESS,
    GET_SINGLE_FEATURED_FAIL,
    GET_ALL_FEATURED_REQUEST,
    GET_ALL_FEATURED_SUCCESS,
    GET_ALL_FEATURED_FAIL,
    GET_CATEGORY_LISTINGS_REQUEST,
    GET_CATEGORY_LISTINGS_SUCCESS,
    GET_CATEGORY_LISTINGS_FAIL,
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_FAIL,
} from '../actions/listings';

const initialState = {
    allListings: [],
    featuredListings: [],
    searchedListings: [],
    allFeaturedListings: [],
    singleFeaturedListing: {},
    categoryListings: [],
    categoryPath: {},
    singleCountry: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LISTINGS_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_ALL_LISTINGS_SUCCESS: {
            return {
                ...state,
                allListings: action.payload.data?.listings,
                status: 'Success',
            };
        }
        case GET_ALL_LISTINGS_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        case GET_FEATURED_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_FEATURED_SUCCESS: {
            return {
                ...state,
                featuredListings: action.payload.data?.lastSix,
                searchedListings: action.payload.data?.searched,
                status: 'Success',
            };
        }
        case GET_FEATURED_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        case GET_ALL_FEATURED_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_ALL_FEATURED_SUCCESS: {
            return {
                ...state,
                allFeaturedListings: action.payload.data?.listings,
                status: 'Success',
            };
        }
        case GET_ALL_FEATURED_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        case GET_SINGLE_FEATURED_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_SINGLE_FEATURED_SUCCESS: {
            return {
                ...state,
                singleFeaturedListing: action.payload.data?.listing,
                status: 'Success',
            };
        }
        case GET_SINGLE_FEATURED_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        case GET_CATEGORY_LISTINGS_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case GET_CATEGORY_LISTINGS_SUCCESS: {
            return {
                ...state,
                categoryListings: action.payload.data?.listings,
                categoryPath: action.payload.data?.category,
                singleCountry: action.payload.data?.singleCountry,
                status: 'Success',
            };
        }
        case GET_CATEGORY_LISTINGS_FAIL: {
            return {
                ...state,
                status: 'Fail',
            };
        }
        case CREATE_LISTING_REQUEST: {
            return {
                ...state,
                status: 'Request',
            };
        }
        case CREATE_LISTING_SUCCESS: {
            return {
                ...state,
                status: 'Success',
            };
        }
        case CREATE_LISTING_FAIL: {
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
