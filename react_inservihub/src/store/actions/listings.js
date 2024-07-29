export const GET_ALL_LISTINGS_REQUEST = 'GET_ALL_LISTINGS_REQUEST';
export const GET_ALL_LISTINGS_SUCCESS = 'GET_ALL_LISTINGS_SUCCESS';
export const GET_ALL_LISTINGS_FAIL = 'GET_ALL_LISTINGS_FAIL';

export function getAllListingsAction(cb) {
    return {
        type: GET_ALL_LISTINGS_REQUEST,
        payload: {
            cb,
        },
    };
}

export const GET_FEATURED_REQUEST = 'GET_FEATURED_REQUEST';
export const GET_FEATURED_SUCCESS = 'GET_FEATURED_SUCCESS';
export const GET_FEATURED_FAIL = 'GET_FEATURED_FAIL';

export function getFeaturedListingsAction(search, cb) {
    return {
        type: GET_FEATURED_REQUEST,
        payload: {
            search,
            cb,
        },
    };
}

export const GET_ALL_FEATURED_REQUEST = 'GET_ALL_FEATURED_REQUEST';
export const GET_ALL_FEATURED_SUCCESS = 'GET_ALL_FEATURED_SUCCESS';
export const GET_ALL_FEATURED_FAIL = 'GET_ALL_FEATURED_FAIL';

export function getAllFeaturedListingsAction(cb) {
    return {
        type: GET_ALL_FEATURED_REQUEST,
        payload: {
            cb,
        },
    };
}

export const GET_SINGLE_FEATURED_REQUEST = 'GET_SINGLE_FEATURED_REQUEST';
export const GET_SINGLE_FEATURED_SUCCESS = 'GET_SINGLE_FEATURED_SUCCESS';
export const GET_SINGLE_FEATURED_FAIL = 'GET_SINGLE_FEATURED_FAIL';

export function getSingleFeaturedListingAction(id, cb) {
    return {
        type: GET_SINGLE_FEATURED_REQUEST,
        payload: {
            id,
            cb,
        },
    };
}

export const GET_CATEGORY_LISTINGS_REQUEST = 'GET_CATEGORY_LISTINGS_REQUEST';
export const GET_CATEGORY_LISTINGS_SUCCESS = 'GET_CATEGORY_LISTINGS_SUCCESS';
export const GET_CATEGORY_LISTINGS_FAIL = 'GET_CATEGORY_LISTINGS_FAIL';

export function getCategoryListingsAction(id, cb) {
    return {
        type: GET_CATEGORY_LISTINGS_REQUEST,
        payload: {
            id,
            cb,
        },
    };
}

export const CREATE_LISTING_REQUEST = 'CREATE_LISTING_REQUEST';
export const CREATE_LISTING_SUCCESS = 'CREATE_LISTING_SUCCESS';
export const CREATE_LISTING_FAIL = 'CREATE_LISTING_FAIL';

export function createBusinessListing(formData, cb) {
    return {
        type: CREATE_LISTING_REQUEST,
        payload: {
            formData,
            cb,
        },
    };
}