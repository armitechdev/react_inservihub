export const GET_ALL_COUNTRIES_REQUEST = 'GET_ALL_COUNTRIES_REQUEST';
export const GET_ALL_COUNTRIES_SUCCESS = 'GET_ALL_COUNTRIES_SUCCESS';
export const GET_ALL_COUNTRIES_FAIL = 'GET_ALL_COUNTRIES_FAIL';

export function getAllCountriesAction(cb) {
  return {
    type: GET_ALL_COUNTRIES_REQUEST,
    payload: {
      cb,
    },
  };
}