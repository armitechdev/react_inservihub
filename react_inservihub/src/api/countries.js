import { api } from './Api';

export default class Countries {
  static getAllCountries() {
    return api.get(`/countries/list`);
  }
}
