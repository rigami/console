import simpleDataProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    // options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
};

export default simpleDataProvider('http://localhost:8080/admin', httpClient);
