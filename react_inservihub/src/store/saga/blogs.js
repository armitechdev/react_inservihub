import {takeLatest, call, put} from 'redux-saga/effects';
import {
    GET_ALL_BLOGS_REQUEST,
    GET_ALL_BLOGS_SUCCESS,
    GET_ALL_BLOGS_FAIL,
    GET_LAST_BLOGS_REQUEST,
    GET_LAST_BLOGS_SUCCESS,
    GET_LAST_BLOGS_FAIL,
    GET_SINGLE_BLOG_REQUEST,
    GET_SINGLE_BLOG_SUCCESS,
    GET_SINGLE_BLOG_FAIL,
} from '../actions/blogs';
import Blogs from "../../api/blogs";

export default function* watcher() {
    yield takeLatest(GET_ALL_BLOGS_REQUEST, getAllBlogsList);
    yield takeLatest(GET_LAST_BLOGS_REQUEST, getLastBlogsList);
    yield takeLatest(GET_SINGLE_BLOG_REQUEST, getSingleBlog);
}

function* getAllBlogsList(action) {
    try {
        const {data} = yield call(Blogs.getAllBlogs);
        yield put({
            type: GET_ALL_BLOGS_SUCCESS,
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
            type: GET_ALL_BLOGS_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getLastBlogsList(action) {
    try {
        const {data} = yield call(Blogs.getLastBlogs);
        yield put({
            type: GET_LAST_BLOGS_SUCCESS,
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
            type: GET_LAST_BLOGS_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}

function* getSingleBlog(action) {
    try {
        const {id} = action.payload;
        const {data} = yield call(Blogs.getSingleBlogs, id);
        yield put({
            type: GET_SINGLE_BLOG_SUCCESS,
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
            type: GET_SINGLE_BLOG_FAIL,
            payload: {
                message: e.message,
            },
        });
    }
}
