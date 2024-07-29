export const GET_ALL_CATEGORIES_REQUEST = 'GET_ALL_CATEGORIES_REQUEST';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAIL = 'GET_ALL_CATEGORIES_FAIL';

export function getAllCategoriesAction(cb) {
  return {
    type: GET_ALL_CATEGORIES_REQUEST,
    payload: {
      cb,
    },
  };
}
