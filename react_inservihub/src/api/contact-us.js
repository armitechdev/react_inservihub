import { api } from './Api';

export default class ContactUs {
  static createContactUs(formData) {
    return api.post(`/contact/add`, {
      ...formData
    });
  }
}
