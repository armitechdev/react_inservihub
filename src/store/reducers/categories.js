import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
} from '../actions/categories';

const initialState = {
  allCategories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST: {
      return {
        ...state,
        status: 'Request',
      };
    }
    case GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        allCategories: action.payload.data?.categories,
        status: 'Success',
      };
    }
    case GET_ALL_CATEGORIES_FAIL: {
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
