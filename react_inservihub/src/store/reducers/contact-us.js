import {
  CREATE_CONTACT_US_REQUEST,
  CREATE_CONTACT_US_SUCCESS,
  CREATE_CONTACT_US_FAIL,
} from '../actions/contact-us';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONTACT_US_REQUEST: {
      return {
        ...state,
        status: 'Request',
      };
    }
    case CREATE_CONTACT_US_SUCCESS: {
      return {
        ...state,
        status: 'Success',
      };
    }
    case CREATE_CONTACT_US_FAIL: {
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
