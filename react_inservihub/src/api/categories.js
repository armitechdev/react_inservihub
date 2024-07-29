import { api } from './Api';

export default class Categories {
  static getAllCategories() {
    return api.get(`/categories`);
  }
}
