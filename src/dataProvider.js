import simpleDataProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
import config from "./config";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    let token = '';

    try {
        token = JSON.parse(localStorage.getItem('auth')).token;
    } catch (e) {
    }

    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

export default simpleDataProvider(`${config.serverUrl}/admin`, httpClient);
