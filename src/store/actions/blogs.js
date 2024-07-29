export const GET_ALL_BLOGS_REQUEST = 'GET_ALL_BLOGS_REQUEST';
export const GET_ALL_BLOGS_SUCCESS = 'GET_ALL_BLOGS_SUCCESS';
export const GET_ALL_BLOGS_FAIL = 'GET_ALL_BLOGS_FAIL';

export function getAllBlogsAction(cb) {
  return {
    type: GET_ALL_BLOGS_REQUEST,
    payload: {
      cb,
    },
  };
}


export const GET_LAST_BLOGS_REQUEST = 'GET_LAST_BLOGS_REQUEST';
export const GET_LAST_BLOGS_SUCCESS = 'GET_LAST_BLOGS_SUCCESS';
export const GET_LAST_BLOGS_FAIL = 'GET_LAST_BLOGS_FAIL';

export function getLastBlogsAction(cb) {
  return {
    type: GET_LAST_BLOGS_REQUEST,
    payload: {
      cb,
    },
  };
}

export const GET_SINGLE_BLOG_REQUEST = 'GET_SINGLE_BLOG_REQUEST';
export const GET_SINGLE_BLOG_SUCCESS = 'GET_SINGLE_BLOG_SUCCESS';
export const GET_SINGLE_BLOG_FAIL = 'GET_SINGLE_BLOG_FAIL';

export function getSingleBlogAction(id, cb) {
  return {
    type: GET_SINGLE_BLOG_REQUEST,
    payload: {
      id,
      cb,
    },
  };
}
