import { takeLatest, call, put } from 'redux-saga/effects';
import {
  CREATE_CONTACT_US_REQUEST,
  CREATE_CONTACT_US_SUCCESS,
  CREATE_CONTACT_US_FAIL,
} from '../actions/contact-us';
import ContactUs from "../../api/contact-us";

export default function* watcher() {
  yield takeLatest(CREATE_CONTACT_US_REQUEST, addContactUs);
}

function* addContactUs(action) {
  try {
    const formData = action.payload.data
    const { data } = yield call(ContactUs.createContactUs, formData);
    yield put({
      type: CREATE_CONTACT_US_SUCCESS,
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
      type: CREATE_CONTACT_US_FAIL,
      payload: {
        message: e.message,
      },
    });
  }
}
