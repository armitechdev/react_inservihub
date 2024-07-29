import { api } from './Api';

export default class Blogs {
  static getAllBlogs() {
    return api.get(`/blogs`);
  }
  static getLastBlogs() {
    return api.get(`/blogs/last`);
  }
  static getSingleBlogs(id) {
    return api.get(`/blogs/single/${id}`);
  }
}
