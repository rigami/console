import simpleDataProvider from 'ra-data-simple-rest';
import { fetchUtils, HttpError } from 'react-admin';
import config from "./config";

const httpClient = async (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    let token = '';

    try {
        token = JSON.parse(localStorage.getItem('auth')).token;
    } catch (e) {

    }

    options.user = {
        authenticated: true,
        token: `Bearer ${token}`,
    };

    try {
        return await fetchUtils.fetchJson(url, options);
    } catch (e) {
        if (e.status === 403) {
            localStorage.removeItem('auth');
            if (typeof window !== 'undefined') window.location = "#/login";
            return Promise.reject(new HttpError("Session is expired", 401));
        } else {
            return Promise.reject(e);
        }
    }
};

export default simpleDataProvider(`${config.serverUrl}/admin`, httpClient);
