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

const initialState = {
  allBlogs: [],
  lastBlogs: [],
  singleBlog: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BLOGS_REQUEST: {
      return {
        ...state,
        status: 'Request',
      };
    }
    case GET_ALL_BLOGS_SUCCESS: {
      return {
        ...state,
        allBlogs: action.payload.data?.blogs,
        status: 'Success',
      };
    }
    case GET_ALL_BLOGS_FAIL: {
      return {
        ...state,
        status: 'Fail',
      };
    }
    case GET_LAST_BLOGS_REQUEST: {
      return {
        ...state,
        status: 'Request',
      };
    }
    case GET_LAST_BLOGS_SUCCESS: {
      return {
        ...state,
        lastBlogs: action.payload.data?.blogs,
        status: 'Success',
      };
    }
    case GET_LAST_BLOGS_FAIL: {
      return {
        ...state,
        status: 'Fail',
      };
    }
    case GET_SINGLE_BLOG_REQUEST: {
      return {
        ...state,
        status: 'Request',
      };
    }
    case GET_SINGLE_BLOG_SUCCESS: {
      return {
        ...state,
        singleBlog: action.payload.data?.blog,
        status: 'Success',
      };
    }
    case GET_SINGLE_BLOG_FAIL: {
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
