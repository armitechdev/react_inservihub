import { api } from './Api';
import axios from "axios";

const {REACT_APP_API_URL} = process.env

export default class Listings {
  static getAllListings() {
    return api.get(`/listings`);
  }
  static getFeaturedListings(search) {
    return api.get(`/listings/featured`, {
      params: {
        search,
      }
    });
  }
  static getAllFeaturedListings() {
    return api.get(`/listings/allFeatured/`);
  }
  static getFeaturedSingleListing(id) {
    return api.get(`/listings/single/${id}`);
  }
  static getCategoriesListings(id) {
    return api.get(`/listings/category${id}`);
  }
  static addListing(formData) {
    const fd = new FormData();
    fd.append('logo_file', formData.logo_file);
    fd.append('cover_file', formData.cover_file);
    fd.append('featured_file', formData.featured_file);
    fd.append('formData', JSON.stringify({...formData}));

    return axios.post(`${REACT_APP_API_URL}/listings/create`, fd,
        {headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',},}
    );
  }
}
