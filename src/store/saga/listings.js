import {takeLatest, call, put} from 'redux-saga/effects';
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
import Listings from '../../api/listings';

export default function* watcher() {
    yield takeLatest(GET_ALL_LISTINGS_REQUEST, getAllListingsList);
    yield takeLatest(GET_FEATURED_REQUEST, getFeaturedList);
    yield takeLatest(GET_ALL_FEATURED_REQUEST, getAllFeaturedList);
    yield takeLatest(GET_SINGLE_FEATURED_REQUEST, getSingleFeatured);
    yield takeLatest(GET_CATEGORY_LISTINGS_REQUEST, getCategoryListings);
    yield takeLatest(CREATE_LISTING_REQUEST, createListingAction);
}

function* getAllListingsList(action) {
    try {
        const {data} = yield call(Listings.getAllListings);
        yield put({
            type: GET_ALL_LISTINGS_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_ALL_LISTINGS_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getFeaturedList(action) {
    try {
        const {search} = action.payload;
        const {data} = yield call(Listings.getFeaturedListings, search);
        yield put({
            type: GET_FEATURED_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_FEATURED_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getAllFeaturedList(action) {
    try {
        const {data} = yield call(Listings.getAllFeaturedListings);
        yield put({
            type: GET_ALL_FEATURED_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_ALL_FEATURED_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getSingleFeatured(action) {
    try {
        const {id} = action.payload;

        const {data} = yield call(Listings.getFeaturedSingleListing, id);
        yield put({
            type: GET_SINGLE_FEATURED_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_SINGLE_FEATURED_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getCategoryListings(action) {
    try {
        const {id} = action.payload;

        const {data} = yield call(Listings.getCategoriesListings, id);
        yield put({
            type: GET_CATEGORY_LISTINGS_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_CATEGORY_LISTINGS_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* createListingAction(action) {
    try {
        const {formData} = action.payload;
        const {data} = yield call(Listings.addListing, formData);
        yield put({
            type: CREATE_LISTING_SUCCESS,
            payload: {
                data,
            },
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.error(e);
        yield put({
            type: CREATE_LISTING_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}