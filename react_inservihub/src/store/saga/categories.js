import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
} from '../actions/categories';
import Categories from "../../api/categories";

export default function* watcher() {
  yield takeLatest(GET_ALL_CATEGORIES_REQUEST, getAllCategoriesList);
}

function* getAllCategoriesList(action) {
  try {
    const { data } = yield call(Categories.getAllCategories);
    yield put({
      type: GET_ALL_CATEGORIES_SUCCESS,
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
      type: GET_ALL_CATEGORIES_FAIL,
      payload: {
        message: e.message,
      },
    });
  }
}
