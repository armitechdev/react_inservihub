import {all, fork} from 'redux-saga/effects';
import listings from './listings';
import categories from './categories';
import blogs from './blogs';
import countries from './countries';
import contact from './contact-us';

export default function* watchers() {
    yield all(
        [
            listings,
            categories,
            blogs,
            countries,
            contact,
        ].map(fork),
    );
}
