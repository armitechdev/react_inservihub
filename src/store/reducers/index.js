import { combineReducers } from 'redux';
import listings from './listings';
import categories from './categories';
import blogs from './blogs';
import countries from './countries';
import contact from './contact-us';


export default combineReducers({
  listings,
  categories,
  blogs,
  countries,
  contact
});
