import simpleDataProvider from 'ra-data-simple-rest';
import { fetchUtils, HttpError } from 'react-admin';
import config from "./config";

const refreshToken = async () => {
    console.log('Refresh token...');

    try {
        const token = JSON.parse(localStorage.getItem('auth')).refreshToken;

        const headers = new Headers();

        headers.append('Device-Type', 'console');
        headers.append('Device-Sign', JSON.parse(localStorage.getItem('auth'))?.deviceSign || '');
        headers.append('Device-Platform', navigator.userAgentData.platform);

        const data = await fetchUtils.fetchJson(`${config.serverUrl}/v1/auth/token/refresh`, {
            headers,
            user: {
                authenticated: true,
                token: `Bearer ${token}`,
            }
        });

        localStorage.setItem('auth', JSON.stringify({
            ...JSON.parse(localStorage.getItem('auth')),
            accessToken: data.json.accessToken,
            expiredTokenTimeout: Date.now() + data.json.expiredTimeout,
        }));

        return Promise.resolve();
    } catch (e) {
        console.error(e);
    }
}

const httpClient = async (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    options.headers.append('Device-Type', 'console');
    options.headers.append('Device-Sign', JSON.parse(localStorage.getItem('auth'))?.deviceSign || '');
    options.headers.append('Device-Platform', navigator.userAgentData.platform);

    let token = '';

    try {
        const expiredTokenTimeout = JSON.parse(localStorage.getItem('auth')).expiredTokenTimeout;

        if (!expiredTokenTimeout || expiredTokenTimeout < Date.now()) await refreshToken();

        token = JSON.parse(localStorage.getItem('auth')).accessToken;
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

export default simpleDataProvider(`${config.serverUrl}/v1`, httpClient);
