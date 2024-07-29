export const CREATE_CONTACT_US_REQUEST = 'CREATE_CONTACT_US_REQUEST';
export const CREATE_CONTACT_US_SUCCESS = 'CREATE_CONTACT_US_SUCCESS';
export const CREATE_CONTACT_US_FAIL = 'CREATE_CONTACT_US_FAIL';

export function createContact(data,cb) {
  return {
    type: CREATE_CONTACT_US_REQUEST,
    payload: {
      data,
      cb,
    },
  };
}
