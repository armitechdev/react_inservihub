import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_ALL_COUNTRIES_REQUEST,
  GET_ALL_COUNTRIES_SUCCESS,
  GET_ALL_COUNTRIES_FAIL,
} from '../actions/countries';
import Countries from "../../api/countries";

export default function* watcher() {
  yield takeLatest(GET_ALL_COUNTRIES_REQUEST, getAllCountriesList);
}

function* getAllCountriesList(action) {
  try {
    const { data } = yield call(Countries.getAllCountries);
    yield put({
      type: GET_ALL_COUNTRIES_SUCCESS,
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
      type: GET_ALL_COUNTRIES_FAIL,
      payload: {
        message: e.message,
      },
    });
  }
}